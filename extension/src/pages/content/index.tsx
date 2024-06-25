window.addEventListener("token", (event: Event) => {
  const token = (event as CustomEvent).detail.token
  if (token) {
    chrome.storage.sync.set({nextRoleToken: token});
    chrome.runtime.sendMessage({
      type: "Token",
      token: token
    });
  }
})

let intervalId: any = undefined
let currentJobId: any = undefined
const LINKED_LIST_PAGE = "linkedin.com/jobs/search/"
const LINKED_DETAIL_PAGE = "linkedin.com/jobs/view/"

const allowedUrls = [
  LINKED_LIST_PAGE,
  LINKED_DETAIL_PAGE
]

function allowedPageType() {
  for (let i = 0; i < allowedUrls.length; i++) {
    const url = allowedUrls[i]
    if (document.location.href.includes(url)) {
      return url
    }
  }
  return undefined
}

function getParam(param: string) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(param)
}

function parseJobId(pageType: string | undefined) {
  const url = document.location.href
  switch (pageType) {
    case LINKED_DETAIL_PAGE:
      const parts = url.split(LINKED_DETAIL_PAGE)
      if (parts && parts.length > 0) {
        return parts[parts.length - 1].split("/")[0]
      }
      break
    case LINKED_LIST_PAGE:
      return getParam("currentJobId")
    default:
      return null
  }
  return null
}

function parseLinkedIn() {
  const element: any = document.querySelector("#job-details > div")
  if (element && element.innerText && element.innerText.length > 0) {
    return element.innerText
    // return document.getElementsByTagName("html")[0].innerText
  }
  return undefined
}

function parsePage(pageType: string) {
  switch (pageType) {
    case LINKED_DETAIL_PAGE:
    case LINKED_LIST_PAGE:
      return parseLinkedIn()
    default:
      return undefined
  }
}

function getJobBoardName(pageType: string) {
  switch (pageType) {
    case LINKED_DETAIL_PAGE:
    case LINKED_LIST_PAGE:
      return "LinkedIn"
    default:
      return "Other"
  }
}

function sendMessage(jd: string, pageType: string) {
  console.log("jd: ", jd)
  chrome.runtime.sendMessage({
    type: "jd",
    jobBoard: getJobBoardName(pageType),
    jd: jd,
    jobId: currentJobId
  });
  pollForPageLoad()
}

/**
 * Check every 100ms if the user is currently on any of the allowed pages, i.e.
 * pages with job description. We are checking it this way because some websites
 * like LinkedIn load the job description async.
 *
 * @param callback
 */
function pollForPageLoad() {
  intervalId = setInterval(() => {
    const pageType = allowedPageType()
    const newCurrentJobId = parseJobId(pageType)
    if (pageType) {
      if (newCurrentJobId && newCurrentJobId != currentJobId) {
        const jd = parsePage(pageType)
        if (jd) {
          currentJobId = newCurrentJobId
          clearInterval(intervalId)
          sendMessage(jd, pageType)
        }
      }
    }
  }, 100);
}

pollForPageLoad()





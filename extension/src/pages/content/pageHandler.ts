import testData from "./dev.json"

type ParsedContent = {
  body?: string,
  logo?: any
}

let intervalId: any = undefined
let currentJobId: any = undefined
let doc: any = undefined
const LINKED_LIST_PAGE = "linkedin.com/jobs/search/"
const LINKED_DETAIL_PAGE = "linkedin.com/jobs/view/"

const allowedUrls = [
  LINKED_LIST_PAGE,
  LINKED_DETAIL_PAGE
]

function allowedPageType() {
  for (let i = 0; i < allowedUrls.length; i++) {
    const url = allowedUrls[i]
    if (doc.location.href.includes(url)) {
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
  const url = doc.location.href
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

function parseLinkedIn(
    topCardSelector: string,
    topCardTextSelector: string,
    primaryDescSelector: string,
    jobDetailsDescSelector: string,
    imgClasses: string[]): ParsedContent {
  let topCardParsed = false, primaryDescParsed = false, jdParsed = false, logoParsed = false
  const texts = []
  const parsedContent: ParsedContent = {}
  const topCard: any = doc.querySelector(topCardSelector)
  if (topCard) {
    const topCardText = topCard.querySelector(topCardTextSelector)
    if (topCardText && topCardText.innerText.length > 0) {
      texts.push(topCardText.innerText)
      topCardParsed = true
    }
  }
  const primaryDescription: any = doc.querySelector(primaryDescSelector)
  if (primaryDescription && primaryDescription.innerText.length > 0) {
    texts.push(`Primary description: ${primaryDescription.innerText}`)
    primaryDescParsed = true
  }
  const element: any = doc.querySelector(jobDetailsDescSelector)
  if (element && element.innerText && element.innerText.length > 0) {
    texts.push(element.innerText)
    jdParsed = true
  }

  const imageElement: any = doc.getElementsByClassName(imgClasses[0])
  console.log("debug 1")
  // debugger
  if (imageElement && imageElement.length > 0) {
    console.log("debug 2")
    const imgContainer = imageElement[0].getElementsByClassName(imgClasses[1])
    console.log("debug 3")
    if (imgContainer && imgContainer.length > 0) {
      console.log("debug 4")
      console.log(imgContainer)
      const imgTag = imgContainer[0].getElementsByTagName("img")
      console.log("debug 5")
      if (imgTag && imgTag.length > 0) {
        console.log("debug 6")
        const href = imgTag[0].src
        console.log("debug 7: ", href)
        if (href && href.length > 0) {
          console.log("debug 8")
          parsedContent.logo = href
          logoParsed = true
        }
      }
    }
  }

  if (topCardParsed && primaryDescParsed && jdParsed && logoParsed) {
    parsedContent.body = texts.join(" ").replace("\n", "")
  }
  return parsedContent
}

function parsePage(pageType: string) {
  switch (pageType) {
    case LINKED_DETAIL_PAGE:
      return parseLinkedIn("div.job-view-layout > div > div > div",
          "div.mt2.mb2",
          "div.job-details-jobs-unified-top-card__primary-description-container",
          "#job-details > div",
          ["job-view-layout jobs-details", "ivm-image-view-model"]
      )
    case LINKED_LIST_PAGE:
      return parseLinkedIn(
          "div.relative.job-details-jobs-unified-top-card__container--two-pane",
          "div.mt2.mb2",
          "div.job-details-jobs-unified-top-card__primary-description-container",
          "#job-details > div",
          ["job-view-layout jobs-details", "ivm-image-view-model"])
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

function sendMessage(parsedContent?: ParsedContent, pageType?: string) {
  if (import.meta.env.MODE === "production") {
    chrome.runtime.sendMessage({
      type: "jd",
      job_board: getJobBoardName(pageType!!),
      job_description: parsedContent!!.body,
      logo: parsedContent!!.logo,
      job_id: currentJobId
    });
  } else {
    window.postMessage({type: "jd", ...testData})
  }
  run()
}

export function handlePage(docUrl?: string) {
  doc = document
  if (docUrl) {
    sendMessage(undefined, undefined, )
  } else {
    const pageType = allowedPageType()
    const newCurrentJobId = parseJobId(pageType)
    if (pageType) {
      if (newCurrentJobId && newCurrentJobId != currentJobId) {
        const parsedContent = parsePage(pageType)
        if (parsedContent && parsedContent.body && parsedContent.logo) {
          currentJobId = newCurrentJobId
          console.log("Parsed: ", parsedContent)
          fetch(parsedContent.logo)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onload = () => {
              parsedContent.logo = reader.result
              clearInterval(intervalId)
              console.log("clearing interval....")
              sendMessage(parsedContent, pageType)
            };
            reader.readAsDataURL(blob);
          })
          .catch(error => {
            console.error("Retrying: ", error);
          });
        } else {
          console.log("Retrying...")
        }
      }
    }
  }
}

/**
 * Check every 100ms if the user is currently on any of the allowed pages, i.e.
 * pages with job description. We are checking it this way because some websites
 * like LinkedIn load the job description async.
 *
 * @param callback
 */
export default function run() {
  intervalId = setInterval(() => handlePage(), 100);
}

window.addEventListener("token", (event: Event) => {
  const token = (event as CustomEvent).detail.token
  if (token) {
    chrome.storage.sync.set({nextRoleToken: token});
    chrome.runtime.sendMessage({
      type: "Token",
      token: token
    });
  }
  console.log("token event encountered: ", event)
})


console.log("NextRole content script - document body: ", document.title, document.location.href, document.body)

const body = document.body.innerHTML

console.log("sending body...")
chrome.runtime.sendMessage({
  type: "test",
  title: document.title,
  url: document.location.href,
  body: body
});





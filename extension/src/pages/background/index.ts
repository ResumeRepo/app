// console.log('background script loaded');
// @ts-ignore
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: any) => console.error(error));

// async function getCurrentTab() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
//         // do some other fanciful stuff here
//     });
//     const tabs = await chrome.tabs.query({active: true})
//     if (tabs) {
//         for (let i = 0; i < tabs.length; i++) {
//             console.log(tabs[i])
//             return tabs[i]
//             // const tab = tabs[i];
//             // if (tab.url?.includes(productSku)) {
//             //     return tab;
//             // }
//         }
//     }
//     return undefined;
// }

// function getPageData() { return {
//     title: document.title,
//     url: document.location.href,
//     body: JSON.stringify(document.body)
// } }
// function getHref() { return document.location.href; }
// function getDocument() { return document.body }

// chrome.tabs.onActivated.addListener( function () {
//     console.log("on tab active")
//     chrome.runtime.sendMessage({
//         type: "test",
//         title: "from activated",
//         url: "unknown"
//     });
// })

// chrome.tabs.onActivated.addListener(async ({ tabId }) => {
//     const { path } = await chrome.sidePanel.getOptions({ tabId });
//     if (path === welcomePage) {
//         chrome.sidePanel.setOptions({ path: mainPage });
//     }
// })

// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//     // console.log(tabId, changeInfo, tab)
//     // console.log("tab.url: ", tab.url)
//     if (!tab.url) return;
//     const url = new URL(tab.url)
//     if (url.origin.includes("wikipedia.org") || url.origin.includes("engadget")) {
//         chrome.sidePanel.setOptions({ tabId, path: "src/pages/panel/index.html", enabled: true})
//     } else {
//         chrome.sidePanel.setOptions({ tabId, enabled: false})
//     }
//
//     // if (info.status === 'complete') {
//     //     chrome.runtime.sendMessage({
//     //         type: "test",
//     //         title: document.title,
//     //         url: document.location.href
//     //     });
//     // }
//
//     console.log("sending message to sidebar")
//
//     // const tab = await getCurrentTab()
//
//
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             func: () => { return {greeting: "hello"}}
//         }).then(injectionResults => {
//             for (const {frameId, result} of injectionResults) {
//                 // console.log(`Frame ${frameId} result:`, result);
//                 // chrome.runtime.sendMessage({
//                 //     type: "test",
//                 //     ...result
//                 // });
//             }
//         });
//
//
//     });
// });

// chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
//     // if (request.type === "test") {
//     //     const tab = await getCurrentTab()
//     //     await chrome.tabs.sendMessage(tab.id, {
//     //         type: "test",
//     //         title: document.title,
//     //         url: document.location.href
//     //     })
//     // }
//
//     console.log("message received in background: ", request)
//     // const tab = await getCurrentTab()
//     // await chrome.tabs.sendMessage(tab.id, {
//     //     type: "test",
//     //     title: document.title,
//     //     url: document.location.href
//     // })
//
//     // else if (request.type === MESSAGE_TYPE.PRODUCT_INFO_REQUEST) {
//     //     sendProductInfo(request.productSku)
//     //     .catch(e => console.log(e));
//     //     sendResponse(true)
//     // } else if (request.type === MESSAGE_TYPE.PAGE_VIEW_EVENT) {
//     //     firePageViewEvent(request.title, request.href);
//     // } else if (request.type === MESSAGE_TYPE.CLICK_EVENT) {
//     //     fireEvent('click_button', { id: request.id });
//     // } else if (request.type === MESSAGE_TYPE.PRODUCT_PAGE_LOAD) {
//     //     initProduct(request.url, request.html)
//     //     .catch(e => {});
//     // }
// });

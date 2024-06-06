// import { createRoot } from 'react-dom/client';
// const div = document.createElement('div');
// document.body.appendChild(div);
//
// const root = createRoot(div);
// root.render(
//     <div>
//       Content from content/index.tsx
//     </div>
// );
//
// try {
//   console.log('content script loaded');
// } catch (e) {
//   console.error(e);
// }
console.log("document body: ", document.title, document.location.href, document.body)

const body = document.body.innerHTML

console.log("sending body...")
chrome.runtime.sendMessage({
  type: "test",
  title: document.title,
  url: document.location.href,
  body: body
});
// chrome.runtime.sendMessage({msg: "hello, World!"})
// console.log("body sent...")



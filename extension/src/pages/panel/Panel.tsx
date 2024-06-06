import React, {useEffect, useState} from 'react';
import '@pages/panel/Panel.css';
import HeaderNav from "@src/components/Header";
import BottomNav from "@src/components/BottomNav";
import Card from "@src/components/Card";

// const port = chrome.runtime.connect();

export default function Panel(): JSX.Element {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [body, setBody] = useState("")
  const [listenersInitialized, setListenersInitialized] = useState(false)

  // chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  //   setTitle(tabs[0].title)
  //   setUrl(tabs[0].url)
  // });

  // useEffect(() => {
  //   window.addEventListener('load', () => {
  //     (async () => {
  //       // @ts-ignore
  //       await chrome?.runtime?.sendMessage({
  //         type: "test",
  //         title: document.title,
  //         href: document.location.href
  //       });
  //     })();
  //   });
  // }, []);


  useEffect(() => {

    console.log("Setting up message listener...")
    if (!listenersInitialized) {
      setListenersInitialized(true)
      // @ts-ignore
      chrome?.runtime?.onMessage?.addListener(function (request, sender, sendResponse) {
        console.log("message received in panel: ", request)
        // const res = JSON.stringify(request.result)
        setTitle(request.title)
        setUrl(request.url)
        setBody(request.body)
        // console.log("message received: ", request)
        // setUrl(request.url)
        // if (request.type === MESSAGE_TYPE.PRODUCT_INFO_REQUEST && !productMetadata?.name) {
        //   setProductMetadata({
        //     name: request.name,
        //     imageUrl: request.imageUrl
        //   })
        //   sendResponse(true)
        // } else if (request.type === MESSAGE_TYPE.CHAT) {
        //   addToChatHistory(request.content, false, request.productSku)
        //   .catch(err => console.log(err));
        //   setShowBubbleAnimation(false)
        // } else if (request.type === MESSAGE_TYPE.TOOLBAR_BUTTON_CLICK) {
        //   handleOpen()
        // }
      });
    }
  }, [listenersInitialized])

  // useEffect(() => {
  //   window.addEventListener("message", (event) => {
  //     // We only accept messages from ourselves
  //     if (event.source !== window) {
  //       return;
  //     }
  //
  //     if (event.data.type && (event.data.type === "FROM_PAGE")) {
  //       console.log("Content script received: " + event.data.text);
  //       port.postMessage(event.data.text);
  //     }
  //   }, false);
  // }, []);
  // (async () => {
  //   // @ts-ignore
  //   await chrome?.runtime?.sendMessage({
  //     type: MESSAGE_TYPE.CHAT,
  //     query: rawMessage,
  //     productSku: productSku
  //   });
  // })()


  return (
    <div className="container mx-auto px-4 py-4">
      {/*<HeaderNav/>*/}
      <Card>
        <>
          <h1 className="text-2xl">Title</h1>
          <h5>{title}</h5>
          <h1>URL</h1>
          <h5>{url}</h5>
          <h1>body</h1>
          <p>{body}</p>
        </>
      </Card>
      <Card>
        <>
          <h1 className="text-2xl">Title</h1>
          <h5>{title}</h5>
          <h1>URL</h1>
          <h5>{url}</h5>
          <h1>body</h1>
          <p>{body}</p>
        </>
      </Card>

      <BottomNav/>
    </div>
  );
}

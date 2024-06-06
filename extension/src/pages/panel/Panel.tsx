import React, {useEffect, useState} from 'react';
import '@pages/panel/Panel.css';
import HeaderNav from "@src/components/Header";
import BottomNav from "@src/components/BottomNav";
import Card from "@src/components/Card";

// const port = chrome.runtime.connect();
export interface JD {
  title?: string
  company?: string
  salary?: string
  location?: string
}

const demoJd: JD = {
  title: "Product Configuration Software Developer",
  company: "ASI Group",
  salary: "$95,000 - $115,000",
  location: "Yonkers, NY, Eastanollee, GA, Burr Ridge, IL"
}

export default function Panel(): JSX.Element {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [body, setBody] = useState("")
  const [listenersInitialized, setListenersInitialized] = useState(false)


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

  return (
    <div className="container mx-auto px-4 py-4">
      {/*<HeaderNav/>*/}
      <Card>
        <>
          <h1 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">{demoJd.title} <span
              className="text-blue-600 dark:text-blue-500">at {demoJd.company}</span></h1>
          <h2 className="text-xl text-orange-400 font-extrabold dark:text-white">{demoJd.salary}</h2>
          <h3 className="text-sm text-gray-400 flex flex-row align-middle mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" color="grey" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5 align-middle">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span className="align-middle pl-1">{demoJd.location}</span>
          </h3>
          {/*<h5>{title}</h5>*/}
          {/*<h1>URL</h1>*/}
          {/*<h5>{url}</h5>*/}
          {/*<h1>body</h1>*/}
          {/*<p>{body}</p>*/}
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

import React, {useEffect, useState} from 'react';
import '@pages/panel/Panel.css';
import BottomNav from "@src/components/BottomNav";
import Assistant from "@src/components/Assistant";
import ResumeListView from "@src/components/ResumeListView";


// const port = chrome.runtime.connect();
export type TabType = "Assistant" | "Resumes" | "Profile"


export default function Panel(): JSX.Element {
  const [listenersInitialized, setListenersInitialized] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("Resumes")
  const [showResumeUpload, setShowResumeUpload] = useState(false)

  useEffect(() => {
    if (!listenersInitialized) {
      setListenersInitialized(true)
      // @ts-ignore
      chrome?.runtime?.onMessage?.addListener(function (request, sender, sendResponse) {
        // console.log("message received in panel: ", request)
        // const res = JSON.stringify(request.result)
        // setTitle(request.title)
        // setUrl(request.url)
        // setBody(request.body)
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

  const onChangeTab = (to: TabType) => {
    setActiveTab(to)
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-[660px]">
      { activeTab === "Assistant" && <Assistant/> }
      { activeTab === "Resumes" && <ResumeListView/> }
      <BottomNav
          activeTab={activeTab}
          showResumeUpload={showResumeUpload}
          onChangeTab={onChangeTab}
      />
    </div>
  );
}

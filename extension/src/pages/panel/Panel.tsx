import React, {useEffect, useState} from 'react';
import '@pages/panel/Panel.css';
import BottomNav from "@src/components/BottomNav";
import Assistant from "@src/components/Assistant";
import ResumeListView from "@src/components/ResumeListView";
import RequireLogin from "@src/components/RequireLogin";
import {PdfApi, ResumeApi} from "@src/codegn";
import {headerConfig} from "@src/utils/headerConfig";
import {DEBUG, ERROR} from "@src/utils/utils";
import {useAuthContext} from "@src/context/AuthContext";


export type TabType = "Assistant" | "Resumes" | "Profile"


export default function Panel(): JSX.Element {
  const [listenersInitialized, setListenersInitialized] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("Assistant")
  const [showResumeUpload, setShowResumeUpload] = useState(false)
  const {authUser} = useAuthContext()

  useEffect(() => {
    if (authUser) {
      console.log("calling base resume...: ")
      new ResumeApi(headerConfig(authUser.token as string)).hasBaseResume()
      .then(response => {
        DEBUG("Has base resume", response.data.value)
        setShowResumeUpload(!(response.data.value === true))
      })
      .catch(e => {
        ERROR('Error calling hasBaseResume :', e);
      })
    }

  }, [authUser, showResumeUpload]);

  useEffect(() => {
    if (!listenersInitialized) {
      setListenersInitialized(true)
      // @ts-ignore
      if (import.meta.env.MODE === "production") {
        chrome?.runtime?.onMessage?.addListener(function (request, sender, sendResponse) {
          console.log("new message received in the panel: ", request)
          // if  (request.type === "Token") {
          //   console.log("Token received: ", )
          // }
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
    }
  }, [listenersInitialized])

  const onChangeTab = (to: TabType) => {
    setActiveTab(to)
  }

  const onResumeUploadSuccess = () => {
    setShowResumeUpload(false)
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-[660px]">
        { activeTab === "Assistant" && <Assistant/> }
        { activeTab === "Resumes" && <RequireLogin><ResumeListView/></RequireLogin> }
        <BottomNav
            activeTab={activeTab}
            showResumeUpload={showResumeUpload}
            onChangeTab={onChangeTab}
            onResumeUploadSuccess={onResumeUploadSuccess}
        />
    </div>
  );
}

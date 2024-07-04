import React, {useEffect, useState} from 'react';
import '@pages/panel/Panel.css';
import BottomNav from "@src/components/BottomNav";
import Assistant from "@src/components/Assistant";
import ResumeListView from "@src/components/ResumeListView";
import RequireLogin from "@src/components/RequireLogin";
import {ParseJobPostRequest, PdfApi, ResumeApi} from "@src/codegen";
import {DEBUG, ERROR, headerConfig} from "@src/utils/utils";
import {useAuthContext} from "@src/context/AuthContext";


export type TabType = "Assistant" | "Resumes" | "Profile"


export default function Panel(): JSX.Element {
  const [activeTab, setActiveTab] = useState<TabType>("Assistant")
  const [showResumeUpload, setShowResumeUpload] = useState(false)
  const [showGenerateResume, setShowGenerateResume] = useState(false)
  const [listenersInitialized, setListenersInitialized] = useState(false)
  const [parsingJobPost, setParsingJobPost] = useState(false)
  const {authUser} = useAuthContext()

  useEffect(() => {
    if (authUser) {
      console.log("calling base resume...: ")
      new ResumeApi(headerConfig(authUser.token as string)).hasBaseResume()
      .then(response => {
        DEBUG("Has base resume", response.data.value)
        console.log("!(response.data.value === true): ", !(response.data.value === true))
        const res = response.data.value === true
        setShowResumeUpload(!res)
        setShowGenerateResume(res)
      })
      .catch(e => {
        ERROR('Error calling hasBaseResume :', e);
      })
    } else {
      console.log("in panel - authUser undefined")
    }

  }, [authUser, showResumeUpload]);

  // useEffect(() => {
  //   if (!listenersInitialized) {
  //     setListenersInitialized(true)
  //     // @ts-ignore
  //     if (import.meta.env.MODE === "production") {
  //       chrome?.runtime?.onMessage?.addListener(function (request, sender, sendResponse) {
  //         console.log("jd received....")
  //         if  (request.type === "jd") {
  //           onParseJobPost({
  //             job_board: request.jobBoard,
  //             job_id: request.jobId,
  //             job_description: request.jd
  //           })
  //         }
  //       });
  //     }
  //   }
  // }, [listenersInitialized])

  // const onParseJobPost = (jd: ParseJobPostRequest) => {
  //   console.log("calling parsJobPost: ", jd)
  //   if (authUser) {
  //     console.log("in if condition")
  //     new ResumeApi(headerConfig(authUser.token as string)).parsJobPost(jd)
  //     .then(response => {
  //       DEBUG("Job has has been parsed", response.data)
  //       setParsingJobPost(false)
  //     })
  //     .catch(e => {
  //       ERROR('Error calling parsJobPost :', e);
  //     })
  //   }
  // }

  const onChangeTab = (to: TabType) => {
    setActiveTab(to)
  }

  const onResumeUploadSuccess = () => {
    setShowResumeUpload(false)
    setShowGenerateResume(true)
  }

  console.log("showResumeUpload: ", showResumeUpload)

  return (
    <div className="container mx-auto px-4 py-4 max-w-[660px]">
        { activeTab === "Assistant" && <Assistant
            parsingJobPost={parsingJobPost}
            showGenerateResume={showGenerateResume}
            onShowResumeGenerate={() => setShowGenerateResume(true)}/>
        }
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

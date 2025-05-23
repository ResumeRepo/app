import React, {useEffect, useState} from 'react';
import SectionHeader from "@src/components/SectionHeader";
import {AssistantProps} from "@src/components/utils/types";
import {useAuthContext} from "@src/context/AuthContext";
import {Accordion} from "flowbite-react";
import CircularLoader from "@src/components/Loader";
import { BsStars } from "react-icons/bs";
import {JobPost, ParseJobPostRequest, ResumeApi} from "@src/codegen";
import {DEBUG, ERROR, headerConfig} from "@src/utils/utils";
import {handlePage} from "@pages/content/pageHandler";

let jobId = ""

export default function Assistant(props: AssistantProps): JSX.Element {
  const [resumeGenerationInProgress, setResumeGenerationInProgress] = useState(false)
  const [parsingJobPost, setParsingJobPost] = useState(true)
  const [listenersInitialized, setListenersInitialized] = useState(false)
  const [jobPost, setJobPost] = useState<JobPost | undefined>(undefined)
  const {authUser} = useAuthContext()

  const onGenerateResume = () => {
    setResumeGenerationInProgress(true)
    if (authUser) {
      new ResumeApi(headerConfig(authUser.token as string)).generateResume({
        job_id: "123",
        instructions: "Please generate a nice resume for me"
      })
      .then(response => {
        DEBUG("Resume has been generated", response.data)
        setResumeGenerationInProgress(false)
      })
      .catch(e => {
        setResumeGenerationInProgress(false)
        ERROR('Error calling generateResume :', e);
      })
    }
  }

  let apiCalled = false
  const onParseJobPost = (jd: ParseJobPostRequest) => {
    if (authUser && !apiCalled) {
      apiCalled = true
      new ResumeApi(headerConfig(authUser.token as string)).parsJobPost(jd)
      .then(response => {
        DEBUG("Job has been parsed", response.data)
        setJobPost(response.data)
        setParsingJobPost(false)
      })
      .catch(e => {
        ERROR('Error calling parsJobPost :', e);
      })
    } else {
      DEBUG("onParseJobPost: user not found")
    }
  }

  useEffect(() => {
    // TODO: get generated resume by job_id
  }, []);

  useEffect(() => {
    if (!listenersInitialized) {
      setListenersInitialized(true)
      // @ts-ignore
      if (import.meta.env.MODE === "production") {
        chrome?.runtime?.onMessage?.addListener(function (request, sender, sendResponse) {
          if  (request.type === "jd" && request.job_id !== jobId) {
            jobId = request.job_id
            DEBUG("JD received: ", request as ParseJobPostRequest)
            onParseJobPost(request as ParseJobPostRequest)
          }
        });
      } else {
        window.addEventListener("message", message => {
          if  (message.data.type === "jd" && message.data.job_id !== jobId) {
            jobId = message.data.job_id
            DEBUG("JD received: ", message.data as ParseJobPostRequest)
            onParseJobPost(message.data as ParseJobPostRequest)
          }
        })
      }
    }
  }, [listenersInitialized])

  useEffect(() => {
   if (import.meta.env.MODE === "development") {
     const url = "https://www.linkedin.com/jobs/view/3907954401/?alternateChannel=search&refId=VAvegUj%2BXaNu9X%2F5EEW0Sg%3D%3D&trackingId=weP2LJ6jxpo3oKouycly7w%3D%3D&trk=d_flagship3_search_srp_jobs"
     handlePage(url)
   }

  }, []);

  return (
    <div className="mb-40">
      <Accordion className="mb-8" alwaysOpen={true}>
        <Accordion.Panel>
          <Accordion.Title className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3">
            <SectionHeader title={"Role"}/>
          </Accordion.Title>
          <Accordion.Content>
            <>
              <h1 className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white">{jobPost?.job_title} <span
                  className="text-blue-600 dark:text-blue-500">at {jobPost?.company_name}</span></h1>
              <h2 className="text-xl text-orange-400 font-extrabold dark:text-white">{jobPost?.salary}</h2>
              <h3 className="text-sm text-gray-400 flex flex-row align-middle mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" color="grey" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5 align-middle">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="align-middle pl-1">{jobPost?.location}</span>
              </h3>
            </>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3">
            <SectionHeader title={"Company"}/>
          </Accordion.Title>
          <Accordion.Content>
            <>
              <div className="px-1 py-2">
                <span className="align-middle text-gray-500">{jobPost?.company_info}</span>
              </div>
            </>
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3">
            <SectionHeader title={"Requirements"}/>
          </Accordion.Title>
          <Accordion.Content>
            <>
              <div className="px-1 py-2">
                <ul className="max-w-md space-y-1 text-gray-500 list-inside">
                  {jobPost?.job_description?.map((desc, index) => {
                    if (desc.is_match) {
                      return (
                          <li className="flex items-center text-left"  key={`role-${index}`}>
                            <>
                              <svg className="w-3.5 h-3.5 me-2 mt-1 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                              </svg>
                              <span className="text-lg">{desc.text}</span>
                            </>
                          </li>
                      )
                    } else {
                      return (
                          <li className="flex items-cente text-left"  key={`role-${index}`}>
                            <>
                              <svg className="w-3.5 h-3.5 me-2 mt-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                              </svg>
                              <span className="text-lg">{desc.text}</span>
                            </>
                          </li>
                      )}
                  })}
                </ul>
              </div>
            </>
          </Accordion.Content>
        </Accordion.Panel>

      </Accordion>
      <Accordion alwaysOpen={true}>
        <Accordion.Panel>
          <Accordion.Title className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3">
            <SectionHeader title={"Customize your Resume for this role"}/>
          </Accordion.Title>
          <Accordion.Content>
            <>
              <div className="px-1 py-2">
                <div className="p-2 rounded-md">
                  <div className="flex items-center px-3 py-2 rounded-lg">
                    <textarea rows={2} className="block mx-4 p-2.5 w-full py-4 text-md  text-blue-600 font-extrabold leading-none tracking-tight dark:text-white  bg-blue-50 rounded-lg border border-blue-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Optional instructions, e.g. emphasize healthcare industry experience"></textarea>
                  </div>
                  <div className="text-center w-full mb-2 mt-6">
                    {props.showGenerateResume ?
                    <button type="button" className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onGenerateResume}>
                      <div className="mr-2 inline-flex">
                        {resumeGenerationInProgress ? <CircularLoader/> : <BsStars size={24} />}
                      </div>
                      <span className="text-md font-extrabold text-white">Generate</span>
                    </button> : <>
                          <span className="text-md font-extrabold text-red-500">Please upload your resume to customize it for this role</span>
                        </>
                    }


                  </div>
                </div>
              </div>
            </>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

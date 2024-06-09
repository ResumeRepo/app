import React, {useEffect, useState} from 'react';
import '@pages/panel/Panel.css';
import BottomNav from "@src/components/BottomNav";
import Card from "@src/components/Card";
import SectionHeader from "@src/components/SectionHeader";
import document from '@assets/img/document.png';
import sparkle from "@assets/img/sparkle.png";


// const port = chrome.runtime.connect();
export interface JD {
  title?: string
  company?: string
  salary?: string
  location?: string
}

export interface CompanyInfo {
  name?: string
  description?: string
}

export interface Role {
  text?: string,
  isMatch?: boolean
}
const roles: Role[] = [
  { text: "Assist with development of online CPQ system", isMatch: true },
  { text: "Configure, quote, and place orders with ASI Group companies", isMatch: true },
  { text: "Understand products and how they are configured", isMatch: true },
  { text: "Model logic and algorithms using Microsoft Excel", isMatch: false },
  { text: "Document logic, procedures, and algorithms", isMatch: true },
  { text: "Write rules within Infor Design Studio environment", isMatch: false }
]

const demoJd: JD = {
  title: "Product Configuration Software Developer",
  company: "ASI Group",
  salary: "$95,000 - $115,000",
  location: "Yonkers, NY, Eastanollee, GA, Burr Ridge, IL"
}

const companyInfo: CompanyInfo = {
  name: "ASI Group",
  description: "The ASI Group, founded over 50 years ago, operates in various countries, serving the financial sector, manufacturing, construction, and others. It provides technological solutions and underwater inspection, repair, and maintenance services. Employees highlight the company's good team and helpful HR department."
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
        </>
      </Card>
      <Card>
        <>
          <SectionHeader title={"Company"}/>
          <div className="px-1 py-2">
          <span className="align-middle text-gray-500 text-sm">{companyInfo.description}</span>
          </div>
        </>
      </Card>
      <Card>
        <>
          <SectionHeader title={"About the Role"}/>
          <div className="px-1 py-2">
          <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {roles?.map((role, index) => {
              if (role.isMatch) {
                return (
                    <li className="flex items-center"  key={index}>
                      <>

                        <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        {role.text}
                      </>
                    </li>
                )
              } else {
                return (
                    <li className="flex items-center"  key={index}>
                      <>
                        <svg className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        {role.text}
                      </>
                    </li>
                )}
            })}
          </ul>
          </div>
        </>
      </Card>
      <Card>
        <>
          <SectionHeader title={"Customize your Resume"}/>
          <div className="px-1 py-4">
            <div className="flex-row inline-flex">
              <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                <img src={document} className="w-12" alt="NextRole" />
                <span className="sr-only">Fire icon</span>
              </div>
              <div className="ml-2">
                <h3 className="text-md font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Tailor your Resume</h3>
                <span className="text-xs text-gray-500">Personalize your resume for this role</span>
              </div>

            </div>
            <div className="p-4 mt-4 bg-blue-50 rounded-md">

              <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400">
                <li>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={sparkle} className="w-5" alt="NextRole AI Resume Helper" />
                    <button><h3 className="text-blue-600 font-extrabold leading-none tracking-tight dark:text-white">Individual configuration</h3></button>
                  </div>
                  <hr className="w-full border-t-0 bg-neutral-200 h-[1px] mt-4" />
                </li>
                <li>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={sparkle} className="w-5" alt="NextRole AI Resume Helper" />
                    <button><h3 className="text-blue-600 font-extrabold leading-none tracking-tight dark:text-white">Individual configuration</h3></button>
                  </div>
                  <hr className="w-full border-t-0 bg-neutral-200 h-[1px] mt-4" />
                </li>
                <li>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={sparkle} className="w-5" alt="NextRole AI Resume Helper" />
                    <button><h3 className="text-blue-600 font-extrabold leading-none tracking-tight dark:text-white">Individual configuration</h3></button>
                  </div>
                  {/*<hr className="w-full border-t-0 bg-neutral-200 h-[1px] mt-4" />*/}
                </li>
              </ul>

            </div>
          </div>

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

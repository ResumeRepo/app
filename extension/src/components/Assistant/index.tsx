import React, {useEffect, useState} from 'react';
import Card from "@src/components/Card";
import SectionHeader from "@src/components/SectionHeader";
import sparkle from "@assets/img/sparkle.png";


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

const generateOptions: string[] = [
    "Emphasizes healthcare industry experience",
    "Specific to healthcare industry",
    "Industry-specific terminology"
]


const companyInfo: CompanyInfo = {
  name: "ASI Group",
  description: "The ASI Group, founded over 50 years ago, operates in various countries, serving the financial sector, manufacturing, construction, and others. It provides technological solutions and underwater inspection, repair, and maintenance services. Employees highlight the company's good team and helpful HR department."
}

export default function Assistant(): JSX.Element {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [body, setBody] = useState("")


  return (
    <div className="mb-40">
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
          <span className="align-middle text-gray-500">{companyInfo.description}</span>
          </div>
        </>
      </Card>
      <Card>
        <>
          <SectionHeader title={"About the Role"}/>
          <div className="px-1 py-2">
          <ul className="max-w-md space-y-1 text-gray-500 list-inside">
            {roles?.map((role, index) => {
              if (role.isMatch) {
                return (
                    <li className="flex items-center text-left"  key={`role-${index}`}>
                      <>
                        <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        <span className="text-lg">{role.text}</span>
                      </>
                    </li>
                )
              } else {
                return (
                    <li className="flex items-cente text-leftr"  key={`role-${index}`}>
                      <>
                        <svg className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        <span className="text-lg">{role.text}</span>
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
            {/*<div className="flex-row inline-flex">*/}
            {/*  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">*/}
            {/*    <img src={document} className="w-12" alt="NextRole" />*/}
            {/*    <span className="sr-only">Fire icon</span>*/}
            {/*  </div>*/}
            {/*  <div className="ml-2">*/}
            {/*    <h3 className="text-md font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Tailor your Resume</h3>*/}
            {/*    <span className="text-xs text-gray-500">Personalize your resume for this role</span>*/}
            {/*  </div>*/}

            {/*</div>*/}
            <div className="p-4 mt-4 bg-blue-50 rounded-md">
              <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-left
              ">
                {
                  generateOptions.map((text, index) => {
                    return (
                        <li key={`gen-option-${index}`} className="cursor-pointer">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={sparkle} className="w-5" alt="NextRole AI Resume Helper" />
                            <span className="text-lg px-[2px] text-blue-600 font-extrabold leading-none tracking-tight dark:text-white">{text}</span>
                          </div>
                          {/*{(index < generateOptions.length - 1) && <hr className="w-full border-t-0 bg-neutral-200 h-[1px] mt-4" /> }*/}
                          <hr className="w-full border-t-0 bg-neutral-200 h-[1px] mt-4" />

                        </li>
                    )
                  })
                }
                <li className="cursor-pointer">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={sparkle} className="w-5" alt="NextRole AI Resume Helper" />
                    <span className="text-lg px-[2px] text-blue-600 font-extrabold leading-none tracking-tight dark:text-white">Emphasize all relevant experiences</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-full text-center p-4">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
              </svg>
              <span className="text-md font-extrabold text-blue-600">Generating..</span>
            </div>

            <div className="text-center w-full mb-2 mt-2 ">

              {/*<button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg me-2 mb-2 dark:focus:ring-yellow-900 text-sm px-5 py-2.5 text-center inline-flex items-center ">*/}

                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 text-center inline-flex items-center">


                {/*<button type="button" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">*/}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>


                <span className="font-extrabold pl-1">Resume Ready</span>
              </button>
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
    </div>
  );
}

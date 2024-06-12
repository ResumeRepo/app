import React, {useEffect, useRef, useState} from 'react';
import '@pages/panel/Panel.css';
import Card from "@src/components/Card";
import {getFormattedDate} from "@src/components/utils/utils";
import {ResumeSingleViewProps} from "@src/components/utils/types";
import 'react-multi-carousel/lib/styles.css';
import TemplateCarousel from "@src/components/Carousel";
import Preview from "@src/components/ResumePreview/Preview";
import WinPrint from "@src/components/ResumePreview/WinPrint";
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import axios from "axios";

export default function ResumeSingleView(props: ResumeSingleViewProps): JSX.Element {
  // const [mode, setMode] = useState<ResumeMode>("List")
  // const [props.resumeId, setprops.resumeId] = useState<string | undefined>(undefined)
  const [templateId, setTemplateId] = useState("")
  const [isLoading, setIsLoading] = useState(false); // Track request state
  const [errorMessage, setErrorMessage] = useState(null); // Store error message
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const componentRef = useRef(null);

  const baseUrl = "http://localhost:4000"
  const endpoint = "/convert-to-pdf"
  const savePdf = (html: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    setDownloadUrl(null); //
    console.log("debug 1: ", typeof html)
    let base64EncodedHtml
    try {
      const utf8EncodedHtml = new TextEncoder().encode(html);
      base64EncodedHtml = btoa(String.fromCharCode(...utf8EncodedHtml));
    } catch (e) {
      console.log("error...: ", e)
    }
    const data = {
      format: 'Letter',
      html: base64EncodedHtml,
    };

    console.log("debug 2")
    // const response = await axios.post(`${baseUrl}${endpoint}`, data, {
    //   responseType: 'blob', // Specify response type as blob
    // });
    // console.log('PDF generated successfully!');
    //
    // const blob = new Blob([response.data], { type: 'application/pdf' }); // Create Blob
    // const downloadUrl = URL.createObjectURL(blob); // Create temporary URL
    // setDownloadUrl(downloadUrl);



    console.log("making axios request....")
    axios.post(`${baseUrl}${endpoint}`, data, {
      responseType: 'blob',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      console.log('PDF generated successfully!');
      const blob = new Blob([response.data], { type: 'application/pdf' }); // Create Blob
      const downloadUrl = URL.createObjectURL(blob); // Create temporary URL
      setDownloadUrl(downloadUrl);
    })
    .catch(error => {
      console.error('Error converting HTML to PDF:', error);
    });






    // const html = componentRef.current
    // const html = document.getElementById("resume-preview-0")
    // console.log(html)
    // const doc = new jsPDF({
    //   format: "letter",
    //   orientation: "p"
    // })
    // doc.html(html, {
    //   callback: function (_doc) {
    //     // console.log(html)
    //     _doc.save("demo.pdf")
    //   }
    // })
  }

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    // onBeforePrint: () => console.log("before printing..."),
    // onAfterPrint: () => console.log("after printing..."),

    copyStyles: true,
    print: async (printIframe: HTMLIFrameElement) => {
      const html = printIframe.contentDocument.getElementsByTagName("html")[0]
      // console.log(html)
      savePdf(`<!DOCTYPE html>
<html lang="en">${html.innerHTML}</html>\n`)
    },
    removeAfterPrint: true,
  });
  // console.log(componentRef.current)

  // const handlePrint = useReactToPrint({
  //   documentTitle: "Print This Document",
  //   onBeforePrint: () => console.log("before printing..."),
  //   onAfterPrint: () => console.log("after printing..."),
  //   copyStyles: false,
  //   print: async (printIframe: HTMLIFrameElement) => {
  //     const doc = printIframe.contentDocument
  //     savePdf(doc.getElementsByTagName("html")[0])
  //   },
  //   removeAfterPrint: true,
  // });



  const onTemplateSelect = (templateId: string) => {
    setTemplateId(templateId)
  }

  return (
    <div className="mb-40">
      {
        props.mode === "View" ? (
            <div>
              <div className="exclude-print w-full justify-end text-right flex mb-2">
                <button onClick={() => props.onResumeSelect("List", undefined)}>
                  <span className="inline-flex items-center justify-center w-10 h-10 me-2 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>
                  </span>
                </button>
              </div>
              <Card>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                    <img className="w-14 h-14 rounded-md" src={props.resume.avatar} alt={props.resume.title}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {props.resume.company}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {props.resume.title} | {props.resume.location}
                    </p>
                    <p className="text-xs text-gray-400">{getFormattedDate(props.resume.createdAt)}</p>
                  </div>
                  {/*<div className="flex flex-col items-center text-base font-semibold text-gray-900 dark:text-white">*/}
                  {/*  <span className="w-20 text-center bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-2 cursor-pointer" onClick={() => onResumeSelect("View", props.resume.id)}>View</span>*/}
                  {/*  <span className="w-20 text-center bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 mb-2 cursor-pointer" onClick={() => onResumeSelect("Edit", props.resume.id)}>Edit</span>*/}

                  {/*  <span className="w-20 text-center bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 mb-2 cursor-pointer" onClick={() => onResumeSelect("Download", props.resume.id)}>Download</span>*/}
                  {/*</div>*/}
                </div>
              </Card>
              <Card>
                <TemplateCarousel/>
              </Card>
              <div className="exclude-print w-full flex justify-end">
                <WinPrint onClick={() => handlePrint(null, () => componentRef.current)}/>
                {downloadUrl && <a href={downloadUrl} download="converted.pdf">
                  Download PDF
                </a>}
              </div>
              <div className="resume-preview-outer" id="resume-preview-0">
                  <Preview ref={componentRef}/>
              </div>
            </div>
        ) : <></>
      }
    </div>
  );
}

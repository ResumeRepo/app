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
import html2pdf from 'html2pdf.js'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function ResumeSingleView(props: ResumeSingleViewProps): JSX.Element {
  // const [mode, setMode] = useState<ResumeMode>("List")
  // const [props.resumeId, setprops.resumeId] = useState<string | undefined>(undefined)
  const [templateId, setTemplateId] = useState("")

  const componentRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });


  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   print: async (printIframe) => {
  //     const document = printIframe.contentDocument;
  //     if (document) {
  //       const html = document.getElementById("resume-preview-0");
  //       const options = {
  //         margin: 0,
  //         filename: "the-joys-of-buying-over-building.pdf",
  //       };
  //       const exporter = new html2pdf.Html2Pdf(html, options);
  //       await exporter.getPdf(options);
  //     }
  //   },
  // });

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   print: async (printIframe) => {
  //     const document = printIframe.contentDocument;
  //     if (document) {
  //       const html =  document.getElementById("resume-preview-0");
  //       const options = {
  //         margin: 0,
  //         filename: "the-joys-of-buying-over-building.pdf",
  //         jdPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  //       };
  //       const exporter = html2pdf.set new Html2Pdf(html, options);
  //       await exporter.getPdf(options);
  //     }
  //   },
  // });

  // const handlePrint = () => {
  //   const element = componentRef.current;
  //   const opt = {
  //     margin:       1,
  //     filename:     'myDocument.pdf',
  //     image:        { type: 'jpeg', quality: 0.98 },
  //     html2canvas:  { scale: 2 },
  //     jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  //   };
  //
  //   html2pdf().from(element).set(opt).save();
  // };


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
                {/*<WinPrint/>*/}
                {/*<button onClick={handlePrint}>Print</button>*/}
                <button onClick={() => handlePrint(null, () => componentRef.current)}>Print</button>
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

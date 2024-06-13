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
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
// pdfjs.GlobalWorkerOptions.workerSrc= "/pdf.worker.mjs";
// import * as pdfjs from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjs.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.js"
import { Document, Page } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs"

    // `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import * as PDFJS from "pdfjs-dist/build/pdf";
// import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// window.PDFJS = PDFJS;
// import { Viewer } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import axios from "axios";
// import { EmbedPDF } from "@simplepdf/react-embed-pdf";
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Create new plugin instance
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     // "/js/pdf.worker.min.js",
//     "hello-world.js",
//     import.meta.url
// ).toString();


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.js',
    import.meta.url,
).toString();

export default function ResumeSingleView(props: ResumeSingleViewProps): JSX.Element {
  // const [mode, setMode] = useState<ResumeMode>("List")
  // const [props.resumeId, setprops.resumeId] = useState<string | undefined>(undefined)
  const [templateId, setTemplateId] = useState("")
  const [isLoading, setIsLoading] = useState(false); // Track request state
  const [errorMessage, setErrorMessage] = useState(null); // Store error message
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const componentRef = useRef(null);
  const [pdfFound, setPdfFound] = useState(false)
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdfjs.GlobalWorkerOptions.workerSrc = "hello.js"
  // console.log("pdfjs.GlobalWorkerOptions.workerSrc: ", pdfjs.GlobalWorkerOptions.workerSrc)

  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //     "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js",
  //     // 'pdfjs-dist/build/pdf.worker.min.mjs',
  //     import.meta.url,
  // ).toString();

  // React.useEffect(() => {
  //   const configureWorker = async () => {
  //     pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //         "/js/pdf.worker.min.js",
  //         // "pdfjs-dist/build/pdf.worker.js",
  //         import.meta.url
  //     ).toString();
  //
  //     // Replace with your actual blob URL
  //     // const blobUrl = 'your-blob-url-here';
  //     // setPdfUrl(blobUrl);
  //   };
  //
  //   (async () => {
  //     await configureWorker();
  //   })()
  // }, []);

  const baseUrl = "http://localhost:4000"
  const endpoint = "/convert-to-pdf"
  const savePdf = (html: any) => {
    setIsLoading(true);
    setErrorMessage(null);
    setDownloadUrl(null);

    const utf8EncodedHtml = new TextEncoder().encode(html);
    const base64EncodedHtml = btoa(String.fromCharCode(...utf8EncodedHtml));
    const data = {
      format: 'Letter',
      html: base64EncodedHtml,
    };

    axios.post(`${baseUrl}${endpoint}`, data, {
      responseType: 'blob',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' }); // Create Blob
      const downloadUrl = URL.createObjectURL(blob); // Create temporary URL

      // const downloadUrl =  window.URL.createObjectURL(blob)
      setDownloadUrl(downloadUrl);
      console.log("download url: ", downloadUrl)
      setPdfFound(true)
      const iframe = document.querySelector("iframe");
      if (iframe?.src) iframe.src = downloadUrl;
    })
    .catch(error => {
      console.error('Error converting HTML to PDF:', error);
    });
  }

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    copyStyles: true,
    print: async (printIframe: HTMLIFrameElement) => {
      const html = printIframe.contentDocument.getElementsByTagName("html")[0]
      savePdf(`<!DOCTYPE html>
<html lang="en">${html.innerHTML}</html>\n`)
    },
    removeAfterPrint: true,
  });

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
                {/*{downloadUrl && <a href={downloadUrl} download="converted.pdf">*/}
                {/*  Download PDF*/}
                {/*</a>}*/}
              </div>
              {/*<iframe src="" width={816} height={1051}/>*/}





              {/*{downloadUrl &&  <>*/}
              {/*<embed src={downloadUrl} width="auto" height="auto"*/}
              {/*       type="application/pdf"/>*/}
              {/*  <EmbedPDF*/}
              {/*      className="pdf-viewer"*/}
              {/*      mode="inline"*/}
              {/*      style={{ width: 900, height: 800 }}*/}
              {/*      documentURL={downloadUrl}*/}
              {/*  />*/}


                {/*<object data={downloadUrl} type="application/pdf" width="100%" height="1051"/>*/}
                {/*  <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>*/}
                {/*</object>*/}

                {/*<Document file={downloadUrl}>*/}
                {/*  <Page>1</Page>*/}
                {/*</Document>*/}
                <Document file={downloadUrl}>
                  <Page pageNumber={1} />
                </Document>

              {/*</>*/}
              {/*}*/}


              <div className="resume-preview-outer" id="resume-preview-0">
                {!pdfFound &&  <Preview ref={componentRef}/> }
              </div>
            </div>
        ) : <></>
      }
    </div>
  );
}

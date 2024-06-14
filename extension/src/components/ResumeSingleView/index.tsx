import React, {useEffect, useRef, useState} from 'react';
import '@pages/panel/Panel.css';
import Card from "@src/components/Card";
import {exportCss, getFormattedDate} from "@src/components/utils/utils";
import {ResumeSingleViewProps} from "@src/components/utils/types";
import 'react-multi-carousel/lib/styles.css';
import TemplateCarousel from "@src/components/Carousel";
import Preview from "@src/components/ResumePreview/Preview";
import WinPrint from "@src/components/ResumePreview/WinPrint";
import { useReactToPrint } from 'react-to-print';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf';
import axios from "axios";
import { saveAs } from 'file-saver';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.js',
    import.meta.url,
).toString();

export default function ResumeSingleView(props: ResumeSingleViewProps): JSX.Element {
  const [templateId, setTemplateId] = useState("1")
  // const [isLoading, setIsLoading] = useState(false); // Track request state
  const [errorMessage, setErrorMessage] = useState(null); // Store error message
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const componentRef = useRef(null);
  const [pdfFound, setPdfFound] = useState(false)
  const [generationInProgress, setGenerationInProgress] = useState(false)

  const baseUrl = "http://localhost:4000"
  const endpoint = "/convert-to-pdf"
  const fileName = "Resume.pdf"



  const generatePdf = (html: any) => {
    if (generationInProgress) return;
    console.log("generationInProgress...")
    setGenerationInProgress(true);
    setErrorMessage(null);
    setDownloadUrl(null);

    const utf8EncodedHtml = new TextEncoder().encode(html);
    const base64EncodedHtml = btoa(String.fromCharCode(...utf8EncodedHtml));
    const data = {
      format: 'A4',
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

  const renderPdf = useReactToPrint({
    documentTitle: "Resume",
    copyStyles: true,
    print: async (printIframe: HTMLIFrameElement) => {
      const html = printIframe.contentDocument.getElementsByTagName("html")[0]
      exportCss(1, html)
      generatePdf(`<!DOCTYPE html>
<html lang="en">${html.innerHTML}</html>\n`)
    },
    removeAfterPrint: true,
    suppressErrors: true,
  });

  const onTemplateSelect = (templateId: string) => {
    setTemplateId(templateId)
  }

  useEffect(() => {
    if (!generationInProgress) {
      console.log("Env: ", import.meta.env.MODE)
      renderPdf(null, () => componentRef.current)
    }
    // renderPdf()
  }, [componentRef.current]);

  const savePdf = () => {
    if (downloadUrl) {
      saveAs(downloadUrl, fileName)
    }
  }

  const getStyle = () => {
    return `
      .react-pdf__Document {
      overflow: auto !important;
    }
    .react-pdf__Page__textContent {
      margin: 0 auto;
      border: 1px solid #d1d1d1 !important;
    }
    .react-pdf__Page__canvas {
      margin: 0 auto;
    }`
  }

  const loadingProgress = () => {
    return <div className="text-center mt-10 mb-4">
      <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  }

  return (
      <>
        <style
            dangerouslySetInnerHTML={{
              __html: getStyle(),
            }}
        />
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


              <div className="resume-preview-outer">
                { downloadUrl ?
                    <>
                      <div className="flex justify-end w-full">
                        <WinPrint onClick={savePdf}/>
                      </div>
                      <Document
                          loading={loadingProgress()}
                          file={downloadUrl}
                          onLoadProgress={() => setPdfFound(false)}
                          onLoadSuccess={() => setPdfFound(true)}
                          onLoadError={() => setPdfFound(false)}
                      >
                        <Page pageNumber={1}/>
                      </Document>

                    </>:
                    <>{loadingProgress()}</>
                }
                {!downloadUrl && <Preview ref={componentRef}/> }
              </div>
            </div>
        ) : <></>
      }
    </div>
        </>
  );
}

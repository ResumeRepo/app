import React, {useEffect, useRef, useState} from 'react';
import '@pages/panel/Panel.css';
import Card from "@src/components/Card";
import {exportCss, getFormattedDate} from "@src/components/utils/utils";
import {ResumeSingleViewProps} from "@src/components/utils/types";
import TemplateCarousel from "@src/components/Carousel";
import Preview from "@src/components/ResumePreview/Preview";
import WinPrint from "@src/components/ResumePreview/WinPrint";
import { useReactToPrint } from 'react-to-print';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf';
import { saveAs } from 'file-saver';
import {useAuthContext} from "@src/context/AuthContext";
import {PdfApi} from "@src/codegen";
import {DEBUG, ERROR, headerConfig} from "@src/utils/utils";
import CircularLoader from "@src/components/Loader";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.js',
    import.meta.url,
).toString();

export default function ResumeSingleView(props: ResumeSingleViewProps): JSX.Element {
  const [templateId, setTemplateId] = useState("1")
  const [showHtmlPreview, setShowHtmlPreview] = useState(true);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const componentRef = useRef(null);
  const [generationInProgress, setGenerationInProgress] = useState(false)
  const {authUser} = useAuthContext()

  const fileName = "Resume.pdf"

  const generatePdf = (html: any) => {
    setGenerationInProgress(true);
    setDownloadUrl(null);

    const config = headerConfig(authUser?.token as string)
    config.baseOptions["responseType"] = "blob"
    new PdfApi(config).convertToPdf({
      format: "Letter",
      env: import.meta.env.MODE,
      template_id: templateId,
      data: html,
      debug: true
    }).then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = URL.createObjectURL(blob);
      setDownloadUrl(downloadUrl);
      setGenerationInProgress(false)
      const iframe = document.querySelector("iframe");
      if (iframe?.src) iframe.src = downloadUrl;
    }).catch(e => {
      setGenerationInProgress(false)
      ERROR('Error converting HTML to PDF:', e);
    })
  }

  const renderPdf = useReactToPrint({
    documentTitle: "Resume",
    copyStyles: true,
    print: async (printIframe: HTMLIFrameElement) => {
      const html = printIframe.contentDocument?.getElementsByTagName("html")[0]
      if (html) {
        exportCss(templateId, html, authUser?.token as string)
        generatePdf(`<!DOCTYPE html>
<html lang="en">${html.innerHTML}</html>\n`)
      }
    },
    removeAfterPrint: true,
    suppressErrors: true,
  });

  const onTemplateSelect = (templateId: string) => {
    DEBUG("New template selected: ", templateId)
    setTemplateId(templateId)
    setShowHtmlPreview(true)
  }

  useEffect(() => {
    if (!generationInProgress) {
      renderPdf(null, () => componentRef.current)
    }
  }, [componentRef.current]);

  const savePdf = () => {
    if (downloadUrl) {
      saveAs(downloadUrl, fileName)
    }
  }

  useEffect(() => {
    renderPdf(null, () => componentRef.current)
  }, [templateId]);

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
      <CircularLoader/>
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
                <TemplateCarousel
                    canSelect={!generationInProgress}
                    selectedId={templateId}
                    onTemplateSelect={onTemplateSelect}
                />
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
                      >
                        <Page pageNumber={1}/>
                      </Document>

                    </>:
                    <>{loadingProgress()}</>
                }
                <div className="mt-10">
                  {showHtmlPreview && <Preview ref={componentRef} templateId={templateId}/> }
                </div>
              </div>
            </div>
        ) : <></>
      }
    </div>
        </>
  );
}

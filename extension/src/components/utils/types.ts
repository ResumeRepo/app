import {TabType} from "@pages/panel/Panel";
import * as React from "react";

export type ResumeInfo = {
  id: string,
  title: string,
  avatar: string,
  createdAt: number,
  location: string,
  company: string
}

export type ResumeMode = "View" | "Edit" | "List" | "Download"

export type ResumeSingleViewProps = {
  resume: ResumeInfo,
  mode: ResumeMode,
  onResumeSelect: (mode: ResumeMode, id: string | undefined) => void
}

export type PreviewProps = {
  templateId: string
}

export type PrintProps = {
  onClick: () => void
}

export type CarouselProps = {
  onTemplateSelect: (templateId: string) => void
  selectedId: string
  canSelect: boolean
}

export type NavProps = {
  activeTab: TabType,
  showResumeUpload: boolean,
  showGenerateResume: boolean,
  onChangeTab: (to: TabType) => void
  onResumeUploadSuccess: () => void
}

export type AssistantProps = {
  onShowResumeGenerate: () => void
}
export type NrCardProps = {
  children: React.ReactNode,
  title: string,
  alwaysOpen: boolean
}

export type CSSStyle = { [key: string]: string | number };

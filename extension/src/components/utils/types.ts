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

export type PrintProps = {
  onClick: () => void
}

export type CarouselProps = {
  onTemplateSelect: (templateId: string) => void
  selectedId: string
}

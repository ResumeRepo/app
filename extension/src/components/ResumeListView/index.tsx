import React, {useEffect, useState} from 'react';
import Card from "@src/components/Card";
import {getFormattedDate} from "@src/components/utils/utils";
import {ResumeInfo, ResumeMode} from "@src/components/utils/types";
import ResumeSingleView from "@src/components/ResumeSingleView";

const resumes: ResumeInfo[] = [
  {id: "id_1", title: "Product Configuration Software Developer", avatar: "https://placehold.co/128", company: "ASI Group", location: "New York, NY", createdAt: 1717974378},
  {id: "id_2", title: "Product Configuration Software Developer", avatar: "https://placehold.co/128", company: "ASI Group", location: "New York, NY", createdAt: 1717974378},
  {id: "id_3", title: "Product Configuration Software Developer", avatar: "https://placehold.co/128", company: "ASI Group", location: "New York, NY", createdAt: 1717974378}
]

const activeResume: ResumeInfo = {id: "id_1", title: "Product Configuration Software Developer", avatar: "https://placehold.co/128", company: "ASI Group", location: "New York, NY", createdAt: 1717974378}

export default function ResumeListView(): JSX.Element {
  const [mode, setMode] = useState<ResumeMode>("List")
  const [activeResumeId, setActiveResumeId] = useState<string | undefined>(undefined)

  const onResumeSelect = (mode: ResumeMode, id: string | undefined) => {
    setMode(mode)
    if (id) setActiveResumeId(id)
    else setActiveResumeId(undefined)
  }

  return (
      <div className="mb-40">
        {
          mode === "List" ? (
                  <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    {
                      resumes.map((item, index) => {
                        return (
                            <li className="pb-3 sm:pb-4" key={item.id}>
                              <Card>
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                  <div className="flex-shrink-0">
                                    <img className="w-14 h-14 rounded-md" src={item.avatar} alt={item.title}/>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                      {item.company}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                      {item.title} | {item.location}
                                    </p>
                                    <p className="text-xs text-gray-400">{getFormattedDate(item.createdAt)}</p>
                                  </div>
                                  <div className="flex flex-col items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <span className="w-20 text-center bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-2 cursor-pointer" onClick={() => onResumeSelect("View", item.id)}>View</span>
                                    <span className="w-20 text-center bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 mb-2 cursor-pointer" onClick={() => onResumeSelect("Edit", item.id)}>Edit</span>

                                    {/*<span className="w-20 text-center bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 mb-2 cursor-pointer" onClick={() => onResumeSelect("Download", item.id)}>Download</span>*/}
                                  </div>
                                </div>
                              </Card>
                            </li>
                        )
                      })
                    }
                  </ul>
              ) :
              <ResumeSingleView resume={activeResume} mode={mode} onResumeSelect={onResumeSelect}/>
        }
      </div>
  );
}

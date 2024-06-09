import React, {useEffect, useState} from 'react';
import '@pages/panel/Panel.css';
import Card from "@src/components/Card";
import {getFormattedDate} from "@src/components/utils/utils";


type ResumeInfo = {
  id: string,
  title: string,
  avatar: string,
  createdAt: number,
  location: string,
  company: string
}

const resumes: ResumeInfo[] = [
  {id: "id_1", title: "Product Configuration Software Developer", avatar: "https://placehold.co/128", company: "ASI Group", location: "New York, NY", createdAt: 1717974378},
  {id: "id_2", title: "Product Configuration Software Developer", avatar: "https://placehold.co/128", company: "ASI Group", location: "New York, NY", createdAt: 1717974378},
  {id: "id_3", title: "Product Configuration Software Developer", avatar: "https://placehold.co/128", company: "ASI Group", location: "New York, NY", createdAt: 1717974378}
]
export default function Resumes(): JSX.Element {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [body, setBody] = useState("")

  return (
    <div className="mb-40">

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
                          <span className="w-20 text-center bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 mb-2 cursor-pointer">View</span>
                        <span className="w-20 text-center bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 mb-2 cursor-pointer">Edit</span>

                        <span className="w-20 text-center bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 mb-2 cursor-pointer">Download</span>
                      </div>
                    </div>
                  </Card>

                </li>
            )
          })
        }
      </ul>
    </div>
  );
}

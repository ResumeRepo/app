import * as React from "react";
import {TabType} from "@pages/panel/Panel";

export type NavProps = {
  activeTab: TabType,
  showResumeUpload: boolean,
  onChangeTab: (to: TabType) => void
}

type Tab = {
  name: string,
  icon: any
}
const tabs: Tab[] = [
  {
    name: "Assistant",
    icon: <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"/>
    </svg>
  },
  {
    name: "Resumes",
    icon: <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>
    </svg>
  },
  {
    name: "Profile",
    icon: <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    </svg>
  }
]
const BottomNav = (props: NavProps) => {


  const getClasses = (tab: TabType): string => {
    return tab === props.activeTab
        ? "inline-flex flex-col items-center justify-center px-5 bg-gray-50 dark:bg-gray-800 group"
        : "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
  }

  const getTextClasses = (tab: TabType): string => {
    return tab === props.activeTab
        ? "text-sm text-blue-600 dark:text-blue-500"
        : "text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
  }


  return (
      <>
        <div className="fixed bottom-0 left-0 z-50 w-full h-auto pt-4 pb-2 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">

          {props.showResumeUpload && <div className="text-center w-full mb-2 mt-2 ">
            <button type="button" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
              </svg>
              <span className="font-extrabold pt-1 pl-1">Upload Resume</span>
            </button>
          </div>
          }

          <div className="grid max-w-lg grid-cols-3 mx-auto font-medium">
            <button type="button" className={getClasses("Assistant")} onClick={() => props.onChangeTab("Assistant")}>
              {tabs.find(item => item.name = "Assistant")?.icon}
              <span className={getTextClasses("Assistant")}>Assistant</span>
            </button>
            <button type="button" className={getClasses("Resumes")} onClick={() => props.onChangeTab("Resumes")}>
              {tabs.find(item => item.name = "Resumes")?.icon}
              <span className={getTextClasses("Resumes")}>Resumes</span>
            </button>
            <button type="button" className={getClasses("Profile")} onClick={() => props.onChangeTab("Profile")}>
              {tabs.find(item => item.name = "Profile")?.icon}
              <span className={getTextClasses("Profile")}>Profile</span>
            </button>
          </div>
        </div>
      </>
  );
};

export default BottomNav;

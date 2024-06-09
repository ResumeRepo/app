import * as React from "react";
import arrow from '@assets/img/arrow.png';

const SectionHeader = (props: {title: string}) => {
  const { title } = props
  return (
        <div className="w-full flex flex-row align-middle">
          <img src={arrow} className="w-[1rem] h-[1rem]" alt="NextRole" />
          <h1 className="mb-2 pl-1 text-lg font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">{title}</h1>
        </div>
  );
};

export default SectionHeader;

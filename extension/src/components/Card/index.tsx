import * as React from "react";
import { Accordion } from "flowbite-react";
import {NrCardProps} from "@src/components/utils/types";
import SectionHeader from "@src/components/SectionHeader";

const Card = (props: NrCardProps) => {
  return (
      <Accordion className="mb-8">
        <Accordion.Panel alwaysOpen={props.alwaysOpen}>
          <Accordion.Title className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3">
            <SectionHeader title={props.title}/>
          </Accordion.Title>
          <Accordion.Content>
            {props.children}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
  );
};

export default Card;

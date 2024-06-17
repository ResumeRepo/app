import React from "react";
import {PreviewProps} from "@src/components/utils/types";
import Template2 from "@src/components/ResumePreview/Template2";
import Template1 from "@src/components/ResumePreview/Template1";
import Template3 from "@src/components/ResumePreview/Template3";

const Preview = React.forwardRef((props: PreviewProps, ref) => {
  return (
      <>
        <div ref={ref} className="resume">
          {props.templateId === "1" && <Template1/>}
          {props.templateId === "2" && <Template2/>}
          {props.templateId === "3" && <Template3/>}
        </div>
        </>
  );
})
export default Preview

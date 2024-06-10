import React, { useContext } from "react";
// import { ResumeContext } from "../../pages/builder";

export type SkillsProps = {
  title: string,
  skills: string[]
}
export default function Skills(props: SkillsProps) {
  // const { resumeData, setResumeData } = useContext(ResumeContext);

  // const handleTitleChange = (e) => {
  //   const newSkills = [...resumeData.skills];
  //   newSkills.find((skillType) => skillType.title === title).title = e.target.innerText;
  //   setResumeData({ ...resumeData, skills: newSkills });
  // };

  return ((
      <>
        <h2 className="section-title mb-1 border-b-2 border-gray-300 editable" contentEditable suppressContentEditableWarning //onBlur={handleTitleChange}
        >
          {props.title}
        </h2>
        <p className="sub-content">{props.skills.join(", ")}</p>
      </>
    )
  );
};

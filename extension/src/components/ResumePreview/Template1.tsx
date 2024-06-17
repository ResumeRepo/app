import React from "react";
import template1Css from "@src/assets/styles/templates/1.css?inline"

const Template1 = () => {
  const paddingTop = "0.25in"
  const paddingRight = "0.25in"
  const paddingLeft = "0.25in"
  const paddingBottom = "0.25in"
  
  const getStyle = () => {
    return `
    ${template1Css}
    .resume {
      padding-top: ${paddingTop};
      padding-bottom: ${paddingRight};
      padding-left: ${paddingLeft};
      padding-right: ${paddingBottom};
      border: 1px solid #d1d1d1;
      overflow-y: scroll;
      opacity: 1;
    }
    @page { size: 8.5in 11in; }
    @media print {
      .resume {
        border: none;
        opacity: 1;
      }
    }
    `
  }

  return (
      <>
        <style dangerouslySetInnerHTML={{__html: getStyle()}}/>
        <main className="c13 doc-content"><p className="c15"><span
            className="c10">Mary Leannon</span></p>
          <p className="c15"><span
              className="c16">Zieme Crossing Suite 106, Halvorsonbury, Idaho </span><span
              className="c17">&bull;</span><span className="c16">&nbsp;+1-123-456-7890 </span><span
              className="c17">&bull;</span><span
              className="c14 c16 c18">&nbsp;maryleannon@mail.ltd</span></p>
          <p className="c1"><span className="c9"></span></p>
          <p className="c8"><span className="c12">Education</span></p>
          <div className="section-border"></div>
          {/*<p className="c1"><span className="c3"></span></p>*/}

          <p className="c8"><span className="c3">[UNIVERSITY/COLLEGE NAME]</span></p>
          <div className="flex justify-between">
            <p className="c8"><span className="c2">[Bachelor of Science in [Major]</span></p>
            <p className="c5"><span className="c2">[Location]</span></p>
          </div>

          <div className="flex justify-between">
            <p className="c8"><span className="c2">GPA: [Your GPA, if it&#39;s above 3.0]</span></p>
            <p className="c5"><span className="c2">[Year of Graduation]</span></p>
          </div>


          <p className="c8"><span
              className="c2">Relevant coursework: [List any specific courses relevant to the job]</span>
          </p>
          <p className="c0 c4"><span className="c2"></span></p>
          <p className="c8"><span className="c9">Experience</span></p>
          <div className="section-border"></div>
          {/*<p className="c1"><span className="c9"></span></p>*/}

          <div className="flex justify-between">
            <p className="c8"><span className="c3">[JOB TITLE]</span></p>
            <p className="c5"><span className="c2">[Location]</span></p>
          </div>

          <div className="flex justify-between">
            <p className="c8"><span className="c2">[Company Name]</span></p>
            <p className="c5"><span className="c2">[Dates of Employment]</span></p>
          </div>
          <p className="c0"><span className="c6">&bull;</span><span
              className="c2">&nbsp; Spearheaded [specific project or initiative], resulting in [quantifiable achievement].</span>
          </p>
          <p className="c0"><span className="c6">&bull;</span><span
              className="c2">&nbsp; Collaborated with cross-functional teams to [accomplishment or task].</span>
          </p>
          <p className="c0"><span className="c6">&bull;</span><span
              className="c2">&nbsp; Implemented [strategy or process improvement], leading to [positive outcome].</span>
          </p>
          <p className="c0"><span className="c6">&bull;</span><span className="c2">&nbsp; Managed [specific responsibility or duty], ensuring [desired outcome].</span>
          </p>
          <p className="c0 c4"><span className="c2"></span></p>

          <div className="flex justify-between">
            <p className="c8"><span className="c3">[JOB TITLE]</span></p>
            <p className="c5"><span className="c2">[Location]</span></p>
          </div>

          <div className="flex justify-between">
            <p className="c8"><span className="c2">[Company Name]</span></p>
            <p className="c5"><span className="c2">[Dates of Employment]</span></p>
          </div>
          <p className="c0"><span className="c6">&bull;</span><span
              className="c2">&nbsp; Spearheaded [specific project or initiative], resulting in [quantifiable achievement].</span>
          </p>
          <p className="c0"><span className="c6">&bull;</span><span
              className="c2">&nbsp; Collaborated with cross-functional teams to [accomplishment or task].</span>
          </p>
          <p className="c0"><span className="c6">&bull;</span><span
              className="c2">&nbsp; Implemented [strategy or process improvement], leading to [positive outcome].</span>
          </p>
          <p className="c0"><span className="c6">&bull;</span><span className="c2">&nbsp; Managed [specific responsibility or duty], ensuring [desired outcome].</span>
          </p>
          <p className="c0 c4"><span className="c2"></span></p>
          {/*<p className="c1"><span className="c9"></span></p>*/}
          <p className="c8"><span className="c12">Projects</span></p>
          <div className="section-border"></div>
          {/*<p className="c1"><span className="c3"></span></p>*/}
          {/*<p className="c1"><span className="c3"></span></p>*/}

          <div className="flex justify-between">
            <p className="c8"><span className="c3">[PROJECT TITLE]</span></p>
            <p className="c5"><span className="c2">[Dates]</span></p>
          </div>
          <p className="c0"><span className="c6">&bull; </span><span
              className="c2">&nbsp;Description: Brief overview of the project and its objectives.</span>
          </p>
          <p className="c0"><span className="c6">&bull;</span><span className="c2">&nbsp; Role: Your specific role or contribution to the project.</span>
          </p>
          <p className="c0"><span className="c6">&bull;</span><span
              className="c2">&nbsp; Technologies Used: Any tools, software, or programming languages utilized.</span>
          </p>
          <p className="c0"><span className="c6">&bull;</span><span className="c2">&nbsp; Outcome: Results achieved or lessons learned from the project.</span>
          </p>
          <p className="c0 c4"><span className="c2"></span></p>
          <p className="c8"><span className="c9">Activities</span></p>
          <div className="flex justify-between">
            <p className="c8"><span className="c3">[ACTIVITY NAME]</span></p>
            <p className="c5"><span className="c2">[Dates]</span></p>
          </div>

          <p className="c0"><span className="c6">&bull; </span><span
              className="c2">&nbsp;Description: Brief overview of the activity and your role.</span>
          </p>
          <p className="c0"><span className="c6">&bull; </span><span className="c2">&nbsp;Skills Developed: Any relevant skills or qualities honed through participation.</span>
          </p>
          <p className="c0"><span className="c6">&bull; </span><span
              className="c2">&nbsp;Achievements: Any notable achievements or leadership roles within the activity.</span>
          </p>
          <p className="c1"><span className="c9"></span></p>
          <p className="c8"><span className="c9">Additional</span></p>
          <div className="section-border"></div>
          {/*<p className="c0 c4"><span className="c6 c14"></span></p>*/}
          <p className="c0"><span className="c6">Language Skills:</span><span
              className="c2">&nbsp;[List any languages you speak fluently or proficiently.]</span>
          </p>
          <p className="c0"><span className="c6">Technical Skills:</span><span
              className="c2">&nbsp;[List any relevant technical skills or software proficiencies.]</span>
          </p>
          <p className="c0"><span className="c6">Volunteer Experience: </span><span className="c2">[Briefly mention any volunteer work you&#39;ve done, highlighting skills or experiences gained.]</span>
          </p>
          <p className="c0"><span className="c6">Interests/Hobbies: </span><span className="c2">[Include any interests or hobbies that demonstrate relevant skills or qualities, or provide insight into your personality.]</span>
          </p>
          <p className="c0 c4"><span className="c10"></span></p>
          <p className="c4 c11"><span className="c7"></span></p>
        </main>
      </>
  );
}
export default Template1;

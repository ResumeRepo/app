import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import React from "react";
import defaultResumeData from "@src/components/ResumePreview/DefaultResumeData";
import template2Css from "@src/assets/styles/templates/2.css?inline";
import {cssToReactStyle} from "@src/components/utils/utils";


const Template2 = () => {
  const resumeData = defaultResumeData
  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];
  const paddingTop = "0.25in"
  const paddingRight = "0.25in"
  const paddingLeft = "0.25in"
  const paddingBottom = "0.25in"
  
  const getStyle = () => {
    return `
    ${template2Css}
    .resume {
      // width: 8.5in;
      // height: 11in;
      padding-top: ${paddingTop};
      padding-bottom: ${paddingRight};
      padding-left: ${paddingLeft};
      padding-right: ${paddingBottom};
       border: 1px solid #d1d1d1;
      overflow-y: scroll;
      opacity: 0;
    }
    @page { size: Letter; }
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
        <main className="c7 doc-content"><p className="c0"><span className="c37"></span></p><a
            id="t.a2c7a37e389c8a921aef8357003c12a0f64fcbab"></a><a id="t.0"></a>
          <table className="c35">
            <tr className="c38">
              <td className="c10" colSpan={1} rowSpan={4}><p className="c28" id="h.gjdgxs"><span
                  className="c34">Jasmine Tala</span>
              </p>
                <p className="c17"><span className="c24">Job Title</span></p></td>
              <td className="c25" colSpan={1} rowSpan={1}><p className="c13"><span
                  style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 24.00px; height: 24.00px;")}><img
                  alt="" src="images/image3.png"
                  style={cssToReactStyle("width: 24.00px; height: 24.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}
                  title=""/></span></p></td>
              <td className="c12" colSpan={1} rowSpan={1}><p className="c17"><span className="c4">(123) 456-7890</span>
              </p></td>
            </tr>
            <tr className="c14">
              <td className="c25" colSpan={1} rowSpan={1}><p className="c13"><span
                  style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 24.00px; height: 24.00px;")}><img
                  alt="" src="images/image1.png"
                  style={cssToReactStyle("width: 24.00px; height: 24.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}
                  title=""/></span></p></td>
              <td className="c12" colSpan={1} rowSpan={1}><p className="c17"><span
                  className="c4">jasminetala@email.com</span></p></td>
            </tr>
            <tr className="c14">
              <td className="c25" colSpan={1} rowSpan={1}><p className="c13"><span
                  style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 24.00px; height: 24.00px;")}><img
                  alt="" src="images/image5.png"
                  style={cssToReactStyle("width: 24.00px; height: 24.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}
                  title=""/></span></p></td>
              <td className="c12" colSpan={1} rowSpan={1}><p className="c17"><span className="c4">New York, NY</span>
              </p>
              </td>
            </tr>
            <tr className="c14">
              <td className="c25" colSpan={1} rowSpan={1}><p className="c13"><span
                  style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 24.00px; height: 24.00px;")}><img
                  alt="" src="images/image4.png"
                  style={cssToReactStyle("width: 24.00px; height: 24.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}
                  title=""/></span></p></td>
              <td className="c12" colSpan={1} rowSpan={1}><p className="c17"><span
                  className="c31"><a className="c33"
                                     href="https://www.google.com/url?q=https://www.linkedin.com/in/jasmine-tala/&amp;sa=D&amp;source=editors&amp;ust=1718323296484350&amp;usg=AOvVaw3N4d8lFijB5MkUfDc6ByE0">LinkedIn</a></span>
              </p></td>
            </tr>
          </table>
          <p className="c29"><span
              style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 797.80px; height: 8.00px;")}>

          <span style={cssToReactStyle("width: 797.80px; height: 8.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); background: blue; ")}></span>
            {/*<img*/}
            {/*  alt="" src="images/image2.png"*/}
            {/*  style={cssToReactStyle("width: 797.80px; height: 8.00px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}*/}
            {/*  title=""/>*/}
          </span></p>
          <p className="c23"><span className="c6"></span></p>
          <h3 className="c9">
            <span>SUMMARY/OBJECTIVE</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
              style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 28.80px; height: 28.80px;")}><img
              alt="" src="images/image6.png"
              style={cssToReactStyle("width: 28.80px; height: 28.80px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}
              title=""/></span></h3>
          <p className="c11"><span className="c4">A summary statement is 2-3 sentences that provides a brief synopsis of your work experience and skills. You might use this if you have quite a few years of experience. An objective, on the other hand, is a focused 2-3-sentence statement that demonstrates your interest and candidacy for the position you hope to land. You might use an objective if you&rsquo;re changing careers, a student or entry-level candidate, or if you&rsquo;re going to take the time to write a compelling, custom objective.</span>
          </p>
          <h3 className="c27">
            <span>WORK EXPERIENCE</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
              style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 28.80px; height: 28.80px;")}><img
              alt="" src="images/image8.png"
              style={cssToReactStyle("width: 28.80px; height: 28.80px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}
              title=""/></span></h3>
          <p className="c11"><span className="c26">WRITE YOUR JOB TITLE HERE</span></p>
          <p className="c11"><span className="c19">Company Name</span><span
              className="c4">&nbsp;| </span><span
              className="c19">Location</span><span className="c4">&nbsp;| </span><span
              className="c19">20XX &ndash; Present</span>
          </p>
          <ul className="c30 lst-kix_list_1-0 start">
            <li className="c20 li-bullet-0"><span className="c4">Focus on your contributions, not your responsibilities. For example, &ldquo;Grew digital marketing ROI by 14%&rdquo; is much better than saying, &ldquo;Led digital marketing efforts.&rdquo;</span>
            </li>
            <li className="c20 li-bullet-0"><span className="c4">Start your job description bullet points with active verbs rather than personal pronouns. For instance, &ldquo;Designed and implemented work ticketing system&rdquo; propels your content forward while &ldquo;I designed and implemented work ticketing system&rdquo; slows the recruiter.</span>
            </li>
            <li className="c20 li-bullet-0"><span className="c4">Quantify your impact whenever possible </span><span
                className="c32">as </span><span className="c4">numbers corroborate your claims. Stating that you &ldquo;Uncovered $3.2M in potential savings&rdquo; shows a real result over a generic claim of &ldquo;Discovered potential savings.&rdquo; </span>
            </li>
            <li className="c20 li-bullet-0"><span className="c4">Keep your bullet point descriptions at three lines or under. &ldquo;Created nutrition and personal training plans for 30+ clients, helping clients lose 26 pounds on average&rdquo; is a lot more compelling than a run-on sentence, redundancies, or wordiness. </span>
            </li>
            <li className="c20 li-bullet-0"><span className="c4">Write your job descriptions in the past tense, though you can write current experience in the present tense if you wish. &ldquo;Partnered with cross-functional teams to design multimedia campaigns that boosted subscriptions by 17%&rdquo; will make a lot more sense to a recruiter when you left that role three years ago. </span>
            </li>
          </ul>
          <h3 className="c27">
            <span>SKILLS</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
              style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 28.80px; height: 28.80px;")}><img
              alt="" src="images/image7.png"
              style={cssToReactStyle("width: 28.80px; height: 28.80px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}
              title=""/></span></h3>
          <p className="c2"><span className="c16"></span></p><a
              id="t.fd4ca87412c9113d48f0b93f6074ee2426708236"></a><a
              id="t.1"></a>
          <table className="c1">
            <tr className="c14">
              <td className="c15" colSpan={1} rowSpan={1}>
                <ul className="c30 lst-kix_list_1-0">
                  <li className="c18 li-bullet-0"><span className="c4">Include 6 to 8 skills, no more than 10</span>
                  </li>
                  <li className="c18 li-bullet-0"><span className="c4">Hard skills: tools, software, etc. needed, <br></br>like CRM or Python</span>
                  </li>
                  <li className="c18 li-bullet-0"><span className="c4">Soft skills: not easy to measure, like communication or empathetic</span>
                  </li>
                </ul>
              </td>
              <td className="c22" colSpan={1} rowSpan={1}>
                <ul className="c30 lst-kix_list_1-0">
                  <li className="c18 li-bullet-0"><span
                      className="c4">Include &ldquo;keywords,&rdquo; skills you find mentioned in the job ad </span>
                  </li>
                  <li className="c18 li-bullet-0"><span className="c4">Be honest; exaggerating your abilities will eventually be found out</span>
                  </li>
                  <li className="c18 li-bullet-0"><span className="c4">Make sure your skills are represented in your work experience </span>
                  </li>
                </ul>
              </td>
            </tr>
          </table>
          <h3 className="c9">
            <span>EDUCATION</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
              style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 31.68px; height: 27.10px;")}><img
              alt="Open book outline" src="images/image10.png"
              style={cssToReactStyle("width: 31.68px; height: 31.68px; margin-left: -0.00px; margin-top: -0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}
              title=""/></span></h3>
          <p className="c11"><span className="c19">Name of School:</span><span
              className="c4">&nbsp;(If you have a college degree, don&rsquo;t include a high school diploma)</span>
          </p>
          <p className="c11"><span className="c19">Degree:</span><span
              className="c4">&nbsp;earned </span></p>
          <p className="c11"><span className="c19">Years:</span><span
              className="c4">&nbsp;attended </span></p>
          <p className="c11"><span className="c19">City, State:</span><span
              className="c4">&nbsp;</span></p>
          <h3 className="c9">
            <span>CERTIFICATIONS/LICENSES</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span
              style={cssToReactStyle("overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 31.68px; height: 31.68px;")}><img
              alt="" src="images/image9.png"
              style={cssToReactStyle("width: 31.68px; height: 31.68px; margin-left: 0.00px; margin-top: 0.00px; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px);")}
              title=""/></span></h3>
          <p className="c11"><span className="c4">Be sure to stay on top of this as certifications and licenses can differ between states and even across jobs in the same industry.</span>
          </p>
        </main>
      </>
  );
}
export default Template2

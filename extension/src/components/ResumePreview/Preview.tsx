import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import Skills from "./Skills";
import ContactInfo from "./ContactInfo";
import React from "react";
import Language from "./Language";
import Certification from "./Certification";
import defaultResumeData from "@src/components/ResumePreview/DefaultResumeData";
import DateRange from "@src/components/ResumePreview/DateRange";


const Preview = React.forwardRef((props, ref) => {
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

  const getPageMargins = () => {
    return `
    .preview {
        max-width: 8.5in;
        max-height: 11in;
        padding-top: ${paddingTop};
        padding-bottom: ${paddingRight};
        padding-left: ${paddingLeft};
        padding-right: ${paddingBottom};
        overflow-y: scroll;
      }
      .gap-preview {
        gap: 2rem;
      }
      
      .name{
        font-size: 20px;
        font-weight: 700;
      }
      
      .profession{
        font-size: 16px;
        font-weight: 500;
      }
      
      .contact{
        font-size: 14px;
        font-weight: 400;
      }
      
      .social-media{
        font-size: 12px;
        font-weight: 400;
      }
      
      .section-title{
        font-size: 16px;
        font-weight: 700;
      }
      
      .content{
        font-size: 14px;
        font-weight: 400;
      }
      
      .sub-content{
        font-size: 12px;
        font-weight: 400;
      }
      
      .i-bold{
        font-weight: 700 !important;
      }
      
      @page {  }
    `;
  };
  return (
      <>
        <style
            dangerouslySetInnerHTML={{
              __html: getPageMargins(),
            }}
        />
      <div className="preview md:overflow-y-scroll" ref={ref}>
            <div className="f-col items-center mb-1">
              {resumeData.profilePicture.length > 0 && (
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                        src={resumeData.profilePicture}
                        alt="profile"
                        width={100}
                        height={100}
                        className="object-cover h-full w-full"
                    />
                  </div>
              )}
              <h1 className="name">{resumeData.name}</h1>
              <p className="profession">{resumeData.position}</p>
              <ContactInfo
                  mainclass="flex flex-row gap-1 mb-1 contact"
                  linkclass="inline-flex items-center gap-1"
                  teldata={resumeData.contactInformation}
                  emaildata={resumeData.email}
                  addressdata={resumeData.address}
                  telicon={<MdPhone />}
                  emailicon={<MdEmail />}
                  addressicon={<MdLocationOn />}
              />
              <div className="grid grid-cols-3 gap-1">
                {resumeData.socialMedia.map((socialMedia, index) => {
                  return (
                      <a
                          href={`http://${socialMedia.link}`}
                          aria-label={socialMedia.socialMedia}
                          key={index}
                          title={socialMedia.socialMedia}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 social-media"
                          // Prevent text overflowing, If the socialMedia.link string is longer than 32 characters, apply the wordWrap and display styles to this <a> tag.
                          // wordWrap: "break-word" breaks the text onto the next line if it's too long,
                          // display: "inline-block" is necessary for wordWrap to work on an inline element like <a>.
                          style={socialMedia.link.length > 32 ? { wordWrap: "break-word", display: "inline-block" } : {}}
                      >
                        {icons.map((icon, index) => {
                          if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                            return <span key={index}>{icon.icon}</span>;
                          }
                        })}
                        {socialMedia.link}
                      </a>
                  );
                })}
              </div>
            </div>
            <hr className="border-dashed my-2" />
            {/* two column start */}
            <div className="grid grid-cols-3 gap-preview">
              <div className="col-span-1 space-y-2">
                {resumeData.summary.length > 0 && (
                    <div className="mb-1">
                      <h2 className="section-title mb-1 border-b-2 border-gray-300">
                        Summary
                      </h2>
                      <p className="content break-words">{resumeData.summary}</p>
                    </div>
                )}
                <div>
                  {resumeData.education.length > 0 && (
                      <div className="mb-1">
                        <h2 className="section-title mb-1 border-b-2 border-gray-300">
                          Education
                        </h2>
                        {resumeData.education.map((item, index) => (
                            <div key={index} className="mb-1">
                              <p className="content i-bold">{item.degree}</p>
                              <p className="content">{item.school}</p>
                              <DateRange
                                  startYear={item.startYear}
                                  endYear={item.endYear}
                                  id={`education-start-end-date`}
                              />
                            </div>
                        ))}
                      </div>
                  )}
                </div>
                <div>
                  {resumeData.skills.map((skill, index) => (
                            <div>
                              <Skills title={skill.title} skills={skill.skills} />
                            </div>
                        ))}
                </div>
                <Language title="Languages" languages={resumeData.languages} />
                <Certification
                    title="Certifications"
                    certifications={resumeData.certifications}
                />
              </div>
              <div className="col-span-2 space-y-2">
                {resumeData.workExperience.length > 0 && (
                    <div>
                      <h2 className="section-title mb-1 border-b-2 border-gray-300 editable">
                        Work Experience
                      </h2>
                      {resumeData.workExperience.map((item, index) => (
                          <div>
                            <p className="content i-bold">{item.company}</p>
                            <p className="content">{item.position}</p>
                            <DateRange
                                startYear={item.startYear}
                                endYear={item.endYear}
                                id={`work-experience-start-end-date`}
                            />
                            <p className="content hyphens-auto">{item.description}</p>
                            <ul
                                className="list-disc ul-padding content"
                            >
                              {typeof item.keyAchievements === "string" &&
                                  item.keyAchievements
                                  .split("\n")
                                  .map((achievement, subIndex) => (
                                      <li

                                          className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                                      >
                                        {achievement}
                                      </li>
                                  ))}
                            </ul>
                          </div>
                      ))}
                    </div>
                )}
                {resumeData.projects.length > 0 && (
                    <div>
                      <h2 className="section-title mb-1 border-b-2 border-gray-300 editable">
                        Projects
                      </h2>
                      {resumeData.projects.map((item, index) => (
                          <div key={`${item.name}-${index}`}>
                            <p className="content i-bold">{item.name}</p>
                            <DateRange
                                startYear={item.startYear}
                                endYear={item.endYear}
                                id={`work-experience-start-end-date`}
                            />
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="content"
                            >
                              {item.link}
                            </a>
                            <p className="content">{item.description}</p>
                            <ul className="list-disc ul-padding content">
                              {typeof item.keyAchievements === "string" &&
                                  item.keyAchievements
                                  .split("\n")
                                  .map((achievement, subIndex) => (
                                      <li
                                          key={`${item.name}-${index}-${subIndex}`}
                                          className="hover:outline-dashed hover:outline-2 hover:outline-gray-400"
                                      >
                                        {achievement}
                                      </li>
                                  ))}
                            </ul>
                          </div>
                      ))}
                    </div>
                )}
              </div>
            </div>
      </div>
        </>
  );
})
export default Preview

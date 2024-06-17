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
import template3Css from "@src/assets/styles/templates/3.css?inline";
import {cssToReactStyle} from "@src/components/utils/utils";


const Template3 = () => {
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
    ${template3Css}
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
        <div className="c59 doc-content"><p className="c8"><span className="c47"></span></p><a
            id="t.dd0a1548d0ed9971b8e6d337048fac97ae69f8bf"></a><a id="t.0"></a>
          <table className="c3">
            <tr className="c64">
              <td className="c25" colSpan={1} rowSpan={1}><p className="c19"><span
                  className="c20">Ceres Station, Belt</span></p>
                <p className="c19"><span className="c20">Sector 17, Block B Apartment 42</span></p>
              </td>
              <td className="c37" colSpan={3} rowSpan={1}><p className="c33"><span
                  className="c63">Amos T. Burton<br></br></span><span className="c40"><a
                  className="c32"
                  href="https://www.google.com/url?q=https://www.linkedin.com/in/aborton&amp;sa=D&amp;source=editors&amp;ust=1718593959670893&amp;usg=AOvVaw33nGHnOGks6LgayJpgKaq9">https://www.linkedin.com/in/aborton</a></span>
              </p></td>
              <td className="c66" colSpan={1} rowSpan={1}><p className="c16"><span
                  className="c20">234-567-890</span></p>
                <p className="c16"><span className="c20">aborton@cleanandpure.com</span></p>
                <p className="c9"><span className="c20"></span></p></td>
            </tr>
            <tr className="c55">
              <td className="c39" colSpan={5} rowSpan={1}><p className="c19 c30"><span
                  className="c18"></span></p>
                <p className="c19"><span className="c24">Employment</span></p></td>
            </tr>
            <tr className="c29">
              <td className="c2" colSpan={1} rowSpan={1}><p className="c19"><span className="c10">Chief Engineer &amp; Mechanic</span>
              </p></td>
              <td className="c11" colSpan={1} rowSpan={1}><p className="c30 c33"><span
                  className="c10"></span></p></td>
              <td className="c35" colSpan={1} rowSpan={1}><p className="c48"><span
                  className="c10">Rocinante | Sol System</span></p></td>
              <td className="c14" colSpan={1} rowSpan={1}><p className="c8"><span
                  className="c1"></span></p></td>
              <td className="c46" colSpan={1} rowSpan={1}><h2 className="c16 c27"
                                                              id="h.bci6xn5m8mrb"><span
                  className="c10">Nov 2350 - Present</span></h2></td>
            </tr>
            <tr className="c29">
              <td className="c51" colSpan={5} rowSpan={1}>
                <ul className="c44 lst-kix_ebmb9zhg516r-0 start">
                  <li className="c19 c21 li-bullet-0"><span className="c1">Maintained and repaired all mechanical systems on board the Rocinante, including propulsion, life support, and weaponry</span>
                  </li>
                  <li className="c19 c21 li-bullet-0"><span className="c1">Conducted regular system diagnostics to ensure peak performance and safety of the ship and crew </span>
                  </li>
                  <li className="c19 c21 li-bullet-0"><span className="c1">Collaborated with the crew to adapt and upgrade the ship&#39;s systems for various missions, including combat operations and deep-space exploration </span>
                  </li>
                  <li className="c19 c21 li-bullet-0"><span className="c1">Implemented security measures and protocols to protect the ship from external threats</span>
                  </li>
                  <li className="c19 c21 li-bullet-0"><span className="c1">Provided technical support and training to crew members on ship operations and maintenance procedures</span>
                  </li>
                  <li className="c19 c21 li-bullet-0"><span className="c1">Managed inventory of spare parts, tools, and equipment necessary for ship maintenance</span>
                  </li>
                  <li className="c19 c21 li-bullet-0"><span className="c1">Developed and implemented preventative maintenance schedules to reduce the risk of system failures</span>
                  </li>
                  <li className="c19 c21 li-bullet-0"><span className="c31">Troubleshot</span><span
                      className="c31">&nbsp;and </span><span
                      className="c31">repaired</span><span className="c1">&nbsp;electrical systems, including wiring, circuitry, and control panels</span>
                  </li>
                  <li className="c19 c21 li-bullet-0"><span className="c1">Assisted in the modification and customization of the ship to meet specific mission requirements</span>
                  </li>
                  <li className="c19 c21 li-bullet-0"><span className="c1">Responded promptly to emergency repair situations to ensure the ship&#39;s operational readiness</span>
                  </li>
                </ul>
                <p className="c19 c30"><span className="c10"></span></p></td>
            </tr>
            <tr className="c29">
              <td className="c38" colSpan={1} rowSpan={1}><p className="c19"><span
                  className="c10">Mechanic</span></p>
              </td>
              <td className="c12" colSpan={1} rowSpan={1}><p className="c33 c30"><span
                  className="c10"></span></p></td>
              <td className="c13" colSpan={1} rowSpan={1}><p className="c48"><span className="c10">Cantankerous | Ceres Station, Belt</span>
              </p></td>
              <td className="c0" colSpan={1} rowSpan={1}><p className="c8"><span
                  className="c1"></span></p></td>
              <td className="c4" colSpan={1} rowSpan={1}><h2 className="c16 c27"
                                                             id="h.bci6xn5m8mrb-2"><span
                  className="c10">Jan 2345 - Nov 2350 </span></h2></td>
            </tr>
            <tr className="c29">
              <td className="c51" colSpan={5} rowSpan={1}>
                <ul className="c44 lst-kix_list_1-0 start">
                  <li className="c5 li-bullet-0"><span className="c1">Performed maintenance and repair tasks on the Cantankerous, focusing on the ship&#39;s engine and mechanical systems</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Assisted with cargo handling and logistics to ensure efficient loading and unloading of goods.</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Worked closely with the engineering team to troubleshoot and resolve technical issues in a timely manner</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Developed and maintained an inventory of spare parts and tools necessary for ship maintenance</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Ensured compliance with safety regulations and standards during all maintenance activities</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Conducted performance tests and inspections to verify the integrity and functionality of mechanical systems</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Fabricated and installed custom parts and components as needed</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Assisted in the training and supervision of junior mechanics and apprentices</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Maintained a clean and organized work environment in the ship&#39;s engineering bay</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Coordinated with the captain and other crew members to plan and execute maintenance activities with minimal disruption to operations</span>
                  </li>
                </ul>
                <p className="c19 c30 c62"><span className="c1"></span></p></td>
            </tr>
            <tr className="c29">
              <td className="c38" colSpan={1} rowSpan={1}><p className="c19"><span className="c24">Junior Engineer</span>
              </p></td>
              <td className="c6" colSpan={3} rowSpan={1}><p className="c33"><span className="c24">Luna Shipyards | Luna, Earth</span>
              </p></td>
              <td className="c4" colSpan={1} rowSpan={1}><h2 className="c16 c27"
                                                             id="h.bci6xn5m8mrb-4"><span
                  className="c10">Jun 2342 - Dec 2344 </span></h2></td>
            </tr>
            <tr className="c60">
              <td className="c51" colSpan={5} rowSpan={1}>
                <ul className="c44 lst-kix_list_1-0">
                  <li className="c5 li-bullet-0"><span className="c1">Assisted senior engineers in the construction and repair of various spacecraft at the Luna Shipyards</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Gained hands-on experience with advanced engineering tools and techniques in a high-paced environment</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Participated in quality control checks to ensure all systems met safety and performance standards</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Documented repair procedures and system upgrades for future reference and training purposes</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Assisted in the assembly and installation of spacecraft components and systems</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Conducted tests and inspections under the supervision of senior engineers to ensure the reliability of newly constructed ships</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c31">Supported the engineering team in research and development projects to improve spacecraft design and performance</span>
                  </li>
                </ul>
                <p className="c19 c30"><span className="c1"></span></p>
                <p className="c19 c30 c42"><span className="c7 c54"></span></p></td>
            </tr>
            <tr className="c53">
              <td className="c39" colSpan={5} rowSpan={1}><p className="c19"><span
                  className="c24">Education</span></p>
              </td>
            </tr>
            <tr className="c36">
              <td className="c2" colSpan={1} rowSpan={1}><p className="c19"><span className="c1">Basic Engineering and Mechanics Certification</span>
              </p></td>
              <td className="c41" colSpan={3} rowSpan={1}><p className="c19"><span className="c24">Technical Institute | Ceres Station, Belt</span>
              </p></td>
              <td className="c46" colSpan={1} rowSpan={1}><p className="c16"><span className="c24">Aug 2340 &ndash; Jun 2342</span>
              </p></td>
            </tr>
            <tr className="c53">
              <td className="c65" colSpan={5} rowSpan={1}><p className="c19 c30"><span
                  className="c10"></span></p>
                <p className="c19"><span className="c24">Skills</span></p></td>
            </tr>
            <tr className="c50">
              <td className="c52" colSpan={5} rowSpan={1}>
                <ul className="c44 lst-kix_list_1-0">
                  <li className="c5 li-bullet-0"><span className="c1">Proficient in spacecraft systems maintenance and repair</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Strong understanding of propulsion, life support, and weaponry systems</span>
                  </li>
                  <li className="c5 li-bullet-0"><span className="c1">Adept at working in high-pressure environments and emergency situations</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr className="c50">
              <td className="c51" colSpan={5} rowSpan={1}><p className="c19 c30"><span
                  className="c1"></span></p></td>
            </tr>
          </table>
          <p className="c19 c30"><span className="c47"></span></p></div>
      </>
  );
}
export default Template3

import React, {  } from "react";
import Element = React.JSX.Element;

export type ContactInfoProps = {
  mainclass: string,
  linkclass: string,
  teldata: string,
  emaildata: string,
  addressdata: string,
  telicon: Element,
  emailicon: Element,
  addressicon: Element,
}
export default function ContactInfo(props: ContactInfoProps) {
    return (
      <div className={props.mainclass}>
        <a className={props.linkclass}
          aria-label="Phone Number"
          href={`tel:${props.teldata}`}>
          {props.telicon}  {props.teldata}
        </a>
        <a className={props.linkclass}
          aria-label="Email Address"
          href={`mailto:${props.emaildata}`}>
          {props.emailicon} {props.emaildata}
        </a>
        <address
          aria-label="Address"
          className={props.linkclass + " not-italic"} >
          {props.addressicon} {props.addressdata}
        </address>
      </div>
    );
  }

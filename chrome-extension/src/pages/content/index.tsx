import { createRoot } from 'react-dom/client';
import React from "react";
import HeaderNav from "/src/components/Header";

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div);
root.render(
    <>
      {/*<h1>Hello, world!</h1>*/}
      {/*<HeaderNav/>*/}
    </>
);

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}

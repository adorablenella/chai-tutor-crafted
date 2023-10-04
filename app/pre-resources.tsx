"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  // @ts-ignore
  ReactDOM.preconnect("https://fonts.googleapis.com", { as });
  // @ts-ignore
  ReactDOM.preconnect("https://fonts.googleapis.com", { crossOrigin: "" });
  return null;
}

import { AppProps } from "next/app";
import "@/custom-blocks";
import "@/styles/site.css";

const ChaiApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
};

export default ChaiApp;

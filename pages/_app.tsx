import { AppProps } from "next/app";
import "../styles/site.css";
import "@/custom-blocks";

const ChaiApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default ChaiApp;

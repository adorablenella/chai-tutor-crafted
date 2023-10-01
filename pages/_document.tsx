import { Head, Html, Main, NextScript } from "next/document";

const Document = ({ children }: any) => {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body className="font-body antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

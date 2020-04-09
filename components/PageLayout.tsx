import React from "react";
import Head from "next/head";

import Header from "./Header";

const layoutStyle = {
  margin: 16,
  padding: 16,
  border: "1px solid #DDD",
  borderRadius: 6,
};

export default function PageLayout(props: React.PropsWithChildren<{}>) {
  return (
    <div
      style={{
        margin: 0,
      }}
    >
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />
      <div style={layoutStyle}>{props.children}</div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: "Montserrat", sans-serif;
        }
      `}</style>
    </div>
  );
}

import Header from "@/components/Header";
import Head from "next/head";
import React from "react";

const index = () => {
  return (
    <>
      <Head>
        <title>Instagram | Clone</title>
      </Head>
      <div>
        <Header />
      </div>
    </>
  );
};

export default index;

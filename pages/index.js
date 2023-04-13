import Feed from "@/components/Feed";
import Header from "@/components/Header";
import Head from "next/head";
import React from "react";

const index = () => {
  return (
    <>
      <Head>
        <title>Instagram | Clone</title>
      </Head>
      <div className="bg-gray-100 h-screen overflow-hidden">
        <Header />
        <Feed />
      </div>
    </>
  );
};

export default index;

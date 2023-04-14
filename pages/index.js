import Feed from "@/components/Feed";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Head from "next/head";
import React, { useState } from "react";

const index = () => {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Instagram | Clone</title>
      </Head>
      <div className="bg-gray-100 h-screen overflow-hidden">
        <Header setIsOpen={setIsOpen} />
        <Feed />
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default index;

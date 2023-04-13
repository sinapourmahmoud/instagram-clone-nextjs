import React from "react";
import Comment from "./Comment";
import {
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useSession } from "next-auth/react";
const Post = () => {
  let { data: session } = useSession();
  return (
    <div className="flex flex-col bg-white rounded-lg py-2 gap-3">
      <div className="flex items-center gap-2 px-3">
        <img
          src="./america.png"
          alt="profile"
          className="w-10 h-10 rounded-full object-contain"
        />
        <p className="text-base font-bold flex-1">User NAme</p>
        <MenuIcon className="h-5 cursor-pointer" />
      </div>
      <div className="w-full h-52 md:h-64 relative">
        <Image src="/sina.jpg" alt="post" layout="fill" objectFit="cover" />
      </div>
      {session && (
        <div className="flex itesm-center justify-between px-3">
          <div className="flex items-center gap-3 ">
            <HeartIcon className="h-6 cursor-pointer" />
            <ChatIcon className="h-6 cursor-pointer" />
            <PaperAirplaneIcon className="h-6 cursor-pointer" />
          </div>
          <BookmarkIcon className="h-6 cursor-pointer" />
        </div>
      )}
      <p className="text-sm font-bold px-4">2 Likes</p>
      <p className="text-sm font-bold px-4">
        Sina:{" "}
        <span className="text-base font-medium text-gray-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam neque
          magni facere iste natus! Tempora, autem! Nam nobis odit ipsum in
          reiciendis vel enim, perferendis aperiam molestias dolores sed! Odit.
        </span>
      </p>
      <div className="w-full p-2  h-28 overflow-auto scrollbar-thin scrollbar-thumb-black">
        <Comment />
      </div>
      {session && (
        <form>
          <div className="flex items-center w-full px-2 gap-2">
            <EmojiHappyIcon className="h-6 text-gray-500" />
            <input
              type="text"
              placeholder="Add comment ..."
              className="flex-1 h-8 p-1 font-semibold outline-none focus:shadow-md"
            />
            <button className="outline-none text-blue-500" type="submit">
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Post;

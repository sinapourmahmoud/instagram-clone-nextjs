import React, { useEffect, useState } from "react";
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
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
const Post = ({ postedBy, userImage, postImage, caption, id }) => {
  let [comment, setComment] = useState(null);
  let [postComments, setPostComments] = useState([null]);

  let { data: session } = useSession();
  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (res) => {
        setPostComments(res.docs);
      }
    );
  });
  const addComment = async (e) => {
    e.preventDefault();
    try {
      let addCommentDoc = await addDoc(
        collection(db, "posts", id, "comments"),
        {
          commentBy: session?.user.name,
          comment,
          userImage: session?.user?.image,
          timestamp: serverTimestamp(),
        }
      );
      setComment("");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex flex-col bg-white rounded-lg py-2 gap-3">
      <div className="flex items-center gap-2 px-3">
        <img
          src={userImage}
          alt="profile"
          className="w-10 h-10 rounded-full object-contain"
        />
        <p className="text-base font-bold flex-1">{postedBy}</p>
        <MenuIcon className="h-5 cursor-pointer" />
      </div>
      <div className="w-full h-64 md:h-80 relative ">
        <img
          src={postImage}
          alt="post"
          className="w-full h-full object-cover"
        />
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
        <span className="text-base font-medium text-gray-800">{caption}</span>
      </p>
      {postComments && (
        <div className="w-full p-2  h-28 overflow-auto scrollbar-thin scrollbar-thumb-black flex flex-col gap-2">
          {postComments?.map((item) => (
            <Comment
              key={item?.id}
              commentBy={item?.data().commentBy}
              comment={item?.data().comment}
              userImage={item?.data().userImage}
            />
          ))}
        </div>
      )}
      {session && (
        <form onSubmit={addComment}>
          <div className="flex items-center w-full px-2 gap-2">
            <EmojiHappyIcon className="h-6 text-gray-500" />
            <input
              type="text"
              placeholder="Add comment ..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="flex-1 h-8 p-1 font-semibold outline-none focus:shadow-md"
            />
            <button
              disabled={!comment}
              className="outline-none text-blue-500 disabled:text-gray-400"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Post;

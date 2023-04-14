import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useShowPosts } from "@/utils/customHooks";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
const Posts = () => {
  let [posts, setPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (res) => {
        setPosts(res.docs);
      }
    );
  }, []);
  return (
    <div className="flex flex-col gap-3">
      {posts?.map((item) => (
        <Post
          key={item.id}
          id={item.id}
          postedBy={item.data().postedBy}
          postImage={item.data().postImage}
          caption={item.data().caption}
          userImage={item.data().userImage}
        />
      ))}
    </div>
  );
};

export default Posts;

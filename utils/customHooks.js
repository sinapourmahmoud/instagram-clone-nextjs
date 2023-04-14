import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
//setComments *Post.jsx
export function useSetComments(id) {
  let [postComments, setPostComments] = useState([]);
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
  }, []);
  return { postComments, setPostComments };
}

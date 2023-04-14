import { db, storage } from "./../firebase";
//firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
//adding posts
export async function sendPostLogic(
  setLoading,
  captionText,
  imageSrc,
  session,
  setIsOpen,
  setImageSrc,
  setImageSrcUrl,
  setErrorMessage
) {
  let textRefValue = captionText.current.value;
  if (textRefValue && imageSrc) {
    setLoading(true);
    let docRef = await addDoc(collection(db, "posts"), {
      caption: captionText.current.value,
      postedBy: session?.user?.name,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
    const storageRef = ref(storage, `posts/${docRef.id}`);

    const uploadTask = uploadBytesResumable(storageRef, imageSrc);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          let updatedData = await updateDoc(doc(db, "posts", docRef.id), {
            postImage: downloadURL,
          });
          setIsOpen(false);
          setLoading(false);
          setImageSrc(null);
          setImageSrcUrl(null);
        });
      }
    );
  } else {
    setErrorMessage("Please fill out all the posts");
  }
}
//adding comment
export async function addCommentLogic(session, id, setComment, comment) {
  try {
    let addCommentDoc = await addDoc(collection(db, "posts", id, "comments"), {
      commentBy: session?.user.name,
      comment,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
    setComment("");
  } catch (err) {
    console.log(err.message);
  }
}
//adding like
export async function toggleLikeLogic(hasLiked, id, session) {
  if (hasLiked) {
    try {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.email));
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.email), {
        userName: session?.user?.name,
        email: session?.user?.email,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}

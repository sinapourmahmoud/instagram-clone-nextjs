import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "@/firebase";
//firebase
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";

export default function Modal({ setIsOpen, isOpen }) {
  let { data: session } = useSession();
  let fileRef = useRef(null);
  let captionText = useRef(null);
  let [imageSrc, setImageSrc] = useState(null);
  let [imageSrcUrl, setImageSrcUrl] = useState(null);
  let [errorMessage, setErrorMessage] = useState();
  let [loading, setLoading] = useState(false);
  const sendPost = async (e) => {
    e.preventDefault();
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
  };
  const closeModal = () => {
    setErrorMessage(null);
    setImageSrcUrl(null);
    setImageSrc(null);
    setIsOpen(false);
  };
  const addImageToPost = (e) => {
    let render = new FileReader();
    if (e.target.files[0]) {
      setImageSrc(e.target.files[0]);
      render.readAsDataURL(e.target.files[0]);
    }
    render.onload = function (e) {
      setImageSrcUrl(e.target.result);
    };
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {imageSrcUrl ? (
                      <img
                        src={imageSrcUrl}
                        className="w-full  rounded-lg cursor-pointer object-cover mb-3"
                        alt="postImage"
                        onClick={() => {
                          setImageSrc(null);
                          setImageSrcUrl(null);
                        }}
                      />
                    ) : (
                      <>
                        <input
                          type="file"
                          hidden
                          ref={fileRef}
                          onChange={addImageToPost}
                        />
                        <CameraIcon
                          className="h-14 rounded-full mx-auto  bg-red-200 text-red-500 p-3 cursor-pointer"
                          onClick={() => {
                            fileRef.current.click();
                          }}
                        />
                      </>
                    )}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg  font-medium text-center">
                      Upload a photo
                    </p>
                    <form onSubmit={sendPost}>
                      <input
                        type="text"
                        className="bg-gray-200 my-3 w-full h-10 rounded-3xl px-2 outline-none py-0.5"
                        placeholder="Add caption..."
                        ref={captionText}
                      />
                      <button
                        type="submit"
                        className="bg-red-500 text-white w-full py-2 rounded-xl"
                        onClick={sendPost}
                      >
                        {loading ? "loading ..." : "Add post"}
                      </button>
                      {errorMessage && (
                        <p className="text-red-500 font-light text-sm">
                          {errorMessage}
                        </p>
                      )}
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";

import { useSession } from "next-auth/react";
import { sendPostLogic } from "@/utils/data";

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
    //from utils
    sendPostLogic(
      setLoading,
      captionText,
      imageSrc,
      session,
      setIsOpen,
      setImageSrc,
      setImageSrcUrl,
      setErrorMessage
    );
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

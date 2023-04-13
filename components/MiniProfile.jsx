import { signOut, useSession } from "next-auth/react";
import React from "react";

const MiniProfile = () => {
  let { data: session } = useSession();
  return (
    <div className="w-full p-5  flex items-center  justify-between">
      <div className="flex items-center gap-2">
        <img
          src={session?.user?.image}
          alt="user-profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{session?.user?.name}</p>
          <p className=" text-sm text-gray-500 font-normal ">
            Wellcome to Instagram
          </p>
        </div>
      </div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
        className="text-black text-sm hover:opacity-90"
      >
        Sign out
      </a>
    </div>
  );
};

export default MiniProfile;

import React from "react";

const MiniProfile = () => {
  return (
    <div className="w-full p-5  flex items-center  justify-between">
      <div className="flex items-center gap-2">
        <img
          src="/sina.jpg"
          alt="user-profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Sina Pourmahmoud</p>
          <p className=" text-sm text-gray-500 font-normal ">
            Wellcome to Instagram
          </p>
        </div>
      </div>
      <a href="#" className="text-black text-sm hover:opacity-90">
        Sign out
      </a>
    </div>
  );
};

export default MiniProfile;

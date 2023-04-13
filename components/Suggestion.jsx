import React from "react";

const Suggestion = ({ src, userName, email }) => {
  return (
    <div className="flex items-center gap-3 justify-between">
      <div className="flex items-center gap-2">
        <img
          src={src}
          alt="user-profile"
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold">{userName}</p>
          <p className="text-gray-400">email :{email}</p>
        </div>
      </div>
      <a href="#" className="text-blue-500 text-sm">
        Follow
      </a>
    </div>
  );
};

export default Suggestion;

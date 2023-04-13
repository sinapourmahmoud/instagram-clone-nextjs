import React from "react";

const Story = ({ img, userName }) => {
  return (
    <div className="flex flex-col gap-1 items-center cursor-pointer">
      <div className="w-12 h-12 p-0.5 border-2 border-red-500  rounded-full">
        <img
          src={img}
          alt="profile"
          className="w-full h-full rounded-full object-cover transition-all duration-200 hover:scale-105"
        />
      </div>
      <p className="text-base font-medium">
        {userName.length > 5 ? userName.slice(0, 5) + "..." : userName}{" "}
      </p>
    </div>
  );
};

export default Story;

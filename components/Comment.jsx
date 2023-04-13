import React from "react";

const Comment = () => {
  return (
    <div className="flex items-start gap-3">
      <img
        src="./sina.jpg"
        alt="comment"
        className="w-10 h-10 rounded-full object-cover"
      />
      <p className="text-sm font-semibold">
        Name{" "}
        <span className="text-sm font-normal text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
          eligendi autem magni? Amet ipsum voluptates corporis explicabo, optio
          praesentium accusamus iste itaque commodi omnis reprehenderit
          laboriosam reiciendis qui iure enim.
        </span>
      </p>
    </div>
  );
};

export default Comment;

import React from "react";

const Comment = ({ commentBy, comment, userImage }) => {
  return (
    <div className="flex items-start gap-3">
      <img
        src={userImage}
        alt="comment"
        className="w-10 h-10 rounded-full object-cover"
      />
      <p className="text-sm font-semibold">
        {commentBy}{" "}
        <span className="text-sm font-normal text-gray-600">{comment}</span>
      </p>
    </div>
  );
};

export default Comment;

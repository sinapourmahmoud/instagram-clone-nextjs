import React from "react";
import Moment from "react-moment";
const Comment = ({ commentBy, comment, userImage, timestamp }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={userImage}
        alt="comment"
        className="w-8 h-8 rounded-full object-cover"
      />
      <p className="text-sm font-semibold flex-1">
        {commentBy}:
        <span className="text-sm font-normal text-gray-600"> {comment}</span>
      </p>
      <Moment fromNow className="pr-3 text-sm font-normal">
        {timestamp?.toDate()}
      </Moment>
    </div>
  );
};

export default Comment;

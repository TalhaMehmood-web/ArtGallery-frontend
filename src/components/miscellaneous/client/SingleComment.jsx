/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitials from "@/utils/getInitials";
import useDateFormat from "@/hooks/useDateFormat";

const SingleComment = ({ comment }) => {
const {timeAgo} = useDateFormat(comment?.createdAt)
  const commentRef = useRef(null);

  useEffect(() => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commentRef]);
  return (
    <div ref={commentRef} className="flex flex-row items-start space-x-3">
      <Avatar className="rounded-full">
        <AvatarImage
          className="object-cover"
          src={comment?.commentedBy?.profile}
          alt={comment?.commentedBy?.fullname}
        />
        <AvatarFallback className="text-black rounded-full">
          {getInitials(comment?.commentedBy?.fullname)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-4">
        <div>
          <p className="text-sm text-slate-200">
            {comment?.commentedBy?.fullname}
          </p>
          <p className="text-sm">{comment?.text}</p>
        </div>

        {/* Display time ago */}
        <div className="flex items-center space-x-4">
          <p className="text-xs text-gray-400">{timeAgo}</p>
          <p className="text-xs text-gray-400 transition-all duration-300 cursor-pointer hover:text-white ">
            Reply
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;

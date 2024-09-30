/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SingleComment = ({ comment }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      if (comment?.createdAt) {
        setTimeAgo(
          formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
        );
      }
    };

    // Update the timeAgo every minute to reflect time changes
    updateTimeAgo();
    const intervalId = setInterval(updateTimeAgo, 60000); // 60,000 ms = 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [comment?.createdAt]);

  return (
    <div className="flex flex-row items-start space-x-3">
      <Avatar className="rounded-full">
        <AvatarImage src="" alt="avatar" />
        <AvatarFallback className="text-black rounded-full">CN</AvatarFallback>
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

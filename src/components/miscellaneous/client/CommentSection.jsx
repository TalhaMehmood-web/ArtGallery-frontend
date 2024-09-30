/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGlobalContext } from "@/context/UserContext";
import AddComment from "./AddComment";
import SingleComment from "./SingleComment";

import CommentSkeleton from "@/skeleton/CommentSkeleton";
const CommentSection = ({ postId, isCommentsLoading, comments }) => {
  const { user } = useGlobalContext();

  return (
    <div className="flex flex-col flex-1 ">
      {/* header */}
      <div className="flex items-center pb-3 space-x-4 border-b border-slate-700 ">
        <Avatar className="rounded-full">
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback className="text-black rounded-full">
            CN
          </AvatarFallback>
        </Avatar>
        <p>{user?.fullname}</p>
      </div>
      {/* display comments */}
      <div className="flex flex-1">
        {comments?.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-2">
            <p className="text-3xl font-bold"> No Comments Yet</p>
            <p className="italic font-semibold"> Start Conversation here. </p>
          </div>
        ) : (
          <div
            className={`flex flex-col flex-1 max-h-[550px] scroll overflow-y-auto p-4 ${
              isCommentsLoading ? "space-y-8" : "space-y-4"
            } `}
          >
            {isCommentsLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <CommentSkeleton key={index} />
                ))
              : comments?.map((comment, index) => (
                  <SingleComment key={comment?._id + index} comment={comment} />
                ))}
          </div>
        )}
      </div>
      {/* add comment */}
      <AddComment postId={postId} className="bg-transparent border-slate-700" />
    </div>
  );
};

export default CommentSection;

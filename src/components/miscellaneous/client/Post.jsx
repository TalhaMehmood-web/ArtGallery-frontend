/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import AddComment from "./AddComment";
import { useState } from "react";
import ViewCommentsDialog from "./ViewCommentsDialog";
import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
import CommentSkeleton from "@/skeleton/CommentSkeleton";
import getInitials from "@/utils/getInitials";

const Post = ({ post }) => {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  // Fetch comments for the post
  const { data: comments = [], isLoading: isCommentsLoading } = useQuery(
    ["comments", post._id],
    () => fetchData(`comment/${post._id}`),
    {
      staleTime: Infinity,
      refetchOnMount: false,
      keepPreviousData: true,
    }
  );

  return (
    <>
      <div className="flex flex-col w-full p-4 space-y-3 rounded-md shadow-xl shadow-black/20 ">
        <div className="flex items-center ">
          <Avatar className="rounded-full">
            <AvatarImage
              className="object-cover"
              src={post?.postedBy?.profile}
              alt={post?.postedBy?.fullname}
            />
            <AvatarFallback className="rounded-full">
              {getInitials(post?.postedBy?.fullname)}
            </AvatarFallback>
          </Avatar>
          <p className="mx-4 text-lg italic font-semibold">
            {post?.postedBy?.fullname}
          </p>
        </div>

        <img
          className="object-cover w-full sm:min-w-[500px] lg:min-w-full rounded-md aspect-square"
          src={post.picture}
          alt="picture"
        />

        <div className="flex items-center space-x-6">
          <FaRegHeart
            size={25}
            className="transition-all duration-300 cursor-pointer hover:text-yellow-500"
          />
          <FaRegComment
            size={25}
            className="transition-all duration-300 cursor-pointer hover:text-yellow-500"
            onClick={() => setOpenCommentDialog(true)}
          />
          <IoIosShareAlt
            size={25}
            className="transition-all duration-300 cursor-pointer hover:text-yellow-500"
          />
        </div>
        <div className="flex items-center space-x-3">
          <FaHeart size={20} />
          <p>{post?.likes?.length} likes</p>
        </div>
        <div className="flex items-center space-x-2">
          {post.hashTags.map((tag, index) => (
            <p className="text-blue-500" key={tag + index}>
              #{tag.trim().toLowerCase()}
            </p>
          ))}
        </div>

        {/* Fetch comments before rendering AddComment */}
        {!isCommentsLoading ? (
          <AddComment postId={post?._id} />
        ) : (
          <CommentSkeleton />
        )}
      </div>

      <ViewCommentsDialog
        openCommentDialog={openCommentDialog}
        setOpenCommentDialog={setOpenCommentDialog}
        post={post}
        comments={comments}
        isCommentsLoading={isCommentsLoading}
        // Pass fetched comments to the dialog
      />
    </>
  );
};

export default Post;

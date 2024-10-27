/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LiaComments } from "react-icons/lia";
import { RiShareForwardLine } from "react-icons/ri";
import AddComment from "./AddComment";
import { useState } from "react";
import ViewCommentsDialog from "./ViewCommentsDialog";
import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
import getInitials from "@/utils/getInitials";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import useTogglePostLikes from "@/hooks/useTogglePostLikes";
import { useGlobalContext } from "@/context/UserContext";
import { toast } from "sonner";
import PostMenu from "./PostMenu";
import useDateFormat from "@/hooks/useDateFormat";
import PostFollowButton from "./PostFollowButton";
import AuthButton from "../auth/AuthButton";
const Post = ({ post }) => {
  const { user } = useGlobalContext();
  const { timeAgo } = useDateFormat(post?.createdAt);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user?._id));
  const { handleToggleLike, isLoading } = useTogglePostLikes(post._id);

  const toggleLike = () => {
    setIsLiked(!isLiked); // Optimistic update
    handleToggleLike(); // Call API to toggle like
  };
  // Fetch comments for the post

  const { data: comments = [], isLoading: isCommentsLoading } = useQuery(
    ["comments", post._id],
    () => fetchData(`comment/${post._id}`),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  const copyToClipboard = async () => {
    if (!navigator.clipboard) {
      toast.error("Clipboard API not supported");
      return;
    }
    await navigator.clipboard.writeText(post.picture);
    toast.success("Post picture copied to clipboard!");
  };

  return (
    <>
      <div className="flex flex-col w-full p-4 space-y-3 rounded-md shadow-sm shadow-black/20 ">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200 ">
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

            <div>
              <p className="mx-4 text-lg italic font-semibold">
                {post?.postedBy?.fullname}
              </p>
              <p className="mx-4 text-sm italic font-semibold text-slate-500">
                {post?.postedBy?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 ">
            {/* follow button */}
            <PostFollowButton
              userIdToFollow={post?.postedBy._id}
              createdByYou={post?.createdByYou}
              isFollowing={post?.following}
            />
            {/* post dropdown */}
            <PostMenu
              picture={post?.picture}
              setOpenCommentDialog={setOpenCommentDialog}
              postedBy={post?.postedBy?._id}
              postId={post?._id}
              isFollowing={post?.following}
              createdByYou={post?.createdByYou}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-bold sm:text-lg"> {post?.title} </p>
          <p className="text-sm text-slate-700 ">{post?.description}</p>
        </div>
        <img
          className="object-cover w-full sm:min-w-[500px] h-[400px] rounded-md aspect-square"
          src={post.picture}
          alt="picture"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 md:px-4">
          <div className="flex items-center space-x-3 text-slate-700">
            {isLiked ? (
              <TooltipProvider>
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <Button
                      className="p-0"
                      variant="nothing"
                      disabled={isLoading}
                    >
                      <FaHeart
                        onClick={toggleLike}
                        size={20}
                        className="text-red-600 cursor-pointer"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Unlike post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <AuthButton
                      className="p-0"
                      variant="nothing"
                      disabled={isLoading}
                      onClick={toggleLike}
                    >
                      <FaRegHeart
                        size={20}
                        className="transition-all duration-300 cursor-pointer hover:text-red-500"
                      />
                    </AuthButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Like this post</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <p className="text-sm md:text-base">{post?.likes?.length} Likes </p>
          </div>

          <div
            onClick={() => setOpenCommentDialog(true)}
            className="flex items-center space-x-2 cursor-pointer hover:text-yellow-500 text-slate-700 "
          >
            <LiaComments size={20} className="transition-all duration-300 " />
            <p className="text-sm md:text-base"> {comments?.length} Comments</p>
          </div>
          <div
            onClick={copyToClipboard}
            className="flex items-center space-x-3 cursor-pointer hover:text-yellow-500 text-slate-700"
          >
            <RiShareForwardLine
              size={20}
              className="transition-all duration-300 "
            />
            <p className="text-sm md:text-base">Share</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 md:px-4">
          <div className="flex items-center space-x-2">
            {post.hashTags.map((tag, index) => (
              <p className="text-blue-500" key={tag + index}>
                #{tag.trim().toLowerCase()}
              </p>
            ))}
          </div>
          <p className="text-sm text-slate-500">Posted on : {timeAgo}</p>
        </div>

        {/* Fetch comments before rendering AddComment */}

        <div className="flex items-center space-x-4">
          {user && (
            <Avatar className="rounded-full">
              <AvatarImage
                className="object-cover"
                src={user?.profile}
                alt={user?.fullname}
              />
              <AvatarFallback className="rounded-full">
                {getInitials(user?.fullname)}
              </AvatarFallback>
            </Avatar>
          )}
          <AddComment className="flex-1 border-slate-300" postId={post?._id} />
        </div>
      </div>

      <ViewCommentsDialog
        openCommentDialog={openCommentDialog}
        setOpenCommentDialog={setOpenCommentDialog}
        post={post}
        comments={comments}
        isCommentsLoading={isCommentsLoading}
      />
    </>
  );
};

export default Post;

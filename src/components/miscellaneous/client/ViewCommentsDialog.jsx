/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommentSection from "./CommentSection";

const ViewCommentsDialog = ({
  openCommentDialog,
  setOpenCommentDialog,
  post,
  comments,
  isCommentsLoading,
}) => {
  return (
    <Dialog open={openCommentDialog} onOpenChange={setOpenCommentDialog}>
      <DialogContent
        aria-describedby={undefined}
        className=" sm:max-w-[1200px] h-[700px]     bg-black text-white border-none  "
      >
        <DialogHeader className={"hidden"}>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col flex-1 space-x-2 md:flex-row">
          <div className=" hidden md:flex flex-[0.5]">
            <img
              className="object-cover w-full h-full rounded-md aspect-square"
              src={post.picture}
              alt="picture"
            />
          </div>
          <div className="flex flex-1 md:flex-[0.5] ">
            {/* comments section */}
            <CommentSection
              comments={comments}
              isCommentsLoading={isCommentsLoading}
              postId={post?._id}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCommentsDialog;

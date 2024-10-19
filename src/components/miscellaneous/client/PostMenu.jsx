/* eslint-disable react/prop-types */
import { CiMenuKebab } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGlobalContext } from "@/context/UserContext";
import useDeletePost from "@/hooks/useDeletePost";
import Loading from "../loading/Loading";

const PostMenu = ({ setOpenCommentDialog, picture, postedBy, postId }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openPictureDialog, setOpenPictureDialog] = useState(false);
  const { user } = useGlobalContext();
  const { deletePost, postDeleting } = useDeletePost();

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button onClick={() => setOpenDropdown(true)} variant="outline">
            <CiMenuKebab />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-24">
          <DropdownMenuItem
            onClick={() => {
              setOpenDropdown(false);
              setOpenCommentDialog(true);
            }}
            className="cursor-pointer"
          >
            Comment
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setOpenDropdown(false);
              setOpenPictureDialog(true);
            }}
            className="cursor-pointer"
          >
            View Full Image
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {postedBy === user?._id && (
            <DropdownMenuItem
              onClick={() => {
                setOpenDropdown(false);
                deletePost(postId);
              }}
              className="cursor-pointer"
            >
              Delete Post
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <PostImageDialog
        picture={picture}
        openPictureDialog={openPictureDialog}
        setOpenPictureDialog={setOpenPictureDialog}
      />
      {postDeleting && (
        <Loading message={"Deleting Post...."} color="#ef4444" />
      )}
    </>
  );
};
const PostImageDialog = ({
  picture,
  openPictureDialog,
  setOpenPictureDialog,
}) => {
  return (
    <Dialog open={openPictureDialog} onOpenChange={setOpenPictureDialog}>
      <DialogContent className="max-w-xl text-white bg-black border-none ">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <img src={picture} className="rounded-md" alt="post_picture" />
      </DialogContent>
    </Dialog>
  );
};
export default PostMenu;

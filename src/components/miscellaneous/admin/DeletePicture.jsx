/* eslint-disable react/prop-types */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteData } from "@/api/deleteData";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/UserContext";

const DeletePicture = ({ deleteDialog, setDeleteDialog, children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedPicture, setSelectedPicture } = useGlobalContext();
  const deletePictureMutation = useMutation(
    async () =>
      await deleteData(
        `/admin/deletePicture/${selectedPicture?._id}/${encodeURIComponent(
          selectedPicture?.picture
        )}`
      ),
    {
      onSuccess: ({ data }) => {
        if (data) {
          toast.success("Picture Deleted Successfully", {
            position: "top-right",
          });
          setDeleteDialog(false);
          navigate("/admin/pictures");
          setSelectedPicture(null);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("pictures");
      },
    }
  );
  const { isLoading } = deletePictureMutation;
  const handleDelete = async () => {
    await deletePictureMutation.mutateAsync();
  };
  return (
    <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={"bg-black text-white border-red-500"}>
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center sm:text-left text-red-500 ">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            1) This action cannot be undone. <br />
            2) This will permanently delete your Picture. <br />
            3) Picture will also be deleted from Auction as well
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={"w-full flex justify-between"}>
          <AlertDialogCancel
            className="border-green-500 bg-green-600/70 text-white hover:bg-green-600  focus:bg-green-600 hover:text-white focus:text-white"
            onClick={() => setDeleteDialog(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="border-red-500 bg-red-600/70 text-white hover:bg-red-600  focus:bg-red-600 hover:text-white focus:text-white "
            onClick={handleDelete}
          >
            {isLoading ? "Deleting Picture" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePicture;

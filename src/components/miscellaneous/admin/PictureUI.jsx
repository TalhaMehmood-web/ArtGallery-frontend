/* eslint-disable react/prop-types */
import { deleteData } from "@/api/deleteData";
import { Eye, Pencil, Trash } from "lucide-react";
import { FaSackDollar } from "react-icons/fa6";
import { useMutation, useQueryClient } from "react-query";
import Loading from "@/components/miscellaneous/loading/Loading";
import { useState } from "react";
import DisplayImageDialog from "@/components/miscellaneous/admin/DisplayImageDialog";
import EditPictureDetails from "@/components/miscellaneous/admin/EditPictureDetails";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PictureAuctions from "@/components/miscellaneous/admin/PictureActions";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/UserContext";
import { routeStorage } from "@/utils/routeStorage";
const PictureUI = ({ picURL, id, picture }) => {
  const queryClient = useQueryClient();
  const [displayImage, setDisplayImage] = useState(false);
  const [editPicture, setEditPicture] = useState(false);
  const [openAuction, setOpenAuction] = useState(false);
  const { setRoute, setSelectedPicture } = useGlobalContext();
  const navigate = useNavigate();
  const deletePictureMutation = useMutation(
    async () =>
      await deleteData(
        `/admin/deletePicture/${id}/${encodeURIComponent(picURL)}`
      ),
    {
      onSuccess: ({ data }) => {
        if (data) {
          toast.success("Picture Deleted Successfully", {
            position: "top-right",
          });
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
    <>
      <div className="relative flex items-center justify-center p-2 border-4 border-yellow-500 rounded-md img-effect ">
        <img
          onClick={() => {
            navigate(`/admin/pictures/${id}`);
            setRoute(`/admin/pictures/${id}`),
              routeStorage.saveRoute(`/admin/pictures/${id}`);
            setSelectedPicture(picture);
          }}
          src={picURL}
          alt="pic"
          className="object-cover w-full h-full transition-all duration-300 shadow-md cursor-pointer hover:scale-95 hover:brightness-90 shadow-yellow-200 aspect-square "
        />
        {/* <div className=" hover-effect-img"></div> */}
        <div className="absolute z-10 flex flex-col space-y-6 trash-icon top-2 right-2">
          <div>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Trash
                    onClick={handleDelete}
                    size={20}
                    className="z-50 text-white cursor-pointer trash-icon hover:text-red-500"
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Delete Picture</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Eye
                    onClick={() => setDisplayImage(true)}
                    size={20}
                    className="text-white cursor-pointer trash-icon hover:text-yellow-500"
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>View Picture</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Pencil
                    onClick={() => setEditPicture(true)}
                    size={20}
                    className="text-white cursor-pointer trash-icon hover:text-blue-500"
                  />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Edit Picture Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <FaSackDollar
                      onClick={() => setOpenAuction(true)}
                      size={20}
                      className="text-white cursor-pointer trash-icon hover:text-green-500"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add To Auction</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <DisplayImageDialog
        displayImage={displayImage}
        picURL={picURL}
        setDisplayImage={setDisplayImage}
      />
      <EditPictureDetails
        pictureId={id}
        editPicture={editPicture}
        setEditPicture={setEditPicture}
      />
      <PictureAuctions
        openAuction={openAuction}
        setOpenAuction={setOpenAuction}
        pictureId={id}
      />
      {isLoading && <Loading />}
    </>
  );
};

export default PictureUI;

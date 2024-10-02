/* eslint-disable react/prop-types */
import { deleteData } from "@/api/deleteData";

import { useMutation, useQueryClient } from "react-query";
import Loading from "@/components/miscellaneous/loading/Loading";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/UserContext";

const PictureUI = ({ picURL, id, picture }) => {
  const queryClient = useQueryClient();

  const { setSelectedPicture } = useGlobalContext();
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
          }}
          src={picURL}
          alt="pic"
          className="object-cover w-full h-full transition-all duration-300 shadow-md cursor-pointer hover:scale-95 hover:brightness-90 shadow-yellow-200 aspect-square "
        />
        {/* <div className=" hover-effect-img"></div> */}
      </div>

      {isLoading && <Loading />}
    </>
  );
};

export default PictureUI;

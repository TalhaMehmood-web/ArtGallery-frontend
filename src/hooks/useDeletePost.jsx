import { deleteData } from "@/api/deleteData";
import { useGlobalContext } from "@/context/UserContext";
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const useDeletePost = () => {
  const location = useLocation();
  const { user } = useGlobalContext();
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation(
    (postId) => deleteData(`post/${postId}`),
    {
      onSuccess: ({ data }) => {
        if (data) {
        
          queryClient.invalidateQueries(["profile-data", user?._id]);
          if (location.pathname === "/news") {
            queryClient.invalidateQueries(["posts", user?._id]);
          }
        }
      },
    }
  );

  const deletePost =  (postId) => {
    toast.promise(deletePostMutation.mutateAsync(postId),{
      loading:"Deleting Post ....",
      success:"Post Deleted Successfully",
      error:(err)=>err?.response?.data?.message || "Failed to delete post"
    });
     
  };
  const { isLoading: postDeleting } = deletePostMutation;
  return { deletePost, postDeleting };
};

export default useDeletePost;

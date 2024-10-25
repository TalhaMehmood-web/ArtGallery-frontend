import { postData } from "@/api/postData";
import { useMutation } from "react-query";
import { toast } from "sonner";
const useFollow = () => {
  //  mutations
  // 1. Add follower
  const followUserMutation = useMutation((data) =>
    postData("follow", {
      userIdToFollow: data,
    })
  );
  const followUser = (data) => {
    toast.promise(followUserMutation.mutateAsync(data), {
      loading: "Following user...",
      success: ({ data }) => data.message,
      error: (err) => err?.response?.data?.message || "Failed to follow user",
    });
  };
  const { isLoading: isAddingFollower } = followUserMutation;
  return { isAddingFollower, followUser };
};

export default useFollow;

import { useMutation, useQueryClient } from "react-query";
import { postData } from "@/api/postData"; // Assume this function handles POST API requests
import { useGlobalContext } from "@/context/UserContext";

const useTogglePostLikes = (postId) => {
  const queryClient = useQueryClient();
  const { user } = useGlobalContext();
  const toggleLikeMutation = useMutation(
    () => postData(`post/${postId}/toggle-like`, {}),
    {
      onMutate: async () => {
        // Cancel outgoing queries for this post
        await queryClient.cancelQueries("posts");

        // Snapshot of the previous value for rollback in case of error
        const previousPosts = queryClient.getQueryData("posts");

        if (!previousPosts) return { previousPosts };

        // Optimistically update the likes on the post
        queryClient.setQueryData("posts", (oldPosts) =>
          oldPosts.map((p) =>
            p._id === postId
              ? {
                  ...p,
                  likes: p.likes.includes(user?._id)
                    ? p.likes.filter((id) => id !== user?._id) // Unlike
                    : [...p.likes, user?._id], // Like
                }
              : p
          )
        );
        return { previousPosts };
      },
      onError: (error, variables, context) => {
        // Rollback to the previous posts on error
        if (context?.previousPosts) {
          queryClient.setQueryData("posts", context.previousPosts);
        }
        console.error(error.message);
      },
      onSettled: () => {
        // Refetch posts to sync with the server
      },
      onSuccess: ({ data }) => {
        if (data) {
          queryClient.setQueryData("posts", (oldPosts) =>
            oldPosts.map((p) => (p._id === postId ? data.post : p))
          );
        }
      },
    }
  );

  const handleToggleLike = async () => {
    await toggleLikeMutation.mutateAsync();
  };

  const { isLoading } = toggleLikeMutation;

  return { handleToggleLike, isLoading };
};

export default useTogglePostLikes;

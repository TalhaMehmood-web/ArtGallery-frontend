import { postData } from "@/api/postData";
import { deleteData } from "@/api/deleteData";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/UserContext";

const useFollow = () => {
  const queryClient = useQueryClient();
  const { user } = useGlobalContext();
  // Follow mutation with optimistic update
  const followUserMutation = useMutation(
    (data) =>
      postData("follow", {
        userIdToFollow: data,
      }),
    {
      onMutate: async (data) => {
        // Cancel outgoing queries for the posts
        await queryClient.cancelQueries(["posts", user?._id]);

        // Get a snapshot of previous posts data
        const previousPosts = queryClient.getQueryData(["posts", user?._id]);

        // Optimistically update the following status for relevant posts
        queryClient.setQueryData(["posts", user?._id], (oldPosts) => {
          return oldPosts.map((post) => {
            // If the post is by the user being followed, set following to true
            if (post.postedBy._id.toString() === data.toString()) {
              return { ...post, following: true };
            }
            return post;
          });
        });

        // Return the snapshot in case of an error
        return { previousPosts };
      },
      onError: (error, data, context) => {
        // Revert to previous posts data if an error occurs
        queryClient.setQueryData(["posts", user?._id], context.previousPosts);
      },
      onSettled: () => {
        // Refetch posts after mutation
        queryClient.invalidateQueries(["posts", user?._id]);
      },
    }
  );

  const followUser = (data) => {
    toast.promise(followUserMutation.mutateAsync(data), {
      loading: "Following user...",
      success: ({ data }) => data.message,
      error: (err) => err?.response?.data?.message || "Failed to follow user",
    });
  };

  // Unfollow mutation with optimistic update
  const unfollowUserMutation = useMutation(
    (data) => deleteData(`follow/${data}`),
    {
      onMutate: async (data) => {
        // Cancel outgoing queries for the posts
        await queryClient.cancelQueries(["posts", user?._id]);

        // Get a snapshot of previous posts data
        const previousPosts = queryClient.getQueryData(["posts", user?._id]);

        // Optimistically update the following status for relevant posts
        queryClient.setQueryData(["posts", user?._id], (oldPosts) => {
          return oldPosts.map((post) => {
            // If post is by the user being unfollowed, set following to false
            if (post.postedBy._id.toString() === data.toString()) {
              return { ...post, following: false };
            }
            return post;
          });
        });

        // Return the snapshot in case of an error
        return { previousPosts };
      },
      onError: (error, data, context) => {
        // Revert to previous posts data if an error occurs
        queryClient.setQueryData(["posts", user?._id], context.previousPosts);
      },
      onSettled: () => {
        // Refetch posts after mutation

        queryClient.invalidateQueries(["posts", user?._id]);
      },
    }
  );

  const unfollowUser = (data) => {
    toast.promise(unfollowUserMutation.mutateAsync(data), {
      loading: "Unfollowing user...",
      success: "User unfollowed",
      error: (err) => err?.response?.data?.message || "Failed to unfollow user",
    });
  };

  const { isLoading: isAddingFollower } = followUserMutation;
  const { isLoading: isRemovingFollower } = unfollowUserMutation;

  return {
    isAddingFollower,
    isRemovingFollower,
    followUser,
    unfollowUser,
  };
};

export default useFollow;

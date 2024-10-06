/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { postData } from "@/api/postData";
import { useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid"; // To generate a temporary ID for optimistic updates
import { useGlobalContext } from "@/context/UserContext";

const AddComment = ({ postId, className = "" }) => {
  const queryClient = useQueryClient();
  const { user } = useGlobalContext();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const addCommentMutation = useMutation(
    (data) => postData(`comment/${postId}`, data),
    {
      onMutate: async (newComment) => {
        await queryClient.cancelQueries(["comments", postId]);

        const previousComments = queryClient.getQueryData(["comments", postId]);

        const optimisticComment = {
          _id: uuidv4(), // Temporary unique ID
          text: newComment.text, // The comment's content
          commentedBy: {
            _id: user?._id,
            fullname: user?.fullname || "Anonymous",
            email: user?.email,
            profile: user?.profile,
          },
          post: postId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          replies: [],
        };

        // Optimistically add the new comment to the cache
        queryClient.setQueryData(["comments", postId], (oldComments = []) => [
          ...oldComments,
          optimisticComment,
        ]);

        reset();

        return { previousComments };
      },
      onError: (err, newComment, context) => {
        // Revert the cache update on error
        queryClient.setQueryData(
          ["comments", postId],
          context.previousComments
        );
      },
      onSettled: () => {
        // Always refetch comments to get the latest data from the server
        queryClient.invalidateQueries(["comments", postId]);
      },
    }
  );
  const onSubmit = async (data) => {
    console.log(data);
    if (data.text.trim() === "") {
      return; // Prevent submission of empty comments
    }
    await addCommentMutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        autofocus={false}
        className={className}
        type="text"
        placeholder="Add a comment"
        {...register("text")}
      />
    </form>
  );
};

export default AddComment;

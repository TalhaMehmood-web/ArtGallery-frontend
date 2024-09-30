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
      postId,
      text: "",
    },
  });

  const addCommentMutation = useMutation((data) => postData("comment", data), {
    onMutate: async (newComment) => {
      // Cancel any outgoing refetch (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries("comments");

      // Snapshot the previous value
      const previousComments = queryClient.getQueryData(["comments", postId]);

      // Optimistically update the cache with the new comment
      queryClient.setQueryData(["comments", postId], (oldComments = []) => [
        ...(oldComments || []),
        {
          _id: uuidv4(), // Temporary ID for the new comment
          text: newComment.text,
          commentedBy: {
            _id: user?._id,
            fullname: user?.fullname,
            email: user?.email,
            username: user?.username,
          },
          post: postId,
          createdAt: new Date(),
          updatedAt: new Date(),
          replies: [],
        },
      ]);
      reset();

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      // Rollback to the previous value if the mutation fails
      queryClient.setQueryData(["comments", postId], context.previousComments);
    },
    onSettled: () => {
      // Always refetch comments after mutation success/failure to ensure data consistency
      queryClient.invalidateQueries(["comments", postId]);
    },
  });

  const onSubmit = async (data) => {
    if (data.text.trim() === "") {
      return;
    }
    await addCommentMutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        className={className}
        type="text"
        placeholder="Add a comment"
        {...register("text")}
      />
    </form>
  );
};

export default AddComment;

/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "react-query";
import { postData } from "@/api/postData"; // Assuming you have a postData function for making API calls
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Import Zod resolver for react-hook-form
import LoaderButton from "@/components/ui/loaderButton";

// Define your Zod schema for validation
const schema = z.object({
  title: z
    .string()
    .min(1, "Post title is required")
    .max(25, "Maximum 8 characters are allowed"),
  picture: z
    .any()
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, {
      message: "Picture size should not be greater than 2MB",
    })
    .refine((files) => files.length > 0, "A picture is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(225, "Maximum 255 characters are allowed"),
});

const PostPictureDialog = ({ openPostPicture, setOpenPostPicture }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      picture: null,
    },
  });

  // Mutation to post the data
  const createPostMutation = useMutation((data) => postData("post", data), {
    onSuccess: () => {
      setOpenPostPicture(false);
      reset();
      queryClient.invalidateQueries("posts");
    },
  });

  const onSubmit = async (data) => {
    const { picture, description, title } = data;

    // Prepare the form data to send
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("picture", picture[0]); // File input provides an array, so take the first element
    toast.promise(createPostMutation.mutateAsync(formData), {
      loading: "Creating your post ... ",
      success: "Post Created Successfully",
      error: (err) =>
        err?.response?.data?.message || "Failed to create post! Try Again",
    });
  };

  const { isLoading } = createPostMutation;

  return (
    <Dialog open={openPostPicture} onOpenChange={setOpenPostPicture}>
      <DialogContent className="sm:max-w-[600px] flex flex-col rounded-md text-white border-none  bg-black/80">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
            Click on Create Post button when you are done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col flex-1 space-y-3"
        >
          <div className="flex flex-col space-y-2">
            <label className="italic font-semibold" htmlFor="title">
              Post Title
            </label>
            <Input
              id="title"
              name="title"
              className="z-10 text-white bg-transparent border border-yellow-500"
              type="text"
              placeholder="Post Title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm font-semibold text-red-500 sm:font-normal sm:text-sm ">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label className="italic font-semibold" htmlFor="description">
              Picture Description
            </label>
            <Textarea
              id="description"
              name="description"
              rows={6}
              placeholder="Describe your art"
              className="bg-transparent border border-yellow-500 placeholder:text-white"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm font-semibold text-red-500 sm:font-normal sm:text-sm ">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label className="italic font-semibold" htmlFor="picture">
              Select Picture from device
            </label>
            <Input
              id="picture"
              name="picture"
              className="z-10 text-white bg-transparent border border-yellow-500 cursor-pointer"
              type="file"
              accept="image/*"
              {...register("picture")}
            />
            {errors.picture && (
              <p className="text-sm font-semibold text-red-500 sm:font-normal sm:text-sm ">
                {errors.picture.message}
              </p>
            )}
          </div>

          <LoaderButton
            isLoading={isLoading}
            type="submit"
            text={isLoading ? "Creating Post" : "Create Post"}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostPictureDialog;

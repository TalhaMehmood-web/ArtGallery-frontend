/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
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
import { postData } from "@/api/postData"; // assuming you have a postData function for making API calls
import { toast } from "sonner";

const PostPictureDialog = ({ openPostPicture, setOpenPostPicture }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      picture: "",
      description: "",
      hashTags: "",
    },
  });

  // Mutation to post the data
  const createPostMutation = useMutation((data) => postData("post", data), {
    onSuccess: () => {
      toast.success("Post created successfully!");
      setOpenPostPicture(false);
      reset();
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      toast.error(`Failed to create post: ${error.message}`);
    },
  });

  const onSubmit = async (data) => {
    const { picture, description, hashTags } = data;
    if (!/^[\w\s]+(,[\w\s]+)*$/.test(hashTags)) {
      // Show an error if the format is wrong
      toast.error(
        "Hashtags should be comma-separated, e.g., art, painting, oil painting."
      );
      return;
    }

    // Prepare the form data to send
    const formData = new FormData();
    formData.append("picture", picture[0]); // File input provides an array, so take the first element
    formData.append("description", description);
    formData.append("hashTags", hashTags.split(",")); // Assuming hashTags are comma-separated
    await createPostMutation.mutateAsync(formData);
  };
  const { isLoading } = createPostMutation;
  return (
    <Dialog open={openPostPicture} onOpenChange={setOpenPostPicture}>
      <DialogContent className="sm:max-w-[600px] flex flex-col rounded-md text-white border-none  h-[70%]  bg-black/80  ">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
            Click on Create Post button when you are done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-1 flex-col space-y-3"
        >
          <div className="flex flex-col space-y-2">
            <label className="font-semibold italic" htmlFor="picture">
              Select Picture from device
            </label>
            <Input
              className="text-white bg-transparent cursor-pointer z-10 border border-yellow-500"
              type="file"
              {...register("picture", { required: true })}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold italic" htmlFor="description">
              Picture Description
            </label>
            <Textarea
              rows={6}
              placeholder="Describe your art"
              className="bg-transparent border border-yellow-500 placeholder:text-white"
              {...register("description", { required: true })}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-semibold italic" htmlFor="hashTags">
              Type your Hash Tags
            </label>
            <Input
              placeholder="max-limit = 3 example: art,painting,oil painting"
              className="text-white placeholder:text-slate-600 bg-transparent  z-10 border border-yellow-500"
              type="text"
              {...register("hashTags", { required: true })}
            />
          </div>
          {/* display hash tags here ...... */}
          <Button
            className="bg-white/90 text-yellow-500 hover:bg-transparent hover:text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating Post..." : "Create Post"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostPictureDialog;

/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "react-query";
import { updateData } from "@/api/updateData";
import Loading from "@/components/miscellaneous/loading/Loading";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditPictureDetails = ({ editPicture, setEditPicture, pictureId }) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["pictures", "all", "all"]);
  const categories = queryClient.getQueryData("categories");
  const picture = data?.find((item) => item._id === pictureId);
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      description: "",
      price: "",
      category: "",
    },
  });
  useEffect(() => {
    if (picture) {
      reset({
        description: picture?.description,
        price: picture?.price,
        category: picture?.category?._id,
      });
    }
  }, [picture, reset]);
  const editPictureMutation = useMutation(
    (data) => updateData(`admin/picture/${pictureId}`, data),
    {
      onMutate: () => {
        setEditPicture(false);
      },
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        if (data.status === 200) {
          queryClient.invalidateQueries([
            "pictures",
            picture?.category?.name,
            "all",
          ]);
          toast.success("Picture details updated Successfully");
        }
      },
    }
  );
  const onSubmit = async (data) => {
    await editPictureMutation.mutateAsync(data);
  };
  const { isLoading } = editPictureMutation;
  return (
    <>
      <Dialog open={editPicture} onOpenChange={setEditPicture}>
        <DialogContent className="sm:max-w-[600px] h-[70%] bg-black/90 text-white border-none  flex flex-col ">
          <DialogHeader>
            <DialogTitle>Edit Picture Details</DialogTitle>
            <DialogDescription>
              Make changes to picture here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-1 flex-col justify-around "
          >
            <div className="flex flex-col space-y-1">
              <label className="font-semibold" htmlFor="description">
                Description
              </label>
              <Textarea
                className="text-white bg-transparent border border-yellow-500"
                placeholder="Edit picture Description"
                id="description"
                rows={5}
                {...register("description")}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-semibold" htmlFor="email" type="email">
                Price
              </label>
              <Input
                className="text-white bg-transparent border border-yellow-500"
                placeholder="$"
                type="number"
                {...register("price")}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-semibold" htmlFor="email" type="email">
                Category
              </label>
              <Select
                defaultValue={picture?.category?._id}
                onValueChange={(value) => setValue("category", value)}
                className="border-none outline-none "
              >
                <SelectTrigger className="w-full bg-transparent border border-yellow-500">
                  <SelectValue placeholder="Picture Category" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border border-yellow-500 outline-none ">
                  <SelectGroup className="bg-transparent">
                    <SelectLabel>Select Picture Category</SelectLabel>
                    {categories?.map((category) => (
                      <SelectItem key={category?._id} value={category?._id}>
                        {category?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
      {isLoading && <Loading />}
    </>
  );
};

export default EditPictureDetails;
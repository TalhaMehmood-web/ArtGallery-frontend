/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "react-query";
import { updateData } from "@/api/updateData";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useGlobalContext } from "@/context/UserContext";
import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
const EditPictureDetails = ({
  editPicture,
  setEditPicture,
  picture,
  children,
}) => {
  const queryClient = useQueryClient();
  const { setSelectedPicture } = useGlobalContext();
  const { data: categories } = useQuery(
    "categories",
    () => fetchData("admin/category"),
    {
      staleTime: Infinity,
    }
  );

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
    (data) => updateData(`admin/picture/${picture?._id}`, data),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        if (data.status === 200) {
          setSelectedPicture(data.data);
          setEditPicture(false);
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
        <DialogTrigger asChild>{children}</DialogTrigger>
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
            className="flex flex-col justify-around flex-1 "
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
                <SelectContent className="text-white bg-black border border-yellow-500 outline-none ">
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
            <Button type="submit">
              {isLoading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditPictureDetails;

/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postData } from "@/api/postData";
import { toast } from "sonner";
import { useQueryClient } from "react-query";
const AddNewCategory = ({ openDialog, setOpenDialog }) => {
  const queryClient = useQueryClient();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const addCategoryMutation = useMutation(
    async (data) => await postData("admin/category", data),
    {
      onSuccess: (data) => {
        if (data.status === 201) {
          queryClient.invalidateQueries("categories");
          reset();
          setOpenDialog(false);
          toast.success("Category Added Successfully to our server");
        }
      },
    }
  );
  const onSubmit = async (data) => {
    await addCategoryMutation.mutateAsync(data);
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="sm:max-w-[425px] border-none bg-black text-white ">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Add new category here here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <div className="flex flex-col space-y-2">
            <label className="italic font-semibold" htmlFor="categoryName">
              Category Name
            </label>
            <Input
              id="categoryName"
              name="categoryName"
              className="col-span-3 text-white bg-transparent  z-10 border border-yellow-500"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="italic font-semibold" htmlFor="description">
              Category Description
            </label>
            <Input
              id="description"
              name="description"
              className="col-span-3 text-white bg-transparent  z-10 border border-yellow-500"
              {...register("description")}
            />
          </div>
          <DialogFooter>
            <Button type="submit">
              {addCategoryMutation.isLoading
                ? "Adding new Category..."
                : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCategory;

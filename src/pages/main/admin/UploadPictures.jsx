import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddNewCategory from "@/components/miscellaneous/admin/AddNewCategory";
import { useMutation, useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
import { postData } from "@/api/postData"; // Import the postData function
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "react-query";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import Loading from "@/components/miscellaneous/loading/Loading";

const UploadPictures = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      picture: "",
      description: "",
      price: "",
      type: "",
      category: "",
    },
  });

  // Fetching categories
  const { data: categories } = useQuery("categories", () =>
    fetchData("admin/category")
  );

  // Mutation to upload the picture
  const uploadPictureMutation = useMutation(
    (formData) => postData("admin/picture", formData),
    {
      onError: () => {
        toast.error("Error uploading picture");
      },
      onSuccess: (data) => {
        if (data.status === 201) {
          queryClient.invalidateQueries("pictures");
          toast.success("Picture uploaded successfully");

          reset();
          setValue("category", "");
          setValue("type", "");
        }
      },
    }
  );

  const onSubmit = async (data) => {
    // Create FormData to send the file and other fields
    const formData = new FormData();
    formData.append("picture", data.picture[0]); // Access file from file input
    formData.append("type", data.type);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("title", data.title);
    await uploadPictureMutation.mutateAsync(formData);
  };
  const { isLoading } = uploadPictureMutation;
  return (
    <div className="flex flex-col  bg-black opacity-90 items-center w-full flex-1 px-5 lg:px-10">
      {/* Upload picture form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className=" flex flex-col space-y-1 my-5 brightness-200 z-10 rounded-md  w-full lg:w-[70%] h-full text-white p-2 lg:p-4"
      >
        <div className="shadow-md shadow-yellow-500 p-3 hidden md:flex flex-col space-y-3 mb-5">
          <p className="text-xl font-semibold italic ">
            Upload Picture for Exhibition and Auction
          </p>
          <p>
            You can upload only one picture at a time and also you can add new
            categories for diversification in your art
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-around">
          {/* title */}
          <div className="grid  grid-cols-1 md:grid-cols-2  gap-y-4  md:gap-x-4 w-full ">
            <div className="flex flex-col space-y-2  ">
              <label className="font-semibold italic" htmlFor="picture">
                Picture Title
              </label>
              <Input
                placeholder="Picture Title"
                className="text-white placeholder:text-white bg-transparent cursor-pointer z-10 border border-yellow-500"
                type="text"
                {...register("title")}
              />
            </div>
            <div className="flex flex-col space-y-2 ">
              <label className="font-semibold italic" htmlFor="picture">
                Select one Picture at a time
              </label>
              <Input
                className="text-white bg-transparent cursor-pointer z-10 border border-yellow-500"
                type="file"
                {...register("picture", { required: true })}
              />
            </div>
          </div>

          {/* picture description */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold italic" htmlFor="picture">
              Picture Description
            </label>
            <Textarea
              placeholder="Describe your art"
              className="bg-transparent border border-yellow-500 placeholder:text-white"
              {...register("description")}
            />
          </div>

          {/* picture price */}
          <div className="flex flex-col space-y-2">
            <label className="font-semibold italic" htmlFor="picture">
              Picture Price
            </label>
            <Input
              placeholder="$ Picture price(in dollars)"
              className="text-white placeholder:text-white bg-transparent cursor-pointer z-10 border border-yellow-500"
              type="number"
              {...register("price")}
            />
          </div>
          <div className="grid  grid-cols-1 md:grid-cols-2  gap-y-4  md:gap-x-4 w-full">
            <div className="flex flex-col space-y-2 ">
              <label className="font-semibold italic" htmlFor="type">
                Select Picture Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)} // Use setValue to update form state
              >
                <SelectTrigger className="w-full bg-transparent border border-yellow-500">
                  <SelectValue placeholder="Picture Type" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border border-yellow-500">
                  <SelectGroup className="bg-transparent">
                    <SelectLabel>Select Picture Type</SelectLabel>
                    <SelectItem value="auction">Picture for Auction</SelectItem>
                    <SelectItem value="homePage">
                      Picture to be displayed on the Home page of Client
                    </SelectItem>
                    <SelectItem value="both">
                      Picture to be displayed on both Auction and Home Page of
                      Client
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-2 ">
              <label className="font-semibold italic" htmlFor="category">
                Select Picture Category
              </label>
              <Select
                onValueChange={(value) => setValue("category", value)} // Use setValue to update form state
              >
                <SelectTrigger className="w-full bg-transparent border border-yellow-500">
                  <SelectValue placeholder="Picture Category" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border border-yellow-500">
                  <SelectGroup className="bg-transparent">
                    <SelectLabel>Select Picture Category</SelectLabel>
                    {categories?.map((category) => (
                      <div
                        key={category?._id}
                        className="flex w-full justify-between"
                      >
                        <SelectItem value={category?.name}>
                          {category?.name}
                        </SelectItem>
                        <Trash size={18} />
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between space-x-4">
            <Button
              type="button"
              onClick={() => setOpenDialog(true)}
              className="flex flex-[0.5] w-full justify-center"
            >
              Add new Category +
            </Button>
            <Button
              type="submit"
              className="flex flex-[0.5] w-full justify-center"
              disabled={uploadPictureMutation.isLoading} // Disable button while uploading
            >
              {uploadPictureMutation.isLoading
                ? "Uploading..."
                : "Upload Picture"}
            </Button>
          </div>
        </div>
      </form>
      <AddNewCategory openDialog={openDialog} setOpenDialog={setOpenDialog} />
      {isLoading && <Loading />}
    </div>
  );
};

export default UploadPictures;

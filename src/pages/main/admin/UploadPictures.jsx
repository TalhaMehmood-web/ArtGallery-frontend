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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/components/miscellaneous/loading/Loading";
const uploadPictureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  picture: z
    .any()
    .refine((files) => files?.[0]?.size <= 2 * 1024 * 1024, {
      message: "Picture size should not be greater than 2MB",
    })
    .refine((files) => files.length > 0, "A picture is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a positive number",
    }),
  type: z.string().min(1, "Type is required"),
  category: z.string().min(1, "Category is required"),
});
const UploadPictures = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(uploadPictureSchema),
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
  const { data: categories } = useQuery(
    "categories",
    () => fetchData("admin/category"),
    {
      staleTime: Infinity,
      refetchOnMount: false,
    }
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
    const formData = new FormData();

    formData.append("picture", data.picture[0]);

    formData.append("type", data.type);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("title", data.title);

    await uploadPictureMutation.mutateAsync(formData);
  };

  const { isLoading } = uploadPictureMutation;
  return (
    <div className="relative flex flex-col items-center flex-1 w-full px-5 bg-black opacity-90 lg:px-10">
      {/* Upload picture form */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className=" flex flex-col space-y-1 my-5 brightness-200 z-10 rounded-md  w-full lg:w-[85%] xl:w-[70%] h-full text-white p-2 lg:p-4"
      >
        <div className="flex-col hidden p-3 mb-5 space-y-3 shadow-md shadow-yellow-500 md:flex">
          <p className="text-xl italic font-semibold ">
            Upload Picture for Exhibition and Auction
          </p>
          <p>
            You can upload only one picture at a time and also you can add new
            categories for diversification in your art
          </p>
        </div>
        <div className="flex flex-col justify-around flex-1">
          {/* title */}
          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4 ">
            <div className="flex flex-col space-y-2 ">
              <label className="italic font-semibold" htmlFor="picture">
                Picture Title
              </label>
              <Input
                placeholder="Picture Title"
                className="z-10 text-white bg-transparent border border-yellow-500 cursor-pointer placeholder:text-white"
                type="text"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-700">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2 ">
              <label className="italic font-semibold" htmlFor="picture">
                Select one Picture at a time
              </label>
              <Input
                name="picture"
                className="z-10 text-white bg-transparent border border-yellow-500 cursor-pointer"
                type="file"
                accept="image/*"
                {...register("picture")}
              />
              {errors.picture && (
                <p className="text-sm text-red-700">{errors.picture.message}</p>
              )}
            </div>
          </div>

          {/* picture description */}
          <div className="flex flex-col space-y-2">
            <label className="italic font-semibold" htmlFor="picture">
              Picture Description
            </label>
            <Textarea
              placeholder="Describe your art"
              className="bg-transparent border border-yellow-500 placeholder:text-white"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-700">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* picture price */}
          <div className="flex flex-col space-y-2">
            <label className="italic font-semibold" htmlFor="picture">
              Picture Price
            </label>
            <Input
              placeholder="$ Picture price(in dollars)"
              className="z-10 text-white bg-transparent border border-yellow-500 cursor-pointer placeholder:text-white"
              type="number"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-sm text-red-700">{errors.price.message}</p>
            )}
          </div>
          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4">
            <div className="flex flex-col space-y-2 ">
              <label className="italic font-semibold" htmlFor="type">
                Select Picture Type
              </label>
              <Select
                onValueChange={(value) => setValue("type", value)} // Use setValue to update form state
              >
                <SelectTrigger className="w-full bg-transparent border border-yellow-500">
                  <SelectValue placeholder="Picture Type" />
                </SelectTrigger>
                <SelectContent className="text-white bg-black border border-yellow-500">
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
              {errors.type && (
                <p className="text-sm text-red-700">{errors.type.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2 ">
              <label className="italic font-semibold" htmlFor="category">
                Select Picture Category
              </label>
              <Select
                onValueChange={(value) => setValue("category", value)} // Use setValue to update form state
              >
                <SelectTrigger className="w-full bg-transparent border border-yellow-500">
                  <SelectValue placeholder="Picture Category" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectGroup className="bg-transparent">
                    <SelectLabel>Select Picture Category</SelectLabel>
                    {categories?.map((category) => (
                      <SelectItem key={category?._id} value={category?.name}>
                        <p>{category?.name}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-700">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className=""
            disabled={uploadPictureMutation.isLoading} // Disable button while uploading
          >
            {uploadPictureMutation.isLoading
              ? "Uploading..."
              : "Upload Picture"}
          </Button>
        </div>
      </form>

      <AddNewCategory openDialog={openDialog} setOpenDialog={setOpenDialog} />
      {isLoading && <Loading />}
    </div>
  );
};

export default UploadPictures;

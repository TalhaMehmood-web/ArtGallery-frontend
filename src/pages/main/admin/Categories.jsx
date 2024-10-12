import { FaPlus, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "react-query";
import { postData } from "@/api/postData";
import { fetchData } from "@/api/fetchData";
import { deleteData } from "@/api/deleteData";
import { useQueryClient } from "react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Loading from "@/components/miscellaneous/loading/Loading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Define Zod schema for validation
const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(50, "Category name must be less than 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description must be less than 200 characters"),
});

const Categories = () => {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Fetching categories data
  const { data: categories, isLoading: categoriesLoading } = useQuery(
    "categories",
    () => fetchData("admin/category"),
    {
      staleTime: Infinity,
      refetchOnMount: false,
    }
  );

  // Add category mutation
  const addCategoryMutation = useMutation(
    async (data) => await postData("admin/category", data),
    {
      onSuccess: (data) => {
        if (data.status === 201) {
          queryClient.invalidateQueries("categories");
          toast.success("Category Added Successfully to our server");
          reset();
        }
      },
      onError: (error) => {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      },
    }
  );

  // Delete category mutation
  const deleteCategoryMutation = useMutation(
    (id) => deleteData(`admin/category/${id}`),
    {
      onSuccess: ({ data }) => {
        if (data) {
          toast.success(data.message);
          queryClient.invalidateQueries("categories");
        }
      },
    }
  );

  // Handling form submission
  const onSubmit = async (data) => {
    await addCategoryMutation.mutateAsync(data);
  };

  // State to track which category is being deleted

  // Handling category deletion
  const handleDelete = async (id) => {
    setDeletingId(id);
    await deleteCategoryMutation.mutateAsync(id);
    setDeletingId(null);
  };

  return (
    <>
      <div
        className={` ${
          addCategoryMutation?.isLoading &&
          "pointer-events-none overflow-hidden"
        } max-w-full   mx-auto xl:mx-0   gap-4  xl:flex-row xl:justify-around xl:flex xl:flex-1 w-full px-4 py-4 relative `}
      >
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md xl:sticky xl:top-0 xl:right-0 xl:flex-1 xl:h-fit">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Add New Category
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <Input
                type="text"
                id="name"
                {...register("name")}
                className={`mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-yellow-500 ${
                  errors.name ? "border-red-500" : ""
                }`}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                type="text"
                id="description"
                {...register("description")}
                rows="3"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
                  errors.description ? "border-red-500" : ""
                }`}
                aria-invalid={errors.description ? "true" : "false"}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
              ></Textarea>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600" id="description-error">
                  {errors.description.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-yellow-500 focus:bg-yellow-500 focus:text-white hover:bg-yellow-600/50 "
            >
              <FaPlus className="mr-2" /> Add Category
            </Button>
          </form>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md xl:flex-1">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Categories
          </h2>
          <AnimatePresence>
            {categoriesLoading ? (
              <p className="text-center text-gray-500">Loading categories...</p>
            ) : categories.length === 0 ? (
              <p className="text-center text-gray-500">
                No categories added yet.
              </p>
            ) : (
              <ul
                style={{
                  maxHeight: "calc(100vh - 12rem)",
                }}
                className="space-y-4 overflow-y-auto "
              >
                {categories.map((category) => (
                  <motion.li
                    key={category._id}
                    className="flex items-center justify-between p-4 rounded-md shadow-sm bg-gray-50"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.description}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(category?._id)}
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                      aria-label={`Delete ${category.name} category`}
                      disabled={deletingId === category?._id}
                    >
                      {deletingId === category._id ? (
                        <motion.svg
                          className="w-5 h-5 text-red-600 animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </motion.svg>
                      ) : (
                        <FaTrash />
                      )}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            )}
          </AnimatePresence>
        </div>
        <div id="aria-live" className="sr-only" aria-live="polite"></div>
      </div>
      {addCategoryMutation?.isLoading && (
        <div className="absolute top-0 right-0 w-full h-full">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Categories;

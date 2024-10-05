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
  const { data: categories, isLoading: categoriesLoading } = useQuery(
    "categories",
    () => fetchData("admin/category"),
    {
      staleTime: Infinity,
      refetchOnMount: false,
    }
  );

  const addCategoryMutation = useMutation(
    async (data) => await postData("admin/category", data),
    {
      onSuccess: (data) => {
        if (data.status === 201) {
          queryClient.invalidateQueries("categories");
          toast.success("Category Added Successfully to our server");
        }
      },
    }
  );

  const deleteCategoryMutation = useMutation(
    (id) => deleteData(`admin/category/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data) => {
    await addCategoryMutation.mutateAsync(data);
  };

  // New state to track which category is being deleted
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id); // Set the category id to the deleting state
    await deleteCategoryMutation.mutateAsync(id);
    setDeletingId(null); // Reset after deletion
  };

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Category Manager
      </h1>
      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Add New Category
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              id="name"
              {...register("name")}
              className={`mt-1 block w-full rounded-md p-2 border-yellow-500 shadow-sm focus:border-yellow-500 ${
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
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
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
            ></motion.textarea>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600" id="description-error">
                {errors.description.message}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-md shadow-sm hover:bg-yellow-400 focus:outline-none "
          >
            <FaPlus className="mr-2" /> Add Category
          </motion.button>
        </form>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
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
            <ul className="space-y-4">
              {categories.map((category) => (
                <motion.li
                  key={category._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
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
  );
};

export default Categories;

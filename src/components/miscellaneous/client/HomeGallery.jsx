import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
import { useState } from "react";
import CategoryCombobox from "../admin/CategoryCombobox";

import PictureSkeleton from "@/skeleton/PictureSkeleton";
const HomeGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: pictures, isLoading: isPicturesLoading } = useQuery(
    ["pictures", selectedCategory, "auction"], // Query key array
    () =>
      fetchData(
        `admin/pictures?category=${selectedCategory}&type=auction` // Fetch pictures by category and type
      )
  );
  console.log(pictures);
  const { data: categories } = useQuery("categories", () =>
    fetchData("admin/category")
  );
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  return (
    <section className="flex flex-col p-4 mt-4 space-y-6 md:space-y-3">
      <header className="w-full text-center">
        <p className="text-4xl italic font-extrabold text-yellow-500 animate-pulse">
          Art Gallery
        </p>
      </header>
      {/* categories section */}
      <div className="items-center justify-center flex-1 hidden w-full py-10 space-x-4 xl:flex px-5-5 xl:p-10">
        <p
          className={`cursor-pointer font-bold italic ${
            selectedCategory === "all" ? "text-yellow-500" : ""
          } hover:text-yellow-500 duration-300 transition-all`}
          onClick={() => handleCategoryChange("all")}
        >
          All
        </p>
        {categories?.map((category) => (
          <p
            key={category._id}
            className={`cursor-pointer  font-bold italic ${
              selectedCategory === category._id ? "text-yellow-500" : ""
            } hover:text-yellow-500 duration-300 transition-all`}
            onClick={() => handleCategoryChange(category._id)} // Use category _id
          >
            {category.name.toUpperCase()}
          </p>
        ))}
      </div>
      <div className="block xl:hidden w-fit md:px-10 ">
        <CategoryCombobox
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
      {/* pictures section */}
      <section className="grid gap-4 mt-4 justify-items-center xl:mt-0 md:px-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {isPicturesLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <PictureSkeleton key={index} />
          ))}
        {pictures?.data?.map((picture, index) => (
          <img
            key={picture._id + index}
            src={picture.picture}
            alt={picture.title}
            className=" w-full h-full  object-cover rounded-md aspect-square border-[6px] p-2  border-black "
          />
        ))}
      </section>
    </section>
  );
};

export default HomeGallery;

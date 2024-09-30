import { useState } from "react";
import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
import { Button } from "@/components/ui/button";
import PictureUI from "@/components/miscellaneous/admin/PictureUI";
import FilterPictureType from "@/components/miscellaneous/admin/FilterPictureType";
import PictureSkeleton from "@/skeleton/PictureSkeleton";
import CategoryCombobox from "@/components/miscellaneous/admin/CategoryCombobox";
import Loading from "@/components/miscellaneous/loading/Loading";

const Pictures = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [displayCount, setDisplayCount] = useState(9); // Number of pictures to display initially
  const [showAll, setShowAll] = useState(false); // Toggle between showing more and less pictures

  // Fetch categories
  const {
    data: categories,
    isLoading,
    isPreviousData,
    isFetching,
  } = useQuery("categories", () => fetchData("admin/category"));

  // Fetch pictures
  const { data: pictures, isLoading: picturesLoading } = useQuery(
    ["pictures", selectedCategory, selectedType], // Query key array
    () =>
      fetchData(
        `admin/pictures?category=${selectedCategory}&type=${selectedType}` // Fetch pictures by category and type
      )
  );

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setDisplayCount(9); // Reset display count when changing category
  };

  // Handle type change
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setDisplayCount(9); // Reset display count when changing type
  };

  // Handle "See More" and "See Less" functionality
  const handleToggleDisplayCount = () => {
    setShowAll(!showAll);
    setDisplayCount(() => (showAll ? 9 : pictures?.length)); // Toggle between showing more and less
  };

  // Slice the pictures based on display count
  const displayedPictures = pictures?.slice(0, displayCount) || [];

  return (
    <div className="flex flex-col flex-1">
      {/* Category display */}
      <div className="flex xl:items-center gap-4 xl:flex-row  justify-between w-full px-2 py-5 sm:px-10 xl:py-0">
        <div className="items-center justify-center flex-1 hidden w-full py-10 space-x-4 xl:flex px-2 xl:p-10">
          <p
            className={`cursor-pointer font-semibold italic ${
              selectedCategory === "all" ? "text-yellow-500" : ""
            } hover:text-yellow-500 duration-300 transition-all`}
            onClick={() => handleCategoryChange("all")}
          >
            All
          </p>
          {categories?.map((category) => (
            <p
              key={category._id}
              className={`cursor-pointer font-semibold italic ${
                selectedCategory === category._id ? "text-yellow-500" : ""
              } hover:text-yellow-500 duration-300 transition-all`}
              onClick={() => handleCategoryChange(category._id)} // Use category _id
            >
              {category.name.toUpperCase()}
            </p>
          ))}
        </div>
        {/* combobox for small screen to display categories */}
        <div className="block xl:hidden w-fit ">
          <CategoryCombobox
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        {/* Select by picture type */}
        <div>
          <FilterPictureType onChange={handleTypeChange} />
        </div>
      </div>

      {/* Pictures display */}
      <>
        {" "}
        <div className="grid gap-4 px-3 md:px-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
          {isLoading || (isPreviousData && isFetching)
            ? Array.from({ length: 7 }).map((_, index) => (
                <PictureSkeleton key={index} />
              ))
            : displayedPictures?.map((picture) => (
                <PictureUI
                  key={picture._id}
                  picURL={picture.picture}
                  id={picture._id}
                />
              ))}
        </div>
        {/* "See More" and "See Less" button */}
        <div className="flex items-center justify-center my-10">
          {displayedPictures?.length < pictures?.length || showAll ? (
            <Button
              onClick={handleToggleDisplayCount}
              className="text-white bg-yellow-500 focus:bg-inherit "
            >
              {showAll ? "See Less..." : "See More..."}
            </Button>
          ) : null}
        </div>
      </>
      {picturesLoading && <Loading />}
    </div>
  );
};

export default Pictures;

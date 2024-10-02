import { useState } from "react";
import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";

import PictureUI from "@/components/miscellaneous/admin/PictureUI";
import FilterPictureType from "@/components/miscellaneous/admin/FilterPictureType";
import PictureSkeleton from "@/skeleton/PictureSkeleton";
import CategoryCombobox from "@/components/miscellaneous/admin/CategoryCombobox";
import Loading from "@/components/miscellaneous/loading/Loading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Pictures = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const itemsPerPage = 6; // Set items per page (6 in this case)

  // Fetch categories
  const { data: categories, isLoading } = useQuery("categories", () =>
    fetchData("admin/category")
  );

  // Fetch pictures with pagination
  const { data: pictures, isLoading: picturesLoading } = useQuery(
    ["pictures", selectedCategory, selectedType, currentPage], // Query key includes page
    () =>
      fetchData(
        `admin/pictures?category=${selectedCategory}&type=${selectedType}&page=${currentPage}&limit=${itemsPerPage}`
      )
  );
  console.log(pictures);
  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to the first page
  };

  // Handle type change
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1); // Reset to the first page
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Category and type filters */}
      <div className="flex justify-between w-full gap-4 px-2 py-5 xl:items-center xl:flex-row sm:px-10 xl:py-0">
        <div className="items-center justify-center flex-1 hidden w-full px-2 py-10 space-x-4 xl:flex xl:p-10">
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
              onClick={() => handleCategoryChange(category._id)}
            >
              {category.name.toUpperCase()}
            </p>
          ))}
        </div>
        {/* Combobox for smaller screens */}
        <div className="block xl:hidden w-fit">
          <CategoryCombobox
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
        {/* Filter by picture type */}
        <div>
          <FilterPictureType onChange={handleTypeChange} />
        </div>
      </div>

      {/* Display pictures */}
      <div className="grid gap-4 px-3 md:px-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading || picturesLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <PictureSkeleton key={index} />
            ))
          : pictures?.data?.map((picture) => (
              <PictureUI
                key={picture._id}
                picURL={picture.picture}
                picture={picture}
                id={picture._id}
              />
            ))}
      </div>

      {/* Pagination */}
      {!picturesLoading && (
        <Pagination className={`p-8  flex w-full justify-center `}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
              />
            </PaginationItem>
            {[...Array(pictures?.totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  handlePageChange(
                    currentPage < pictures?.totalPages
                      ? currentPage + 1
                      : pictures?.totalPages
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {picturesLoading && <Loading />}
    </div>
  );
};

export default Pictures;

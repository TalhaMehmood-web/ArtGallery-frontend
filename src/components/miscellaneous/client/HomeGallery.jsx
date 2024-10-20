/* eslint-disable react/prop-types */
import CategoryCombobox from "../admin/CategoryCombobox";
import PictureSkeleton from "@/skeleton/PictureSkeleton";
import { useGlobalContext } from "@/context/UserContext";
import PictureDetailsClient from "./PictureDetailsClient";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const HomeGallery = ({
  setSelectedCategory,
  categories,
  pictures,
  selectedCategory,
  isPicturesLoading,
  setCurrentPage,
  currentPage,
}) => {
  const { setOpenPictureDrawer, setSelectedPicture } = useGlobalContext();

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <section className="relative flex flex-col p-4 space-y-6 md:space-y-3 ">
        <header className="sticky top-0 right-0 z-50 hidden w-full p-4 bg-white sm:block text-end sm:text-center xl:pt-4 xl:static ">
          <p className="text-2xl italic font-extrabold text-yellow-500 sm:text-4xl animate-pulse">
            Art Gallery
          </p>
        </header>
        {/* categories section */}
        <div className="sticky top-0 z-50 items-center justify-center flex-1 hidden w-full p-5 space-x-4 bg-white xl:flex ">
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
        <div className="sticky top-0 z-50 block w-full py-3 bg-white sm:bg-transparent sm:top-3 sm:py-0 md:px-10 xl:hidden">
          <div className="z-50 w-fit">
            <CategoryCombobox
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
        </div>

        {/* pictures section */}

        {isPicturesLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <PictureSkeleton key={index} />
          ))}
        <div className="masonry-layout">
          {pictures?.data?.map((picture, index) => (
            <img
              onClick={() => {
                setOpenPictureDrawer(true);
                setSelectedPicture(picture);
              }}
              key={picture?._id}
              className="w-full mx-auto masonry-item"
              src={picture.picture}
              alt={`Image ${index}`}
            />
          ))}
        </div>

        {/* pagination */}
        {!isPicturesLoading && (
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
      </section>
      <PictureDetailsClient />
    </>
  );
};

export default HomeGallery;

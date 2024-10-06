/* eslint-disable react/prop-types */

import CategoryCombobox from "../admin/CategoryCombobox";

import PictureSkeleton from "@/skeleton/PictureSkeleton";
const HomeGallery = ({
  setSelectedCategory,
  categories,
  pictures,
  selectedCategory,
  isPicturesLoading,
}) => {
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  return (
    <>
      <section className="relative flex flex-col p-4 space-y-6 md:space-y-3 ">
        <header className="sticky top-0 hidden w-full p-4 bg-white sm:block text-end sm:text-center xl:pt-4 xl:static ">
          <p className="text-2xl italic font-extrabold text-yellow-500 sm:text-4xl animate-pulse">
            Art Gallery
          </p>
        </header>
        {/* categories section */}
        <div className="sticky top-0 items-center justify-center flex-1 hidden w-full p-5 space-x-4 bg-white xl:flex ">
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
        <div className="sticky top-0 block w-full py-3 bg-white sm:bg-transparent sm:top-3 sm:py-0 md:px-10 xl:hidden">
          <div className=" w-fit">
            <CategoryCombobox
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
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
              src={picture?.picture}
              alt={picture.title}
              className=" w-full h-full  object-cover rounded-md aspect-square border-[6px] p-2  border-black "
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default HomeGallery;

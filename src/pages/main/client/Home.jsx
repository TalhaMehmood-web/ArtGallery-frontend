import HomeCarousel from "@/components/miscellaneous/client/HomeCarousel";
import HomeGallery from "@/components/miscellaneous/client/HomeGallery";
import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
import { useState } from "react";
import Loading from "@/components/miscellaneous/loading/Loading";
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { data: homePagePictures, isLoading: galleryImagesLoading } = useQuery(
    ["pictures", "all", "homePage"],
    () => fetchData("admin/pictures?category=all&type=bannerImage"),
    {
      refetchOnWindowFocus: false,
      staleTime: 500000,
    }
  );
  const { data: pictures, isLoading: isPicturesLoading } = useQuery(
    ["pictures", selectedCategory, "exceptBannerImage", currentPage], // Query key array
    () =>
      fetchData(
        `admin/pictures?category=${selectedCategory}&type=exceptBannerImage&page=${currentPage}&limit=${itemsPerPage}`
      ),
    {
      staleTime: 500000,
      refetchOnMount: false,
    }
  );

  const { data: categories } = useQuery(
    "categories",
    () => fetchData("admin/category"),
    {
      staleTime: 500000,
      refetchOnMount: false,
    }
  );
  return (
    <>
      <div
        className={`flex relative flex-col flex-1   ${
          (isPicturesLoading || galleryImagesLoading) &&
          "overflow-hidden pointer-events-none "
        } `}
      >
        <div className=" w-full h-[85vh] ">
          <HomeCarousel homePagePictures={homePagePictures} />
        </div>
        <HomeGallery
          isPicturesLoading={isPicturesLoading}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          pictures={pictures}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      {(galleryImagesLoading || isPicturesLoading) && (
        <div className="absolute top-0 right-0 w-full h-full">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Home;

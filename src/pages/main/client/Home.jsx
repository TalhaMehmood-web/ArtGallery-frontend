import HomeCarousel from "@/components/miscellaneous/client/HomeCarousel";
import HomeGallery from "@/components/miscellaneous/client/HomeGallery";

const Home = () => {
  return (
    <div className="flex flex-col flex-1 ">
      <div className="relative w-full min-h-[85vh] ">
        <HomeCarousel />
      </div>
      <HomeGallery />
    </div>
  );
};

export default Home;

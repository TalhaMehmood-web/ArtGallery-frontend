import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
const HomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselRef = useRef(null);
  const { data: homePagePictures } = useQuery(
    ["pictures", "all", "homePage"],
    () => fetchData("admin/pictures?category=all&type=homePage")
  );
  console.log(homePagePictures);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === homePagePictures?.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [homePagePictures?.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === homePagePictures?.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? homePagePictures?.length - 1 : prevSlide - 1
    );
  };

  return (
    <div
      className="w-full h-full"
      ref={carouselRef}
      aria-label="Art Gallery Carousel"
      role="region"
    >
      {homePagePictures?.data?.map((artwork, index) => (
        <div
          key={artwork._id}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <img
            src={artwork.picture}
            alt={artwork.title}
            className="object-cover w-full h-full bg-center bg-no-repeat bg-cover aspect-square "
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-black bg-opacity-50">
            <h2 className="mb-2 text-3xl font-bold">{artwork.title}</h2>
            <p className="text-xl">by Admin</p>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute text-4xl text-white transition-opacity duration-300 transform -translate-y-1/2 opacity-50 top-1/2 left-4 hover:opacity-100"
        aria-label="Previous Slide"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute text-4xl text-white transition-opacity duration-300 transform -translate-y-1/2 opacity-50 top-1/2 right-4 hover:opacity-100"
        aria-label="Next Slide"
      >
        <FaChevronRight />
      </button>
      <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
        {homePagePictures?.data?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;

/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HomeCarousel = ({ homePagePictures }) => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start at the first actual slide
  const carouselRef = useRef(null);

  const slides = homePagePictures?.data || []; // Ensure we have a valid array
  const totalSlides = slides.length + 1; // Include cloned first slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => {
      // Go to the next slide
      const nextIndex = prevSlide + 1;
      // If it's the last slide (cloned first slide), reset to the first actual slide
      return nextIndex === totalSlides ? 1 : nextIndex;
    });
  }, [totalSlides]);
  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [nextSlide]);

  // Navigate to the next slide

  // Navigate to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => {
      const prevIndex = prevSlide - 1;
      // If it's the first slide (first actual slide), go to the cloned last slide
      return prevIndex === 0 ? totalSlides - 1 : prevIndex;
    });
  };

  return (
    <>
      <div
        className="relative w-full h-full overflow-auto "
        ref={carouselRef}
        aria-label="Art Gallery Carousel"
        role="region"
      >
        {/* Render actual slides */}
        {slides.map((artwork, index) => (
          <div
            key={artwork._id}
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
              index + 1 === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index + 1 !== currentSlide}
          >
            <img
              src={artwork?.picture}
              alt={artwork?.title}
              className="object-cover w-full h-full bg-center bg-no-repeat bg-cover aspect-square"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-black bg-opacity-50">
              <h2 className="mb-2 text-3xl font-bold">{artwork.title}</h2>
              <p className="text-xl">by Admin</p>
            </div>
          </div>
        ))}

        {/* Render cloned first slide at the end */}
        {slides.length > 0 && (
          <div
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentSlide === totalSlides ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={currentSlide !== totalSlides}
          >
            <img
              src={slides[0]?.picture}
              alt={slides[0]?.title}
              className="object-cover w-full h-full bg-center bg-no-repeat bg-cover aspect-square"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-black bg-opacity-50">
              <h2 className="mb-2 text-3xl font-bold">{slides[0]?.title}</h2>
              <p className="text-xl">by Admin</p>
            </div>
          </div>
        )}

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
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index + 1)} // Adjust for cloned slide
              className={`w-3 h-3 rounded-full ${
                index + 1 === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          {/* Include the cloned slide indicator */}
          {/* <button
          onClick={() => setCurrentSlide(totalSlides)} // Adjust for cloned slide
          className={`w-3 h-3 rounded-full ${
            currentSlide === totalSlides ? "bg-white" : "bg-gray-400"
          }`}
          aria-label={`Go to slide ${slides.length + 1}`}
        /> */}
        </div>
      </div>
    </>
  );
};

export default HomeCarousel;

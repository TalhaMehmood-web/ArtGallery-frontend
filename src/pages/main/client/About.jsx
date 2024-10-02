import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/UserContext";
import { routeStorage } from "@/utils/routeStorage";
import { useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import about from "@/assets/about.jpg"; // Import the image directly

const About = () => {
  const navigate = useNavigate();
  const { setRoute } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status

  return (
    <div className="relative flex text-white ">
      {/* Image with onLoad to handle loading state */}
      <div
        className="md:h-full h-[130vh] sm:h-[120vh] "
        style={{
          backgroundImage: `url(${about})`,
          backgroundSize: "cover",
          backgroundPosition: "center",

          width: "100%",
          position: "absolute",
          top: "0px",
          right: "0px",
          objectFit: "cover",
          filter: "brightness(20%)",
        }}
      ></div>

      <div className="z-50 flex flex-col flex-1 h-full gap-4 p-6 text-white xl:space-x-5 lg:p-10 xl:flex-row">
        <div className="flex flex-col flex-[0.5] justify-center space-y-6">
          <p className="hidden pl-4 text-5xl font-extrabold border-l-8 border-yellow-500 lg:block">
            About Our <br /> Art & <br /> Social platform
          </p>
          <p className="block pl-4 text-5xl font-extrabold border-l-8 border-yellow-500 lg:hidden">
            About Our Art & Social platform
          </p>
          <p className="text-sm italic md:text-base lg:font-semibold lg:text-lg text-slate-300">
            Welcome to Handmade Haven, your ultimate destination for artistic
            expression! Here, creativity flourishes as artists and art
            enthusiasts come together to celebrate their passion. Our platform
            allows users to share their unique creations, connect with fellow
            creatives, and dive into inspiring discussions about all things art.
            Each month, we host thrilling art auctions where talented artists
            showcase their masterpieces, and art lovers have the chance to bid
            on stunning pieces. The highest bidder walks away with a unique work
            of art, making each auction an exhilarating experience. Join us at
            Handmade Haven, where every stroke tells a story, and creativity
            knows no limits!
          </p>
          <Button
            onClick={() => {
              navigate("/client/gallery");
              setRoute("/client/gallery");
              routeStorage.saveRoute("/client/gallery");
            }}
            className="block text-white bg-yellow-500 w-fit hover:bg-transparent hover:text-yellow-500"
          >
            View Our Work
          </Button>
        </div>
        <div className="flex flex-[0.5] flex-col  md:flex-row items-center lg:items-end xl:flex-col justify-between xl:p-10 xl:border xl:border-black rounded-md xl:shadow-md xl:shadow-black w-full">
          <div className="flex flex-col space-y-6 ">
            <p className="text-5xl font-bold text-yellow-500"> What We Do</p>
            <div className="text-lg font-semibold lg:text-2xl">
              Host Art Auction
            </div>
            <div className="text-lg font-semibold lg:text-2xl">
              Make Art on Order
            </div>
            <div className="text-lg font-semibold lg:text-2xl">
              Help artists to reach art lovers with their work
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <IoPersonSharp />
              <p className="text-yellow-500">Tehryym Sheraz </p>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail />
              <p className="text-yellow-500">talhamehmood991@gmail.com </p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt />
              <p className="text-yellow-500"> +(92) 3176747465 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

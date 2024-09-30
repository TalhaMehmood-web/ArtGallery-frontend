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
    <div
      style={{
        minHeight: "calc(100vh - 5rem)",
        width: "100%",
      }}
      className="relative flex text-white"
    >
      {/* Image with onLoad to handle loading state */}
      <img
        src={about}
        alt="about_picture"
        className={`absolute object-cover w-full h-full brightness-[0.2] ${
          isLoading ? "hidden" : "block"
        }`}
        onLoad={() => setIsLoading(false)} // Set loading to false when the image is loaded
      />
      {isLoading && (
        <div className="absolute z-50 w-full h-full bg-black"></div>
      )}

      <div className="z-50 flex flex-1 h-full p-10 space-x-5 text-white">
        <div className="flex flex-col flex-[0.5] justify-center space-y-6">
          <p className="pl-4 text-5xl font-extrabold border-l-8 border-yellow-500">
            About Our <br /> Art & <br /> Social platform
          </p>
          <p className="text-lg font-semibold">
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
            className="text-white bg-yellow-500 w-fit hover:bg-transparent hover:text-yellow-500"
          >
            View Our Work
          </Button>
        </div>
        <div className="flex flex-[0.5] flex-col justify-between p-10 border border-black rounded-md shadow-md shadow-black w-full">
          <div className="flex flex-col space-y-6">
            <p className="text-5xl font-bold text-yellow-500"> What We Do</p>
            <div className="text-2xl font-semibold">Host Art Auction</div>
            <div className="text-2xl font-semibold">Make Art on Order</div>
            <div className="text-2xl font-semibold">
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

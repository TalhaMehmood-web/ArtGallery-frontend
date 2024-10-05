import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import about from "@/assets/about.jpg"; // Import the image directly

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col  h-[130vh] sm:h-[110vh] md:h-[100vh] lg:h-full lg:flex-row text-white w-full ">
      {/* Image with onLoad to handle loading state */}
      <div
        className="absolute inset-0   flex h-[130vh] sm:h-[110vh] md:h-[100vh] lg:h-full bg-cover bg-center brightness-50"
        style={{
          backgroundImage: `url(${about})`,
        }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1 justify-between gap-6 p-2 sm:p-6 lg:p-10 text-white w-full">
        {/* Left Side (Text Section) */}
        <div className="flex flex-col justify-center space-y-6 w-full lg:w-1/2">
          <p className="hidden lg:block text-5xl font-extrabold border-l-8 border-yellow-500 pl-4">
            About Our <br /> Art & <br /> Social Platform
          </p>
          <p className="block lg:hidden text-3xl sm:text-5xl font-extrabold border-l-8 border-yellow-500 pl-4">
            About Our Art & Social Platform
          </p>
          <p className="text-sm italic md:text-base lg:font-semibold lg:text-lg text-slate-300">
            Welcome to Handmade Haven, your ultimate destination for artistic
            expression! Here, creativity flourishes as artists and art
            enthusiasts come together to celebrate their passion. Our platform
            allows users to share their unique creations, connect with fellow
            creatives, and dive into inspiring discussions about all things art.
            <br />
            Each month, we host thrilling art auctions where talented artists
            showcase their masterpieces, and art lovers have the chance to bid
            on stunning pieces. The highest bidder walks away with a unique work
            of art, making each auction an exhilarating experience.
            <br />
            Join us at Handmade Haven, where every stroke tells a story, and
            creativity knows no limits!
          </p>
          <Button
            onClick={() => {
              navigate("/client/gallery");
            }}
            className="block bg-yellow-500 text-white w-fit hover:bg-transparent hover:text-yellow-500"
          >
            View Our Work
          </Button>
        </div>

        {/* Right Side (Info Section) */}
        <div className="flex h-min flex-col flex-1 flex-grow  md:h-auto md:flex-row lg:flex-col justify-around md:justify-between gap-6 lg:p-10 lg:border lg:border-black lg:rounded lg:shadow lg:shadow-black w-full lg:w-1/2 bg-opacity-60">
          {/* What We Do Section */}
          <div className="flex flex-col space-y-6">
            <p className="text-4xl lg:text-5xl font-bold text-yellow-500">
              What We Do
            </p>
            <div className=" text-sm sm:text-lg font-semibold xl:text-2xl">
              Host Art Auction
            </div>
            <div className=" text-sm sm:text-lg font-semibold xl:text-2xl">
              Make Art on Order
            </div>
            <div className=" text-sm sm:text-lg font-semibold xl:text-2xl">
              Help artists to reach art lovers with their work
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <IoPersonSharp />
              <p className="text-yellow-500">Tehryym Sheraz</p>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail />
              <p className="text-yellow-500">talhamehmood991@gmail.com</p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt />
              <p className="text-yellow-500">+(92) 3176747465</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

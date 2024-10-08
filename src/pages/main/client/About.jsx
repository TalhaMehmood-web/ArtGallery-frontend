import { FaPhone, FaEnvelope, FaUser } from "react-icons/fa";
import about from "@/assets/about.jpg";
import { Button } from "@/components/ui/button";
const About = () => {
  return (
    <div className="relative flex-1 flex-grow min-h-full ">
      <img
        src={about}
        className="absolute top-0 w-full h-full brightness-75 "
        alt="about"
      />

      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="container relative z-10 min-h-full px-4 py-16 mx-auto text-white">
        <h1
          className="mb-8 text-4xl font-bold text-center text-yellow-400 md:text-5xl"
          aria-label="Page Title"
        >
          About Our Art & Social Platform
        </h1>

        <div className="p-6 mb-12 bg-white rounded-lg shadow-lg bg-opacity-10 ">
          <p
            className="mb-6 text-lg leading-relaxed"
            aria-label="Page Description"
          >
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

          <div className="flex items-start text-center ">
            <Button className="text-white transition-all duration-300 bg-yellow-500 hover:bg-white hover:text-yellow-500 ">
              View Our Work
            </Button>
          </div>
        </div>

        <div className="grid gap-8 mb-12 md:grid-cols-2">
          <div className="p-6 transition-transform duration-300 transform bg-white rounded-lg shadow-lg bg-opacity-10 backdrop-blur-sm hover:scale-105">
            <h2 className="mb-4 text-2xl font-semibold text-yellow-400">
              What We Do
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Host Art Auctions</li>
              <li>Make Art on Order</li>
              <li>Help artists to reach art lovers with their work</li>
            </ul>
          </div>

          <div className="p-6 transition-transform duration-300 transform bg-white rounded-lg shadow-lg bg-opacity-10 backdrop-blur-sm hover:scale-105">
            <h2 className="mb-4 text-2xl font-semibold text-yellow-400">
              Contact Information
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaUser className="mr-2 text-yellow-400" />
                <span>Tehryym Sheraz Talhamehmood</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-yellow-400" />
                <a
                  href="mailto:talhamehmood991@gmail.com"
                  className="transition-colors duration-300 hover:text-yellow-400"
                >
                  talhamehmood991@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-yellow-400" />
                <a
                  href="tel:+923176747465"
                  className="transition-colors duration-300 hover:text-yellow-400"
                >
                  +(92) 3176747465
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import portfolio from "@/assets/portfolio.png";
import { Button } from "@/components/ui/button";
import { IoMdMail } from "react-icons/io";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
const Portfolio = () => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <div className="flex flex-1 p-3 text-white bg-black ">
      <div className="flex flex-col justify-around flex-1 py-4 lg:justify-center lg:space-y-8 ">
        <div className="text-2xl font-semibold sm:text-3xl text-slate-300">
          Hello My Name is
        </div>
        <div className="text-4xl font-extrabold animate-pulse text-nowrap sm:text-6xl md:text-8xl">
          Tehryym Sheraz
        </div>
        <div className="text-3xl font-extrabold text-yellow-500 sm:text-4xl md:text-5xl">
          Multidisciplinary Artist
        </div>
        <div className="w-full text-lg font-semibold md:text-xl xl:w-3/4">
          I am a passionate multidisciplinary artist who brings ideas to life
          through vibrant paintings, elegant calligraphy, and expressive
          sketches. Each piece tells a unique story, reflecting my journey and
          emotions. I love exploring new mediums, continuously evolving my style
          to capture the beauty of the world around me.
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="flex items-center gap-2 text-yellow-500 bg-white hover:bg-transparent focus:bg-transparent w-fit">
              <p>Contact Me</p>
              <IoMdMail size={20} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className=" h-1/2 sm:h-[60%] bg-black text-white border-2 border-yellow-500">
            <div className="w-full h-full max-w-lg p-4 m-2 mx-auto border-yellow-500 rounded-lg md:border-2">
              <DrawerHeader>
                <DrawerTitle className="text-3xl italic font-semibold text-center">
                  Contact Information
                </DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start space-x-2 text-yellow-500 ">
                    <IoPersonSharp size={20} />

                    <p className="text-xl font-semibold">Name</p>
                  </div>
                  <p className="text-xl italic font-bold sm:text-2xl">
                    Tehryym Sheraz
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-start space-x-2 text-yellow-500 ">
                    <MdEmail size={20} />

                    <p className="text-xl font-semibold">Email</p>
                  </div>
                  <p className="text-xl italic font-bold sm:text-2xl">
                    talhamehmood991@gmail.com
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-start space-x-2 text-yellow-500 ">
                    <FaPhoneAlt size={20} />

                    <p className="text-xl font-semibold">Phone No</p>
                  </div>
                  <p className="text-xl italic font-bold sm:text-2xl">
                    +92 3176747465
                  </p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="relative items-center justify-center hidden lg:flex">
        <img
          className="h-[80%] w-full  object-cover aspect-square "
          src={portfolio}
          alt="portfolio"
          onLoad={() => setImageLoading(false)}
        />
        {imageLoading && (
          <div className="absolute w-full h-full bg-black"></div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;

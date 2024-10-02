import { Button } from "@/components/ui/button";

import { AlignJustify } from "lucide-react";
import ResNav from "@/components/ui/ResNav";
import { clientNavLinks } from "@/lib/navLinks";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "@/context/UserContext";

import UserInfo from "@/components/ui/UserInfo";
const ClientNav = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setRoute } = useGlobalContext();

  return (
    <>
      <div className="flex items-center w-full h-20 gap-6 p-4 px-5 text-white xl:justify-between bg-black/90">
        <div className="block cursor-pointer xl:hidden">
          <AlignJustify
            size={32}
            strokeWidth={2.5}
            onClick={() => setOpenSheet(true)}
          />
        </div>
        <div className="hidden sm:block">
          <p className="text-2xl italic font-bold text-yellow-500 animate-pulse">
            HOMEMADE HEAVEN
          </p>
        </div>
        <div className="flex justify-end flex-1 xl:hidden ">
          <UserInfo />
        </div>
        <div className=" hidden  xl:flex flex-[0.6]  items-center justify-between space-x-4">
          {clientNavLinks?.map((item, index) => (
            <Button
              className={`text-nowrap  ${
                location.pathname === item?.link
                  ? "bg-white text-yellow-500"
                  : ""
              } `}
              onClick={() => {
                navigate(item?.link);
                setRoute(item?.link);
              }}
              key={item?.link + index}
            >
              {item?.title}
            </Button>
          ))}
          <UserInfo />
        </div>

        <ResNav
          navLinks={clientNavLinks}
          openSheet={openSheet}
          setOpenSheet={setOpenSheet}
          height={"  h-[70%] sm:h-[60%]"}
        />
      </div>
    </>
  );
};

export default ClientNav;

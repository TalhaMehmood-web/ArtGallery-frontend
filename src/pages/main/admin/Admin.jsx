import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import ResNav from "@/components/ui/ResNav";
import { adminNavLinks } from "@/lib/navLinks";

import UserInfo from "@/components/ui/UserInfo";
const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSheet, setOpenSheet] = useState(false);
  const handleWildCard = () => {};
  return (
    <>
      <div className="relative flex flex-col w-full min-h-screen ">
        {/* admin nav */}
        <div className="sticky top-0 z-50 flex items-center w-full h-16 px-4 text-white lg:justify-between md:h-20 bg-black/85 backdrop-opacity-10 ">
          <div className="block cursor-pointer lg:hidden">
            <AlignJustify
              size={32}
              strokeWidth={2.5}
              onClick={() => setOpenSheet(true)}
            />
          </div>
          <div className="hidden sm:block">
            <p className="p-3 text-2xl italic font-bold text-yellow-500 rounded-lg lg:text-3xl animate-pulse ">
              HANDMADE HEAVEN
            </p>
          </div>
          <div className="flex justify-end flex-1 lg:hidden ">
            <UserInfo />
          </div>
          <div className="items-center hidden space-x-5 lg:flex">
            {adminNavLinks?.map((link, index) => (
              <Button
                key={index + link?.link}
                className={`italic  ${
                  location.pathname === link?.link && "bg-white text-yellow-500"
                } `}
                onClick={() => {
                  navigate(link.link);
                }}
              >
                {link.title}
              </Button>
            ))}
            <Button className="italic" onClick={handleWildCard}>
              Wild Card to Client
            </Button>
            <UserInfo />
          </div>
        </div>
        {/* file upload card components */}
        <div className="relative flex flex-grow overflow-y-auto height scroll-smooth ">
          <Outlet />
        </div>
      </div>
      <ResNav
        navLinks={adminNavLinks}
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        height={"h-[50%]"}
      />
    </>
  );
};

export default Admin;

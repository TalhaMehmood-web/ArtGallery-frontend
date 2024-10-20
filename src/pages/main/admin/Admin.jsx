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

  return (
    <>
      <div className="flex flex-col w-full h-screen min-h-screen ">
        {/* admin nav */}
        <div className="sticky top-0 z-50 flex items-center w-full px-4 py-1 text-white lg:justify-between bg-black/85 backdrop-opacity-10 ">
          <div className="block cursor-pointer lg:hidden">
            <AlignJustify
              size={32}
              strokeWidth={2.5}
              onClick={() => setOpenSheet(true)}
            />
          </div>
          <div className="hidden sm:block">
            <p className="p-3 text-xl italic font-bold text-yellow-500 rounded-lg md:text-2xl lg:text-3xl animate-pulse ">
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

            <UserInfo />
          </div>
        </div>
        {/* file upload card components */}
        <div className="flex-grow overflow-y-auto ">
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

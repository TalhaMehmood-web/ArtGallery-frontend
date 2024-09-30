import LogoutButton from "@/components/miscellaneous/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import ResNav from "@/components/ui/ResNav";
import { adminNavLinks } from "@/lib/navLinks";

import { useGlobalContext } from "@/context/UserContext";
import { routeStorage } from "@/utils/routeStorage";
const Admin = () => {
  const navigate = useNavigate();
  const { setRoute } = useGlobalContext();
  const [openSheet, setOpenSheet] = useState(false);
  const handleWildCard = () => {};
  return (
    <>
      <div className="relative flex flex-col w-full h-screen ">
        {/* admin nav */}
        <div className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 text-white md:h-20 md:px-10 bg-black/85 backdrop-opacity-10 ">
          <div>
            <p className="p-3 text-2xl italic font-bold text-yellow-500 rounded-lg lg:text-3xl animate-pulse ">
              {" "}
              HANDMADE HEAVEN
            </p>
          </div>
          <div className="items-center hidden space-x-5 lg:flex">
            {adminNavLinks?.map((link, index) => (
              <Button
                key={index + link?.link}
                className="italic "
                onClick={() => {
                  navigate(link.link);
                  setRoute(link.link);
                  routeStorage.saveRoute(link.link);
                }}
              >
                {link.title}
              </Button>
            ))}
            <Button className="italic" onClick={handleWildCard}>
              Wild Card to Client
            </Button>
            <LogoutButton />
          </div>
          <div className="block cursor-pointer lg:hidden">
            <AlignJustify
              size={32}
              strokeWidth={2.5}
              onClick={() => setOpenSheet(true)}
            />
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
        height={"h-[40%]"}
      />
    </>
  );
};

export default Admin;
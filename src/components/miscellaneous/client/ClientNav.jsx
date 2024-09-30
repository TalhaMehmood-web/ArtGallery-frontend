import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/miscellaneous/auth/LogoutButton";
import { AlignJustify } from "lucide-react";
import ResNav from "@/components/ui/ResNav";
import { clientNavLinks } from "@/lib/navLinks";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "@/context/UserContext";
import { routeStorage } from "@/utils/routeStorage";

const ClientNav = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setRoute } = useGlobalContext();
  return (
    <div className="flex items-center justify-between w-full h-20 p-4 px-5 text-white bg-black/90">
      <div>
        <p className="text-2xl italic font-bold text-yellow-500 animate-pulse">
          HOMEMADE HEAVEN
        </p>
      </div>
      <div className=" hidden  xl:flex flex-[0.6]  items-center justify-between space-x-4">
        {clientNavLinks?.map((item, index) => (
          <Button
            className={`text-nowrap  ${
              location.pathname === item?.link ? "bg-white text-yellow-500" : ""
            } `}
            onClick={() => {
              navigate(item?.link);
              setRoute(item?.link);
              routeStorage.saveRoute(item?.link);
            }}
            key={item?.link + index}
          >
            {item?.title}
          </Button>
        ))}
        <LogoutButton />
      </div>
      <div className="block cursor-pointer xl:hidden">
        <AlignJustify
          size={32}
          strokeWidth={2.5}
          onClick={() => setOpenSheet(true)}
        />
      </div>
      <ResNav
        navLinks={clientNavLinks}
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        height={"  h-[70%] sm:h-[60%]"}
      />
    </div>
  );
};

export default ClientNav;

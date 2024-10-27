import { Button } from "@/components/ui/button";

import { AlignJustify } from "lucide-react";
import ResNav from "@/components/ui/ResNav";
import { clientNavLinks } from "@/lib/navLinks";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import UserInfo from "@/components/ui/UserInfo";
import { useGlobalContext } from "@/context/UserContext";
const ClientNav = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setReturnURL } = useGlobalContext();
  const handleLogin = () => {
    localStorage.setItem("returnURL", JSON.stringify(location.pathname));
    setReturnURL(location.pathname);
    navigate("/auth");
  };
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
          {user ? <UserInfo /> : <Button onClick={handleLogin}>Login</Button>}
        </div>

        <div className=" hidden  xl:flex flex-[0.6]  items-center justify-between space-x-4">
          {clientNavLinks?.map((item, index) => (
            <Button
              className={`text-nowrap  border-none hover:bg-transparent focus:bg-transparent  bg-transparent ${
                location.pathname === item?.link
                  ? " text-yellow-500 bg-black/30   "
                  : " "
              } `}
              onClick={() => {
                navigate(item?.link);
              }}
              key={item?.link + index}
            >
              {item?.title}
            </Button>
          ))}
          {user && <UserInfo />}
          {!user && <Button onClick={handleLogin}>Login</Button>}
        </div>

        <ResNav
          navLinks={clientNavLinks}
          openSheet={openSheet}
          setOpenSheet={setOpenSheet}
        />
      </div>
    </>
  );
};

export default ClientNav;

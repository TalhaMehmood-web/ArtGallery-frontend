/* eslint-disable react/prop-types */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
const ResNav = ({ openSheet, setOpenSheet, navLinks }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent
        className={`  bg-black/90 text-white border-none `}
        side="top"
      >
        <SheetHeader className="text-white">
          <SheetTitle className="text-xl italic font-bold text-yellow-500">
            <img className="object-cover w-20 h-10" src={logo} alt="logo" />
          </SheetTitle>
          <SheetDescription>
            Navigation Bar to visit the pages . Click on below Links to proceed.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 my-3 space-y-4">
          {navLinks?.map((item, index) => (
            <p
              className={`  cursor-pointer font-semibold text-xl italic ${
                location.pathname === item.link
                  ? "text-yellow-500 animate-pulse"
                  : "text-white hover:text-yellow-300  duration-200 transition-all "
              } `}
              key={item.link + index}
              onClick={() => {
                navigate(item.link);
                setOpenSheet(false);
              }}
            >
              {item.title}
            </p>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResNav;

import ClientNav from "@/components/miscellaneous/client/ClientNav";
import { Outlet } from "react-router-dom";

const Client = () => {
  return (
    <div className="flex flex-col w-full h-screen min-h-screen text-black ">
      {/* Static Navbar */}
      <div className="h-[5rem]">
        <ClientNav />
      </div>
      {/* Scrollable Outlet */}
      <div className="flex-grow overflow-y-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default Client;

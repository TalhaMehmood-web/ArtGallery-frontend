import ClientNav from "@/components/miscellaneous/client/ClientNav";
import { Outlet } from "react-router-dom";

const Client = () => {
  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden text-black ">
      {/* navbar */}
      <div className="h-[5rem]">
        <ClientNav />
      </div>
      <div
        style={{
          height: "calc(100vh - 5rem )",
        }}
        className="relative flex flex-grow max-h-full overflow-y-auto scroll-smooth "
      >
        {<Outlet />}
      </div>
    </div>
  );
};

export default Client;

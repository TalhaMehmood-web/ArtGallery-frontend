import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGlobalContext } from "@/context/UserContext";
import useLogout from "@/hooks/useLogout";
import { FaEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoMdAnalytics } from "react-icons/io";
import EditProfile from "../miscellaneous/auth/EditProfile";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitials from "@/utils/getInitials";
import Loading from "../miscellaneous/loading/Loading";
import { useNavigate } from "react-router-dom";
const UserInfo = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const { handleLogout, isLoading } = useLogout();
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [userSheet, setUserSheet] = useState(false);
  useEffect(() => {
    if (isLoading) {
      setUserSheet(false);
    }
  }, [isLoading]);
  return (
    <>
      <Avatar
        onClick={() => setUserSheet(true)}
        className="border-2 border-yellow-500 rounded-full cursor-pointer"
      >
        <AvatarImage
          className="object-cover"
          src={user?.profile && user?.profile}
          alt="avatar"
        />
        <AvatarFallback className="text-white bg-black rounded-full cursor-pointer ">
          {getInitials(user?.fullname)}
        </AvatarFallback>
      </Avatar>

      <Sheet open={userSheet} onOpenChange={setUserSheet}>
        <SheetContent
          className={
            "bg-black flex text-white border-none flex-col overflow-auto "
          }
        >
          <SheetHeader>
            <SheetTitle className="text-white">Your Profile</SheetTitle>
            <SheetDescription>
              A brief analysis of your profile is here. You can edit your
              profile and logout from here.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col flex-1 space-y-4">
            {/* profile picture */}
            {user?.profile && (
              <div>
                <img
                  src={user?.profile}
                  alt="profile"
                  className="object-cover w-full h-full rounded-full aspect-square"
                />
              </div>
            )}
            <div className="text-2xl italic font-extrabold text-center text-yellow-500 ">
              <p>{user?.fullname}</p>
            </div>
            {/* analytics to be added here */}

            <div className="flex flex-col w-full gap-4">
              {!user?.isAdmin && (
                <div
                  onClick={() => {
                    navigate("/profile");
                    setUserSheet(false);
                  }}
                  className="flex items-center w-full p-3 transition-all duration-300 border-yellow-600 rounded-md cursor-pointer hover:bg-yellow-800/40 gap-x-3 bg-yellow-800/60 "
                >
                  <IoMdAnalytics size={30} className="text-yellow-500" />
                  <p className="text-xl italic font-semibold ">
                    Profile Analytics
                  </p>
                </div>
              )}
              <div
                onClick={() => setOpenProfileDialog(true)}
                className="flex items-center w-full p-3 transition-all duration-300 border-blue-600 rounded-md cursor-pointer hover:bg-blue-800/40 gap-x-3 bg-blue-800/60 "
              >
                <FaEdit size={30} className="text-blue-600" />
                <p className="text-xl italic font-semibold ">Edit Profile</p>
              </div>
              <div
                onClick={handleLogout}
                className="flex items-center w-full p-3 transition-all duration-300 border-red-600 rounded-md cursor-pointer hover:bg-red-800/40 gap-x-3 bg-red-800/60 "
              >
                <FiLogOut size={30} className="text-red-600" />
                <p className="text-xl italic font-semibold ">Logout</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <EditProfile
        openProfileDialog={openProfileDialog}
        setOpenProfileDialog={setOpenProfileDialog}
      />
      {isLoading && (
        <div className="absolute top-0 right-0 z-[9999] w-full min-h-screen  ">
          <Loading />
        </div>
      )}
    </>
  );
};

export default UserInfo;

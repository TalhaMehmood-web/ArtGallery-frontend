/* eslint-disable react/prop-types */
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitials from "@/utils/getInitials";
import EditProfile from "../miscellaneous/auth/EditProfile";
import { useState } from "react";
const UserInfo = ({ userSheet, setUserSheet }) => {
  const { user } = useGlobalContext();
  const { handleLogout } = useLogout();
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  return (
    <>
      <Sheet open={userSheet} onOpenChange={setUserSheet}>
        <SheetContent
          className={"bg-black flex text-white border-none flex-col "}
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
                <Avatar className="w-full h-full rounded-full">
                  <AvatarImage
                    src={user?.profile && user?.profile}
                    alt="avatar"
                  />
                </Avatar>
              </div>
            )}
            <div className="text-2xl italic font-extrabold text-center text-yellow-500 ">
              <p>{user?.fullname}</p>
            </div>
            {/* analytics to be added here */}

            <div className="flex flex-col w-full gap-4">
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
    </>
  );
};

export default UserInfo;

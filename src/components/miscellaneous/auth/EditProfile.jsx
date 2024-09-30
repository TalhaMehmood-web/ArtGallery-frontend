/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/UserContext";
const EditProfile = ({ openProfileDialog, setOpenProfileDialog }) => {
  const { user } = useGlobalContext();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullname: user?.fullname,
      username: user?.username,
      email: user?.email,
      profile: "",
    },
  });
  const onSubmit = () => {};
  return (
    <Dialog open={openProfileDialog} onOpenChange={setOpenProfileDialog}>
      <DialogContent className=" sm:max-w-[50%] bg-black text-white border border-blue-500 flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 p-4 text-white rounded-md shadow-xl shadow-black/10 bg-black/60 "
        >
          <div className="flex flex-col space-y-6">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1">
                <label className="font-semibold" htmlFor="fullname" type="text">
                  Full Name
                </label>
                <Input
                  className="text-white bg-transparent border border-yellow-500"
                  placeholder="John Doe"
                  {...register("fullname")}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-semibold" htmlFor="username" type="text">
                  User Name
                </label>
                <Input
                  className="text-white bg-transparent border border-yellow-500"
                  placeholder="john_doe"
                  {...register("username")}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-semibold" htmlFor="email" type="email">
                Email
              </label>
              <Input
                className="text-white bg-transparent border border-yellow-500"
                placeholder="exapmle@gmai.com"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-semibold" htmlFor="profile">
                Profile Picture
              </label>
              <Input
                className="text-white bg-transparent border border-yellow-500 cursor-pointer"
                type="file"
                {...register("profile")}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;

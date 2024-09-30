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
import { toast } from "sonner";
import { useMutation } from "react-query";
import { updateData } from "@/api/updateData";
import Loading from "../loading/Loading";
const EditProfile = ({ openProfileDialog, setOpenProfileDialog }) => {
  const { user, setUser } = useGlobalContext();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullname: user?.fullname,
      username: user?.username,
      email: user?.email,
      profile: "",
    },
  });
  const EditProfileMutation = useMutation(
    (data) => updateData(`user/edit`, data),
    {
      onSuccess: ({ data }) => {
        if (data) {
          setUser(data);
          setOpenProfileDialog(false);
          reset();
          toast.success("Profile updated Successfully");
        }
      },
      onError: (error) => {
        if (error.response) {
          toast.error("Profile Update failed", {
            description: error.response?.data?.message,
          });
        } else {
          setOpenProfileDialog(false);
          toast.error("Profile update failed", {
            description: "Network Error",
          });
        }
      },
    }
  );
  const onSubmit = async (data) => {
    if (
      !data.profile &&
      user?.fullname === data.fullname.trim() &&
      user?.username === data.username.trim() &&
      user?.email === data.email.trim()
    ) {
      toast.error("Every Thing is up to date ");
      return;
    }
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("profile", data.profile[0]);
    await EditProfileMutation.mutateAsync(formData);
  };
  return (
    <>
      <Dialog open={openProfileDialog} onOpenChange={setOpenProfileDialog}>
        <DialogContent className=" sm:max-w-[800px] bg-black text-white border border-blue-500 flex flex-col">
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
                  <label
                    className="font-semibold"
                    htmlFor="fullname"
                    type="text"
                  >
                    Full Name
                  </label>
                  <Input
                    className="text-white bg-transparent border border-yellow-500"
                    placeholder="John Doe"
                    {...register("fullname")}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    className="font-semibold"
                    htmlFor="username"
                    type="text"
                  >
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
                {EditProfileMutation.isLoading ? "Submitting" : "Submit"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {EditProfileMutation.isLoading && (
        <div className="absolute z-[100] w-full min-h-screen ">
          <Loading />
        </div>
      )}
    </>
  );
};

export default EditProfile;

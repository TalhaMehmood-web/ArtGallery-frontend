/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGlobalContext } from "@/context/UserContext";

const DisplayImageDialog = ({ displayImage, setDisplayImage, children }) => {
  const { selectedPicture } = useGlobalContext();
  return (
    <Dialog open={displayImage} onOpenChange={setDisplayImage}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[80%]  flex bg-black/90 text-white border-none justify-center items-center">
        {/* Add DialogTitle wrapped with VisuallyHidden to make it accessible */}
        <DialogHeader className={"hidden"}>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <img
          src={`${
            import.meta.env.MODE === "production"
              ? import.meta.env.VITE_PRODUCTION_API_URL
              : import.meta.env.VITE_DEV_API_URL
          }admin/pictures/proxy/${selectedPicture?._id}`}
          alt="picture"
          className="object-cover w-full max-h-full p-4 m-4 border-4 border-yellow-500 rounded-md aspect-square "
        />
      </DialogContent>
    </Dialog>
  );
};

export default DisplayImageDialog;

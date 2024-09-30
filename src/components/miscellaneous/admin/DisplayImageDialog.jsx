/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";

const DisplayImageDialog = ({ displayImage, picURL, setDisplayImage }) => {
  return (
    <Dialog open={displayImage} onOpenChange={setDisplayImage}>
      <DialogContent className="sm:max-w-[600px] h-[80%]  flex bg-black/90 text-white border-none justify-center items-center">
        {/* Add DialogTitle wrapped with VisuallyHidden to make it accessible */}
        <DialogHeader className={"hidden"}>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <img
          src={picURL}
          alt="picture"
          className="object-cover border-4 m-4 border-yellow-500  p-4 rounded-md w-full h-full  aspect-square "
        />
      </DialogContent>
    </Dialog>
  );
};

export default DisplayImageDialog;

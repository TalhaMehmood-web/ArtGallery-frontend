import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FiEdit, FiTrash2, FiEye, FiAward } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/UserContext";
import PictureAuctions from "./PictureAuctions";
import DisplayImageDialog from "./DisplayImageDialog";
import EditPictureDetails from "./EditPictureDetails";
import DeletePicture from "./DeletePicture";

const PictureActionButton = () => {
  const [displayImage, setDisplayImage] = useState(false);
  const [editPicture, setEditPicture] = useState(false);
  const [openAuction, setOpenAuction] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [openActionButton, setOpenActionButton] = useState(false);

  const { selectedPicture } = useGlobalContext();

  const handleMenuItemClick = (callback) => {
    setOpenActionButton(false); // Close the dropdown
    setTimeout(callback, 300); // Call the passed callback to open the dialog after a delay
  };

  return (
    <>
      <DropdownMenu open={openActionButton} onOpenChange={setOpenActionButton}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setOpenActionButton(true)}
            className="text-white bg-yellow-500 focus:text-white focus:bg-yellow-500 hover:text-yellow-500 hover:bg-transparent "
          >
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel> Picture Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* View Picture */}
            <DropdownMenuItem
              onClick={() => handleMenuItemClick(() => setDisplayImage(true))}
            >
              <FiEye className="mr-2" />
              <span>View Picture</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* Edit Picture */}
            <DropdownMenuItem
              onClick={() => handleMenuItemClick(() => setEditPicture(true))}
            >
              <FiEdit className="mr-2" />
              <span>Edit Product</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* Delete Picture */}
            <DropdownMenuItem
              onClick={() => handleMenuItemClick(() => setDeleteDialog(true))}
            >
              <FiTrash2 className="mr-2" />
              <span>Delete Product</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>

            {/* Activate Auction */}
            <DropdownMenuItem
              onClick={() => handleMenuItemClick(() => setOpenAuction(true))}
            >
              <FiAward className="mr-2" />
              <span>Activate Auction</span>
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog Components */}
      <DisplayImageDialog
        displayImage={displayImage}
        picURL={selectedPicture?.picture}
        setDisplayImage={setDisplayImage}
      />

      <EditPictureDetails
        picture={selectedPicture}
        editPicture={editPicture}
        setEditPicture={setEditPicture}
      />

      <DeletePicture
        deleteDialog={deleteDialog}
        setDeleteDialog={setDeleteDialog}
      />

      <PictureAuctions
        openAuction={openAuction}
        setOpenAuction={setOpenAuction}
        pictureId={selectedPicture?._id}
      />
    </>
  );
};

export default PictureActionButton;

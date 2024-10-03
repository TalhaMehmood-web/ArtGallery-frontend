/* eslint-disable react/prop-types */
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
import { useState } from "react";
const PictureActionButton = ({
  setDeleteDialog,
  setDisplayImage,
  setEditPicture,
  setOpenAuction,
}) => {
  const [openActionButton, setOpenActionButton] = useState(false);
  const handleClick = () => {
    setOpenActionButton(true);
    setOpenAuction(false);
    setEditPicture(false);
    setDisplayImage(false);
    setDeleteDialog(false);
  };
  return (
    <DropdownMenu open={openActionButton} onOpenChange={setOpenActionButton}>
      <DropdownMenuTrigger>
        <Button
          onClick={handleClick}
          className="text-white bg-yellow-500 focus:text-white focus:bg-yellow-500 hover:text-yellow-500 hover:bg-transparent "
        >
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel> Picture Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setDisplayImage(true);
              setOpenActionButton(false);
            }}
          >
            <FiEye className="mr-2" />
            <span>View Details</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setEditPicture(true);
              setOpenActionButton(false);
            }}
          >
            <FiEdit className="mr-2" />
            <span>Edit Product</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDeleteDialog(true);
              setOpenActionButton(false);
            }}
          >
            <FiTrash2 className="mr-2" />
            <span>Delete Product</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpenAuction(true);
              setOpenActionButton(false);
            }}
          >
            <FiAward className="mr-2" />
            <span>Activate Auction</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PictureActionButton;

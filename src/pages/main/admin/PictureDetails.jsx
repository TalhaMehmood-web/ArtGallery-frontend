import { useState } from "react";
import { FiEdit, FiTrash2, FiEye, FiAward } from "react-icons/fi";
import { useGlobalContext } from "@/context/UserContext";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const PictureDetails = () => {
  const { selectedPicture } = useGlobalContext();

  return (
    <div className="flex-1 p-4 bg-white sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
        <img
          src={selectedPicture?.picture}
          alt={selectedPicture?.title}
          className="object-cover object-center w-full h-96 "
        />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedPicture?.title}
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-white bg-yellow-500 focus:text-white focus:bg-yellow-500 hover:text-yellow-500 hover:bg-transparent ">
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel> Picture Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <FiEye className="mr-2" />
                    <span>View Details</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FiEdit className="mr-2" />
                    <span>Edit Product</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FiTrash2 className="mr-2" />
                    <span>Delete Product</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FiAward className="mr-2" />
                    <span>Activate Auction</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="mb-4 text-gray-600">{selectedPicture?.description}</p>
          <div className="flex flex-wrap mb-4 -mx-2">
            <div className="w-full px-2 mb-4 sm:w-1/2 sm:mb-0">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Price
              </h2>
              <p className="text-2xl font-bold text-yellow-500">
                ${selectedPicture?.price}
              </p>
            </div>
            <div className="w-full px-2 sm:w-1/2">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Category
              </h2>
              <p className="text-gray-600">{selectedPicture?.category?.name}</p>
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Created At
            </h2>
            <p className="text-gray-600">
              {formatDate(selectedPicture?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureDetails;

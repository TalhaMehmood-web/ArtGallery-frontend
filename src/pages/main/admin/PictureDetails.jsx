import { useState } from "react";
import { FiEdit, FiTrash2, FiEye, FiAward } from "react-icons/fi";
import { format } from "date-fns";
import { useGlobalContext } from "@/context/UserContext";

const PictureDetails = () => {
  const { selectedPicture } = useGlobalContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(selectedPicture);
  const handleViewDetails = () => {
    console.log("Viewing product details");
  };

  const handleEditProduct = () => {
    console.log("Editing product");
  };

  const handleDeleteProduct = () => {
    console.log("Deleting product");
  };

  const handleActivateAuction = () => {
    console.log("Activating auction");
  };

  return (
    <div className="flex-1 p-4 bg-white sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
        <img
          src={selectedPicture?.picture}
          alt={selectedPicture?.title}
          className="object-cover object-center w-full h-64"
        />
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedPicture?.title}
            </h1>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 text-black transition-colors duration-200 bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                aria-label="Product actions"
              >
                Actions
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
                  <div className="py-1">
                    <button
                      onClick={handleViewDetails}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-yellow-100"
                    >
                      <FiEye className="mr-2" /> View Details
                    </button>
                    <button
                      onClick={handleEditProduct}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-yellow-100"
                    >
                      <FiEdit className="mr-2" /> Edit Product
                    </button>
                    <button
                      onClick={handleDeleteProduct}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-yellow-100"
                    >
                      <FiTrash2 className="mr-2" /> Delete Product
                    </button>
                    <button
                      onClick={handleActivateAuction}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-yellow-100"
                    >
                      <FiAward className="mr-2" /> Activate Auction
                    </button>
                  </div>
                </div>
              )}
            </div>
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
            <p className="text-gray-600">{selectedPicture?.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureDetails;

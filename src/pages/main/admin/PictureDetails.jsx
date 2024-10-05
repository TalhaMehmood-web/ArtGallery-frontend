import { useGlobalContext } from "@/context/UserContext";
import { formatDate } from "@/utils/formatDate";
import PictureActionButton from "@/components/miscellaneous/admin/PictureActionButton";
import { Button } from "@/components/ui/button";
import PictureAuctions from "@/components/miscellaneous/admin/PictureAuctions";
import { useState } from "react";
import { FiAward } from "react-icons/fi";
const PictureDetails = () => {
  const { selectedPicture } = useGlobalContext();
  const [openAuction, setOpenAuction] = useState(false);

  return (
    <>
      <div className="flex-1 p-4 bg-white sm:p-6 lg:p-8">
        <div className="max-w-6xl  mx-auto overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
          {/* Adjusting the layout to use flex */}
          <div className="flex  md:flex-row flex-col">
            {/* Image Section */}
            <div className="md:w-1/2 w-full ">
              <img
                src={`${
                  import.meta.env.MODE === "production"
                    ? import.meta.env.VITE_PRODUCTION_API_URL
                    : import.meta.env.VITE_DEV_API_URL
                }admin/pictures/proxy/${selectedPicture?._id}`}
                alt={selectedPicture?.title}
                className="object-cover object-center w-full h-full rounded-md aspect-square"
              />
            </div>
            {/* Text (Title & Description) Section */}
            <div className="flex flex-col justify-around w-full md:w-1/2 p-4">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {selectedPicture?.title}
              </h1>
              <p className="mb-4 text-lg text-gray-600">
                {selectedPicture?.description}
              </p>
              <div className="flex items-start justify-between mb-4">
                <PictureActionButton />
                <Button
                  onClick={() => setOpenAuction(true)}
                  className="flex items-center bg-yellow-500 focus:text-white focus:bg-yellow-500 hover:text-yellow-500 hover:bg-transparent "
                >
                  <FiAward className="mr-2" /> Add To Auction
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="p-6">
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
                <p className="text-gray-600">
                  {selectedPicture?.category?.name}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mb-4 -mx-2">
              <div className="w-full px-2 mb-4 sm:w-1/2 sm:mb-0">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Created At
                </h2>
                <p className="text-gray-600">
                  {formatDate(selectedPicture?.createdAt)}
                </p>
              </div>
              <div className="w-full px-2 sm:w-1/2">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Type
                </h2>
                <p className="text-gray-600 text-sm italic font-extrabold">
                  {selectedPicture?.type.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PictureAuctions
        openAuction={openAuction}
        setOpenAuction={setOpenAuction}
        pictureId={selectedPicture?._id}
      />
    </>
  );
};

export default PictureDetails;

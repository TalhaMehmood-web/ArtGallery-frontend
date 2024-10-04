import { useGlobalContext } from "@/context/UserContext";
import { formatDate } from "@/utils/formatDate";

import PictureActionButton from "@/components/miscellaneous/admin/PictureActionButton";

const PictureDetails = () => {
  const { selectedPicture } = useGlobalContext();

  return (
    <>
      <div className="flex-1 p-4 bg-white sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg">
          <img
            src={selectedPicture?.picture}
            alt={selectedPicture?.title}
            className="object-cover object-center w-full mx-auto rounded-md max-w-[800px] aspect-auto h-[30rem] "
          />
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedPicture?.title}
              </h1>
              <PictureActionButton />
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
                <p className="text-gray-600">
                  {selectedPicture?.category?.name}
                </p>
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
    </>
  );
};

export default PictureDetails;

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGlobalContext } from "@/context/UserContext";
import { formatDate } from "@/utils/formatDate";
const PictureDetailsClient = () => {
  const { openPictureDrawer, selectedPicture, setOpenPictureDrawer } =
    useGlobalContext();

  return (
    <Drawer open={openPictureDrawer} onOpenChange={setOpenPictureDrawer}>
      <DrawerContent className="h-[90%]  text-white bg-black border-black border  ">
        <DrawerHeader className="hidden">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="w-full h-full overflow-y-auto ">
          <div className="container grid w-full h-full max-w-5xl grid-cols-1 p-3 mx-auto">
            <div className="grid grid-cols-1 gap-4 ">
              {/* image */}

              <img
                className="object-contain  md:h-[500px] mx-auto rounded-md "
                src={selectedPicture?.picture}
                alt={selectedPicture?.title}
              />

              {/* title, description, etc */}
              <div className="grid grid-cols-1 p-2">
                <p className="mb-2 text-3xl font-bold text-white">
                  {selectedPicture?.title}
                </p>
                <p className="mb-4 text-lg text-gray-300 max-h-[350px] overflow-y-auto ">
                  {selectedPicture?.description}
                </p>
              </div>
            </div>
            {/* bottom */}

            <div className="p-6">
              <div className="flex flex-wrap mb-4 -mx-2">
                <div className="w-full px-2 mb-4 sm:w-1/2 sm:mb-0">
                  <h2 className="mb-2 text-lg font-semibold text-gray-100">
                    Price
                  </h2>
                  <p className="text-2xl font-bold text-yellow-500">
                    ${selectedPicture?.price}
                  </p>
                </div>
                <div className="w-full px-2 sm:w-1/2">
                  <h2 className="mb-2 text-lg font-semibold text-gray-100">
                    Category
                  </h2>
                  <p className="text-gray-600">
                    {selectedPicture?.category?.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap mb-4 -mx-2">
                <div className="w-full px-2 mb-4 sm:w-1/2 sm:mb-0">
                  <h2 className="mb-2 text-lg font-semibold text-gray-100">
                    Created At
                  </h2>
                  <p className="text-gray-600">
                    {formatDate(selectedPicture?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PictureDetailsClient;

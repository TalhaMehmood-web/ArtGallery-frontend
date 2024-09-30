/* eslint-disable react/prop-types */

import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";

const BiddersSheet = ({ isOpen, onClose, selectedAuction }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className={"bg-black text-white border-none"}>
        <SheetHeader>
          <SheetTitle className={"text-white"}>Remaining Bidders</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col w-full h-full">
          <div className="p-2 border border-yellow-500 rounded-md ">
            <img
              src={selectedAuction?.picture}
              className="object-cover rounded-md aspect-square "
              alt=""
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BiddersSheet;

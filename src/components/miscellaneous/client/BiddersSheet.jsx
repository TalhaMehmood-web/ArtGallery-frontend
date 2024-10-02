/* eslint-disable react/prop-types */

import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetDescription,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitials from "@/utils/getInitials";
const BiddersSheet = ({ isOpen, onClose, selectedAuction }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className={
          "bg-black flex flex-1 flex-col w-full h-full text-white border-none sm:max-w-sm"
        }
      >
        <SheetHeader>
          <SheetTitle className={"text-white"}>Remaining Bidders</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col w-full h-full flex-1 ">
          <div className="p-2 border border-yellow-500 rounded-md ">
            <img
              src={selectedAuction?.picture}
              className={`object-cover rounded-md aspect-square ${
                imageLoading ? "hidden" : "block"
              } `}
              alt="auctionPicture"
              onLoad={() => setImageLoading(false)}
            />
            {imageLoading && (
              <Skeleton className={"w-full h-[350px] bg-slate-700"} />
            )}
          </div>
          <div>
            {selectedAuction?.otherBids?.length === 0 ? (
              <div className="flex flex-1 justify-center items-center">
                <p>No other bidders for this auction</p>
              </div>
            ) : (
              <div className="flex flex-1  p-3 my-2">
                <div className="grid grid-cols-1 gap-2 w-full">
                  {selectedAuction?.otherBids?.map((bid, index) => (
                    <div
                      className="grid grid-cols-4 w-full border-b border-slate-800 p-2 rounded-md "
                      key={bid?._id + index}
                    >
                      <Avatar className="border-2  border-yellow-500 rounded-full cursor-pointer ">
                        <AvatarImage
                          className="object-cover"
                          src={bid?.bidder?.profile}
                          alt="avatar"
                        />
                        <AvatarFallback className="text-white bg-black rounded-full cursor-pointer ">
                          {getInitials(bid?.bidder?.fullname)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-semibold flex justify-start items-start gap-2 italic col-span-3 flex-col ">
                        <p className="md:text-xl text-lg  ">
                          {bid?.bidder?.fullname}
                        </p>
                        <p className="text-base   ">
                          Bid Amount is ${bid?.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BiddersSheet;

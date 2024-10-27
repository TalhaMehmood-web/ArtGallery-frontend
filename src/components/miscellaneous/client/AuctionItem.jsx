/* eslint-disable react/prop-types */
import AuctionTimer from "@/components/miscellaneous/client/AuctionTimer";
import { Button } from "@/components/ui/button";
import AddBid from "./AddBid";
import { useState } from "react";
import ViewBidders from "./ViewBidders";
import { Skeleton } from "@/components/ui/skeleton";

const AuctionItem = ({ item }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 p-2 border-b rounded-md md:grid-cols-6 lg:grid-cols-5 ">
        {/* Image section: Takes 2 columns on medium and larger screens */}
        <div className="flex items-center col-span-1 md:col-span-3 lg:col-span-2 ">
          {imageLoading && (
            <div className="flex flex-1">
              <Skeleton className="w-full h-[500px] bg-slate-600" />
            </div>
          )}
          <img
            className={`object-cover rounded-md border h-full  aspect-square   w-full ${
              imageLoading ? "hidden" : "block"
            } `}
            src={item?.picture?.picture}
            alt=""
            onLoad={() => setImageLoading(false)}
          />
        </div>

        {/* Content section: Takes 3 columns on medium and larger screens */}
        <div className="flex flex-col w-full h-full col-span-1 gap-2 lg:gap-4 md:col-span-3 md:justify-around">
          <div className="flex flex-col p-3 space-y-2 border rounded-md border-slate-400 ">
            <p className="text-3xl font-bold">{item?.picture.title}</p>
            <p className="text-sm italic md:text-base lg:text-xl text-pretty">
              {item?.picture.description}
            </p>
          </div>
          <div className="px-4 py-4 text-white bg-black w-fit rounded-xl">
            <p className="text-lg italic font-semibold md:font-bold lg:font-extrabold sm:text-xl md:text-2xl lg:text-3xl">
              Starting Bid Price: ${item?.picture.price}
            </p>
          </div>

          <div>
            <AuctionTimer endDate={item.endDate} />
          </div>

          <div className="flex flex-col items-center w-full gap-4 md:flex-row ">
            <Button
              onClick={() => setOpenDialog(true)}
              className="w-full text-base italic font-semibold text-white bg-yellow-500"
            >
              Offer a bid
            </Button>
            <Button
              onClick={() => setOpenSheet(true)}
              className="w-full text-base italic font-semibold text-white bg-green-500 border-green-500 hover:text-green-500 "
            >
              View All Bidders
            </Button>
          </div>
        </div>
      </div>
      <AddBid
        auctionId={item?._id}
        basePrice={item?.picture.price}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
      <ViewBidders
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        auctionId={item?._id}
        picture={item?.picture?.picture}
      />
    </>
  );
};

export default AuctionItem;

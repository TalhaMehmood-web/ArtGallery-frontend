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
      <div className="flex flex-col items-start w-full p-2 space-y-4 border-b rounded-md lg:space-x-8 lg:flex-row">
        <div className="flex w-full">
          {imageLoading && (
            <div className="flex flex-1">
              <Skeleton className={"w-full h-[500px] bg-slate-600"} />
            </div>
          )}
          <img
            className={`object-cover rounded-md sm:min-w-[450px] aspect-square ${
              imageLoading ? "hidden" : "block"
            } `}
            src={item?.picture?.picture}
            alt=""
            onLoad={() => setImageLoading(false)}
          />
        </div>

        <div className="flex flex-col h-full gap-4 lg:gap-0 lg:justify-around">
          <div className="flex flex-col p-3 space-y-2 border rounded-md border-slate-400 ">
            <p className="text-3xl font-bold">{item?.picture.title}</p>
            <p className="text-xl italic text-pretty ">
              {item?.picture.description}
            </p>
          </div>
          <div className="px-4 py-4 text-white bg-black w-fit rounded-xl">
            <p className="text-3xl italic font-extrabold ">
              Starting Bid Price: ${item?.picture.price}
            </p>
          </div>

          <div>
            {/* Timer Component */}
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
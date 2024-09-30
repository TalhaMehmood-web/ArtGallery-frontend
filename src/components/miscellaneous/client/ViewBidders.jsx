/* eslint-disable react/prop-types */
import { fetchData } from "@/api/fetchData";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useQuery } from "react-query";
import BidItem from "./BidItem";
import { useGlobalContext } from "@/context/UserContext";
const ViewBidders = ({ openSheet, setOpenSheet, auctionId, picture }) => {
  const { user } = useGlobalContext();
  const { data: bidders } = useQuery(["bidders", auctionId], () =>
    fetchData(`auction/bidders/${auctionId}`)
  );
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent
        className={
          "bg-black text-white border-none sm:max-w-xl overflow-y-auto scroll  "
        }
      >
        <SheetHeader>
          <SheetTitle className="text-white">
            Highest Bid Price raised uptil : ${bidders?.highestBid?.amount} by{" "}
            {bidders?.highestBid?.bidder?.fullname}{" "}
            {bidders?.highestBid?.bidder?._id === user?._id && "(You)"}
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex w-full max-h-full   ">
          <div className="flex flex-col  mt-4 p-2 space-y-3  ">
            <div className="border border-yellow-500 rounded-md p-2 ">
              <img
                src={picture}
                alt="picture"
                className="rounded-md object-cover   aspect-square "
              />
            </div>
            {/* highest bidder */}
            <BidItem bidItem={bidders?.highestBid} isHighestBidder={true} />
            {/* other bidders */}
            <div className="flex flex-col space-y-3 border-t border-slate-800 pt-3">
              {bidders?.allBids?.map((bid) => (
                <BidItem bidItem={bid} isHighestBidder={false} key={bid?._id} />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewBidders;

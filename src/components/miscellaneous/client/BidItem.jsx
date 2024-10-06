/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import getInitials from "@/utils/getInitials";

const BidItem = ({ bidItem, isHighestBidder }) => {
  return (
    <div className="grid w-full grid-cols-4 p-2 border-b rounded-md border-slate-800 ">
      <Avatar className="border-2 border-yellow-500 rounded-full cursor-pointer ">
        <AvatarImage
          className="object-cover"
          src={bidItem?.bidder?.profile}
          alt={bidItem?.bidder?.fullname}
        />
        <AvatarFallback className="text-white bg-black rounded-full cursor-pointer ">
          {bidItem && getInitials(bidItem?.bidder?.fullname)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-start col-span-2 gap-2 italic font-semibold ">
        <p className="text-lg md:text-xl ">{bidItem?.bidder?.fullname}</p>
        <p className="text-xs sm:text-base">Bid Amount is ${bidItem?.amount}</p>
      </div>
      {isHighestBidder && (
        <Badge className={"h-fit"} variant={"success"}>
          Rank 1
        </Badge>
      )}
    </div>
  );
};

export default BidItem;

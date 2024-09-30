/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitials from "@/utils/getInitials";
import { Check } from "lucide-react";
const BidItem = ({ bidItem, isHighestBidder }) => {
  return (
    <div className={`flex items-start   space-x-4`}>
      <Avatar className="rounded-full">
        <AvatarImage src="" alt="avatar" />
        <AvatarFallback className="rounded-full text-black ">
          {bidItem && getInitials(bidItem?.bidder?.fullname)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-lg italic font-semibold">
          {bidItem?.bidder?.fullname}
        </p>
        <p
          className={`text-lg italic font-semibold ${
            isHighestBidder ? "text-green-600" : "text-red-600"
          }`}
        >
          Bid Amount : ${bidItem?.amount}
        </p>
      </div>
      {isHighestBidder && (
        <div className="text-green-300    space-x-3 flex items-center bg-green-700/80 p-1 border rounded-md border-green-500">
          <p className="text-sm font-semibold italic">Highest Bidder</p>
          <Check size={20} className="" />
        </div>
      )}
    </div>
  );
};

export default BidItem;

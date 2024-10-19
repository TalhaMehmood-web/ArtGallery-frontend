/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const getRemainingTime = (endDate) => {
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  const distance = end - now;

  if (distance < 0) return null; // Auction has ended

  const totalHours = Math.floor(distance / (1000 * 60 * 60));
  const hours = totalHours % 24;
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    totalHours,
    hours,
    minutes,
    seconds: String(seconds).padStart(2, "0"), // Ensures seconds are in '00' format
  };
};

const AuctionTimer = ({ endDate }) => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(getRemainingTime(endDate));
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [endDate]);

  if (!remainingTime) {
    return <p className="text-xl text-red-500">Auction has ended</p>;
  }

  return (
    <div className="flex flex-col p-4 space-y-4 border border-yellow-500 rounded-md w-fit">
      <p className="text-sm italic font-bold text-red-600  md:text-xl lg:text-3xl">
        Bid closing Date:
        {new Date(endDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long", // Displays the month in English (e.g., January)
          year: "numeric",
        })}
      </p>
      <p className="text-sm italic font-bold lg:text-xl">
        Remaining Time {">"} {remainingTime.totalHours} hours :{" "}
        {remainingTime.minutes} minutes : {remainingTime.seconds} seconds
      </p>
    </div>
  );
};

export default AuctionTimer;

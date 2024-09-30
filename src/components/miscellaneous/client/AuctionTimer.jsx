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
    <div className="border border-yellow-500 flex flex-col space-y-4 w-fit p-4 rounded-md">
      <p className="text-red-600 text-xl lg:text-3xl font-bold italic">
        Bid closing Date:{" "}
        {new Date(endDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long", // Displays the month in English (e.g., January)
          year: "numeric",
        })}
      </p>
      <p className="text-xl italic font-bold">
        Remaining Time :--- {remainingTime.totalHours} hours :{" "}
        {remainingTime.minutes} minutes : {remainingTime.seconds} seconds
      </p>
    </div>
  );
};

export default AuctionTimer;

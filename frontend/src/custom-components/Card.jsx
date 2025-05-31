import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <>
     <Link
  to={`/auction/item/${id}`}
  className="flex bg-white group rounded-xl shadow-md hover:shadow-lg transition-all duration-300 sm:basis-56 lg:basis-60 2xl:basis-80"
>
  <div className="w-[300px] pt-6 pb-4 flex flex-col items-center justify-center border border-gray-200 rounded-xl overflow-hidden">
    {/* Image Section */}
    <div className="flex items-center justify-center h-[200px] w-full ">
      <img
        src={imgSrc}
        alt={title}
        className="w-[250px] h-[250px] object-contain"
      />
    </div>
    {/* Content Section */}
    <div className="px-4 pt-6 pb-4 text-center">
      <h5 className="font-semibold text-[18px] group-hover:text-[#A8D532] mb-2 text-gray-800">
        {title}
      </h5>
      {startingBid && (
        <p className="text-stone-600 font-light">
          Starting Bid: Rs. {" "}
          <span className="text-[#A8D532] font-bold ml-1">
            {startingBid}
          </span>
        </p>
      )}
      <p className="text-stone-600 font-light">
        {timeLeft.type}
        {Object.keys(timeLeft).length > 1 ? (
          <span className="text-[#D21B1B] font-bold ml-1">
            {formatTimeLeft(timeLeft)}
          </span>
        ) : (
          <span className="text-[#D21B1B] font-bold ml-1">Time's up!</span>
        )}
      </p>
    </div>
  </div>
</Link>
    </>
  );
};

export default Card;
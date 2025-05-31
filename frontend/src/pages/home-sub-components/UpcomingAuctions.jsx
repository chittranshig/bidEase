import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <>
      <section className="w-full">
  <div className="bg-[#2D3142] w-full p-4 gap-3 rounded-md">
    {/* Auctions for Today Heading */}
    <div className="flex justify-center items-center mb-6">
      <h3 className="text-center text-xl font-semibold min-[480px]:text-2xl md:text-3xl lg:text-4xl">
        <span className="text-[#A8D532]">Auctions for</span>{" "}
        <span className="text-white">Today</span>
      </h3>
    </div>

    {/* Auctions List */}
    <div className="flex flex-wrap gap-6 justify-center">
      {auctionsStartingToday.map((element, index) => (
        <Link
          to={`/auction/item/${element._id}`}
          key={element._id}
          className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] flex flex-col gap-4 bg-white p-4 rounded-md hover:shadow-lg transition-all duration-300"
        >
          {/* Auction Item */}
          <div className="flex items-center gap-4">
            <img
              src={element.image?.url}
              alt={element.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <p className="font-light text-[#111] text-sm">{element.title}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-stone-600 font-medium">Starting Bid:</p>
            <p className="text-[#a7d532a3] font-semibold">
              Rs. {element.startingBid}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-stone-600 font-bold">Starting Time:</p>
            <p className="text-black text-sm">{element.startTime}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
    </>
  );
};

export default UpcomingAuctions;
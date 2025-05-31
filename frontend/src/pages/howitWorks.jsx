import React from 'react'
import {
    FaUser,
    FaGavel,
    FaHandHoldingUsd,
    FaEnvelope,
    FaRedo,
  } from "react-icons/fa";
const HowitWorks = () => {
    const steps = [
        {
          icon: <FaUser />,
          title: "User Registration",
          description:
            "Users must register or log in to perform operations such as posting auctions and bidding on items.",
        },
        {
            icon: <FaGavel />,
            title: "Live Auctions",
            description:
              "Participate in live auctions and place your bids to compete for your desired items.",
          },
          {
            icon: <FaHandHoldingUsd />,
            title: "Sell Your Items",
            description:
              "Easily list your items for auction and attract buyers from a broad community of bidders.",
          },
        {
          icon: <FaEnvelope />,
          title: "Winning Bid Notification",
          description:
            "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer.",
        },
        {
          icon: <FaRedo />,
          title: "Reposting Items",
          description:
            "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
        },
      ];
  return (
    <>
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-gray-50">
  <h1
    className="text-gray-800 text-2xl font-bold mb-4 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl"
  >
    Discover How bidEase Operates
  </h1>
  <div className="flex flex-col gap-6 my-6">
    {steps.map((element, index) => {
      return (
        <div
          key={index}
          className="bg-white rounded-lg p-4 lg:p-6 flex flex-col gap-4 group hover:bg-[#A8D532] transition-all duration-300 shadow-md"
        >
          <div className="bg-[#A8D532] text-white p-3 text-xl rounded-full w-fit group-hover:bg-[#4CAF50] transition-all duration-300">
            {element.icon}
          </div>
          <h3
            className="text-gray-800 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl group-hover:text-white transition-all duration-300"
          >
            {element.title}
          </h3>
          <p className="text-gray-600 text-lg group-hover:text-white transition-all duration-300">
            {element.description}
          </p>
        </div>
      );
    })}
  </div>
</section>
  </>
  )
}

export default HowitWorks

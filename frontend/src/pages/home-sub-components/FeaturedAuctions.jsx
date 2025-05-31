 import Card from "@/custom-components/Card";
 import React from "react";
 import { useSelector } from "react-redux";

 const FeaturedAuctions = () => {
   const { allAuctions, loading } = useSelector((state) => state.auction);
  return (
        <>
     <section className="my-8">
      <div className="bg-[#2D3142] w-full p-4 gap-3 rounded-md">
  {/* Featured Auctions Heading */}
  <div className="flex flex-wrap gap-6 justify-center">
    <h3 className="text-[#A8D532]  pb-5 text-center text-xl font-semibold min-[480px]:text-2xl md:text-3xl lg:text-4xl">
      Featured Auctions
    </h3>
  </div>

  {/* Featured Auctions Cards */}
  <div className="flex flex-wrap gap-6 justify-center">
    {allAuctions.slice(0, 8).map((element) => (
      <Card
        title={element.title}
        imgSrc={element.image?.url}
        startTime={element.startTime}
        endTime={element.endTime}
        startingBid={element.startingBid}
        id={element._id}
        key={element._id}
        className="w-full sm:w-[48%] lg:w-[30%] xl:w-[22%] bg-white p-4 rounded-md hover:shadow-lg transition-all duration-300"
      />
    ))}
  </div>
  </div>
</section>
  </>
 );
};
 export default FeaturedAuctions;
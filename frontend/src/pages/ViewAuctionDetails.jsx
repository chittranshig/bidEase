import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated ) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <>
     <section className="w-full h-fit px-6 pt-20 lg:pl-[320px] flex flex-col bg-gray-50">
  {/* Breadcrumb Navigation */}
  <div className="text-[16px] flex flex-wrap gap-2 items-center mb-6">
    <Link
      to="/"
      className="font-semibold text-gray-700 transition-all duration-300 hover:text-[#A8D532]"
    >
      Home
    </Link>
    <FaGreaterThan className="text-gray-400" />
    <Link
      to={"/view-my-auctions"}
      className="font-semibold text-gray-700 transition-all duration-300 hover:text-[#A8D532]"
    >
      My Auctions
    </Link>
    <FaGreaterThan className="text-gray-400" />
    <p className="text-gray-500">{auctionDetail.title}</p>
  </div>

  {/* Main Content */}
  {loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col gap-8 2xl:flex-row">
      {/* Auction Details */}
      <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6">
            <img
              src={auctionDetail.image?.url}
              alt={auctionDetail.title}
              className="max-h-40 object-contain"
            />
          </div>
          <div className="flex flex-col justify-around">
            <h3 className="text-gray-800 text-2xl lg:text-3xl font-bold mb-2">
              {auctionDetail.title}
            </h3>
            <p className="text-lg text-gray-700 font-medium">
              Condition:{" "}
              <span className="text-[#A8D532] font-semibold">
                {auctionDetail.condition}
              </span>
            </p>
            <p className="text-lg text-gray-700 font-medium">
              Minimum Bid:{" "}
              <span className="text-[#A8D532] font-semibold">
                Rs.{auctionDetail.startingBid}
              </span>
            </p>
          </div>
        </div>
        <h4 className="text-gray-800 text-xl font-bold mt-6">
          Auction Item Description
        </h4>
        <hr className="my-4 border-gray-300" />
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
          {auctionDetail.description &&
            auctionDetail.description.split(". ").map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
        </ul>
      </div>

      {/* Bids Section */}
      <div className="flex-1">
        <header className="bg-[#A8D532] text-white py-4 px-6 rounded-t-lg text-2xl font-bold">
          BIDS
        </header>
        <div className="bg-white shadow-lg rounded-b-lg p-6 min-h-[650px]">
          {auctionBidders &&
          auctionBidders.length > 0 &&
          new Date(auctionDetail.startTime) < Date.now() &&
          new Date(auctionDetail.endTime) > Date.now() ? (
            auctionBidders.map((element, index) => (
              <div
                key={index}
                className="py-4 flex items-center justify-between border-b border-gray-200 last:border-none"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={element.profileImage}
                    alt={element.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-lg font-semibold text-gray-800">
                    {element.userName}
                  </p>
                </div>
                <p className="text-lg text-gray-700">{element.amount}</p>
                <p
                  className={`text-lg font-semibold ${
                    index === 0
                      ? "text-green-600"
                      : index === 1
                      ? "text-blue-600"
                      : index === 2
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {index === 0
                    ? "1st"
                    : index === 1
                    ? "2nd"
                    : index === 2
                    ? "3rd"
                    : `${index + 1}th`}
                </p>
              </div>
            ))
          ) : Date.now() < new Date(auctionDetail.startTime) ? (
            <div className="flex justify-center items-center h-full">
              <img
                src="/notStarted.png"
                alt="Auction Not Started"
                className="max-h-96"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <img
                src="/auctionEnded.png"
                alt="Auction Ended"
                className="max-h-96"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )}
</section>
    </>
  );
};

export default ViewAuctionDetails;
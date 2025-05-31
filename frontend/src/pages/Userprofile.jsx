import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      <section className="w-full min-h-screen px-6 pt-20 lg:pl-[320px] flex flex-col items-center bg-gray-50">
  {/* Loading Spinner */}
  {loading ? (
    <Spinner />
  ) : (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <img
          src={user.profileImage?.url || "/imageHolder.jpg"}
          alt="Profile"
          className="w-36 h-36 rounded-full border-2 border-[#A8D532] object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          {user.userName || "User"}
        </h1>
        <p className="text-gray-600">{user.email || "user@example.com"}</p>
      </div>

      {/* Personal Details Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Personal Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={user.userName}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={user.email}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              value={user.phone}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={user.address}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Joined On
            </label>
            <input
              type="text"
              value={user.createdAt?.substring(0, 10)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Payment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <input
              type="text"
              value={user.paymentMethods?.bankTransfer?.bankName || "N/A"}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bank Account
            </label>
            <input
              type="text"
              value={
                user.paymentMethods?.bankTransfer?.bankAccountNumber || "N/A"
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Holder Name
            </label>
            <input
              type="text"
              value={
                user.paymentMethods?.bankTransfer?.bankAccountName || "N/A"
              }
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Other User Details Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Other User Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Auctions Won
            </label>
            <input
              type="text"
              value={user.auctionsWon || "0"}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Money Spent
            </label>
            <input
              type="text"
              value={`Rs. ${user.moneySpent || "0"}`}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )}
</section>
    </>
  );
};

export default UserProfile;
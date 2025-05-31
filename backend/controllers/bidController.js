import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auctionSchema.js";
import { Bid } from "../models/bidSchema.js";
import { User } from "../models/userSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params; // Auction item ID
  const { amount } = req.body;

  // Fetch auction item
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction Item not found.", 404));
  }

  // Validate bid amount
  if (!amount) {
    return next(new ErrorHandler("Please provide a bid amount.", 400));
  }
  if (amount <= auctionItem.currentBid) {
    return next(
      new ErrorHandler("Bid amount must be greater than the current bid.", 400)
    );
  }
  if (amount < auctionItem.startingBid) {
    return next(
      new ErrorHandler("Bid amount must be greater than the starting bid.", 400)
    );
  }

  // Prevent user from bidding on their own auction
  if (auctionItem.createdBy.toString()  === req.user._id.toString()) {
    return next(
      new ErrorHandler("You cannot place a bid on your own auction.", 400)
    );
  }

  try {
    // Check if user has already placed a bid
    let existingBid = await Bid.findOne({
      "bidder.id": req.user._id,
      auctionItem: auctionItem._id,
    });

    if (existingBid) {
      // Update existing bid
      existingBid.amount = amount;
      await existingBid.save();

      // Update auction's current bid
      const bidInAuction = auctionItem.bids.find(
        (bid) => bid.userId.toString() === req.user._id.toString()
      );
      if (bidInAuction) {
        bidInAuction.amount = amount;
      }
    } else {
      // Create a new bid
      const bidderDetail = await User.findById(req.user._id);
      const newBid = await Bid.create({
        amount,
        bidder: {
          id: bidderDetail._id,
          userName: bidderDetail.userName,
          profileImage: bidderDetail.profileImage?.url,
        },
        auctionItem: auctionItem._id,
      });

      auctionItem.bids.push({
        userId: req.user._id,
        userName: bidderDetail.userName,
        profileImage: bidderDetail.profileImage?.url,
        amount,
      });
    }

    // Update current bid in auction
    auctionItem.currentBid = amount;
    await auctionItem.save();

    res.status(201).json({
      success: true,
      message: "Bid placed successfully.",
      currentBid: auctionItem.currentBid,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Failed to place bid.", 500));
  }
});
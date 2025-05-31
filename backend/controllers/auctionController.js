import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const addNewAuctionItem = catchAsyncErrors(async (req, res, next) => {
  try {
    console.log("Entering addNewAuctionItem function...");

    // Check if files are provided
    if (!req.files || Object.keys(req.files).length === 0) {
      console.error("❌ No image file provided in request.");
      return next(new ErrorHandler("Auction item image required.", 400));
    }

    const { image } = req.files;
    console.log("✅ Image received:", image.name, image.mimetype);

    // Validate image format
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(image.mimetype)) {
      console.error("❌ Unsupported file format:", image.mimetype);
      return next(new ErrorHandler("File format not supported.", 400));
    }

    // Extract request body
    const {
      title,
      description,
      category,
      condition,
      startingBid,
      startTime,
      endTime,
    } = req.body;

    console.log("✅ Extracted auction details:", {
      title,
      description,
      category,
      condition,
      startingBid,
      startTime,
      endTime,
    });

    // Validate required fields
    if (!title || !description || !category || !condition || !startingBid || !startTime || !endTime) {
      console.error("❌ Missing required fields.");
      return next(new ErrorHandler("Please provide all details.", 400));
    }

    // Validate start time
    if (new Date(startTime) < Date.now()) {
      console.error("❌ Invalid start time:", startTime);
      return next(new ErrorHandler("Auction starting time must be greater than present time.", 400));
    }

    // Validate end time
    if (new Date(startTime) >= new Date(endTime)) {
      console.error("❌ Invalid end time:", endTime);
      return next(new ErrorHandler("Auction starting time must be less than ending time.", 400));
    }

    // Upload image to Cloudinary
    console.log("📤 Uploading image to Cloudinary...");
    const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "ONLINE_AUCTION_SYSTEM_ITEMS",
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("❌ Cloudinary upload error:", cloudinaryResponse.error || "Unknown cloudinary error.");
      return next(new ErrorHandler("Failed to upload auction image to Cloudinary.", 500));
    }

    console.log("✅ Cloudinary upload successful:", cloudinaryResponse.secure_url);

    // Create auction item in database
    console.log("📦 Creating auction item in database...");
    const auctionItem = await Auction.create({
      title,
      description,
      category,
      condition,
      startingBid,
      startTime,
      endTime,
      image: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      createdBy: req.user._id,
    });

    console.log("✅ Auction item created successfully:", auctionItem._id);

    return res.status(201).json({
      success: true,
      message: `Auction item created and will be listed on auction page at ${startTime}`,
      auctionItem,
    });

  } catch (error) {
    console.error("❌ Unexpected error occurred:", error);
    return next(new ErrorHandler(error.message || "Failed to create auction.", 500));
  }
});
export const getAllItems = catchAsyncErrors(async (req, res, next) => {
    let items = await Auction.find();
    res.status(200).json({
      success: true,
      items,
    });
});
export const getAuctionDetails=catchAsyncErrors(async(req,res,next)=>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid Id format.", 400));
    }
    const auctionItem = await Auction.findById(id);
    if (!auctionItem) {
      return next(new ErrorHandler("Auction not found.", 404));
    }
    const bidders = auctionItem.bids.sort((a, b) => b.amount - a.amount);
    res.status(200).json({
      success: true,
      auctionItem,
      bidders,
    });
  });
export const getMyAuctionItems = catchAsyncErrors(async (req, res, next) => {
    const items = await Auction.find({ createdBy: req.user._id });
    res.status(200).json({
      success: true,
      items,
    });
  });  
export const removeFromAuction = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid Id format.", 400));
    }
    const auctionItem = await Auction.findById(id);
    if (!auctionItem) {
      return next(new ErrorHandler("Auction not found.", 404));
    }
    await auctionItem.deleteOne();
    res.status(200).json({
      success: true,
      message: "Auction item deleted successfully.",
    });
  });
export const republishItem = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid Id format.", 400));
    }
    let auctionItem = await Auction.findById(id);
    if (!auctionItem) {
      return next(new ErrorHandler("Auction not found.", 404));
    }
    if (!req.body.startTime || !req.body.endTime) {
      return next(
        new ErrorHandler("Start time and Endtime for republish is mandatory.")
      );
    }
    if (new Date(auctionItem.endTime) > Date.now()) {
      return next(
        new ErrorHandler("Auction is already active, cannot republish", 400)
      );
    }
    let data = {
      startTime: new Date(req.body.startTime),
      endTime: new Date(req.body.endTime),
    };
    if (data.startTime < Date.now()) {
      return next(
        new ErrorHandler(
          "Auction starting time must be greater than present time",
          400
        )
      );
    }
    if (data.startTime >= data.endTime) {
      return next(
        new ErrorHandler(
          "Auction starting time must be less than ending time.",
          400
        )
      );
    }
    if (auctionItem.highestBidder) {
      const highestBidder = await User.findById(auctionItem.highestBidder);
      highestBidder.moneySpent -= auctionItem.currentBid;
      highestBidder.auctionsWon -= 1;
      highestBidder.save();
    }
  
    data.bids = [];
    data.currentBid = 0;
    data.highestBidder = null;
    auctionItem = await Auction.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    await Bid.deleteMany({ auctionItem: auctionItem._id });
    const createdBy = await User.findByIdAndUpdate(
      req.user._id,
      {
        new: true,
        runValidators: false,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      auctionItem,
      message: `Auction republished and will be active on ${req.body.startTime}`,
      createdBy,
    });
  });
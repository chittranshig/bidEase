import express from "express";
import { placeBid } from "../controllers/bidController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { checkAuctionEndTime } from "../middlewares/checkAuctionEndTime.js";

const router = express.Router();

router.post(
  "/place/:id",
  isAuthenticated,
  checkAuctionEndTime,
  placeBid
);

export default router;
import {
    addNewAuctionItem,
    getAllItems,
    getAuctionDetails,
    getMyAuctionItems,removeFromAuction,republishItem
  } from "../controllers/auctionController.js";
import { isAuthenticated} from "../middlewares/auth.js";
  import express from "express";

  const router = express.Router();

router.post("/create", isAuthenticated, addNewAuctionItem);
router.get("/allitems", getAllItems);
router.get("/auction/:id", isAuthenticated, getAuctionDetails);
router.get( "/myitems",isAuthenticated,getMyAuctionItems);
router.delete("/delete/:id", isAuthenticated,removeFromAuction);
router.put("/item/republish/:id",isAuthenticated,republishItem);
export default router;
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import auctionReducer from "./slices/auctionSlice";
import bidReducer from "./slices/bidSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auction: auctionReducer,
    bid: bidReducer,
    
  },
});
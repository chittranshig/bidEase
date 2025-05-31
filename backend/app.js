import {config} from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import {connection} from "./database/connection.js"
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js";
import auctionRouter from "./router/auctionRoutes.js";
import bidRouter from "./router/bidRoutes.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";


const app= express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Allow your frontend
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight requests
  }
  next();
});


config({
    path:"./config/config.env"
})

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionRouter);
app.use("/api/v1/bid", bidRouter);

endedAuctionCron();
connection();// function in connection.js to connect the database
app.use(errorMiddleware);

export default app;
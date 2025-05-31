import mongoose from "mongoose";

export const connection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
    dbName:"ONLINE_AUCTION_SYSTEM",
   }).then(() => {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.log(`Some error occured while connecting to database: ${err}`);
  });

};
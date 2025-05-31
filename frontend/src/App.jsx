//rafce doing this will give us boiler plate code
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home.jsx'
// toastify is used for small notifications that come to inform users
import SideDrawer from "./layout/SideDrawer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/slices/userSlice";
import HowitWorks from "./pages/HowItWorks";
import About from "./pages/About";
import { getAllAuctionItems } from "./store/slices/auctionSlice";
import Auctions from "./pages/Auctions";
import AuctionItem from "./pages/AuctionItem";
import CreateAuction from "./pages/CreateAuction";
import ViewMyAuctions from "./pages/ViewMyAuctions";
import ViewAuctionDetails from "./pages/ViewAuctionDetails";
import Contact from "./pages/Contact";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
  }, []);
  return (
    <div className='bg-[#F9F9F9]'>
      <Router>
        <SideDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-works-info" element={<HowitWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/auction/item/:id" element={<AuctionItem />} />
          <Route path="/create-auction" element={<CreateAuction />} />
          <Route path="/view-my-auctions" element={<ViewMyAuctions />} />
          <Route path="/auction/details/:id" element={<ViewAuctionDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/me" element={<UserProfile />} />
        </Routes>
        <ToastContainer position="top-right" />
      </Router>
    </div>
  );
}

export default App

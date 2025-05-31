import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";



const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5  bg-[#2D3142] text-white text-3xl p-2 rounded-md hover:bg-[#A8D532] lg-hidden"
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={`w-[100%] sm:w-[300px] bg-[#2D3142] h-full fixed top-0 ${show ? "left-0" : "left-[-100%]  " 
          } transition-all duration-100 p-4 flex flex-col justify-between `}
      >
        <div className="relative">
          <Link to={"/"}>
            <h4 className="text-4xl font-semibold mb-4 font-sans"
              style={{
                fontFamily: "'DM Serif Text', serif",
              }}>

              <span className="text-[#FFF8F0]"> bid</span>
              <span className="text-[#A8D532]">Ease</span>
            </h4>
          </Link>
          <ul className="flex flex-col gap-3 text-[#FAF9F6]">
            <li>
              <Link
                to={"/auctions"}
                className="flex text-xl font-semibold gap-2 items-center hover:transition-all hover:duration-150 hover:text-[#BFC0C0]"
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>
            {isAuthenticated && user  && (
              <>
                <li>
                  <Link
                    to={"/create-auction"}
                    className="flex text-xl font-semibold gap-2 items-center hover:text-[#BFC0C0] hover:transition-all hover:duration-150"
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/view-my-auctions"}
                    className="flex text-xl font-semibold gap-2 items-center hover:text-[#BFC0C0] hover:transition-all hover:duration-150"
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!isAuthenticated ? (
            <>
              <div className="my-4 flex gap-2">
                <Link
                  to={"/sign-up"}
                  className="bg-[#A8D532] font-semibold hover:bg-[#BFC0C0] text-xl py-1 px-4 rounded-md text-white"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="text-[#BFC0C0] bg-transparent border-[#BFC0C0] border-2 hover:bg-[#BFC0C0] hover:text-[#FFFFFF] font-bold text-xl py-1 px-4 rounded-md"
                >
                  Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="my-4 flex gap-4 w-fit" onClick={handleLogout}>
                <button className="bg-[#A8D532] font-semibold hover:bg-[#BFC0C0] text-xl py-1 px-4 rounded-md text-white">
                  Logout
                </button>
              </div>
            </>
          )}
          <hr className="mb-4 border-t-[#BFC0C0]" />
          <ul className="flex flex-col gap-3">
            {isAuthenticated && (
              <li>
                <Link
                  to={"/me"}
                  className="flex text-xl font-semibold gap-2 items-center text-white hover:text-[#BFC0C0] hover:transition-all hover:duration-150"
                >
                  <FaUserCircle /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link
                to={"/how-it-works-info"}
                className="flex text-xl font-semibold gap-2 text-white items-center hover:text-[#BFC0C0] hover:transition-all hover:duration-150"
              >
                <SiGooglesearchconsole /> How it works
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="flex text-xl font-semibold gap-2 text-white items-center hover:text-[#BFC0C0] hover:transition-all hover:duration-150"
              >
                <BsFillInfoSquareFill /> About Us
              </Link>
            </li>
          </ul>
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[28px] sm:hidden"
          />
        </div>

        <div>
          <div className="flex gap-2 items-center mb-2">
            <Link
              to="https://www.facebook.com"
              className="text-[#BFC0C0] p-2 text-2xl rounded-sm hover:text-[#A8D532] "
            >
                <FaFacebook />
            </Link>
            <Link
              to="https://www.instagram.com"
              className=" text-[#BFC0C0] p-2 text-2xl rounded-sm hover:text-[#A8D532]"
            >
              <RiInstagramFill />
            </Link>
            <Link
              to="https://google.com"
              className=" text-[#BFC0C0] p-2 text-2xl rounded-sm hover:text-[#A8D532]"
            >
              <FaGoogle />
            </Link>
            <Link
              to="https://github.com"
              className=" text-[#BFC0C0] p-2 text-2xl rounded-sm hover:text-[#A8D532]"
            >
             <FaGithub />
            </Link>
            
          </div>
          <Link
            to={"/contact"}
            className="text-[#BFC0C0] font-semibold hover:text-[#A8D532] hover:transition-all hover:duration-150"
          >
            Contact Us
          </Link>
          <p className="text-[#BFC0C0]">&copy; bidEase, Ltd.</p>
        </div>
      </div>
    </>
   
  );
};


export default SideDrawer;
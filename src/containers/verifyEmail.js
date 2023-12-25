// VerifyComponent.js
import React, { useEffect, useState } from "react";
import TopContainer from "./topContainer";
import avatar from "../image/profile_pic.jpg";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import photo from "../image/oldman.jpg";
import Card from "./bottomCard";
import Confetti from "react-confetti";

const VerifyComponent = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating the confirmation page loading effect
    // You can replace this with your actual logic to determine when to show the confetti
    setTimeout(() => {
      setShowConfetti(true);
    }, 2000); // Adjust the delay as needed
  }, []);

  const links = [
    {
      image: photo,
      text1: "Mary Checkman",
      text2: "Just copied a +500% trade on coin-base",
      text3: "Visits - 🇺🇸 United states",
    },
    // add more link objects here...
  ];
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email"); // Extract email from URL parameter
    const token = queryParams.get("token"); // Extract token from URL parameter
    console.log(email);
    // Send Axios request to update email verification with both email and token
    axios
      .post("https://backend6-apyu.onrender.com/update", { email, token })
      .then((response) => {
        console.log("Email verified successfully");
      })
      .catch((error) => {
        console.error("Error verifying email:", error);
      });
  }, []);

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      {/* {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />} */}
      <TopContainer />
      <div className="flex flex-col items-center justify-center mt-24">
        <div className="flex justify-center items-center rounded-lg z-10 w-2/6 mobile:w-full h-3/6 bg-white p-6 border border-gray-300 shadow-md mx-auto">
          <div className="flex flex-col items-center md:items-start justify-center space-y-2 mt-5">
            <img
              src={avatar}
              alt="Profile"
              className="h-20 w-20 mobile:h-9 mobile:w-9 rounded-full object-cover"
            />
            <p className="w-full md:w-2/4 text-center font-semibold">
              Helena Moza
            </p>
            <p className="w-full md:w-3/4 text-center text-sm pb-4">
              Congratulations! you are eligible to earn with crypto derivative
              Algo. Your account manager would get in touch with you in 24 hours
            </p>
            <p className="w-full md:w-3/4 text-center text-sm ">
              With an available active Trading Algo.
            </p>
            <Button
              className="bg-blue-500 text-white mt-1"
              onClick={handleClick}
            >
              Done
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-start mobile:hidden">
        <Card links={links} />
      </div>
    </div>
  );
};

export default VerifyComponent;

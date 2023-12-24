// CardComponent.js
import React from "react";
import arrow from "../image/up-arrow.png";

const CardComponent = ({ onClose, email }) => {
  console.log(email);
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <div className="fixed rounded-lg z-10 w-3/6 mobile:w-full h-4/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 border border-gray-300 shadow-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          X
        </button>
        <div className="flex flex-col items-center md:items-start justify-center space-y-4 mt-12">
          <p className="w-full md:w-2/4 text-center font-bold text-2xl ">
            One more step...
          </p>
          <p className="w-full md:w-2/4 text-center text-lg">
            We have sent a verification link to:
          </p>
          <p className="w-full md:w-2/4 text-center">{email}</p>
          <p className="w-full md:w-3/4 text-center">
            Please check your inbox (or spam inbox) and click the verification
            link in it.
          </p>
        </div>

        <div className="flex items-center ml-80 mobile:ml-40 mt-10">
          <img
            src={arrow}
            alt="Profile"
            className="h-12 w-12 mobile:h-9 mobile:w-9  object-cover -rotate-45 scale-y-[-1]  "
          />
          <img
            src={arrow}
            alt="Profile"
            className="h-12 w-12 mobile:h-9 mobile:w-9  object-cover rotate-180"
          />
          <img
            src={arrow}
            alt="Profile"
            className="h-12 w-12 mobile:h-9 mobile:w-9  object-cover rotate-45 scale-y-[-1] scale-x-[-1]"
          />
        </div>

        <div className="border-t-2 border-b-2 border-black flex w-full md:mt-0 mt-5 -p-2">
          <p className="w-full md:w-1/3 p-4">Jack Raintbolt</p>
          <p className="w-full md:w-2/3 p-4">
            [Action Needed] Please Verify Your Email
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;

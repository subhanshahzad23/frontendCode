import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you will use axios in the future

const CountContainer = () => {
  // Function to get or set the target date
  const getInitialTargetDate = () => {
    const savedDate = localStorage.getItem("targetDate");
    if (savedDate) {
      return new Date(savedDate);
    } else {
      const newDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
      localStorage.setItem("targetDate", newDate.toISOString());
      return newDate;
    }
  };

  const [countdownData, setCountdownData] = useState({
    header1:
      "Warning: Limited offer to profit from digital currencies in 24 hours!",
    header2:
      "UNLOCK $10,000+ PROFITS FAST: IN 24 HOURS COPYING PROTRADERS ON BINANCE, BITMEX, COINBASE!",
    targetDate: getInitialTargetDate(),
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Countdown logic
  const updateCountdown = () => {
    const difference = +countdownData.targetDate - +new Date();
    if (difference > 0) {
      setCountdownData((prevState) => ({
        ...prevState,
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      }));
    }
  };

  useEffect(() => {
    updateCountdown(); // Update immediately with the static targetDate
    const interval = setInterval(updateCountdown, 1000); // Update every second to include seconds

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const formatHeader2 = () => {
    return (
      <>
        UNLOCK <span style={{ color: "#f79009" }}>$10,000+</span> PROFITS FAST:
        IN <span style={{ color: "#f79009" }}>24 HOURS</span> COPYING PROTRADERS
        ON BINANCE, BITMEX, COINBASE!
      </>
    );
  };

  return (
    <div
      className="md:h-64 w-full md:w-3/5 p-4 text-black"
      style={{
        background: "linear-gradient(to bottom, #edf6f7 , #ffffff 75%)",
      }}
    >
      <p
        className="text-center text-md md:text-lg lg:text-xl font-semibold my-2"
        style={{
          color: "#d92d20",
          fontFamily: "Inter",
          marginTop: "20px",
          marginBottom: "20px",
          fontSize: "20px",
        }}
      >
        {countdownData.header1}
      </p>
      <h2
        className="text-center text-4xl md:text-4xl lg:text-4xl my-2 mx-auto md:w-1/2 leading-loose"
        style={{
          fontFamily: "Anton",
          textShadow: "2px 2px #a6f4c5",
          width: "80%",
          lineHeight: "1.2",
        }}
      >
        {formatHeader2()}
      </h2>

      <p className="text-center text-grey-700 pt-2 pb-1 font-medium mt-5 mb-5">
        Expires On
      </p>
      <div className="flex items-center justify-center w-full mb-6">
        <div className="flex space-x-2 text-center">
          <div>
            <span className="text-2xl font-semibold">
              {String(countdownData.days).padStart(2, "0")}
            </span>
            <span className="text-1xl"> Days </span>
          </div>
          <span className="text-2xl">:</span>
          <div>
            <span className="text-2xl font-semibold">
              {String(countdownData.hours).padStart(2, "0")}
            </span>
            <span className="text-1xl"> Hours </span>
          </div>
          <span className="text-2xl">:</span>
          <div>
            <span className="text-2xl font-semibold">
              {String(countdownData.minutes).padStart(2, "0")}
            </span>
            <span className="text-1xl"> Minutes </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountContainer;

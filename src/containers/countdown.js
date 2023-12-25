// Countdown.js
import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        // seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [targetDate]);

  return (
    <div className="flex items-center">
      {timeLeft.days > 0 && (
        <p className="mr-3 ">
          <span className="text-3xl font-semibold">{timeLeft.days}</span> Days
        </p>
      )}
      {timeLeft.days > 0 && (
        <span className="mr-2 text-3xl font-semibold">:</span>
      )}
      <p className="mr-3">
        <span className="text-3xl font-semibold">{timeLeft.hours}</span> Hours
      </p>
      <span className="mr-2 text-3xl font-semibold">:</span>
      <p>
        <span className="text-3xl font-semibold">{timeLeft.minutes}</span> Mins
      </p>
    </div>
  );
};

export default Countdown;

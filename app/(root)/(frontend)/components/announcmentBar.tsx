"use client";
import React, { useState, useEffect } from "react";
import { Fauna_One } from "next/font/google";
const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });

export const AnnouncementBar = () => {
  const TargetDate = new Date("2024-01-01T00:00:00");

  // Initialize state variables for the countdown
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

 

  useEffect(() => {
     // Function to calculate and update the countdown
  const updateCountdown = () => {
    const currentDate = new Date();
    const timeDifference = TargetDate.getTime() - currentDate.getTime();

    if (timeDifference <= 0) {
      // Target date has passed
      //@ts-ignore
      clearInterval(interval);
      return;
    }

    const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const remainingMinutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setDays(remainingDays);
    setHours(remainingHours);
    setMinutes(remainingMinutes);
    setSeconds(remainingSeconds);
  };
    // Calculate and update the countdown initially
    updateCountdown();

    // Update the countdown every second
    const interval = setInterval(updateCountdown, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [TargetDate]);

  return (
    <div className="announcement-bar top-nav__group">
      <div
        className="top-nav__group-link country-selector"
        style={faunaOne.style}
      >
        Ship to: US
      </div>
      <div className="countdown-menu">
        <div className="countdown-menu_messsage--desktop">
          <h1 style={faunaOne.style}>GRAND OPENING</h1>
        </div>
        <div className="countdown-menu_numbers">
          <div className="days" style={faunaOne.style}>
            {days}
          </div>
          <span> :</span>
          <div className="hours" style={faunaOne.style}>
            {hours}
          </div>
          <span> :</span>
          <div className="minutes" style={faunaOne.style}>
            {minutes}
          </div>
          <span> :</span>
          <div className="seconds" style={faunaOne.style}>
            {seconds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

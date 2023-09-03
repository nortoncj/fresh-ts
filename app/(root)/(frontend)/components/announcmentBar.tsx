"use client";
import React, { useState, useEffect } from "react";
import { Fauna_One } from "next/font/google";
const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });

export const AnnouncementBar = () => {
  interface CountdownTimerProps {
    targetDate: Date;
  }

  interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const calculateTimeRemaining = (): TimeRemaining => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
      };
    };

    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
      calculateTimeRemaining()
    );
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    useEffect(() => {
      return () => clearInterval(intervalId);
    }, [intervalId]);

    return (
      <div className="countdown-menu_numbers">
        <div className="days" style={faunaOne.style}>
          {timeRemaining.days}
        </div>
        <span> :</span>
        <div className="hours" style={faunaOne.style}>
          {timeRemaining.hours}
        </div>
        <span> :</span>
        <div className="minutes" style={faunaOne.style}>
          {timeRemaining.minutes}
        </div>
        <span> :</span>
        <div className="seconds" style={faunaOne.style}>
          {timeRemaining.seconds}
        </div>
      </div>
    );
  }
  const TargetDate = new Date("2024-01-01T00:00:00");
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
        <CountdownTimer targetDate={TargetDate} />
      </div>
    </div>
  );
};

export default AnnouncementBar;

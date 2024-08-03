"use client";

import { Fauna_One } from "next/font/google";
const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });

interface AnnouncementBarProps {
  title: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ title }) => {
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
          <h1 style={faunaOne.style}>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

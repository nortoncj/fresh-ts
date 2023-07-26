import { Fauna_One } from "next/font/google";
const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });

export const AnnouncementBar = () => {
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
            180
          </div>
          <span> :</span>
          <div className="hours" style={faunaOne.style}>
            6
          </div>
          <span> :</span>
          <div className="minutes" style={faunaOne.style}>
            11
          </div>
          <span> :</span>
          <div className="seconds" style={faunaOne.style}>
            12
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

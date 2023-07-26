import { Fauna_One } from "next/font/google";
import "./mainpage.css";
const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });

const Home = () => {
  return (
    <section className="main_hero">
      <div className="main_hero-image">
        <div className="main_hero-text">
          <h1 style={faunaOne.style}>Heart of the People</h1>
        </div>
      </div>
    </section>
  );
};

export default Home;

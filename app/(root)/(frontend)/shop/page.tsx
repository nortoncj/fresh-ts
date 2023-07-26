import { Fauna_One, Cinzel } from "next/font/google";
import { Filter } from "./components/filter";
import "./shop.css";

const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });

const Shop = () => {
  return (
    <main>
      <section className="collections-page">
        <section className="collections-page__title">
          <div className="container">
            <h1 style={cinzel.style}>products</h1>
          </div>
        </section>

        <Filter />

        <section className="collections-products">
          <div className="container shop" id="shop"></div>
        </section>
      </section>
    </main>
  );
};

export default Shop;

import { Fauna_One, Cinzel } from "next/font/google";
import CategoryFilter from "./components/categoryFilter";
import "./shop.css";
import prismadb from "@/lib/prismadb";
import { BsChevronLeft, BsChevronRight, BsHeart } from "react-icons/bs";
import Link from "next/link";
import ShopCard from "./components/shop-card";
import { Product } from "@/types";
import ProductList from "@/components/product-list";
import getCategories from "@/app/actions/get-categories";

const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });
export const revalidate = 0;

const Shop = async () => {
  const products = await prismadb.product.findMany({
    where: {
      isArchived: false,
    },
    include: {
      images: true,
    },
  });

  const categories = await getCategories();
  return (
    <main>
      <section className="collections-page">
        <section className="collections-page__title">
          <div className="container">
            <h1 style={cinzel.style}>products</h1>
          </div>
        </section>

        <CategoryFilter data={categories} />

        <section className="collections-products">
          <div className="container shop" id="shop">
            {products.map((item: any) => (
              <ShopCard key={item?.id} data={item} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Shop;

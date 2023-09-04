import { Fauna_One } from "next/font/google";
import "./mainpage.css";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import getBillboard from "@/app/actions/get-billboard";
import getProducts from "@/app/actions/get-products";
import ProductList from "@/components/product-list";
const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });

export const revalidate = 0;

const Home = async () => {
  const billboard = await getBillboard("64c1688be4c7514a24451cb5");
  const products = await getProducts({ isFeatured: true });
  return (
    <section className="main_hero">
      <div className="main_hero-image">
        <div className="main_hero-text">
          <h1 style={faunaOne.style}>Heart of the People</h1>
        </div>
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 pb-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </section>
  );
};

export default Home;

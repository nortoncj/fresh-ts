import { Fauna_One, Cinzel } from "next/font/google";
import CategoryFilter from "../../components/categoryFilter"
import NoResults from "@/components/ui/no-results";;
import "../../shop.css";
import prismadb from "@/lib/prismadb";
import { BsChevronLeft, BsChevronRight, BsHeart } from "react-icons/bs";
import Link from "next/link";
import ShopCard from "../../components/shop-card";
import { ProductFilter } from "./components/filter";
import MobileFilter from "./components/mobileFilter";
import { Product } from "@/types";
import ProductList from "@/components/product-list";
import getCategories from "@/app/actions/get-categories";
import getProducts from "@/app/actions/get-products";
import getSizes from "@/app/actions/get-sizes";
import getColors from "@/app/actions/get-colors";
import getCategory from "@/app/actions/get-category";


const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });
export const revalidate = 0;

interface CategoryShopProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryShopProps> = async ({
  params,
  searchParams,
}) => {
  const product = await prismadb.product.findMany({
    include: {
      images: true,
    },
  });

  const categories = await getCategories();

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);
  return (
    <main>
      <section className="collections-page">
        <section className="collections-page__title">
          <div className="container">
            <h1 style={cinzel.style}>products</h1>
          </div>
        </section>

        <CategoryFilter data={categories} />
        {/* Mobile Filters? */}
        <MobileFilter sizes={sizes} colors={colors} />
        <div className="hidden lg:block">
          <ProductFilter valueKey="sizeId" name="Sizes" data={sizes} />
          <ProductFilter valueKey="colorId" name="Colors" data={colors} />
        </div>

        <section className="collections-products">
          {products.length === 0 && <NoResults />}
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

export default CategoryPage;

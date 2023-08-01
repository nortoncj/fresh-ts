import getProduct from "@/app/actions/get-product";
import getProducts from "@/app/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "./components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Cinzel } from "next/font/google";

interface ProductPageProps {
  params: {
    productId: string;
  };
}
const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });
const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });
  return (
    <section className="collections-page">
      <section className="collections-page__title">
        <div className="container">
          <h1 className="collections-page__title text-2xl" style={cinzel.style}>
            {product.name}
          </h1>
        </div>
      </section>

      <div className="">
        <Container>
          <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              <div className="">
                <Gallery images={product.images} />
              </div>
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <Info data={product} />
              </div>
            </div>
            <hr className="my-10" />
            <ProductList title="Related Items" items={suggestedProducts} />
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ProductPage;

import prisma from "@/lib/prismadb";
import { Metadata } from "next";
import ShopCard from "../shop/components/shop-card";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - Cardicus`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { productInfo: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return <div className="text-center h-screen">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product: any) => (
        <ShopCard data={product} key={product?.id} />
      ))}
    </div>
  );
}

"use client";
import { Fauna_One, Cinzel } from "next/font/google";


import { Category } from "@/types";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface FilterNavProps {
  data: Category[];
}
const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });


const CategoryFilter: React.FC<FilterNavProps> = ({ data }) => {
  const pathName = usePathname();

  const routes = data.map((route) => ({
    href: `/shop/category/${route.id}`,
    label: route.name,
    active: pathName === `/shop/category/${route.id}`,
  }));
  return (
    <section className="collections-filter">
      <div className="collections-filter__title" style={cinzel.style}>
        Category:
      </div>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "collections-filter__item",
            route.active ? "underline" : " "
          )}
          style={cinzel.style}
        >
          {" "}
          {route.label}
        </Link>
      ))}
    </section>
  );
};

export default CategoryFilter;

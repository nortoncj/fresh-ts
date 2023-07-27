"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React from "react";
import { Cinzel, Fauna_One } from "next/font/google";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });
const fauna = Fauna_One({ subsets: ["latin"], weight: "400" });

export const ProductFilter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };
  return (
    <section className="collections-filter">
      <div className="text-lg collections-filter__title" style={cinzel.style}>
        {name}:
      </div>

      {data.map((filter) => (
        <div key={filter.id} className="flex items-center">
          <Button
            style={fauna.style}
            className={cn(
              " text-sm text-gray-800 p-2 bg-transparent border border-none hover:bg-transparent ",
              selectedValue === filter.id && " underline"
            )}
            onClick={() => onClick(filter.id)}
          >
            {filter.name}
          </Button>
        </div>
      ))}
    </section>
  );
};

"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/app/hooks/use-cart";

import { Cinzel, Fauna_One } from "next/font/google";

interface InfoProps {
  data: Product;
}
const fauna = Fauna_One({ subsets: ["latin"], weight: "400" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900" style={cinzel.style}>
        {data.name}
      </h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.value}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className="flex items-center gap-x-2 bg-[#65272c] hover:bg-amber-900"
          style={cinzel.style}
        >
          Add To Cart
        </Button>
      </div>
      <div className="py-12">
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl" style={cinzel.style}>
              Info
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xl "> {data?.productInfo}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-2xl" style={cinzel.style}>
              Specs
            </AccordionTrigger>
            <AccordionContent>
              Works with any NFC enabled device with no app.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-2xl" style={cinzel.style}>
              Shipping
            </AccordionTrigger>
            <AccordionContent>
              Shipping is done in US and usually is shipped within a week.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Info;

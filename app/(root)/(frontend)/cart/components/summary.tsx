import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Currency from "@/components/ui/currency";

import { toast } from "react-hot-toast";
import { getCart } from "@/app/libs/cart";
import Checkout from "./checkout";

const Summary = async () => {
  const cart = await getCart();
  const items = cart?.items
 
  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={cart?.subtotal} />
        </div>
      </div>
      <Checkout size={cart?.size || 0} cart={cart}/>
    </div>
  );
};

export default Summary;

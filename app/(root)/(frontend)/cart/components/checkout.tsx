"use client";

import {
  CartItemWithProduct,
  CartWithProducts,
  ShoppingCart,
  getCart,
} from "@/app/libs/cart";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";

// Define the interface for the Checkout component props
interface CheckoutProps {
  size: number;
  cart: ShoppingCart | null;
}

const Checkout: React.FC<CheckoutProps> = ({ size, cart }) => {
  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: cart?.items?.map((item) => [item.productId, item.cartId]),
      }
    );

    window.location = response.data.url;
  };
  return (
    <Button onClick={onCheckout} disabled={size === 0} className="w-full mt-6">
      Continue
    </Button>
  );
};

export default Checkout;

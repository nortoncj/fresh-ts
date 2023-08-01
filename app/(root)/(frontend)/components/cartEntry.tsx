"use client";
import React, { useTransition } from "react";

import { CartItemWithProduct, ShoppingCart } from "@/app/libs/cart";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { X } from "lucide-react";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { IoCloseOutline } from "react-icons/io5";

interface ShoppingCartButtonProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: ShoppingCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  let number = quantity;
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <div className="cart_item">
      <div className="absolute z-10 right-0 top-0"></div>
      
      <div className=" item_img">
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div className="item_details">
        <p>{product.name}</p>
        <strong>
          <Currency value={product.price} />
        </strong>
        <div className="qty">
          
          
          {/* <span onClick={() => number--}>-</span>
          <strong>{quantity}</strong>
          <span onClick={() => number++}>+</span> */}
          <select defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }} className="text-black" name="" id="">
          <option value={0}>X</option>
            {quantityOptions}
          </select>
        </div>
      </div>
    </div>
  );
}

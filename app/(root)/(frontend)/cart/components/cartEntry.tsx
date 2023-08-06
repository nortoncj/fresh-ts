"use client";
import React, { useTransition } from "react";

import { CartItemWithProduct } from "@/app/libs/cart";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";

import Image from "next/image";
import { ClipLoader } from "react-spinners";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={product.images[0].url}
          alt={product.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">{/*Remove Button*/}</div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{product.name}</p>
            <select
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.currentTarget.value);
                startTransition(async () => {
                  await setProductQuantity(product.id, newQuantity);
                });
              }}
            >
              <option value={0}>0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>

          <div className="mt-1 flex text-sm">
            <div
              className="h-6 w-6 rounded-full border border-gray-600"
              style={{ backgroundColor: product?.color?.value }}
            />
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {product.size.name}
            </p>
          </div>
          <Currency value={product.price} />
          <div className="pl-6 ml-6 my-6">
            Total:{" "}
            <small>
              <Currency value={parseFloat(product.price) * quantity} />
            </small>
          </div>
        </div>
        {isPending && <ClipLoader />}
      </div>
    </li>
  );
}

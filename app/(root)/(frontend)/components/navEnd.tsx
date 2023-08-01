
import React from "react";
import SearchBar from "./searchBar";
import CartButton from "./cartButton";
import { getCart } from "@/app/libs/cart";


export async function NavEnd() {
  const cart = await getCart();
  return (
    <>
      <SearchBar />
      <CartButton cart={cart}  />
    </>
  );
}

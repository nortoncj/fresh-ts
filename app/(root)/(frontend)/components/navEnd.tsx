import React from "react";
import SearchBar from "./searchBar";
import CartButton from "./cartButton";
import { getCart } from "@/app/libs/cart";
import UserLogin from "./UserLogin";
import getSession from "@/app/actions/getSession";

export async function NavEnd() {
  const cart = await getCart();
  const session = await getSession();
  return (
    <>
      <UserLogin session={session} />
      <SearchBar />
      <CartButton cart={cart} />
    </>
  );
}

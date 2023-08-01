"use server";

import { createCart, getCart } from "@/app/libs/cart";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInCart) {
      await prismadb.cartItem.delete({
        where: { id: articleInCart.id },
      });
    }
  } else {
    if (articleInCart) {
      await prismadb.cartItem.update({
        where: { id: articleInCart.id },
        data: { quantity },
      });
    } else {
      await prismadb.cartItem.create({
        data: {
        cartId: cart.id,
        productId,
        quantity, 
        }        
      });
    }
  }
  revalidatePath('/cart');
}

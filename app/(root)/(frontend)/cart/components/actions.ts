"use server";

import { createCart, getCart } from "@/app/libs/cart";
import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";
import { useParams, useSearchParams } from "next/navigation";
import CartItem from "./cart-item";


export async function clearCart() {
  const cart = await getCart();
  if(cart){
    await prisma.cart.update({
      where: {id: cart.id},
      data: {
        items: {
          deleteMany: {cartId: cart.id}
        }
      }
    })
    // await prisma.cartItem.deleteMany({
    //   where: { cartId: cart.id },
    // });
}
}


export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);
  
  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: { quantity },
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
  }
  revalidatePath("/cart");
}

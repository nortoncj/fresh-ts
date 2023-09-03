"use server";

import { createCart, getCart } from "@/app/libs/cart";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";



export async function incrementCustomProductQuantity(productId: string, customImage: string, branded:boolean) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 },
         },
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
            quantity: 1,
            customImage,
            branded
          },
        },
      },
    });
  }

  revalidatePath("/shop/[productId]/custom");
}

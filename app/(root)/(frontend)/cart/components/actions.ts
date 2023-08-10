"use server";

import { createCart, getCart } from "@/app/libs/cart";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { useSearchParams } from "next/navigation";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);
   const searchParams = useSearchParams();
  
  if(searchParams.get("success")){
   
      if (articleInCart) {
        await prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              delete:{id: cart.id},
            }
          },
        });
      }
  }else if (searchParams.get("canceled")){
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete:{id: cart.id},
          }
        },
      });
    }
  }
  
  else if (quantity === 0) {
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
              quantity
            }
          }
        }
      })


     
    }
  }
  revalidatePath("/cart");
}

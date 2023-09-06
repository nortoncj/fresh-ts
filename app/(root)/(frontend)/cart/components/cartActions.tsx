import { getCart } from "@/app/libs/cart";
import prismadb from "@/app/libs/prismadb"

export async function clearCart() {
    const cart = await getCart();
if(cart){
      await prismadb.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }
  }
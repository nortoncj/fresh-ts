import { cookies } from "next/dist/client/components/headers";
import prismadb from "./prismadb";
import { Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: { include: { product: {
        include: {
        images: true;
        size: true;
        color: true;
      };
    } } };
  };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: {
      include: {
        images: true;
        size: true;
        color: true;
      };
    };
  };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prismadb.cart.findUnique({
        where: { id: localCartId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: true,
                  size: true,
                  color: true,
                },
              },
            },
          },
        },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.product.price),
      0
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prismadb.cart.create({
    data: {},
  });

  // Note: Needs encryption + secure settings in production
  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

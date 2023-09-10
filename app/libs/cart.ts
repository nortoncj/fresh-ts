import { cookies } from "next/dist/client/components/headers";
import prisma from "@/lib/prismadb"
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import getCurrentUser from "../actions/getCurrentUser";
import cron from 'node-cron'

import bcrypt from "bcrypt";
import { env } from "@/lib/env";
import  { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    AzureADProvider({
      clientId: env.AZURE_AD_CLIENT_ID as string,
      clientSecret: env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: env.AZURE_AD_TENANT_ID as string,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        username: { label: "username", type: "text" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.username
        ) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
       

        if (!user || !user?.hashedPassword || !user?.username) {
          throw new Error("Invalid creditials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials");
        }

        return user;
      },
    }),
  ],

  events: {
    async signIn({ user }) {
      await mergeAnonymousCartIntoUserCart(user.id);
    },
  },

  debug: process.env.NODE_ENV !== "development",
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
};

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: {
          include: {
            images: true;
            size: true;
            color: true;
          };
        };
      };
    };
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
  const user = await getCurrentUser();
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: user?.id },
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
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
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
  }

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
  const session = await getServerSession(authOptions);
  const user = await getCurrentUser();

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: user?.id },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });

    // Note: Needs encryption + secure settings in production
    cookies().set("localCartId", newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export async function mergeAnonymousCartIntoUserCart(userId: string) {
  const localCartId = cookies().get("localCartId")?.value;

  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: {
          items: true,
        },
      })
    : null;

  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: true,
    },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      await tx.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

     

      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }
    await tx.cart.delete({
      where: { id: localCart.id },
    });

    cookies().set("localCartId", "");
  });
}

function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => item.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}

async function deleteOldCartsWithoutUserId() {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Find carts without a userId that are older than one month
    const oldCarts = await prisma.cart.findMany({
      where: {
        userId: null,
        createdAt: {
          lt: oneMonthAgo,
        },
      },
    });

    if (oldCarts.length > 0) {
      // Delete the old carts
      for (const cart of oldCarts) {
        await prisma.cart.delete({
          where: {
            id: cart.id,
          },
        });
      }
    }
  } catch (error) {
    console.error('Error deleting old carts:', error);
  }
}

// Schedule the task to run every day (adjust the schedule as needed)
cron.schedule('0 0 * * *', () => {
  deleteOldCartsWithoutUserId();
});
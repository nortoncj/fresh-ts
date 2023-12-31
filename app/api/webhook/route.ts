import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";


export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;
  const email = session?.customer_details?.email || "";
  const name = session?.customer_details?.name || "";

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  //Create Orders on Checkout
  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        name,
        email,
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });

    const productIds = order.orderItems.map((orderItem) => orderItem.productId);

    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isFeatured: true,
      },
    });

  }
  return new NextResponse(null, { status: 200 });
}


// export async function SUBPOST(req: Request) {
//     const body = await req.text()
//     const signature = headers().get("Stripe-Signature") as string
  
//     let event: Stripe.Event
  
//     try {
//       event = stripeSub.webhooks.constructEvent(
//         body,
//         signature,
//         process.env.STRIPE_SUB_WEBHOOK_SECRET!
//       )
//     } catch (error: any) {
//       return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
//     }
  
//     const session = event.data.object as Stripe.Checkout.Session
  
//     if (event.type === "checkout.session.completed") {
//       //Creat Subcription
//       const subscription = await stripeSub.subscriptions.retrieve(
//         session.subscription as string
//       )
  
//       if (!session?.metadata?.userId) {
//         return new NextResponse("User id is required", { status: 400 });
//       }
  
//       await prismadb.userSubscription.create({
//         data: {
//           userId: session?.metadata?.userId,
//           stripeSubscriptionId: subscription.id,
//           stripeCustomerId: subscription.customer as string,
//           stripePriceId: subscription.items.data[0].price.id,
//           stripeCurrentPeriodEnd: new Date(
//             subscription.current_period_end * 1000
//           ),
//         },
//       })
//     }
  
//     // Update subscription
//     if (event.type === "invoice.payment_succeeded") {
//       const subscription = await stripeSub.subscriptions.retrieve(
//         session.subscription as string
//       )
  
//       await prismadb.userSubscription.update({
//         where: {
//           stripeSubscriptionId: subscription.id,
//         },
//         data: {
//           stripePriceId: subscription.items.data[0].price.id,
//           stripeCurrentPeriodEnd: new Date(
//             subscription.current_period_end * 1000
//           ),
//         },
//       })
//     }
  
//     return new NextResponse(null, { status: 200 })
//   };
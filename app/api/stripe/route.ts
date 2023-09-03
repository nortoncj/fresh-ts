import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import getCurrentUser from "@/app/actions/getCurrentUser";
const settingsUrl = absoluteUrl("/user");
export async function GET() {
    try {
        const user = await getCurrentUser()
        
        const userId = user?.id
        if(!userId || !user){
            return new NextResponse("Unauthorized", {status: 401})
        }
        const userSubscription = await prismadb.userSubscription.findFirst({
            where: {
                userId
            }
        })
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })
            return new NextResponse(JSON.stringify({url: stripeSession.url}))
        }
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.email as string,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name:"Cardicus Premium",
                            description: "Exclusive Features",
                        },
                        unit_amount: 200,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                }
            ],
            metadata: {
                userId
            },
        })
        return new NextResponse(JSON.stringify({url: stripeSession.url}))
        
    } catch (error) {
        console.log("[STRIPE ERROR]", error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}
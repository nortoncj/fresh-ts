

import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const  user  = await getCurrentUser()
  const userId = user?.id

  if (!userId) {
    return false;
  }

    const userSubscription = await prismadb.userSubscription.findFirst({
        where: {
          userId: userId,
        },
        select: {
          stripeSubscriptionId: true,
          stripeCurrentPeriodEnd: true,
          stripeCustomerId: true,
          stripePriceId: true,
        },
      })
 
    
 

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid;
};
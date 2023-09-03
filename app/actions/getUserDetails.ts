import prisma from "@/lib/prismadb"


async function getUserDetails(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return user;
}




export default getUserDetails;
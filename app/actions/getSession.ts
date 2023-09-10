import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prismadb";
import { env } from "@/lib/env";
import { mergeAnonymousCartIntoUserCart } from "@/app/libs/cart";



export default async function getSession() {

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
    return await getServerSession(authOptions);
}
import React from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/adminbar/Sidebar";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import prismadb from "../../libs/prismadb";

export const metadata: Metadata = {
  title: "Cardicus | Admin",
  description: "Admin Portal",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const userId = user?.id;
  if (!userId) {
    redirect("/login");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  
  if (!store) {
    redirect(`/`);
  }
  return <>{children}</>;
}

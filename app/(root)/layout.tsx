import React from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/adminbar/Sidebar";

import { ModalProvider } from "@/providers/modal-provider";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import prismadb from "../libs/prismadb";

export const metadata: Metadata = {
  title: "Cardicus | Admin",
  description: "Admin Portal",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <Sidebar>
      <ModalProvider />
      {children}
    </Sidebar>
  );
}

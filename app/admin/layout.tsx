import React from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/adminbar/Sidebar";

import { ModalProvider } from "@/providers/modal-provider";


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
    // @ts-expect-error Server Component
    <Sidebar>
      <ModalProvider />
      {children}
    </Sidebar>
  );
}

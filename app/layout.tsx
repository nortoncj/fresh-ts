import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cardicus ",
  description: "Business Cards",
  icons: {
    icon: "/images/icon_gld.png",
    apple: "/images/icon_gld.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
    
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        
      </body>
    </html>
  );
}

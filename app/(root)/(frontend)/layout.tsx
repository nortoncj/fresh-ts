import "./navigation.component.css";
import Link from "next/link";

import { useState } from "react";
import "./cart.component.css";
import "./navigation.component.css";
import "./mainpage.css";

import { IoBagOutline, IoCloseOutline, IoSearch } from "react-icons/io5";
import { Cinzel } from "next/font/google";
import AnnouncementBar from "./components/announcmentBar";
import MobileNav from "./components/mobileNav";
import FooterNav from "./components/footerNav";
import { redirect, useRouter } from "next/navigation";
import { ModalProvider } from "@/providers/modal-provider";
import useCart from "@/app/hooks/use-cart";
import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { NavEnd } from "./components/navEnd";
import getSession from "@/app/actions/getSession";

const cinzel = Cinzel({ subsets: ["latin"] });

interface FrontNavProps {
  children: React.ReactNode;
  cartItem: Product;
}

const Navigation: React.FC<FrontNavProps> = ({ children }) => {
  
  return (
    <>
      <div className="">
        <section className="top-nav">
          <AnnouncementBar />
          <MobileNav />
          <ModalProvider />
          <nav>
            <ul className="nav-menu">
              <li>
                <Link
                  className="nav-item nav-link nav-main nav-nav-link_link"
                  href="/"
                  style={cinzel.style}
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item nav-link nav-main">
                <Link
                  className="nav-nav-link_link"
                  href="/shop"
                  style={cinzel.style}
                >
                  SHOP
                </Link>
              </li>
              <Link
                href="/about"
                className="nav-item nav-link nav-main"
                style={cinzel.style}
              >
                ABOUT
              </Link>
              <Link
                href="/blog"
                className="nav-item nav-link nav-main nav-nav-link_link"
                style={cinzel.style}
              >
                NEWS
              </Link>

              <li className="nav_brand-logo nav-item">
                <Link
                  className="nav-nav-link_link"
                  href="/"
                  style={cinzel.style}
                >
                  BRAND NAME
                </Link>
              </li>

              <NavEnd />
            </ul>
          </nav>
        </section>
        {children}
      </div>
      <FooterNav />
    </>
  );
};

export default Navigation;

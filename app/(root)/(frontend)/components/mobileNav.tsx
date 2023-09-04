"use client";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { Cinzel } from "next/font/google";
import { Session } from "next-auth";
const cinzel = Cinzel({ subsets: ["latin"] });

export const MobileNav = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  return (
    <div className="mobile-nav">
      <button
        className="mobile-menu-toggle "
        onClick={() => {
          setNavOpen(true);
        }}
      >
        <HiBars3 className="my-4 w-8 h-8 " />
      </button>
      <div className="mobile-menu mobile-menu__side-menu">
        <div
          id="mySidenav"
          className={isNavOpen ? "sidenav opensidenav" : "sidenav closesidenav"}
        >
          <button
            className="closebtn nav-nav-link_link w-12 h-12 py-2 "
            onClick={() => {
              setNavOpen(false);
            }}
          >
            <IoCloseOutline />
          </button>
          <div className="mobile-brand__logo">
            <Link className="nav-nav-link_link" href="/" style={cinzel.style}>
              Cardicus
            </Link>
          </div>
          <Link className="nav-nav-link_link" href="/shop" style={cinzel.style}>
            Shop
          </Link>
          <Link
            className="nav-nav-link_link"
            href="/about"
            style={cinzel.style}
          >
            About
          </Link>
          <Link className="nav-nav-link_link" href="/blog" style={cinzel.style}>
            News
          </Link>
          <Link
            className="nav-nav-link_link"
            href="/login"
            style={cinzel.style}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

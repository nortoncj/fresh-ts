"use client";
import "./navigation.component.css";
import Link from "next/link";

import { useState } from "react";
import "./cart.component.css";

import { IoBagOutline, IoCloseOutline, IoSearch } from "react-icons/io5";
import { Cinzel } from "next/font/google";
import AnnouncementBar from "./components/announcmentBar";
import MobileNav from "./components/mobileNav";
import FooterNav from "./components/footerNav";
import { usePathname } from "next/navigation";

const cinzel = Cinzel({ subsets: ["latin"] });

interface FrontNavProps {
  children: React.ReactNode;
}

const Navigation: React.FC<FrontNavProps> = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <>
      <section className="top-nav">
        <AnnouncementBar />
        <MobileNav />
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
              <Link className="nav-nav-link_link" href="/" style={cinzel.style}>
                BRAND NAME
              </Link>
            </li>
            <li className="nav-item nav-link nav-login nav-main">
              <Link
                className="nav-nav-link_link"
                href="/login"
                style={cinzel.style}
              >
                LOGIN
              </Link>
            </li>
            <li className="nav-item nav-link nav-login nav-search">
              <Link className="nav-nav-link_link" href="/login">
                <IoSearch />
              </Link>
            </li>

            <div className="nav-item nav-cart nav-link nav-login nav-search">
              <button
                className="nav-cart"
                onClick={() => {
                  setCartOpen(true);
                }}
                id="open_cart_btn"
              >
                <IoBagOutline className="h-4 w-4" />
                <div id="cartAmount" className="cartAmount">
                  0
                </div>
              </button>
            </div>
          </ul>
        </nav>
      </section>
      {children}
      <div id="sidecart" className={isCartOpen ? "sidecart open" : "sidecart "}>
        <div className="cart_content">
          <div className="cart_header">
            <IoBagOutline className="w-6 h-6" />
            <div className="header_title">
              <h2>Your Cart</h2>
              <small id="'items_num">4</small>
            </div>
            <button
              type="button"
              id="close_btn"
              onClick={() => {
                setCartOpen(false);
              }}
              className="close_btn"
            >
              <IoCloseOutline />
            </button>
          </div>

          <div className="cart_items">
            <div className="cart_item">
              <div className="remove_item">
                <IoCloseOutline />
              </div>
              <div className="item_img">
                <img
                  src="./assets/img/products/NFC-CARD-SAMPLE-PNG-1.png"
                  alt=""
                />
              </div>
              <div className="item_details">
                <p>Gladius Card</p>
                <strong>$4.99</strong>
                <div className="qty">
                  <span>-</span>
                  <strong>1</strong>
                  <span>+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cart_actions">
            <div className="subtotal">
              <p>SUBTOTAL:</p>
              <p>
                $<span id="subtotal_price">22.35</span>
              </p>
            </div>
            <button>View Cart</button>
            <button>Checkout</button>
          </div>
        </div>
      </div>
      <FooterNav />
    </>
  );
};

export default Navigation;

"use client";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import React, { useState } from "react";
import { IoBagOutline, IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { CartItemWithProduct, ShoppingCart } from "@/app/libs/cart";
import CartEntry from "./cartEntry";
import { setProductQuantity } from "./cartActions";
import axios from "axios";
import { Fauna_One } from "next/font/google";

const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export default function CartButton({ cart }: ShoppingCartButtonProps) {
  const [isCartOpen, setCartOpen] = useState(false);
  const router = useRouter();

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: cart?.items?.map((item) => [item.productId, item.cartId]),
      }
    );

    window.location = response.data.url;
  };
  return (
    <>
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
            {cart?.size || null}
          </div>
        </button>
      </div>
      <div
        id="sidecart"
        className={isCartOpen ? "sidecart open z-50" : "sidecart z-50 "}
      >
        <div className="cart_content">
          <div className="cart_header">
            <IoBagOutline className="w-6 h-6" />
            <div className="header_title">
              <h2>Your Cart</h2>
              <small id="'items_num">{cart?.size || 0}</small>
            </div>
            <button
              id="close_btn"
              onClick={() => {
                setCartOpen(false);
              }}
              className="close_btn w-12 h-12"
            >
              <IoCloseOutline />
            </button>
          </div>

          <div className="cart_items">
            {cart?.size === 0 && (
              <p className="text-amber-500">No items added to cart.</p>
            )}
            {cart?.items.map((cartItem) => (
              <CartEntry
                key={cartItem.id}
                cartItem={cartItem}
                setProductQuantity={setProductQuantity}
              />
            ))}
          </div>

          <div className="cart_actions">
            <div className="subtotal">
              <p>SUBTOTAL:</p>
              <div>
                <span id="subtotal_price">
                  <Currency value={cart?.subtotal} />
                </span>
              </div>
            </div>
            <button  onClick={() => router.push("/cart")}>View Cart</button>
            <button  onClick={onCheckout} disabled={cart?.size === 0}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

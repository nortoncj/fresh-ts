import Container from "@/components/ui/container";

import { getCart } from "@/app/libs/cart";
import CartEntry from "./components/cartEntry";
import Summary from "./components/summary";
import { setProductQuantity, clearCart } from "./components/actions";

export const revalidate = 0;

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart?.items.length === 0 && (
                <div className="text-neutral-500">No items added to cart.</div>
              )}
              <ul>
                {cart?.items.map((cartItem) => (
                  <CartEntry cartItem={cartItem}  key={cartItem.id} setProductQuantity={setProductQuantity} clearCart={clearCart} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

"use client";
import { Button } from "@/components/ui/button";
import { Cinzel } from "next/font/google";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const cinzel = Cinzel({ subsets: ["latin"] });
interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

export default function AddToCartButton({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button
        className="btn btn-primary text-white bg-[#65272c] hover:bg-amber-900"
        style={cinzel.style}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
      >
        Add to Cart
      </Button>
      {isPending && <ClipLoader />}
      {!isPending && success && (
        <span className="text-success italic">Item Added</span>
      )}
    </div>
  );
}

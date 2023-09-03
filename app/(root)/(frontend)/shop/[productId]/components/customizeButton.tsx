"use client";
import { Button } from "@/components/ui/button";
import { Cinzel } from "next/font/google";
import { useState, useTransition } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const cinzel = Cinzel({ subsets: ["latin"] });
interface CustomizeButtonProps {
  productId: string;
  branded: boolean;
  customImage: string;
  incrementCustomProductQuantity: (productId: string, customImage:string, branded:boolean) => Promise<void>;
}

export default function CustomizeButton({
  productId,
  customImage,
  branded,
  incrementCustomProductQuantity,
}: CustomizeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  

  return (
    <div className="flex items-center gap-2">
      <Button
        className="btn btn-primary text-amber-100 bg-[#65272c] hover:bg-amber-900"
        style={cinzel.style}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementCustomProductQuantity(productId,customImage,branded);
            setSuccess(true);
          });
        }}
      >
        Customize
      </Button>
      {isPending && <ClipLoader />}
      {!isPending && success && (
        <span className="text-success italic">Item Added</span>
      )}
    </div>
  );
}

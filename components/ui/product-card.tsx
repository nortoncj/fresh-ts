"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency  from "@/components/ui/currency";
import IconButton  from "@/components/ui/icon-button";
import usePreviewModal from "@/app/hooks/user-preview-modal";
import useCart from "@/app/hooks/use-cart";
import { Product } from "@/types";
import { Fauna_One } from "next/font/google";
import { BsArrowsAngleExpand, BsBagPlus } from "react-icons/bs";

const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });
interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };
  
  return ( 
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Image & actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image 
          src={data.images?.[0]?.url} 
          alt="" 
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview} 
              icon={<BsArrowsAngleExpand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart} 
              icon={<BsBagPlus size={20} className="text-gray-600" />} 
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg" style={faunaOne.style}>{data.name}</p>
        <p className="text-sm text-[#c19a6b]">{data.category?.name}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency   value={data?.price} />
      </div>
    </div>
  );
}

export default ProductCard;
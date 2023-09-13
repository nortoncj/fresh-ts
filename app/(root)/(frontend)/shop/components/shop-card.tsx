"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/app/hooks/user-preview-modal";
import useCart from "@/app/hooks/use-cart";
import { Product } from "@/types";
import { Fauna_One } from "next/font/google";
import {
  BsArrowsAngleExpand,
  BsBagPlus,
  BsChevronLeft,
  BsChevronRight,
  BsHeart,
} from "react-icons/bs";
import Link from "next/link";
import "../shop.css";

const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });
interface ProductCard {
  data: Product;
}

const ShopCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/shop/${data?.id}`);
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
    <div onClick={handleClick} className="collections-products__item ">
      <div className="collections-products__item-box">
        <div className="collections-products__item-heart">
          <div className="collections-products__item-icon">
            <BsHeart />
          </div>
        </div>
        <div className="collections-products__slider">
          <div className="collections-products__slide collections-products__slide-model">
            <div className="collections-products__slide collections-products__slide-img h-full">
              <Image
              layout="fill"
                src={data.images?.[0]?.url}
                alt="model"
                className="img-responsive h-full"
              />
            </div>
          </div>

          <div className="collections-products__slide collections-products__slide-model h-full">
            <Image
            layout="fill"
              src={data.images?.[1]?.url}
              alt="model"
              className="img-responsive"
            />
          </div>
        </div>

        <div className="collections-products__left">
          <div className="collections-products__left-icon">
            <BsChevronLeft />
          </div>
        </div>
        <div className="collections-products__right">
          <div className="collections-products__right-icon">
            <BsChevronRight />
          </div>
        </div>
      </div>
      <div className="collections-products__item-title" style={faunaOne.style}>
        {data.name}
      </div>
      <div className="collections-products__item-price" style={faunaOne.style}>
        {data.price}
      </div>
    </div>
  );
};

export default ShopCard;

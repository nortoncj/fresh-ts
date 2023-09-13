import { Fauna_One, Cinzel } from "next/font/google";

import "./about.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });

const Shop = () => {
  return (
    <section className="product">
      <div className="product-container">
        <div className="product-description">
          <h1 className="product-description__title" style={cinzel.style}>
            Our Story
          </h1>
          <div className="product-description__info">
            <h2 style={faunaOne.style}>
              Cardicus is a cutting-edge NFC card company that prioritizes four
              core values - Quality, Ambition, Reliability, and Luxury. We are
              dedicated to delivering NFC card solutions that are not only
              technologically advanced but also reflect a sense of style and
              sophistication. Our commitment to these values will set us apart
              in the NFC card industry.
            </h2>
          </div>
        </div>
        <div className="product__item">
          <div className="product__item-box">
            <div className="product__item-heart"></div>
            <div className="product__slider">
              <div className="product__slide product__slide-img">
                <Image
                  src="https://images.pexels.com/photos/4466176/pexels-photo-4466176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="placeholder"
                  className="img-responsive"
                  layout="fill"
                />
              </div>
              <div className="product__slide product__slide-model">
                <Image
                  src="https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="model"
                  className="img-responsive"
                  layout="fill"
                />
              </div>
              <div className="product__slide product__slide-img">
                <Image
                  src="https://images.pexels.com/photos/4040600/pexels-photo-4040600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="model"
                  className="img-responsive"
                  layout="fill"
                />
              </div>

              <div className="product__slide product__slide-img">
                <img
                  src="https://images.pexels.com/photos/4466448/pexels-photo-4466448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="model"
                  className="img-responsive"
                />
              </div>
            </div>

            <div className="product__left">
              <div className="product__left-icon">
                <i className="fa-light fa-chevron-left"></i>
                <BsChevronLeft />
              </div>
            </div>
            <div className="product__right">
              <div className="product__right-icon">
                <i className="fa-light fa-chevron-right"></i>
                <BsChevronRight />
              </div>
            </div>
          </div>

          <hr className="text-black " />
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger style={cinzel.style}>Payments</AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards and electronic payments.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger style={cinzel.style}>Privacy</AccordionTrigger>
          <AccordionContent>
            We only keep the data we need and we don't share.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger style={cinzel.style}>How it works</AccordionTrigger>
          <AccordionContent>
            Just tap your device to any NFC enabled device.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Shop;

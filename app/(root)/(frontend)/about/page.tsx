import { Fauna_One, Cinzel } from "next/font/google";

import "./about.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });
const cinzel = Cinzel({ subsets: ["latin"], weight: "400" });

const Shop = () => {
  return (
    <section className="product">
      <div className="product-container">
        <div className="product-description">
          <h1 className="product-description__title" style={cinzel.style}>Our Story</h1>
          <div className="product-description__info">
            <h2 style={faunaOne.style}>
              Made from four layers of archival-quality Mohawk Superfine
              (nothing prints better), these are seriously thick Business Cards
              with a beautiful, natural texture. Plus there's that pop of color
              right in the middle. Everything about Luxe Business Cards is
              designed to make people go "Oooh".
            </h2>
          </div>
        </div>
        <div className="product__item">
          <div className="product__item-box">
            <div className="product__item-heart"></div>
            <div className="product__slider">
              <div className="product__slide product__slide-img">
                <img
                  src="https://images.pexels.com/photos/4466176/pexels-photo-4466176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="placeholder"
                  className="img-responsive"
                />
              </div>
              <div className="product__slide product__slide-model">
                <img
                  src="https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="model"
                  className="img-responsive"
                />
              </div>
              <div className="product__slide product__slide-img">
                <img
                  src="https://images.pexels.com/photos/4040600/pexels-photo-4040600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="model"
                  className="img-responsive"
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
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger style={cinzel.style}>Privacy</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger style={cinzel.style}>How it works</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
    </section>
  );
};

export default Shop;

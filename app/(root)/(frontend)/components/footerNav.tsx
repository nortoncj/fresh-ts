import Link from "next/link";
import { Fauna_One, Cinzel } from "next/font/google";
import "./footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BsTiktok, BsTwitter, BsYoutube } from "react-icons/bs";
const cinzel = Cinzel({ subsets: ["latin"] });
const faunaOne = Fauna_One({ subsets: ["latin"], weight: "400" });

export const FooterNav = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4 style={cinzel.style}>company</h4>
            <ul>
              <li>
                <Link href="#">about us</Link>
              </li>
              <li>
                <Link href="#">our services</Link>
              </li>
              <li>
                <Link href="#">privacy policy</Link>
              </li>
              <li>
                <Link href="#">affiliate program</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 style={cinzel.style}>get help</h4>
            <ul>
              <li>
                <Link href="#">FAQ</Link>
              </li>
              <li>
                <Link href="#">shipping</Link>
              </li>
              <li>
                <Link href="#">returns</Link>
              </li>
              <li>
                <Link href="#">order status</Link>
              </li>
              <li>
                <Link href="#">payment options</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 style={cinzel.style}>online shop</h4>
            <ul>
              <li>
                <Link href="#">cards</Link>
              </li>
              <li>
                <Link href="#">Sales</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 style={cinzel.style}>follow us</h4>
            <div className="social-links justify-center items-center ">
              <Link href="#">
                <FaFacebookF className=" mx-auto my-3 " />
              </Link>
              <Link href="#">
                <FaInstagram className=" mx-auto my-3 " />
              </Link>
              <Link href="#">
                <BsYoutube className=" mx-auto my-3 " />
              </Link>
              <Link href="#">
                <BsTwitter className=" mx-auto my-3 " />
              </Link>
              <Link href="#">
                <BsTiktok className=" mx-auto my-3 " />
              </Link>
              <Link href="#">
                <FaLinkedinIn className=" mx-auto my-3 " />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;

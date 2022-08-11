import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaPinterestSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-primary-dark px-4 py-6">
      <div className="container grid grid-cols-1 md:grid-cols-3 md:space-y-8 space-y-4 text-white">
        <div className="flex flex-col">
          <h1 className="font-bold">Customer Service</h1>
          <Link
            href="/privacy-policy"
            className="hover:pl-2 delay-75 mt-4 max-w-max"
          >
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">Privacy policy</a>
          </Link>
          <Link
            href="/terms-condition"
            className="hover:pl-2 delay-75 mt-4 max-w-max"
          >
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">
              Terms of service
            </a>
          </Link>
          <Link href="/faq">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">FAQs</a>
          </Link>
        </div>
        <div className="flex flex-col">
          <h1 className=" font-bold">Links</h1>
          <a
            href="https://www.oruphones.com/blog"
            className="hover:pl-2 delay-75 mt-4 max-w-max"
            target="_blank"
          >
            Blog
          </a>
          <Link href="/about-us">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">About Us</a>
          </Link>
          <Link href="/contact-us">
            <a className="hover:pl-2 delay-75 mt-4 max-w-max">Contact Us</a>
          </Link>
        </div>
        <div>
          <div className="flex flex-col">
            <h1 className="font-bold">Email us</h1>
            <a
              href="mailto:contact@oruphones.com?subject = Feedback"
              className="hover:pl-2 delay-75 mt-4 max-w-max"
            >
              contact@oruphones.com
            </a>
          </div>
          <div className="flex items-center justify-between pt-4 ">
            <a
              href="https://www.facebook.com/ORUphones"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare size={20} />
            </a>

            <a
              href="https://twitter.com/ORUPhones"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitterSquare size={20} />
            </a>

            <a
              href="https://www.instagram.com/ORUphones/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://www.pinterest.com/ORUphones/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPinterestSquare size={20} />
            </a>

            <a
              href="https://www.linkedin.com/company/oruphones/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="https://www.youtube.com/channel/UCJTgZUz7jkMCECYVO1uFE6A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
  FaPinterestSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import LoadingStatePopup from "../components/Popup/LoadingStatePopup";
import AppStoreCard from "../assets/app_store.svg";
import PlayStoreCard from "../assets/play_store.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";


const Footer = () => {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  return (
    <footer className="bg-primary-dark font-Roboto-Semibold px-2 pt-6">
      <div className="border-b pb-8 ">
        <div className="grid grid-cols-2 container md:grid-cols-3 md:space-y-8  text-white">
          <div className="flex flex-col">
            <h1 className="font-Roboto-Semobold text-mx">IMPORTANT LINKS</h1>
            <Link href="/about-us">
              <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">About Us</a>
            </Link>
            <Link href="/contact-us">
              <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">Contact Us</a>
            </Link>
            <Link
              href="/privacy-policy"
              className="yes  delay-75  max-w-max "
            >
              <a className="yes delay-75   max-w-max font-Roboto-Light text-jx mt-2">Privacy policy</a>
            </Link>
            <Link
              href="/terms-condition"
              className="yes delay-75 mt-4 max-w-max"
            >
              <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">
                Terms of service
              </a>
            </Link>
            <Link href="/faq">
              <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">FAQs</a>
            </Link>
          </div>
          {/* <div className="flex flex-col">
          <h1 className=" font-Roboto-Semobold text-mx">IMPORTANT LINKS</h1>
          <a
            href="https://www.oruphones.com/blog"
            className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2"
            target="_blank"
          >
            Blog
          </a>
          <Link href="#">
            <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">Best Deals</a>
          </Link>
          <Link href="#">
            <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">News</a>
          </Link>
          <Link href="#">
            <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">Popular Models</a>
          </Link>
        </div> */}
          <div className="flex flex-col text-white">
            <h1 className="font-Roboto-Semobold text-mx">IMPORTANT LINKS</h1>
            <Link href="/product/buy-old-refurbished-used-mobiles/apple">
              <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">Buy Used Apple iPhones</a>
            </Link>
            <Link href="/product/buy-old-refurbished-used-mobiles/samsung">
              <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2" >Buy Used Samsung iPhones</a>
            </Link>
            <Link
              href="/product/buy-old-refurbished-used-mobiles/realme"
              className="yes  delay-75  max-w-max "
            >
              <a className="yes delay-75   max-w-max font-Roboto-Light text-jx mt-2" >Buy Used Realme Phones</a>
            </Link>
            <Link
              href="/product/buy-old-refurbished-used-mobiles/motorola"
              className="yes delay-75 mt-4 max-w-max"
            >
              <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2" >
                Buy Used Motorola Phones
              </a>
            </Link>
            {/* <Link href="#">
            <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">Buy Used Motorola Phones</a>
          </Link> */}
          </div>

          {/* <div>
          <div className="flex flex-col">
            <h1 className="font-Roboto-Light text-jx mt-2">Email us</h1>
            <a
              href="mailto:contact@oruphones.com?subject = Feedback"
              className="yes delay-75  max-w-max"
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
              href="https://www.instagram.com/oruphones/?igshid=YmMyMTA2M2Y%3D"
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
        </div> */}
        </div>

        <div>
          {/* <div className="flex flex-col text-white">
          <h1 className="font-Roboto-Semobold text-mx">IMPORTANT LINKS</h1>
          <Link href="/about-us">
            <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">About Us</a>
          </Link>
          <Link href="/contact-us">
            <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">Contact Us</a>
          </Link>
          <Link
            href="/privacy-policy"
            className="yes  delay-75  max-w-max "
          >
            <a className="yes delay-75   max-w-max font-Roboto-Light text-jx mt-2">Privacy policy</a>
          </Link>
          <Link
            href="/terms-condition"
            className="yes delay-75 mt-4 max-w-max"
          >
            <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">
              Terms of service
            </a>
          </Link>
          <Link href="/faq">
            <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">FAQs</a>
          </Link>
        </div> */}
          <div className="grid grid-cols-2  mt-8 px-4 text-white">
            <div className="flex flex-col ">
              <h1 className=" font-Roboto-Semobold text-mx">IMPORTANT LINKS</h1>
              <a
                href="https://www.oruphones.com/blog"
                className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2"
                target="_blank"
              >
                Blog
              </a>
              <Link href="/product/buy-old-refurbished-used-mobiles/bestdealnearyou">
                <a className=" delay-75  max-w-max font-Roboto-Light text-jx mt-2">Best Deals</a>
              </Link>
              {/* <Link href="#">
            <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">News</a>
          </Link> */}
              <Link href="/product/models">
                <a className="yes delay-75  max-w-max font-Roboto-Light text-jx mt-2">Popular Models</a>
              </Link>
            </div>
            <div>
              <h1 className=" font-Roboto-Semobold text-mx">DOWNLOAD ORUphones App</h1>
              <div className="grid grid-cols-2 items-center gap-4 my-4">
                <Link href="https://apps.apple.com/in/app/oruphones-sell-used-phones/id1629378420">
                  <Image src={AppStoreCard} />
                </Link>
                <Link href="https://play.google.com/store/apps/details?id=com.oruphones.oru&hl=en&gl=US">
                  <Image src={PlayStoreCard} />
                </Link>
              </div>
              <div>
                <h1 className="font-Roboto-Semobold text-mx">FOLLOW US ON SOCIAL MEDIA</h1>
                <div>
                  <div className="flex items-center justify-between pt-2 ">
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
                      href="https://www.instagram.com/oruphones/?igshid=YmMyMTA2M2Y%3D"
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
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="font-Roboto-Light text-mx text-center py-[12px] text-[#FFFFFF]">© 2022 ORUPhones. All Rights Reserved.</p>
      </div>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </footer>
  );
};

export default Footer;

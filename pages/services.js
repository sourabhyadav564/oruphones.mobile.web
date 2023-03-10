import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { servicesData } from "@/utils/constant";
import Footer from "@/components/Footer";
import VerifyFlowPopup from "@/components/Popup/VerifyFlowPopup";
import BottomNav from "@/components/Navigation/BottomNav";
import priceComparison from "./services/PriceComparison";
import PriceComparison from "./services/PriceComparison";
import Link from "next/link";
import LoginPopup from "@/components/Popup/LoginPopup";
import { useAuthState } from "providers/AuthProvider";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function Services() {
  const [openApp, setOpenApp] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const { authenticated, loading, user } = useAuthState();
  const [performAction, setPerformAction] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
    if (openLoginPopup == false && performAction == true && Cookies.get("userUniqueId") != undefined) {
      clearInterval(interval);
      router.push("/services/PriceComparison");
    }
  }, 1000);
  }, [openLoginPopup]);

  const handleClick = () => {
    setOpenLoginPopup(true);
    setPerformAction(true);
  };

  return (
    <Fragment>
      <div className="p-4 text-lg bg-primary font-Roboto-Regular text-white text-center rounded-b-2xl">
        <div className="w-52 my-4 mx-auto ">
          <Image
            alt="ORU services"
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/service_img.svg"}
            width={"208px"}
            height={"100%"}
            objectFit="contain"
            layout="responsive"
          />
        </div>
        <h1>Services</h1>
      </div>
      <main className="px-3 my-4 font-Roboto-Regular grid">
        {servicesData.map((item, index) => (
          <Link href={{ pathname: user && item.link ? item?.link : "" }}>
            <div
              key={index}
              className={`${
                item.link
                  ? "border bg-[rgba(0,0,0,0.03)] py-2 px-4 pl-0 flex items-center font-Roboto-Medium rounded shadow mb-3"
                  : "border py-2 px-4 pl-0 flex items-center font-Roboto-Medium rounded shadow mb-3 opacity-60"
              }`}
              data-aos="flip-up"
              onClick={() =>
                item.link
                  ? user
                    ? setOpenApp(false)
                    : handleClick()
                  : setOpenApp(true)
              }
            >
              <>
                <div className="p-4">
                  <Image
                    src={item?.imgSrc || "/"}
                    alt={`ORU services ${item.title}}`}
                    width={25}
                    height={25}
                    objectFit="contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-20">{item.title}</p>
                  <p className="text-sm text-gray-70">{item.description}</p>
                </div>
              </>
            </div>
          </Link>
        ))}
      </main>
      <Footer />
      <BottomNav />
      <VerifyFlowPopup open={openApp} setOpen={setOpenApp} />
      <LoginPopup open={openLoginPopup} setOpen={setOpenLoginPopup} />
    </Fragment>
  );
}

export default Services;

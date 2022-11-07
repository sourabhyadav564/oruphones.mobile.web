import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs";
import verifiedIcon from "@/assets/verified.svg";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";
import AddFav from "../AddFav";
import { CardHeading, CardHeading1, CardHeading2, CardHeading3, CardHeading4, CardHeading5 } from "@/components/elements/CardHeading/cardheading";
import VerifiedIcon from "@/components/VerifiedIcon";
// import IStock from "@/assets/icons/phone.png"
import { numberWithCommas } from "@/utils/util";
import { BiChevronRight } from "react-icons/bi";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { useRouter } from "next/router";
import sold_out from "@/assets/soldout.png";
import VerificationIcon from "../verificationIcon";
import { fetchByMarketingName } from "api-call";
import Cookies from "js-cookie";



function ShopbymodelCard({ data, location, makeLink, make, src, alt, fallBackSrc = Logo.src }) {

  // console.log("data3", data);

  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [stateImage, setstateImage] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const handleModelClick = () => {
    fetchByMarketingName(
      location,
      data,
      Cookies.get("userUniqueId") || "Guest",
      0,
      "Featured"
    )
  }

  console.log("shop by models make : ", make)

  return (

    <>
      <div className="flex relative mb-6 flex-col items-center justify-center"
        // onClick={handleModelClick} 
        onClick={() => window.open(
          makeLink
            ? `/product/buy-old-refurbished-used-mobiles/${make}/`
            : `/product/buy-old-refurbished-used-mobiles/${make}/${data}`,
          "_blank"
        )
        }
      >

        <div className="">
          <Image
            src={imageError ? fallBackSrc : src}
            alt={alt}
            onError={() => setImageError(true)}
            width="34"
            height="45"
          />
        </div>

        <div className="m-auto">
          <CardHeading5 title={data} />
        </div>

      </div>
    </>

  )
};


export default ShopbymodelCard;

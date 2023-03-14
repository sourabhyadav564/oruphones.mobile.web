import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import AddFav from "../AddFav";
import {
  CardHeading,
  CardHeading1,
  CardHeading2,
  CardHeading3,
  CardHeading4,
  CardHeading5,
} from "@/components/elements/CardHeading/cardheading";
import VerifiedIcon from "@/components/VerifiedIcon";
import { getDefaultImage, numberWithCommas } from "@/utils/util";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { useRouter } from "next/router";
import VerificationIcon from "../verificationIcon";
import { fetchByMarketingName } from "api-call";
import Cookies from "js-cookie";

function ShopbymodelCard({
  data,
  location,
  makeLink,
  make,
  src,
  alt,
}) {

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
    );
  };

  

  return (
    <>
      <div
        className="flex relative mb-6 flex-col items-center justify-center"
        onClick={() =>
          window.open(
            makeLink
              ? `/product/buy-old-refurbished-used-mobiles/${make}/`
              : `/product/buy-old-refurbished-used-mobiles/${make}/${data}`,
            "_blank",
            "nofollow"
          )
        }
      >
        <div className="">
          <Image
          quality={25}
            loading="lazy"
            placeholder="blur"
            priority={false}
            unoptimized={false}
            blurDataURL={imageError ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : src || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
            src={imageError ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : src || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
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
  );
}

export default ShopbymodelCard;

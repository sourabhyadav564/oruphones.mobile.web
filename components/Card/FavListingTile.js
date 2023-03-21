import Image from "next/image";
import { getDefaultImage, numberWithCommas } from "@/utils/util";
import { Fragment } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { removeFavotie } from "api-call";
import VerificationIcon from "@/components/verificationIcon"; 
import HeartFill from "@/assets/heartfill.svg";

import { useState } from "react";

function FavListingTile({ data, setProducts }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleFavoties = async () => {
    setProducts((prevState) => {
      removeFavotie(
        data.listingId,
        Cookies.get("userUniqueId") || "Guest",
        Cookies.get("sessionId")
      ).then((response) => {
      });
      return prevState.filter((i) => i.listingId !== data.listingId);
    });
  };

  return (
    <Fragment>
      <div className="grid font-SF-Pro grid-cols-1">
        <div
          onClick={() =>
            window.open(
              `/product/buy-old-refurbished-used-mobiles/${data?.marketingName.split(" ")[0]}/${data?.marketingName}/${data?.listingId}?isOtherVendor=${data?.isOtherVendor}`,
              "_blank"
            )
          }
        >
          <a>
            <div className={`flex flex-col cardShadow1 rounded-lg`}>
              <div className="flex">
                <div className=" m-2">
                  {data?.images && !data?.imagePath ? (
                    <Image
                    quality={25}
                      loading="lazy"
                      placeholder="blur"
                      priority={false}
                      unoptimized={false}
                      blurDataURL={imageError ? getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" :
                        (data?.images &&
                          data.images.length > 0 &&
                          data.images[0].fullImage) ||
                        data?.defaultImage?.fullImage || getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
                      src={imageError ? getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" :
                        (data?.images &&
                          data.images.length > 0 &&
                          data.images[0].fullImage) ||
                        data?.defaultImage?.fullImage || getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                      }
                      onError={() => {
                        setImageError(true);
                      }}
                      width={250}
                      height={150}
                      objectFit="contain"
                      alt={data.marketingName}
                    />
                  ) : (
                    <Image
                    quality={25}
                      loading="lazy"
                      placeholder="blur"
                      priority={false}
                      unoptimized={false}
                      blurDataURL={imageError ? getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : data?.imagePath || getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
                      src={imageError ? getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : data?.imagePath || getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
                      onError={() => {
                        setImageError(true);
                      }}
                      width={250}
                      height={150}
                      objectFit="contain"
                      alt={data.marketingName}
                    />
                  )}
                </div>
                <div className="w-full pt-1 pr-7 ">
                  <div className="text-sm font-bold flex justify-between items-start">
                    <p className="flex-1">{data.marketingName}​</p>
                  </div>
                  <div className="flex space-x-4 text-gray-70 text-xs mt-3">
                    <p className="flex flex-col items-start">
                      <span>Storage</span>
                      <span className="font-bold text-sm">
                        {data?.deviceStorage}
                      </span>
                    </p>
                    <p className="flex flex-col items-start">
                      <span>Condition</span>
                      <span className="font-bold text-sm">
                        {data.deviceCondition}
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    {data?.verified ? <div className=" w-full pr-2 pt-2 text-center m-auto justify-between">
                      <div className="flex">
                        <div
                          className="flex w-28 h-9 rounded-md justify-center"
                          style={{ backgroundColor: "#4CAF50" }}>
                          <div className="w-7 h-7 ">
                            <VerificationIcon />
                          </div>
                          <span className="text-bx self-center text-white uppercase font-light italic">
                            verified
                          </span>
                        </div>
                      </div>
                    </div> :
                      <div></div>
                    }
                    <div className="bg-black justify-center mt-2 rounded-md flex flex-col items-center">
                      <div className="text-gray-300 text-xs">List Price</div>
                      <div className="text-sm font-bold text-gray-50 ">
                        ₹ {numberWithCommas(data.listingPrice || "")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-full px-4 py-2">
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="flex absolute right-0 pr-10 pt-3">
           <Image src={HeartFill} width={20} height={20} onClick={(e) => {
              e.preventDefault();
              handleFavoties(data);
            }}/>
        </div>
      </div>
    </Fragment>
  );
}

export default FavListingTile;

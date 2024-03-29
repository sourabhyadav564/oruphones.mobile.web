import Image from "next/image";
import Link from "next/link";
import { getDefaultImage, numberWithCommas } from "@/utils/util";
import AddFav from "../AddFav";
import VerifiedIcon from "../VerifiedIcon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import {
  CardHeading,
  CardHeading1,
  CardHeading2,
  CardHeading3,
  CardHeading4,
} from "@/components/elements/CardHeading/cardheading";
import { getUserListings } from "api-call";
import { useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";

function OtherListingCard({ data, setProducts, prodLink }) {
  const router = useRouter();
  const [listings, setListings] = useState(
    localStorage.getItem("listings") || []
  );
  const { authenticated, user } = useAuthState();
  const [loadingState, setLoadingState] = useState(false);
  const [listingState, setListingState] = useState(false);
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  useEffect(() => {
    if (user && user?.userdetails?.userUniqueId && listings.length === 0) {
      localStorage.getItem("listings") ||
        getUserListings(
          user?.userdetails?.userUniqueId,
          Cookies.get("sessionId")
        ).then((res) => {
          setListings(res.dataObject.map((item2) => item2.listingId));
        });
    }
  }, []);

  if (data?.make?.toLowerCase().includes("all")) {
    return (
      <>
        <Link href={`#all-models`}>
          <a className="w-full h-full rounded border p-4 bg-white flex justify-center items-center">
            <p className="block text-primary">{"Show All"}</p>
          </a>
        </Link>
        <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      </>
    );
  }

  var type = ["old phone", "used", "refurbished"];
  const soldout = `buy ${type[Math.floor(Math.random() * type.length)]} ${
    data?.marketingName
  } ${data?.deviceStorage} ${data?.deviceCondition} soldout`.toLowerCase();

  return (
    <>
      <div>
        <a className="grid grid-cols-1 h-full shadow-lg shadow-gray-900 rounded-lg relative py-2 px-3 bg-m-white cardShadow1">
          <div className="grid grid-cols-1">
            <div className="absolute px-2  flex z-30 items-center top-0 left-0 right-0 pt-1 justify-between w-full">
              {data?.status === "Sold_Out" ? (
                <Image
                  src="https://d1tl44nezj10jx.cloudfront.net/web/assets/soldout.svg"
                  width={"50"}
                  height={"20"}
                  objectFit="contain"
                  alt={soldout}
                />
              ) : !(data?.isOtherVendor === "Y") && data?.verified ? (
                <VerifiedIcon width={45} height={22} />
              ) : (
                <div></div>
              )}
              <span>
                {!(data?.isOtherVendor === "Y") &&
                  listings &&
                  !listings.includes(data?.listingId) && (
                    <AddFav data={data} setProducts={setProducts} />
                  )}
              </span>
            </div>
            {listings.includes(data?.listingId) ? (
              <div
                onClick={() =>
                  window.open(`/user/listings/${data?.listingId}`, "_blank")
                }
              >
                <div className="flex justify-center p-2">
                  <Image
                    quality={25}
                    loading="lazy"
                    placeholder="blur"
                    priority={false}
                    unoptimized={false}
                    blurDataURL={
                      imageError
                        ? getDefaultImage(data?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                        : data?.imagePath ||
                          getDefaultImage(data?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                    }
                    src={
                      imageError
                        ? getDefaultImage(data?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                        : data?.imagePath ||
                          getDefaultImage(data?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                    }
                    onError={() => {
                      setImageError(true);
                    }}
                    alt={`buy ${
                      type[Math.floor(Math.random() * type.length)]
                    } ${data?.marketingName} ${data?.deviceStorage} ${
                      data?.deviceCondition
                    }`.toLowerCase()}
                    width={150}
                    height={150}
                    objectFit="contain"
                  />
                </div>
                <div className="flex-wrap w-full text-gray-70 pt-1">
                  <p
                    className="font-Roboto-Bold text-gx  flex items-center "
                    style={{ color: "#000944" }}
                  >
                    {data?.listingPrice && (
                      <span className="mr-0.5">&#x20B9;</span>
                    )}
                    {numberWithCommas(data?.listingPrice || "")}
                  </p>
                  <p className="flex-1 truncate w-full capitalize font-Roboto-Medium text-jx">
                    {data?.marketingName}
                  </p>
                  <div className="flex flex-wrap justify-between">
                    {data?.deviceStorage && (
                      <p className="mr-1 font-Light text-kx text-black">
                        <CardHeading title={data?.deviceStorage} />
                      </p>
                    )}
                    <p className="flex">
                      <span className="font-Roboto-Light text-bx text-black">
                        {`Condition :  ${" "} `}
                      </span>
                      <span className="font-Roboto-Light text-bx text-black">
                        {data?.deviceCondition || "--"}
                      </span>
                    </p>
                  </div>

                  <div className="justify-self-end flex justify-between font-Light text-ax capitalize">
                    <span>
                      <CardHeading title={data?.listingLocation || "India"} />
                    </span>
                    <CardHeading title={data?.listingDate || "Today"} />
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() =>
                  window.open(
                    `/product/buy-old-refurbished-used-mobiles/${
                      data?.marketingName.split(" ")[0]
                    }/${data?.marketingName}/${
                      prodLink ? data?.listingId : ""
                    }?isOtherVendor=${data?.isOtherVendor}`,
                    "_blank"
                  )
                }
              >
                <div className="flex justify-center p-2">
                  <Image
                    quality={25}
                    loading="lazy"
                    placeholder="blur"
                    priority={false}
                    unoptimized={false}
                    blurDataURL={
                      imageError
                        ? getDefaultImage(data?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                        : data?.imagePath ||
                          getDefaultImage(data?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                    }
                    src={
                      imageError
                        ? getDefaultImage(data?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                        : data?.imagePath ||
                          getDefaultImage(data?.marketingName) ||
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                    }
                    onError={() => {
                      setImageError(true);
                    }}
                    alt={`buy ${
                      type[Math.floor(Math.random() * type.length)]
                    } ${data?.marketingName} ${data?.deviceStorage} ${
                      data?.deviceCondition
                    }`.toLowerCase()}
                    width={150}
                    height={150}
                    objectFit="contain"
                  />
                </div>
                <div className="flex-wrap w-full text-gray-70 pt-1">
                  <p
                    className="font-Roboto-Bold text-gx flex items-center "
                    style={{ color: "#000944" }}
                  >
                    {data?.listingPrice && (
                      <span className="mr-0.5">&#x20B9;</span>
                    )}
                    {numberWithCommas(data?.listingPrice || "")}
                  </p>
                  <p className="flex-1 truncate w-full capitalize font-Roboto-Medium text-ex text-[#000944]">
                    {data?.marketingName}
                  </p>
                  <div className="flex flex-wrap justify-between">
                    {data?.deviceStorage && (
                      <p className="mr-1 font-Light text-kx text-black">
                        <CardHeading title={data?.deviceStorage} />
                      </p>
                    )}
                    <p className="flex">
                      <span className="font-Roboto-Light text-bx text-black">
                        {`Condition :   ${" "} `}
                      </span>
                      <span className="font-Roboto-Light text-bx text-black">
                        {data?.deviceCondition || "--"}
                      </span>
                    </p>
                  </div>

                  <div className="justify-self-end flex justify-between font-Light text-ax capitalize">
                    <span>
                      <CardHeading title={data?.listingLocation || "India"} />
                    </span>
                    <CardHeading title={data?.listingDate || "Today"} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </a>
      </div>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </>
  );
}

export default OtherListingCard;

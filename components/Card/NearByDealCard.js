import Image from "next/image";
import Link from "next/link";
import { getDefaultImage, numberWithCommas } from "@/utils/util";
import AddFav from "../AddFav";
import VerifiedIcon from "../VerifiedIcon";
import {
  CardHeading3,
  CardHeading4,
  CardHeading,
} from "@/components/elements/CardHeading/cardheading";
import { useEffect, useState } from "react";
import { useAuthState } from "providers/AuthProvider";
import { getUserListings } from "api-call";

function NearByDealCard({ data, setProducts, prodLink, myListing }) {
  const { authenticated, loading, user } = useAuthState();
  const [imageError, setImageError] = useState(false);
  var type = ["old phone", "used", "refurbished"];
  const soldout = `buy ${type[Math.floor(Math.random() * type.length)]} ${
    data?.marketingName
  } ${data?.deviceStorage} ${data?.deviceCondition} soldout`.toLowerCase();

  if (data?.make?.toLowerCase().includes("all")) {
    return (
      <Link href={`/product/buy-old-refurbished-used-mobiles/bestdealnearyou`}>
        <a className="w-full h-full rounded-md p-4 bg-white flex justify-center items-center cardShadow1">
          <p className="block text-primary">{"Show All"}</p>
        </a>
      </Link>
    );
  }

  return (
    <div>
      <a>
        <div
          className="grid grid-cols-1 rounded-md py-2 px-3 bg-m-white cardShadow1"
          data-aos="fade-up"
        >
          <div className="grid grid-cols-1 relative">
            <div className="absolute right-0 flex justify-between items-center w-full z-20">
              <span>
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
                  <svg height={20} width={20} />
                )}
              </span>
              {data?.isOtherVendor === "N" &&
                !myListing.includes(data.listingId) && (
                  <AddFav data={data} setProducts={setProducts} />
                )}
            </div>
            {!myListing.includes(data.listingId) ? (
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
                    className="font-Roboto-Bold flex items-center text-dx"
                    style={{ color: "#000944" }}
                  >
                    {data?.listingPrice && (
                      <span className="mr-0.1">&#x20B9;</span>
                    )}
                    {numberWithCommas(data?.listingPrice || "")}
                  </p>
                  <p className="flex-1 truncate w-full font-Regular  text-black">
                    <CardHeading4 title={data?.marketingName} />
                  </p>
                  <div className="flex flex-wrap justify-between">
                    {data?.deviceStorage && (
                      <p className="mr-1 font-Light text-kx text-black">
                        <CardHeading title={data?.deviceStorage} />
                      </p>
                    )}
                    <p className="flex">
                      <span className="font-Roboto-Light text-bx text-[#000000]">
                        {`Condition :   ${" "}`}
                      </span>
                      <span className="font-Roboto-Light text-bx text-[#000000]">
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
                    className="font-Roboto-Bold flex  items-center text-dx"
                    style={{ color: "#000944" }}
                  >
                    {data?.listingPrice && (
                      <span className="mr-0.1">&#x20B9;</span>
                    )}
                    {numberWithCommas(data?.listingPrice || "")}
                  </p>
                  <p className="flex-1 truncate w-full capitalize font-Regular text-jx text-black">
                    <CardHeading4 title={data?.marketingName} />
                  </p>
                  <div className="flex flex-wrap justify-between">
                    {data?.deviceStorage && (
                      <p className="mr-1 font-Light text-kx text-black">
                        <CardHeading title={data?.deviceStorage} />
                      </p>
                    )}
                    <p className="flex">
                      <span className="font-Roboto-Light text-jx text-[#000000]">
                        {`Condition :   ${" "}`}
                      </span>
                      <span className="font-Roboto-Light text-bx text-[#000000]">
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
        </div>
      </a>
    </div>
  );
}

export default NearByDealCard;

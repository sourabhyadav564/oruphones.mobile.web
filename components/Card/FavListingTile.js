import Image from "next/image";
// import Link from "next/link";
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
        Cookies.get("userUniqueId") || "Guest"
      ).then((response) => {
        // console.log("removeFav RES", response);
      });
      return prevState.filter((i) => i.listingId !== data.listingId);
    });
  };
  // console.log("dataFav", data);

  return (
    <Fragment>
      <div className="grid font-SF-Pro grid-cols-1">
        <div
          // href={{
          //   pathname: `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}`,
          //   query: { isOtherVendor: "N" },
          // }}
          onClick={() =>
            window.open(
              `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}?isOtherVendor=${data?.isOtherVendor}`,
              "_blank"
            )
          }
        >
          <a>
            <div className={`flex flex-col cardShadow1 rounded-lg`}>
              <div className="flex">
                {/* image */}
                <div className=" m-2">
                  {/* {data?.images && (
                  <Image
                    src={
                      (data?.images &&
                        data.images.length > 0 &&
                        data.images[0].fullImage) ||
                      data?.defaultImage?.fullImage ||
                      "/fullImage"
                    }
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                )}

                {data?.imagePath && (
                  <Image
                    src={data?.imagePath}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                )} */}

                  {data?.images && !data?.imagePath ? (
                    <Image
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
                    {/* <svg
                      className="text-gray-c7"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.999"
                      height="21"
                      viewBox="0 0 20.999 21"
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavoties(data);
                      }}
                    >
                      <path
                        id="hearts"
                        d="M10.524,21a1.49,1.49,0,0,0-.359-.882,5.824,5.824,0,0,0-.964-.964q-.6-.492-1.394-1.066T6.146,16.806Q5.274,16.1,4.4,15.278A14.483,14.483,0,0,1,2.741,13.4a15.628,15.628,0,0,1-1.394-2.235A11.9,11.9,0,0,1,.383,8.46,13.947,13.947,0,0,1,.024,5.25,5.058,5.058,0,0,1,1.562,1.538,5.058,5.058,0,0,1,5.274,0,5.058,5.058,0,0,1,8.986,1.538,5.058,5.058,0,0,1,10.524,5.25a5.058,5.058,0,0,1,1.538-3.712A5.058,5.058,0,0,1,15.774,0a5.058,5.058,0,0,1,3.712,1.538A5.058,5.058,0,0,1,21.023,5.25a13.99,13.99,0,0,1-.359,3.21,11.861,11.861,0,0,1-.964,2.707A15.7,15.7,0,0,1,18.306,13.4a14.426,14.426,0,0,1-1.661,1.877q-.872.82-1.743,1.528t-1.661,1.282q-.79.574-1.394,1.066a5.854,5.854,0,0,0-.964.964,1.485,1.485,0,0,0-.359.882Z"
                        transform="translate(-0.024)"
                        fill={data.favourite ? "#FF0000" : "#C7C7C7"}
                      />
                    </svg> */}
                  </div>
                  <div className="flex space-x-4 text-gray-70 text-xs mt-3">
                    <p className="flex flex-col items-start">
                      <span>Storage</span>
                      <span className="font-bold text-sm">
                        {data?.deviceStorage}
                      </span>
                    </p>
                    {/* <p className="flex flex-col items-start">
                    <span>Color</span>
                    <span className="font-bold text-sm"> {data?.color} </span>
                  </p> */}
                    <p className="flex flex-col items-start">
                      <span>Condition</span>
                      <span className="font-bold text-sm">
                        {data.deviceCondition}
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2">
                    {data?.verified ? <div className=" w-full pr-2 pt-2 text-center m-auto justify-between">
                      {/* <VerifiedIcon width={60} height={30} /> */}
                      <div className="flex">
                        <div
                          className="flex w-28 h-9 rounded-md justify-center"
                          style={{ backgroundColor: "#4CAF50" }}>
                          {/* <VscVerified size={20} className="self-center text-white"/> */}
                          {/*image  */}
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
                    {/* {data?.verified ? (
                <VerifiedIcon width={60} height={30} />
              ) : (
                <UnVerifiedIcon width={60} height={30} />
              )} */}
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        {/* <div className="absolute right-0 pr-6 py-3">
          {(
            <AddFav
              data={data}
              setProducts={setProducts}
              width={22}
              height={22}
            />
          )}
        </div> */}
        <div className="flex absolute right-0 pr-10 pt-3">
          {/* <AiFillHeart
            className="text-red"
            onClick={(e) => {
              e.preventDefault();
              handleFavoties(data);
            }}
          /> */}
           <Image src={HeartFill} width={20} height={20} onClick={(e) => {
              e.preventDefault();
              handleFavoties(data);
            }}/>
        </div>
        {/* <div className="flex absolute right-0 pr-10 pt-3">
          <svg
            className="text-gray-c7"
            xmlns="http://www.w3.org/2000/svg"
            width="20.999"
            height="21"
            viewBox="0 0 20.999 21"
            onClick={(e) => {
              e.preventDefault();
              handleFavoties(data);
            }}
          >
            <path
              id="hearts"
              d="M10.524,21a1.49,1.49,0,0,0-.359-.882,5.824,5.824,0,0,0-.964-.964q-.6-.492-1.394-1.066T6.146,16.806Q5.274,16.1,4.4,15.278A14.483,14.483,0,0,1,2.741,13.4a15.628,15.628,0,0,1-1.394-2.235A11.9,11.9,0,0,1,.383,8.46,13.947,13.947,0,0,1,.024,5.25,5.058,5.058,0,0,1,1.562,1.538,5.058,5.058,0,0,1,5.274,0,5.058,5.058,0,0,1,8.986,1.538,5.058,5.058,0,0,1,10.524,5.25a5.058,5.058,0,0,1,1.538-3.712A5.058,5.058,0,0,1,15.774,0a5.058,5.058,0,0,1,3.712,1.538A5.058,5.058,0,0,1,21.023,5.25a13.99,13.99,0,0,1-.359,3.21,11.861,11.861,0,0,1-.964,2.707A15.7,15.7,0,0,1,18.306,13.4a14.426,14.426,0,0,1-1.661,1.877q-.872.82-1.743,1.528t-1.661,1.282q-.79.574-1.394,1.066a5.854,5.854,0,0,0-.964.964,1.485,1.485,0,0,0-.359.882Z"
              transform="translate(-0.024)"
              fill={data.favourite ? "#FF0000" : "#C7C7C7"}
            />
          </svg>
        </div> */}
        {/* <div className="absolute right-0 pb-0 pr-4">
          <div></div>
          <div className="bg-black px-4 pt-2 mt-2 rounded-md ">
            <div className="text-gray-300 text-xs">List Price</div>
            <div className="text-sm font-bold text-gray-50 ">
              ₹ {numberWithCommas(data.listingPrice || "")}
            </div>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
}

export default FavListingTile;

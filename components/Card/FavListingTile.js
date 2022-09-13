import Image from "next/image";
import Link from "next/link";
import { numberWithCommas } from "@/utils/util";
import { Fragment } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { removeFavotie } from "api-call";
import VerifiedIcon from "../VerifiedIcon";
import UnVerifiedIcon from "../UnVerifiedIcon";

function FavListingTile({ data, setProducts }) {
  const router = useRouter();

  const handleFavoties = async () => {
    setProducts((prevState) => {
      removeFavotie(data.listingId, Cookies.get("userUniqueId") || "Guest").then(
        (response) => {
          console.log("removeFav RES", response);
        }
      );
      return prevState.filter((i) => i.listingId !== data.listingId);
    });
  };

  return (
    <Fragment>
      <Link
        href={{
          pathname: `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}`,
          query: { isOtherVendor: "N" },
        }}
      >
        <a>
          <div className={`flex flex-col pt-2 cardShadow1 rounded-lg`}>
            <div className="flex items-start">
              <div className="px-2">
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
                ) : (
                  <Image
                    src={data?.imagePath}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                )}
              </div>
              <div className="w-full pt-1 pr-3">
                <div className="text-sm font-bold flex justify-between items-start uppercase ">
                  <p className="flex-1">{data.marketingName}​</p>
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
                </div>
                <div className="grid grid-cols-3 space-x-2 text-gray-70 text-xs mt-3">
                  <p className="flex flex-col items-start">
                    <span>Storage</span>
                    <span className="font-bold text-sm">
                      {data?.deviceStorage}
                    </span>
                  </p>
                  <p className="flex flex-col items-start">
                    <span>Color</span>
                    <span className="font-bold text-sm"> {data?.color} </span>
                  </p>
                  <p className="flex flex-col items-start">
                    <span>Condition</span>
                    <span className="font-bold text-sm">
                      {data.deviceCondition}​
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center pl-4 w-full">
              {data?.verified ? (
                <VerifiedIcon width={60} height={30} />
              ) : (
                <UnVerifiedIcon width={60} height={30} />
              )}
              <div className="bg-gray-ef text-gray-70 text-sm flex flex-col px-4 py-0.5 ml-auto rounded-tl-md rounded-br-md">
                <span>List Price</span>
                <span className="text-lg font-bold">
                  ₹ {numberWithCommas(data.listingPrice || "")}​
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </Fragment>
  );
}

export default FavListingTile;

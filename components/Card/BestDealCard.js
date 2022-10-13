import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs";
import verifiedIcon from "@/assets/verified.svg";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";
import AddFav from "../AddFav";

import { numberWithCommas } from "@/utils/util";
import { BiChevronRight } from "react-icons/bi";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { useRouter } from "next/router";
import sold_out from "@/assets/soldout.png";

function BestDealCard({
  openConditionInfo,
  openVerificationInfo,
  data,
  setProducts,
}) {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  return (
    <>
      <div className="grid grid-cols-3 mb-6 rounded-lg border cardShadow1 p-4 max-w-sm relative">
        <div className="text-black-4e text-sm">
          <p className="mb-2.5">
            <span className="text-xs block">Condition</span>
            <span className="font-bold flex items-center">
              {data?.deviceCondition || <span>&nbsp;&nbsp;</span>}
              <BsInfoCircle
                className="ml-2 text-xs mt-0.5 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  openConditionInfo();
                }}
              />
            </span>
          </p>
          <p className="mb-2.5">
            <span className="text-xs block">RAM</span>
            <span className="font-bold block">{data?.deviceRam || "--"}​</span>
          </p>
          <p className="mb-2.5">
            <span className="text-xs block">Storage</span>
            <span className="font-bold block">
              {data?.deviceStorage || <span>&nbsp;&nbsp;</span>}
            </span>
          </p>
          <p className="mb-2.5">
            <span className="text-xs block">Listed on</span>
            <span className="font-bold block">
              {data?.listingDate || <span>&nbsp;&nbsp;</span>}
            </span>
          </p>
          {data?.isVendor ? (
            <div className="grid">
              <Image
                src={data?.vendorImg || Logo}
                width="100%"
                height="100%"
                objectFit="contain"
              />
            </div>
          ) : (
            <Fragment>
              <p className="mb-2.5">
                <span className="text-xs block">Location</span>
                {data?.listingLocation ? (
                  <span className="font-bold block">
                    {data?.listingLocation}
                  </span>
                ) : (
                  <span className="font-bold block">--</span>
                )}
              </p>
            </Fragment>
          )}
        </div>
        <div className="col-span-2 relative pt-5">
          {/* {data?.isOtherVendor === "Y" && (
          <div className="absolute h-8 -top-1 right-0 left-0 flex justify-center pb-1">
            {" "}
            <Image src={data?.vendorLogo} width="100" height="30" objectFit="contain" />{" "}
          </div>
        )} */}

          {(data?.verified && !(data?.status === "Sold_Out")) && (
            <div className="absolute h-8 -top-2 right-0 left-0 flex px-4 pb-1">
              <p className="flex items-center">
                <Image src={verifiedIcon} width={60} height={30} />
                <BsInfoCircle
                  className="ml-2 text-xs mt-0.5 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    openVerificationInfo();
                  }}
                />
              </p>
            </div>
          )}

          {data?.status === "Sold_Out" && (
            <div className="absolute h-8 -top-2 right-0 left-0 flex px-4 pb-1">
              <p className="flex items-center">
                <Image src={sold_out} width={60} height={30} />
                {/* <BsInfoCircle
                  className="ml-2 text-xs mt-0.5 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    openVerificationInfo();
                  }}
                /> */}
              </p>
            </div>
          )}

          <Image
            alt={data?.marketingName}
            src={data?.imagePath || "/"}
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            priority
          />
        </div>
        <div className="col-span-3 mt-4">
          <h2 className="font-semibold text-gray-20" style={{ fontSize: 21 }}>
            {data?.marketingName}
          </h2>
          <div className="flex justify-between items-end mt-2">
            <p>
              <span className="text-xs text-gray-70">List Price</span>
              <span
                className="font-bold text-black-4e flex items-center py-1"
                style={{ fontSize: 28 }}
              >
                {"₹" + numberWithCommas(data?.listingPrice)}
              </span>
            </p>
            <div
              // href={{
              //   pathname: `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}`,
              //   query: { isOtherVendor: data?.isOtherVendor },
              // }}
              // passHref
              onClick={() => window.open(
                `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}?isOtherVendor=${data?.isOtherVendor}`,
                "_blank"
              )
              }
            >
              <a
                className="flex items-center px-4 py-2 font-semibold bg-primary text-white rounded-md"
                onClick={() => setLoadingState(true)}
              >
                View Deal{" "}
                <BiChevronRight style={{ marginLeft: 2, fontSize: 20 }} />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute right-0 px-3 py-3">
          {!(data.isOtherVendor === "Y") && (
            <AddFav
              data={data}
              setProducts={setProducts}
              width={22}
              height={22}
            />
          )}
        </div>
      </div>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </>
  );
}

export default BestDealCard;

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs";
import verifiedIcon from "@/assets/verified.svg";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";
import AddFav from "../AddFav";

import { CardHeading, CardHeading1, CardHeading2, CardHeading3, CardHeading4 } from "@/components/elements/CardHeading/cardheading";
import VerifiedIcon from "@/components/VerifiedIcon";
import { getDefaultImage, numberWithCommas } from "@/utils/util";
import { BiChevronRight } from "react-icons/bi";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { useRouter } from "next/router";
import sold_out from "@/assets/soldout.png";
import VerificationIcon from "../verificationIcon";
import { getUserListings } from "api-call";
import { useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";

function BestDealCard({
  openConditionInfo,
  openVerificationInfo,
  data,
  setProducts,
}) {
  const router = useRouter();
  const [listings, setListings] = useState(localStorage.getItem("listings") || []);
  const { authenticated, user } = useAuthState();
  const [loadingState, setLoadingState] = useState(false);
  const [listingState, setListingState] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  useEffect(() => {
    if (user && user?.userdetails?.userUniqueId && listings.length === 0) {
      localStorage.getItem("listings") ? localStorage.getItem("listings") : getUserListings(user?.userdetails?.userUniqueId).then(
        (res) => {
          setListings(res.dataObject.map((item2) => item2.listingId));
          // console.log("res.dataObject", listings);
          // setListingsLoading(false);
        },
        (err) => console.error(err)
      );
    }
  }, []);


  var type = ["old phone", "used", "refurbished"]
  const soldout = (`bestdeals buy ${type[Math.floor((Math.random() * type.length))]} ${data?.marketingName} ${data?.deviceStorage} ${data?.deviceCondition} soldout`).toLowerCase()

  return (
    <>

      <div className="grid font-SF-Pro grid-cols-2 mb-6 rounded-lg border cardShadow1 p-4  max-w-sm relative bg-white"
      // onClick={() => window.open(
      //   `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}?isOtherVendor=${data?.isOtherVendor}`,
      //   "_blank"
      // )
      // }
      >
        <div className="cols-span-2">
          <div className="grid grid-cols-2 gap-2">
            <p className="mb-2 leading-none space-y-0.5">
              {/* <span className=" block">Condition</span> */}
              <CardHeading1 title="Condition" />
              <span className="flex items-center">
                <CardHeading2 title={data?.deviceCondition || <span>&nbsp;&nbsp;</span>} />
                <BsInfoCircle
                  className="ml-0.5 text-xs cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    openConditionInfo();
                  }}
                />
              </span>
            </p>
            <p className="mb-2 leading-none space-y-0.5">
              {/* <span className="text-bx text-[#878787] font-light block">Listed on</span> */}
              <CardHeading1 title="Listed on" />
              <CardHeading2 title={data?.listingDate || <span>&nbsp;&nbsp;</span>} />
              {/* <span className="font-semibold pt-0.5 text-[#373737] text-cx block">
              {data?.listingDate || <span>&nbsp;&nbsp;</span>}
            </span> */}
            </p>

            <p className="mb-2 leading-none space-y-0.5">
              <CardHeading1 title="RAM" />
              <CardHeading2 title={data?.deviceRam || "--"} />
              {/* <span className="text-bx text-[#878787] font-light block">RAM</span>
            <span className="font-semibold pt-0.5 text-[#373737] text-cx  block">{data?.deviceRam || "--"}​</span> */}
            </p>


            <p className="mb-2 leading-none space-y-0.5">
              <CardHeading1 title="Storage" />
              <CardHeading2 title={data?.deviceStorage || <span>&nbsp;&nbsp;</span>} />
              {/* <span className="text-bx text-[#878787] font-light block">Storage</span>
            <span className="font-semibold pt-0.5 text-[#373737] text-cx block">
              {data?.deviceStorage || <span>&nbsp;&nbsp;</span>}
            </span> */}
            </p>
            {data?.isVendor ? (
              <div className="grid">
                <Image
                  src={data?.vendorImg || Logo}
                  width="100%"
                  height="100%"
                  objectFit="contain"
                  alt={(`bestdeals buy ${type[Math.floor((Math.random() * type.length))]} ${data?.marketingName} ${data?.deviceStorage} ${data?.deviceCondition}`).toLowerCase()
                  }
                />
              </div>
            ) : (
              <Fragment>
                <p className="mb-2 leading-none space-y-0.5">
                  <CardHeading1 title="Location" />
                  {/* <span className="text-bx text-[#878787] font-light block">Location</span> */}
                  {data?.listingLocation ? (
                    <CardHeading2 title={data?.listingLocation} />
                    // <span className="font-semibold pt-0.5 text-[#373737] text-cx block">
                    //   {data?.listingLocation}
                    // </span>
                  ) : (
                    <CardHeading2 title="--" />
                    // <span className="font-semibold pt-0.5 text-[#373737] text-cx block">--</span>
                  )}
                </p>
              </Fragment>
            )}
          </div>
          <div className="col-span-3 mt-2">
            <p>
              {/* <span className="text-xs text-gray-70">List Price</span> */}
              {/* <span
                className="font-bold text-[#000944] text-dx flex items-center"
              >
                {"₹" + numberWithCommas(data?.listingPrice)}
              </span> */}
              <CardHeading3 title={"₹" + numberWithCommas(data?.listingPrice)} />
            </p>
            {/* <h2 className="font-medium text-[#000000]" style={{ fontSize: 14 }}>
            {data?.marketingName}
          </h2> */}
            <CardHeading4 title={data?.marketingName} />

            <div className="flex justify-between items-end mt-2">
              {!listings.includes(data.listingId)
                ?
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
                    className="flex items-center w-full h-fx font-Roboto-Light text-ex px-5 py-2 bg-primary text-white rounded-[5px]"
                  // onClick={() => setLoadingState(true)}
                  >
                    <div className=" flex">
                      <div className="pr-0.5">View Deal</div>
                      <div> &gt; </div>
                    </div>
                  </a>
                </div>
                :
                <div
                  onClick={() => window.open(
                    `/user/listings/${data?.listingId}`,
                    "_blank",)}
                >
                  <a
                    className="flex items-center w-full h-fx font-Roboto-Light text-ex px-5 py-2 bg-primary text-white rounded-[5px]"
                  // onClick={() => setLoadingState(true)}
                  >
                    <div className=" flex">
                      <div className="pr-0.5">View Deal</div>
                      <div> &gt; </div>
                    </div>
                  </a>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="relative pt-5">
          {/* {data?.isOtherVendor === "Y" && (
          <div className="absolute h-8 -top-1 right-0 left-0 flex justify-center pb-1">
            {" "}
            <Image src={data?.vendorLogo} width="100" height="30" objectFit="contain" />{" "}
          </div>
        )} */}

          {(data?.verified && !(data?.status === "Sold_Out")) && (
            <div className="absolute h-8 -top-1 right-0 -left-6 flex px-4 pb-1 z-50">
              <p className="flex items-center">
                {/* <Image src={verifiedIcon} width={60} height={30} /> */}
                <VerifiedIcon width={50} />
                <BsInfoCircle
                  className="ml-1 text-xs cursor-pointer"
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
                <Image src={sold_out} width={60} height={30} alt={soldout} />
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
            loading="lazy"
            placeholder="blur"
            priority={false}
            unoptimized={false}
            blurDataURL={imageError ? getDefaultImage(data?.marketingName) || Logo : data?.imagePath || getDefaultImage(data?.marketingName) || Logo}
            alt={(`bestdeals buy ${type[Math.floor((Math.random() * type.length))]} ${data?.marketingName} ${data?.deviceStorage} ${data?.deviceCondition}`).toLowerCase()}
            src={imageError ? getDefaultImage(data?.marketingName) || Logo : data?.imagePath || getDefaultImage(data?.marketingName) || Logo}
            onError={() => {
              setImageError(true);
            }}
            width="90%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>

      </div>
      <div className="relative flex justify-end bottom-[248px] right-4">
        {!(data.isOtherVendor === "Y") && !listings.includes(data.listingId) && (
          <AddFav
            data={data}
            setProducts={setProducts}
            width={22}
            height={22}
          />
        )}
      </div>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </>
  );
}

export default BestDealCard;

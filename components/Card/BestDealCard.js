import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import InfoCircle from "@/assets/infocircle2.svg";
import AddFav from "../AddFav";

import { CardHeading1, CardHeading2, CardHeading3, CardHeading4 } from "@/components/elements/CardHeading/cardheading";
import VerifiedIcon from "@/components/VerifiedIcon";
import { getDefaultImage, numberWithCommas } from "@/utils/util";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { useRouter } from "next/router";
import { getUserListings } from "api-call";
import { useAuthState } from "providers/AuthProvider";

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
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  useEffect(() => {
    if (user && user?.userdetails?.userUniqueId && listings.length === 0) {
      localStorage.getItem("listings") ? localStorage.getItem("listings") : getUserListings(user?.userdetails?.userUniqueId).then(
        (res) => {
          setListings(res.dataObject.map((item2) => item2.listingId));
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
      >
        <div className="cols-span-2">
          <div className="grid grid-cols-2 gap-2">
            <p className="mb-2 leading-none space-y-0.5">
              <CardHeading1 title="Condition" />
              <span className="flex items-center">
                <CardHeading2 title={data?.deviceCondition || <span>&nbsp;&nbsp;</span>} />
                <div className="ml-1">
                 <Image src={InfoCircle} width={10} height={10}  onClick={(e) => {
                    e.preventDefault();
                    openConditionInfo();
                  }}/>
                  </div>
              </span>
            </p>
            <p className="mb-2 leading-none space-y-0.5">
              <CardHeading1 title="Listed on" />
              <CardHeading2 title={data?.listingDate || <span>&nbsp;&nbsp;</span>} />
            </p>

            <p className="mb-2 leading-none space-y-0.5">
              <CardHeading1 title="RAM" />
              <CardHeading2 title={data?.deviceRam || "--"} />
            </p>


            <p className="mb-2 leading-none space-y-0.5">
              <CardHeading1 title="Storage" />
              <CardHeading2 title={data?.deviceStorage || <span>&nbsp;&nbsp;</span>} />
            </p>
            {data?.isVendor ? (
              <div className="grid">
                <Image
                  src={data?.vendorImg || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
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
                  {data?.listingLocation ? (
                    <CardHeading2 title={data?.listingLocation} />
                  ) : (
                    <CardHeading2 title="--" />
                  )}
                </p>
              </Fragment>
            )}
          </div>
          <div className="col-span-3 mt-2">
            <p>
              <CardHeading3 title={"₹" + numberWithCommas(data?.listingPrice)} />
            </p>
            <CardHeading4 title={data?.marketingName} />

            <div className="flex justify-between items-end mt-2">
              {!listings.includes(data.listingId)
                ?
                <div
                  onClick={() => window.open(
                    `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${data?.listingId}?isOtherVendor=${data?.isOtherVendor}`,
                    "_blank"
                  )
                  }
                >
                  <a
                    className="flex items-center w-full h-fx font-Roboto-Light text-ex px-5 py-2 bg-primary text-white rounded-[5px]"
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

          {(data?.verified && !(data?.status === "Sold_Out")) && (
            <div className="absolute h-8 -top-1 right-0 -left-6 flex px-4 pb-1 z-50">
              <p className="flex items-center">
                
                <VerifiedIcon width={50} />
                <div className="ml-1">
                <Image src={InfoCircle} width={10} height={10}   onClick={(e) => {
                    e.preventDefault();
                    openVerificationInfo();
                  }}/>
                  </div>
              </p>
            </div>
          )}

          {data?.status === "Sold_Out" && (
            <div className="absolute h-8 -top-2 right-0 left-0 flex px-4 pb-1">
              <p className="flex items-center">
                <Image src="https://d1tl44nezj10jx.cloudfront.net/web/assets/soldout.svg" width={60} height={30} alt={soldout} />
              </p>
            </div>
          )}

          <Image
            quality={25}
            loading="lazy"
            placeholder="blur"
            priority={false}
            unoptimized={false}
            blurDataURL={imageError ? getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : data?.imagePath || getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
            alt={(`bestdeals buy ${type[Math.floor((Math.random() * type.length))]} ${data?.marketingName} ${data?.deviceStorage} ${data?.deviceCondition}`).toLowerCase()}
            src={imageError ? getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : data?.imagePath || getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
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

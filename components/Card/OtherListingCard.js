import Image from "next/image";
import Link from "next/link";
import { numberWithCommas } from "@/utils/util";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";
// import verified from "@/assets/verified.svg";
import AddFav from "../AddFav";
import VerifiedIcon from "../VerifiedIcon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import sold_out from "@/assets/soldout.png";
import { BsCardHeading } from "react-icons/bs";

import { CardHeading, CardHeading1, CardHeading2, CardHeading3, CardHeading4 } from "@/components/elements/CardHeading/cardheading";
import { getUserListings } from "api-call";
import { useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";


function OtherListingCard({ data, setProducts, prodLink }) {
  const router = useRouter();
  const [listings, setListings] = useState(localStorage.getItem("listings") || []);
  const { authenticated, user } = useAuthState();
  const [loadingState, setLoadingState] = useState(false);
  const [listingState, setListingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  useEffect(() => {
    if (user && user?.userdetails?.userUniqueId && listings.length === 0) {
      localStorage.getItem("listings") || getUserListings(user?.userdetails?.userUniqueId).then(
        (res) => {
          setListings(res.dataObject.map((item2) => item2.listingId));
          // console.log("res.dataObject", listings);
          // setListingsLoading(false);
        },
        (err) => console.error(err)
      );
    }
  }, []);


  if (data?.make?.toLowerCase().includes("all")) {
    return (
      <>
        <Link href={`#all-models`}>
          <a
            className="w-full h-full rounded border p-4 bg-white flex justify-center items-center"
          // onClick={() => setLoadingState(true)}
          >
            <p className="block text-primary">{"Show All"}</p>
          </a>
        </Link>
        <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      </>
    );
  }

  return (
    <>
      <div
      // href={{
      //   pathname: `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${prodLink ? data?.listingId : ""
      //     }`,
      //   query: prodLink && { isOtherVendor: data?.isOtherVendor },
      // }}
      // onClick={() => window.open(
      //   `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${prodLink ? data?.listingId : ""}?isOtherVendor=${data?.isOtherVendor}`,
      //   "_blank"
      // )
      // }
      >
        <a
          className="grid grid-cols-1 h-full shadow-lg shadow-gray-900 rounded-lg relative py-2 px-3 bg-m-white cardShadow1"
        // onClick={() => setLoadingState(true)}
        >
          <div className="grid grid-cols-1">
            <div className="absolute px-2 flex z-30 items-center top-0 left-0 right-0 pt-1 justify-between w-full">
              {data?.status === "Sold_Out" ? <Image
                src={sold_out}
                width={"50"}
                height={"20"}
                objectFit="contain"
              /> : (!(data?.isOtherVendor === "Y") && data?.verified) ? (
                <VerifiedIcon width={45} height={22} />
              ) : <svg height={20} />}
              <span>
                {!(data?.isOtherVendor === "Y") && !listings.includes(data.listingId) && (
                  <AddFav data={data} setProducts={setProducts} />
                )}
              </span>
            </div>
            {console.log("data", listings)}
            {listings.includes(data.listingId)
              ?
              <div
                onClick={() => window.open(
                  `/user/listings/${data?.listingId}`,
                  "_blank",)}
              >
                <div className="flex justify-center p-2">
                  <Image
                    src={data?.imagePath || Logo}
                    alt={data?.marketingName}
                    width={150}
                    height={150}
                    objectFit="contain"
                  />
                </div>
                <div className="flex-wrap w-full text-gray-70 pt-1">
                  <p className="font-Roboto-Bold flex items-center " style={{ color: "#000944" }}>
                    {data?.listingPrice && <span className="mr-1">&#x20B9;</span>}
                    {numberWithCommas(data?.listingPrice || "")}
                  </p>
                  <h1 className="flex-1 truncate w-full capitalize font-Regular text-[12px] text-black">
                    <CardHeading4 title={data?.marketingName} />
                  </h1>
                  <div
                    className="flex flex-wrap justify-between"
                  >
                    {data?.deviceStorage && (
                      <p className="mr-1 font-Light text-[8px] text-black">
                        <CardHeading title={data?.deviceStorage} />
                      </p>
                    )}
                    <p className="flex">
                      <span className="font-Light text-[8px] text-black">
                        <CardHeading title={`Condition :   ${" "}`} />
                      </span>
                      <span className="font-Light text-[8px] text-black">

                        <CardHeading title={data?.deviceCondition || "--"} />
                      </span>
                    </p>
                  </div>

                  <div className="justify-self-end flex justify-between font-Light text-[6px] capitalize">
                    <span>
                      <CardHeading title={data?.listingLocation || "India"} />
                    </span>
                    <CardHeading title={data?.listingDate || "Today"} />
                  </div>
                </div>
              </div>
              :
              <div
                onClick={() => window.open(
                  `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${prodLink ? data?.listingId : ""}?isOtherVendor=${data?.isOtherVendor}`,
                  "_blank",)}
              >
                <div className="flex justify-center p-2">
                  <Image
                    src={data?.imagePath || Logo}
                    alt={data?.marketingName}
                    width={150}
                    height={150}
                    objectFit="contain"
                  />
                </div>
                <div className="flex-wrap w-full text-gray-70 pt-1">
                  <p className="font-Roboto-Bold flex items-center " style={{ color: "#000944" }}>
                    {data?.listingPrice && <span className="mr-1">&#x20B9;</span>}
                    {numberWithCommas(data?.listingPrice || "")}
                  </p>
                  <h1 className="flex-1 truncate w-full capitalize font-Regular text-[12px] text-black">
                    <CardHeading4 title={data?.marketingName} />
                  </h1>
                  <div
                    className="flex flex-wrap justify-between"
                  >
                    {data?.deviceStorage && (
                      <p className="mr-1 font-Light text-[8px] text-black">
                        <CardHeading title={data?.deviceStorage} />
                      </p>
                    )}
                    <p className="flex">
                      <span className="font-Light text-[8px] text-black">
                        <CardHeading title={`Condition :   ${" "}`} />
                      </span>
                      <span className="font-Light text-[8px] text-black">

                        <CardHeading title={data?.deviceCondition || "--"} />
                      </span>
                    </p>
                  </div>

                  <div className="justify-self-end flex justify-between font-Light text-[6px] capitalize">
                    <span>
                      <CardHeading title={data?.listingLocation || "India"} />
                    </span>
                    <CardHeading title={data?.listingDate || "Today"} />
                  </div>
                </div>
              </div>
            }
          </div>
        </a>
      </div>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </>
  );
}

export default OtherListingCard;

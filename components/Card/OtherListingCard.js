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

function OtherListingCard({ data, setProducts, prodLink }) {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

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
                {!(data?.isOtherVendor === "Y") && (
                  <AddFav data={data} setProducts={setProducts} />
                )}
              </span>
            </div>
            <div
              onClick={() => window.open(
                `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${prodLink ? data?.listingId : ""}?isOtherVendor=${data?.isOtherVendor}`,
                "_blank"
              )
              }
            >
              <div className="flex justify-center my-2 mt-4 mx-2">
                <Image
                  src={data?.imagePath || Logo}
                  alt={data?.marketingName}
                  width={150}
                  height={150}
                  objectFit="contain"
                />
              </div>
              <p className="font-bold flex items-center text-[15px] text-[#000944]">
                {data?.listingPrice && <span className="">&#x20B9;</span>}
                {numberWithCommas(data?.listingPrice || "")}
              </p>
              <div className="flex-wrap w-full">
                <h1 className="flex-1 truncate text-black  w-full capitalize font-Regular text-[12px]">
                  {data?.marketingName}
                </h1>

                <div
                  className="flex flex-wrap justify-between my-[3px]"

                >
                  {data?.deviceStorage && (
                    <p className="mr-1 font-Light text-[8px] ">{data?.deviceStorage}</p>
                  )}
                  <p className="font-Light text-[8px]">
                    <span>Condition : </span>
                    <span>{data?.deviceCondition || "--"}</span>
                  </p>
                </div>

                <div className="justify-self-end flex justify-between capitalize">
                  <span className="truncate mr-1 font-Light text-[6px]">{data?.listingLocation}</span>
                  <span className="font-Light text-[6px]">{data?.listingDate}</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </>
  );
}

export default OtherListingCard;

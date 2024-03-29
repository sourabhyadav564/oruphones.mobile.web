import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import ExclamationIcon from "@/assets/fillexclamation.svg";
import VerticalDots from "@/assets/verticaldots.svg";
import VerificationIcon from "@/components/verificationIcon";
import { getDefaultImage, numberWithCommas } from "@/utils/util";
import { Fragment, useState } from "react";
import Cookies from "js-cookie";
import { activateListing } from "api-call";
import { useRouter } from "next/router";
import ShareIcon from "../ShareIcon";

const PauseListing = dynamic(() => import("@/components/Popup/PauseListing"));
const VerifyFlowPopup = dynamic(() =>
  import("@/components/Popup/VerifyFlowPopup")
);
const ListingDeleted = dynamic(() =>
  import("@/components/Popup/ListingDeleted")
);
const VerificationInfo = dynamic(() =>
  import("@/components/Popup/VerificationInfo")
);
const ListingActivated = dynamic(() =>
  import("@/components/Popup/ListingActivated")
);

function ListingTile({ data, openMenu, setOpenMenu, setListings }) {
  const router = useRouter();
  const [openVerifyInfo, setOpenVerifyInfo] = useState(false);
  const [openVerifyFlow, setOpenVerifyFlow] = useState(false);
  const [openActivateListing, setOpenActivateListing] = useState(false);
  const [openPauseListing, setOpenPauseListing] = useState(false);
  const [openDeleteListing, setOpenDeleteListing] = useState(false);
  const [reason, setReason] = useState("");
  const [imageError, setImageError] = useState(false);

  const handleActivate = (e) => {
    e.preventDefault();
    let payLoad = {
      listingId: data?.listingId,
      userUniqueId: Cookies.get("userUniqueId"),
    };
    if (openMenu === data?.listingId) {
      setOpenMenu(-1);
    } else {
      activateListing(payLoad, Cookies.get("sessionId")).then((res) => {
        setReason(res?.reason);
        setOpenActivateListing(true);
      });
    }
  };
  function handlePauseLIsting() {
    setOpenPauseListing(true);
    setOpenMenu(-1);
  }

  function uploadPhotos() {
    router.push(`/sell-old-refurbished-used-mobiles/edit/${data?.listingId}`);
  }

  return (
    <div className="font-Roboto-Regular">
      <Fragment>
        <div
          onClick={
            openMenu === data?.listingId ? () => setOpenMenu(-1) : () => {}
          }
          className={`flex flex-col pt-2 rounded-md ${
            (data?.status.toUpperCase() !== "ACTIVE" && "bg-gray-ef") || ""
          }`}
          style={{ boxShadow: "0 1px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex p-1">
            <div
              className="px-2"
              onClick={() =>
                openMenu === data?.listingId
                  ? () => setOpenMenu(-1)
                  : window.open(`/user/listings/${data?.listingId}`, "_blank")
              }
            >
              <Image
                loading="lazy"
                placeholder="blur"
                priority={false}
                unoptimized={false}
                blurDataURL={
                  imageError
                    ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                    : (data?.images &&
                        data.images.length > 0 &&
                        data.images[0].fullImage) ||
                      data?.defaultImage?.fullImage ||
                      getDefaultImage(data?.marketingName) ||
                      "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                }
                src={
                  imageError
                    ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                    : (data?.images &&
                        data.images.length > 0 &&
                        data.images[0].fullImage) ||
                      data?.defaultImage?.fullImage ||
                      getDefaultImage(data?.marketingName) ||
                      "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                }
                onError={() => {
                  setImageError(true);
                }}
                width={100}
                height={100}
                objectFit="contain"
                alt={data.marketingName}
              />
            </div>
            <div className="w-full pt-1">
              <div className="text-sm font-bold flex justify-between space-x-2">
                <p
                  className="flex-1 text-sm text-gray-600"
                  onClick={() =>
                    openMenu === data?.listingId
                      ? setOpenMenu(-1)
                      : window.open(
                          `/user/listings/${data?.listingId}`,
                          "_blank"
                        )
                  }
                >
                  {data.marketingName}
                </p>
                <div>
                  <ShareIcon
                    data={data}
                    width={16}
                    height={16}
                    className={"mr-2 mt-1"}
                  />
                </div>
                <div
                  className="listing-tile dropdown inline-block relative"
                  onClick={(e) => e.preventDefault()}
                >
                  <Image
                    src={VerticalDots}
                    width={22}
                    height={22}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenMenu((prev) =>
                        prev !== data?.listingId ? data.listingId : -1
                      );
                    }}
                  />
                  <div
                    className={`dropdown-menu absolute ${
                      openMenu === data?.listingId ? "block" : "hidden"
                    } pt-1 right-0`}
                  >
                    <div
                      className="w-32 py-2 menuShadow text-left border rounded bg-white"
                      onClick={(e) => e.preventDefault()}
                    >
                      {data?.status === "Active" && (
                        <span
                          className="rounded-t  text-black font-normal py-1 px-4 w-full block whitespace-no-wrap"
                          onClick={handlePauseLIsting}
                        >
                          Pause
                        </span>
                      )}
                      <Link
                        href={`/sell-old-refurbished-used-mobiles/edit/${data?.listingId}`}
                      >
                        <span className=" text-black font-normal py-1 px-4 w-full block whitespace-no-wrap">
                          Edit
                        </span>
                      </Link>
                      <span
                        className="rounded-b text-red font-normal py-1 px-4 w-full block whitespace-no-wrap "
                        onClick={() => {
                          setOpenDeleteListing(true);
                          setOpenMenu(-1);
                        }}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={() =>
                  openMenu === data?.listingId
                    ? () => setOpenMenu(-1)
                    : window.open(`/user/listings/${data?.listingId}`, "_blank")
                }
              >
                <div className="flex space-x-4 text-gray-70 text-xs mt-3">
                  <p className="flex flex-col items-start">
                    <span>Storage</span>
                    <span className="font-semibold text-sm text-gray-600">
                      {data?.deviceStorage}
                    </span>
                  </p>
                  <p className="flex flex-col items-start">
                    <span>Condition</span>
                    <span className="font-semibold text-sm text-gray-600">
                      {data.deviceCondition}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {data?.status.toUpperCase() !== "ACTIVE" ? (
            <div className="w-full grid grid-cols-4 px-2 py-2 space-x-2 center">
              <div className="bg-gray-400 flex flex-1 px-2 rounded-md col-span-3">
                <div className="flex space-x-1 flex-1">
                  <div className="flex space-x-1  flex-1">
                    <Image
                      src={ExclamationIcon}
                      width={20}
                      height={20}
                      className="self-center"
                    />
                    <span className=" text-white self-center text-lx  font-light italic uppercase">
                      INActive
                    </span>
                  </div>
                  <button
                    className="self-center text-jx text-white font-Semibold"
                    onClick={handleActivate}
                  >
                    Activate Now
                  </button>
                </div>
              </div>
              <div
                className="rounded-md px-1 text-sm ml-auto justify-center text-center"
                style={{ backgroundColor: "#2C2F45" }}
              >
                <div className=" text-gray-70  flex flex-col m-auto justify-center py-0.5 rounded-md ">
                  <span className="text-bx text-white self-center text-[#FFFFFF">
                    List Price
                  </span>
                  <span className="font-Semibold  text-gray-100 text-mx ">
                    ₹ {numberWithCommas(data.listingPrice)}​
                  </span>
                </div>
              </div>
            </div>
          ) : data?.verified && !data?.deviceImagesAvailable ? (
            <div className="gap-2 grid grid-cols-4 w-full px-2 py-2 text-center m-auto justify-between">
              <div className="flex col-span-3 gap-2">
                <div
                  className="flex py-1 px-2 space-x-1 rounded-md"
                  style={{ backgroundColor: "#4CAF50" }}
                >
                  <VerificationIcon />
                  <span className="text-bx self-center text-white uppercase font-light italic">
                    verified
                  </span>
                </div>
                <span
                  className="w-full flex px-1 bg-yellow-400 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    openMenu === data?.listingId
                      ? setOpenMenu(-1)
                      : uploadPhotos();
                  }}
                  style={{ backgroundColor: "#F9C414" }}
                >
                  <p className="self-center font-regular text-jx m-auto justify-center">
                    + Upload Photos
                  </p>
                </span>
              </div>
              <div
                className="w-full col-span-1 rounded-md px-1 m-auto justify-center flex flex-col py-0.5  "
                style={{ backgroundColor: "#2C2F45" }}
              >
                <span className="text-white self-center font-normal text-bx">
                  List Price
                </span>
                <span className="font-Semibold text-white text-mx">
                  ₹ {numberWithCommas(data.listingPrice)}​
                </span>
              </div>
            </div>
          ) : data?.verified ? (
            <div className="gap-2 grid grid-cols-4 w-full px-2 py-2 text-center m-auto justify-between">
              <div className="flex col-span-3 gap-2">
                <div
                  className="flex py-1 px-2 space-x-1 rounded-md"
                  style={{ backgroundColor: "#4CAF50" }}
                >
                  <VerificationIcon />
                  <span className="text-bx self-center text-white uppercase font-light italic">
                    verified
                  </span>
                </div>
                <span
                  className="w-full flex px-1 bg-yellow-400 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    openMenu === data?.listingId
                      ? setOpenMenu(-1)
                      : uploadPhotos();
                  }}
                  style={{ backgroundColor: "#F9C414" }}
                >
                  <p className="self-center font-regular text-jx m-auto justify-center">
                    + Upload Photos
                  </p>
                </span>
              </div>
              <div
                className="w-full col-span-1 rounded-md px-1 m-auto justify-center flex flex-col py-0.5  "
                style={{ backgroundColor: "#2C2F45" }}
              >
                <span className="text-white self-center font-normal text-bx">
                  List Price
                </span>
                <span className="font-Semibold text-white text-mx">
                  ₹ {numberWithCommas(data.listingPrice)}​
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 px-2 w-full py-2 space-x-2 text-center">
              <div
                className="flex py-2 px-3 rounded-md space-x-2 col-span-3"
                style={{ backgroundColor: "#F9C414" }}
              >
                <div className="flex space-x-1 flex-1">
                  <div className="flex space-x-2">
                    <Image
                      src={ExclamationIcon}
                      width={20}
                      height={20}
                      className="self-center"
                    />

                    <span className="text-lx font-light self-center text-black italic uppercase">
                      unverified
                    </span>
                  </div>
                </div>
                <span
                  className="text-jx font-Semibold self-center "
                  onClick={(e) => {
                    e.preventDefault();
                    openMenu === data?.listingId
                      ? setOpenMenu(-1)
                      : setOpenVerifyFlow(true);
                  }}
                >
                  Click to Verify Now
                </span>
              </div>
              <div
                className=" text-gray-70  flex flex-col m-auto justify-center py-0.5 rounded-md "
                style={{ backgroundColor: "#2C2F45" }}
              >
                <span className="text-bx text-[#FFFFFF] self-center ">
                  List Price
                </span>
                <span className="font-Semibold text-gray-100 text-mx">
                  ₹ {numberWithCommas(data.listingPrice)}​
                </span>
              </div>
            </div>
          )}
        </div>
        {openVerifyInfo && (
          <VerificationInfo open={openVerifyInfo} setOpen={setOpenVerifyInfo} />
        )}
        {openVerifyFlow && (
          <VerifyFlowPopup open={openVerifyFlow} setOpen={setOpenVerifyFlow} />
        )}
        {openActivateListing && (
          <ListingActivated
            open={openActivateListing}
            setOpen={setOpenActivateListing}
            reason={reason}
            setReason={setReason}
          />
        )}
        {openPauseListing && (
          <PauseListing
            open={openPauseListing}
            setOpen={setOpenPauseListing}
            listingId={data?.listingId}
          />
        )}
        {openDeleteListing && (
          <ListingDeleted
            open={openDeleteListing}
            setOpen={setOpenDeleteListing}
            data={data}
            setListings={setListings}
          />
        )}
      </Fragment>
    </div>
  );
}

export default ListingTile;

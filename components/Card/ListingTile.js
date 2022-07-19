import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import inactive from "@/assets/inActive.svg";
import { BsInfoCircle } from "react-icons/bs";
import { numberWithCommas } from "@/utils/util";
import { Fragment, useState } from "react";
import Cookies from "js-cookie";
import { activateListing } from "api-call";
// import VerifyFlowPopup from "../Popup/VerifyFlowPopup";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRouter } from "next/router";
import UnVerifiedIcon from "../UnVerifiedIcon";
import VerifiedIcon from "../VerifiedIcon";
import ShareIcon from "../ShareIcon";

const PauseListing = dynamic(() => import("@/components/Popup/PauseListing"));
const VerifyFlowPopup = dynamic(() => import("@/components/Popup/VerifyFlowPopup"));
const ListingDeleted = dynamic(() => import("@/components/Popup/ListingDeleted"));
const VerificationInfo = dynamic(() => import("@/components/Popup/VerificationInfo"));
const ListingActivated = dynamic(() => import("@/components/Popup/ListingActivated"));

function ListingTile({ data, openMenu, setOpenMenu, setListings }) {
  const router = useRouter();
  const [openVerifyInfo, setOpenVerifyInfo] = useState(false);
  const [openVerifyFlow, setOpenVerifyFlow] = useState(false);
  const [openActivateListing, setOpenActivateListing] = useState(false);
  const [openPauseListing, setOpenPauseListing] = useState(false);
  const [openDeleteListing, setOpenDeleteListing] = useState(false);

  const handleActivate = (e) => {
    e.preventDefault();
    let payLoad = {
      listingId: data?.listingId,
      userUniqueId: Cookies.get("userUniqueId"),
    };
    activateListing(payLoad).then(
      () => {
        setOpenActivateListing(true);
      },
      (err) => console.error(err)
    );
  };

  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     if (divRef.current && !divRef.current.contains(e.target)) {
  //       setOpenMenu(-1);
  //     }
  //   };
  //   document.addEventListener("mousedown", checkIfClickedOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", checkIfClickedOutside);
  //   };
  // }, []);

  function handlePauseLIsting() {
    setOpenPauseListing(true);
    setOpenMenu(-1);
  }

  function uploadPhotos() {
    router.push(`/sell/edit/${data?.listingId}`);
  }

  return (
    <Fragment>
      <Link href={`/user/listings/${data?.listingId}`}>
        <a>
          <div
            className={`flex flex-col pt-2 rounded-md ${(data?.status.toUpperCase() !== "ACTIVE" && "bg-gray-ef") || ""}`}
            style={{ boxShadow: "0 1px 20px rgba(0, 0, 0, 0.08)" }}
          >
            <div className="flex items-start">
              <div className="px-2">
                <Image
                  src={(data?.images && data.images.length > 0 && data.images[0].fullImage) || data?.defaultImage?.fullImage || "/fullImage"}
                  width={100}
                  height={100}
                  objectFit="contain"
                />
              </div>
              <div className="w-full pt-1">
                <div className="text-sm font-bold flex justify-between items-start">
                  <p className="flex-1">{data.marketingName}</p>
                  <ShareIcon data={data} width={16} height={16} className={"mr-2 mt-1"} />
                  <div
                    className="listing-tile dropdown inline-block relative"
                    // onClick={(e) => e.preventDefault()}
                  >
                    <BiDotsVerticalRounded
                      size={22}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenMenu((prev) => (prev !== data?.listingId ? data.listingId : -1));
                      }}
                    ></BiDotsVerticalRounded>
                    <div className={`dropdown-menu absolute ${openMenu === data?.listingId ? "block" : "hidden"} pt-1 right-0`}>
                      <div className="w-32 py-2 menuShadow text-left border rounded bg-white" onClick={(e) => e.preventDefault()}>
                        {data?.status === "Active" && (
                          <span
                            className="rounded-t hover:bg-gray-100 text-black-4e py-1 px-4 w-full block whitespace-no-wrap"
                            onClick={handlePauseLIsting}
                          >
                            Pause
                          </span>
                        )}
                        <Link href={`/sell/edit/${data?.listingId}`}>
                          <span className="hover:bg-gray-100 text-black-4e py-1 px-4 w-full block whitespace-no-wrap">Edit</span>
                        </Link>
                        <span
                          className="rounded-b hover:bg-gray-100 text-black-4e py-1 px-4 w-full block whitespace-no-wrap"
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
                <div className="grid grid-cols-3 space-x-2 text-gray-70 text-xs mt-3">
                  <p className="flex flex-col items-start">
                    <span>Storage</span>
                    <span className="font-bold text-sm">{data?.deviceStorage}</span>
                  </p>
                  <p className="flex flex-col items-start">
                    <span>Color</span>
                    <span className="font-bold text-sm"> {data?.color} </span>
                  </p>
                  <p className="flex flex-col items-start">
                    <span>Condition</span>
                    <span className="font-bold text-sm">{data.deviceCondition}</span>
                  </p>
                </div>
              </div>
            </div>
            {data?.status.toUpperCase() !== "ACTIVE" ? (
              <div className="flex items-center px-4 w-full">
                <Image src={inactive} width={64} height={29} />
                <button className="text-sm text-primary ml-3" onClick={handleActivate}>
                  ACTIVATE NOW
                </button>
                <div className=" text-gray-70 text-sm flex flex-col ml-auto py-0.5">
                  <span>List Price</span>
                  <span className="text-base font-bold">₹ {numberWithCommas(data.listingPrice)}​</span>
                </div>
              </div>
            ) : data?.verified && !data?.deviceImagesAvailable ? (
              <div className="flex items-center pl-4 w-full">
                <VerifiedIcon width={60} height={30} />
                <span
                  className="text-sm text-primary ml-3"
                  onClick={(e) => {
                    e.preventDefault();
                    uploadPhotos();
                  }}
                >
                  UPLOAD PHOTOS
                </span>
                <div className="bg-gray-ef text-gray-70 text-sm flex flex-col px-4 py-0.5 ml-auto rounded-tl-md rounded-br-md">
                  <span>List Price</span>
                  <span className="text-lg font-bold">₹ {numberWithCommas(data.listingPrice)}​</span>
                </div>
              </div>
            ) : data?.verified ? (
              <div className="flex items-center pl-4 w-full">
                <VerifiedIcon width={60} height={30} />
                <span className="text-sm text-black-4e ml-3">On: {data?.verifiedDate}​</span>
                <div className="bg-gray-ef text-gray-70 text-sm flex flex-col px-4 py-0.5 ml-auto rounded-tl-md rounded-br-md">
                  <span>List Price</span>
                  <span className="text-lg font-bold">₹ {numberWithCommas(data.listingPrice)}​</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center pl-4 w-full mt-1.5">
                <UnVerifiedIcon width={60} height={30}></UnVerifiedIcon>
                <span
                  className="text-sm text-primary ml-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenVerifyFlow(true);
                  }}
                >
                  VERIFY NOW
                </span>
                <BsInfoCircle
                  className="ml-1 text-sm cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenVerifyInfo(true);
                  }}
                />
                <div className="bg-gray-ef text-gray-70 text-sm flex flex-col px-4 py-0.5 ml-auto rounded-tl-md rounded-br-md">
                  <span>List Price</span>
                  <span className="text-base font-bold">₹ {numberWithCommas(data.listingPrice)}​</span>
                </div>
              </div>
            )}
          </div>
        </a>
      </Link>
      {openVerifyInfo && <VerificationInfo open={openVerifyInfo} setOpen={setOpenVerifyInfo} />}
      {openVerifyFlow && <VerifyFlowPopup open={openVerifyFlow} setOpen={setOpenVerifyFlow} />}
      {openActivateListing && <ListingActivated open={openActivateListing} setOpen={setOpenActivateListing} />}
      {openPauseListing && <PauseListing open={openPauseListing} setOpen={setOpenPauseListing} listingId={data?.listingId} />}
      {openDeleteListing && <ListingDeleted open={openDeleteListing} setOpen={setOpenDeleteListing} data={data} setListings={setListings} />}
    </Fragment>
  );
}

export default ListingTile;

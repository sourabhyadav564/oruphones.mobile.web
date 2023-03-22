import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import Header2 from "@/components/Header/header2";
import {
  ProductPriceHeading,
  BannerSellHeading,
} from "@/components/elements/Heading/heading";
import ImageSlider from "@/components/ImageSlider";
import Search from "@/assets/search.svg";
import { detailWithUserInfo, fetchSellerMobileNumber } from "api-call";
import IconLabelValue from "@/components/IconLabelValue";
import {
  getAccessoriesText,
  getDefaultImage,
  numberWithCommas,
} from "@/utils/util";
import Footer from "@/components/Footer";
import SimilarProduct from "@/components/SimilarProduct";
import AddFav from "@/components/AddFav";
import Cookies from "js-cookie";
import ShareIcon from "@/components/ShareIcon";
import FullImageView from "@/components/Popup/FullImageView";
import { useAuthState } from "providers/AuthProvider";
import { useRef } from "react";
import SellerDetails from "@/components/ProdInfo/SellerDetails";
import LoginPopup from "@/components/Popup/LoginPopup";

import star from "@/assets/star1.svg";
import InfoCircle from "@/assets/infocircle1.svg";
import InfoCircle2 from "@/assets/infocircle2.svg";

import start2 from "@/assets/star2.svg";
import ExclamationIcon from "@/assets/fillexclamation.svg";
import GreaterThan from "@/assets/greaterthan.svg";

import WarrantyInfo from "@/components/Popup/WarrantyInfo";
import VerificationIcon from "@/components/verificationIcon";
import {
  CardHeading2,
  CardHeading3,
  CardHeading4,
} from "@/components/elements/CardHeading/cardheading";
import { toast } from "react-toastify";
import ThisPhonePopup from "@/components/Popup/ThisPhonePopup";
import ComparisonTable from "@/components/Tables/ComparisonTable";
import ComparisonTable2 from "@/components/Tables/ComparisonTable2";
import { useRouter } from "next/router";

const RequestVerificationPopup = dynamic(() =>
  import("@/components/Popup/RequestVerificationPopup")
);
const ConditionInfo = dynamic(() => import("@/components/Popup/ConditionInfo"));
const VerificationInfo = dynamic(() =>
  import("@/components/Popup/VerificationInfo")
);

const ViewReport = dynamic(() => import("@/components/ViewReport"));
const ViewReport1 = dynamic(() => import("@/components/ViewReport1"));
const RequestVerificationSuccessPopup = dynamic(() =>
  import("@/components/Popup/RequestVerificationSuccessPopup")
);

function ProductDeatils() {
  const [thisPhonePopup, setThisPhonePopup] = useState(false);
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
  const [openWarrantyInfo, setOpenWarrantyInfo] = useState(false);
  const [performAction, setperformAction] = useState(false);
  const [
    openRequestVerificationSuccessPopup,
    setOpenRequestVerificationSuccessPopup,
  ] = useState(false);
  const [ImageError, setImageError] = useState(false);
  const [openRequestVerificationPopup, setOpenRequestVerificationPopup] =
    useState(false);
  const [performAction2, setperformAction2] = useState(false);
  const [deviceListingInfo, setDeviceListingInfo] = useState(null);
  const [contactSellerMobileNumber, setContactSellerMobileNumber] =
    useState("Loading...");
  const [showNumber, setShowNumber] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [defaultOpen, setDefaultOpen] = useState(false);
  const { authenticated } = useAuthState();
  const myRef = useRef(null);
  const [productLink, setProductLink] = useState("");
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [performAction3, setperformAction3] = useState(false);
  let vendor = "";
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    if (router.query.prodID && router.query.isOtherVendor) {
      const listingInfo = await detailWithUserInfo(
        router.query.isOtherVendor,
        router.query.prodID,
        Cookies.get("userUniqueId") || 0,
        Cookies.get("sessionId")
      );
      setDeviceListingInfo(listingInfo?.dataObject);
      setData(listingInfo?.dataObject);
    }
  }, [router.query]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        openLoginPopup == false &&
        performAction == true &&
        Cookies.get("userUniqueId") !== undefined &&
        data?.isOtherVendor !== "Y"
      ) {
        if (data?.verified) {
          showSellerNumber(data?.listingId);
          clearInterval(interval);
        } else {
          setOpenRequestVerificationPopup(true);
          clearInterval(interval);
        }
      }
    }, 1000);
  }, [openLoginPopup]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        openLoginPopup == false &&
        performAction3 == true &&
        Cookies.get("userUniqueId") !== undefined
      ) {
        setOpenRequestVerificationSuccessPopup(true);
        clearInterval(interval);
      }
    }, 1000);
  }, [openLoginPopup]);
  const showSellerNumber = (e) => {
    if (Cookies.get("userUniqueId") == undefined) {
      setperformAction(true);
      setOpenLoginPopup(true);
    } else if (data?.verified) {
      handleButtonClick();
      setShowNumber((prev) => !prev);
    } else {
      if (showNumber) {
        handleButtonClick();
        setShowNumber((prev) => !prev);
      } else {
        setOpenRequestVerificationPopup(true);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        openLoginPopup == false &&
        performAction2 == true &&
        Cookies.get("userUniqueId") !== undefined &&
        data?.productLink !== "" &&
        productLink !== ""
      ) {
        window.open(productLink, "_blank");
        clearInterval(interval);
      } else if (
        openLoginPopup == false &&
        performAction2 == true &&
        Cookies.get("userUniqueId") !== undefined &&
        productLink == ""
      ) {
        setThisPhonePopup(true);
        clearInterval(interval);
      }
    }, 1000);
  }, [openLoginPopup]);

  const handleButtonClick = async () => {
    if (
      !(data?.isOtherVendor === "Y") &&
      Cookies.get("userUniqueId") !== undefined
    ) {
      fetchSellerMobileNumber(
        data?.listingId,
        Cookies.get("userUniqueId"),
        Cookies.get("sessionId")
      ).then((response) => {
        setContactSellerMobileNumber(response?.dataObject?.mobileNumber);
      });
    }
  };

  useEffect(() => {
    if (Cookies.get("userUniqueId") !== undefined && showNumber) {
      handleButtonClick();
    }
  }, [showNumber]);

  const executeScroll = () => {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  function openWebSite(data) {
    if (authenticated) {
      window.open(data);
    } else {
      setOpenLoginPopup(true);
    }
  }

  const conditionText = data?.deviceCondition;
  let filled = 1;
  if (
    conditionText === "Like New" ||
    conditionText === "Open Box" ||
    conditionText === "New - Seal Pack"
  ) {
    filled = 5;
  } else if (conditionText === "Excellent") {
    filled = 4;
  } else if (conditionText === "Good") {
    filled = 3;
  } else if (conditionText === "Fair") {
    filled = 2;
  } else if (conditionText === "Needs Repair") {
    filled = 1;
  }

  let iconToShow = (index) => {
    if (index < filled) {
      return <div className="text-yellow-400 text-mx truncate">★</div>;
    } else {
      return <div className="text-gray-400 text-mx truncate">★</div>;
    }
  };

  if (data?.vendorLogo !== undefined && data?.vendorLogo !== null) {
    vendor = data?.vendorLogo.replace(
      "https://zenrodeviceimages.s3.us-west-2.amazonaws.com/vendors/",
      ""
    );
    vendor = vendor.replaceAll("_logo.png", "");
    if (vendor.includes("mbr_")) {
      vendor = vendor.replace("mbr_", "");
    }
  }

  return (
    <Fragment>
      <Header2 title={data?.marketingName || router.query.modelName}>
        <div className="absolute right-4 top-3">
          <Link href="/product/buy-old-refurbished-used-mobiles/searchBar">
            <Image src={Search} width={20} height={20} />
          </Link>
        </div>
      </Header2>

      {data == null ? (
        <ProductSkeleton />
      ) : (
        <>
          <main className="py-3 relative ">
            {data?.isOtherVendor === "N" && (
              <div className="flex justify-between items-center absolute top-0 left-0 right-0 z-10  text-white px-4 py-2 ">
                <div className="flex space-x-4 items-center "></div>
                <div className="flex space-x-2 items-center self-center">
                  <AddFav
                    data={deviceListingInfo}
                    setProducts={setDeviceListingInfo}
                    color="#707070"
                  />
                  <ShareIcon
                    data={deviceListingInfo}
                    height={14}
                    width={14}
                    color="black"
                  />
                </div>
              </div>
            )}
            <div className="px-4 pt-10">
              <ImageSlider
                onClick={() => setShowFullImage(true)}
                images={
                  (data?.images?.length && data?.images) ||
                  (data?.imagePath && [
                    {
                      fullImage: data?.imagePath,
                    },
                  ]) ||
                  (data?.defaultImage?.fullImage && [
                    { fullImage: data?.defaultImage?.fullImage },
                  ]) ||
                  (data?.vendorLogo && [
                    {
                      fullImage:
                        "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg",
                      thumbImage:
                        "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg",
                    },
                  ])
                }
              />
            </div>
            <div className="my-4 px-4 ">
              <div className="flex">
                <div className="flex-1  ">
                  <ProductPriceHeading
                    title={numberWithCommas(data?.listingPrice)}
                  />
                </div>
                <div className="m-auto justify-center">
                  {(data?.isOtherVendor == "N" && (
                    <Fragment>
                      <span
                        className="bg-white py-1 px-2 rounded text-black-21 text-ex font-Light underline "
                        onClick={executeScroll}
                      >
                        Device Report &gt;
                      </span>
                    </Fragment>
                  )) || <Fragment></Fragment>}
                </div>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="font-Roboto-Regular text-qx text-[#000000]">
                  {data?.marketingName}{" "}
                </h1>
              </div>
              <div className="w-full flex items-center mt-4 mb-jx gap-2">
                <div
                  className="w-11/12 h-[40px]  flex items-center m-auto rounded-[5px] justify-center opacity-bg-50"
                  style={{ backgroundColor: "#F3F3F3" }}
                >
                  <p className="py-jx flex text-[#000000] space-x-1 font-Roboto-Light text-bx opacity-100">
                    <span className="self-center"> Varient: </span>
                    <CardHeading2 title={data?.deviceStorage} />
                  </p>
                </div>
                <div
                  className="w-full grid grid-cols-2  rounded-[5px] px-4 h-[40px]  opacity-bg-50"
                  style={{ backgroundColor: "#F3F3F3" }}
                  onClick={() => setOpenConditionInfo(true)}
                >
                  <div className="m-auto justify-center ">
                    <span className="font-Roboto-Light text-bx opacity-100 text-[#000] flex leading-tight items-center">
                      Condition{" "}
                    </span>
                    <CardHeading2 title={data?.deviceCondition} />
                  </div>
                  <div className="flex text-bx space-x-[2.5px] m-auto justify-center ">
                    {}
                    {Array(5)
                      .fill()
                      .map((_, index) => iconToShow(index))}
                  </div>
                </div>
              </div>

              <div className="py-2 pb-4">
                {(data?.verified && (
                  <Fragment>
                    <div
                      className="flex m-auto justify-center text-white px-3 py-0.5 rounded-md "
                      style={{ background: "#4CAF50" }}
                    >
                      <div className="flex flex-1 items-center ">
                        <VerificationIcon className="self-center" />
                        <p className="font-Roboto-Light  Italic text-ex self-center">
                          Verified
                        </p>
                        <p className="ml-0.5">
                          <Image
                            src={InfoCircle}
                            height={12}
                            width={12}
                            className="ml-1 pt-[13px] hover:cursor-pointer"
                            onClick={() => setOpenVerificationInfo(true)}
                          />
                        </p>
                        <div className="pl-1 pt-2">
                          <div className="bg-gray-100 w-[1px] h-6 "></div>
                        </div>
                      </div>
                      <div className="m-auto justify-center ">
                        <p className="text-jx font-Roboto-Light">
                          This phone is verified by ORUphones
                        </p>
                      </div>
                    </div>
                  </Fragment>
                )) || (
                  <Fragment>
                    {data?.isOtherVendor === "N" && (
                      <div className="w-full  py-2 space-x-2 text-center">
                        <div
                          className="flex py-2 rounded-md "
                          style={{ backgroundColor: "#F9C414" }}
                        >
                          <div className="flex space-x-1 pl-3">
                            <div className="flex space-x-2">
                              <Image
                                src={ExclamationIcon}
                                width={40}
                                height={40}
                                className="self-center "
                              />
                              <span className="text-lx font-Roboto-Light  self-center text-[#000944] italic uppercase">
                                unverified
                              </span>
                              <div className="ml-0.5">
                                <Image
                                  src={InfoCircle2}
                                  width={28}
                                  height={28}
                                  className="opactiy-70 ml-1 pt-1.5 hover:cursor-pointer"
                                  onClick={() => setOpenVerificationInfo(true)}
                                />
                              </div>
                              <div className="pl-1">
                                <div className="bg-gray-100 w-[0.5px] h-6 "></div>
                              </div>
                            </div>
                          </div>
                          <p
                            className="flex items-center w-full justify-end pr-3"
                            onClick={() => {
                              if (!authenticated) {
                                setOpenLoginPopup(true);
                                setperformAction3(true);
                              } else if (data?.status == "Active") {
                                setOpenRequestVerificationSuccessPopup(true);
                              } else
                                toast.warning(`This device is sold out`, {
                                  toastId: "009",
                                });
                            }}
                          >
                            <span className="underline font-Roboto-Medium text-jx">
                              Click here to Request Verification
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </Fragment>
                )}
              </div>
              {data?.externalSource?.length > 0 && (
                <div className="border-b-2 pb-2">
                  <span className="text-ex  font-Roboto-Light">
                    Compare from other sellers
                  </span>
                </div>
              )}
              <div className=" rounded-md">
                {data?.externalSource?.length > 0 &&
                  data?.externalSource.map((items, index) => (
                    <>
                      <div
                        className="rounded-md flex items-center space-y-2 my-4 "
                        key={index}
                        style={{ backgroundColor: "#F9F9F9" }}
                        onClick={() => {
                          if (Cookies.get("userUniqueId") == undefined) {
                            setOpenLoginPopup(true);
                            setProductLink(items?.productLink);
                            setperformAction2(true);
                          } else if (
                            items?.listingId == data?.listingId &&
                            data?.isOtherVendor == "N"
                          )
                            setThisPhonePopup(true);
                          else if (items?.listingId != data?.listingId) {
                            window.open(items?.productLink, "_blank");
                          } else {
                            window.open(items?.productLink, "_blank");
                          }
                        }}
                      >
                        <div className="flex-1 flex flex-col justify-start px-2 py-1.5">
                          <div className="flex flex-row">
                            {index < 3 && (
                              <Image
                                src={
                                  index == 0
                                    ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/first.svg"
                                    : index == 1
                                    ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/second.svg"
                                    : index == 2 &&
                                      "https://d1tl44nezj10jx.cloudfront.net/web/assets/third.svg"
                                }
                                alt="icon"
                                width={50}
                                height={35}
                                objectFit="contain"
                                className=""
                              />
                            )}
                            {items?.userName &&
                            data?.listingId != items?.listingId ? (
                              <div className="flex opacity-40 font-Roboto-Regular text-dx items-center pb-1">
                                {items?.userName}
                              </div>
                            ) : items?.listingId == data?.listingId &&
                              data?.isOtherVendor == "N" ? (
                              <>
                                <p className="flex opacity-40 font-Roboto-Regular text-dx items-center pb-1 truncate">
                                  {items?.userName}
                                </p>
                                <p className="flex opacity-40 font-Roboto-Regular text-jx items-center pb-0.5 pl-1.5 truncate">
                                  (This Phone)
                                </p>
                              </>
                            ) : items.externalSourceImage != "" &&
                              items?.productLink != "" ? (
                              <Image
                                src={items?.externalSourceImage}
                                alt={vendor}
                                height={35}
                                width={70}
                                objectFit="contain"
                                className="px-2 pt-2"
                              />
                            ) : (
                              <div className="flex opacity-40 font-Roboto-Regular text-dx items-center py-1.5 px-2">
                                {items?.userName}
                              </div>
                            )}
                            {data?.listingId == items.listingId &&
                              data.isOtherVendor == "Y" && (
                                <p className="font-Roboto-Semibold opacity-30 py-1 object-contain">
                                  (This Phone)
                                </p>
                              )}
                          </div>
                        </div>
                        <div className="flex px-4">
                          <p className="text-dx flex items-center font-Roboto-Bold text-primary">
                            {items?.externalSourcePrice && (
                              <span className="font-Roboto-Bold mr-0.5">
                                {" "}
                                ₹{" "}
                              </span>
                            )}{" "}
                            {numberWithCommas(items?.externalSourcePrice)}
                          </p>
                          <Image
                            src={GreaterThan}
                            width={20}
                            height={20}
                            className="pt-1"
                          />
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              <div className="border-b-2 pb-1 mb-2">
                <BannerSellHeading title="Device Info" />
              </div>

              <div className="fixed bottom-0 z-50 font-Roboto-Regular left-0 px-2 pt-2  w-full ">
                {data?.isOtherVendor === "Y" ? (
                  <PrimayButton
                    onClick={() => openWebSite(data?.vendorLink)}
                    className="shadow-2xl border border-gray-700"
                  >
                    {" "}
                    Go To Store{" "}
                  </PrimayButton>
                ) : (
                  <div className="fixed bottom-0 left-0 w-full flex items-center justify-center space-x-2  px-2 z-50">
                    <PrimayButton
                      onClick={() =>
                        data?.status == "Active"
                          ? showSellerNumber(data?.listingId)
                          : toast.warning(`This device is sold out`, {
                              toastId: "010",
                            })
                      }
                    >
                      {showNumber
                        ? contactSellerMobileNumber
                        : "Contact Seller"}
                    </PrimayButton>
                    {
                      <div
                        className="  px-3 pt-[7px] pb-[2px] rounded-md bg-white"
                        onClick={() => {
                          !authenticated
                            ? setOpenLoginPopup(true)
                            : !(data?.isOtherVendor === "Y") &&
                              Cookies.get("userUniqueId") !== undefined &&
                              fetchSellerMobileNumber(
                                data.listingId,
                                Cookies.get("userUniqueId"),
                                Cookies.get("sessionId")
                              ).then((response) => {
                                setContactSellerMobileNumber(
                                  response?.dataObject?.mobileNumber
                                );
                                data?.status == "Active"
                                  ? window.open(
                                      `https://wa.me/+91${response?.dataObject?.mobileNumber}?text=Hey ${data?.listedBy}, I am interested in your ${data?.marketingName} which is listed at ₹${data?.listingPrice} on ORUphones`,
                                      "_blank"
                                    )
                                  : toast.warning(`This device is sold out`, {
                                      toastId: "011",
                                    });
                              });
                        }}
                      >
                        <Image
                          src={
                            "https://d1tl44nezj10jx.cloudfront.net/web/assets/whatsapp.svg"
                          }
                          alt="whatsapp"
                          height={30}
                          width={30}
                        />
                      </div>
                    }
                  </div>
                )}
              </div>

              {data?.isOtherVendor === "Y" && (
                <div className="grid font-Roboto-Light grid-cols-2  gap-4">
                  <IconLabelValue
                    label="Storage"
                    value={data?.deviceStorage || "--"}
                  />
                  <IconLabelValue
                    label="Listed on"
                    value={data?.listingDate || "--"}
                  />
                  <IconLabelValue
                    label="Color"
                    value={
                      data?.color != "" && data?.color != " "
                        ? data?.color
                        : "--"
                    }
                  />
                  <IconLabelValue label="RAM" value={data?.deviceRam || "--"} />
                  {data?.isOtherVendor === "Y" && (
                    <>
                      <IconLabelValue
                        label="Brand Warranty"
                        value={"Not Applicable"}
                        showInfoPopup={() => setOpenWarrantyInfo(true)}
                      />
                      <IconLabelValue
                        label="Seller Warranty"
                        value={data?.warranty || "--"}
                        showInfoPopup={() => setOpenWarrantyInfo(true)}
                      />
                    </>
                  )}
                  <IconLabelValue
                    label="Condition"
                    value={data?.condition || data?.deviceCondition || "--"}
                  />
                </div>
              )}
              {data?.isOtherVendor === "N" && (
                <div className="grid grid-cols-2 font-Roboto-Light gap-4">
                  <IconLabelValue label="RAM" value={data?.deviceRam || "--"} />
                  <IconLabelValue label="storage" value={data?.deviceStorage} />
                  <IconLabelValue
                    label="verified on"
                    value={
                      data?.verifiedDate != "" &&
                      data?.verifiedDate != " " &&
                      data?.verifiedDate &&
                      data?.verified
                        ? data?.verifiedDate
                        : "Request Verification"
                    }
                    showInfoPopup={() => setOpenVerificationInfo(true)}
                    showRequestVerificarionSuccessPopup={() =>
                      !authenticated
                        ? setOpenLoginPopup(true)
                        : setOpenRequestVerificationSuccessPopup(true)
                    }
                    textAsLink={
                      !data?.verifiedDate ||
                      data?.verified == false ||
                      data?.verifiedDate == null ||
                      data?.verifiedDate == " "
                        ? true
                        : false
                    }
                  />
                  <IconLabelValue
                    label="color"
                    value={
                      data?.color != "" && data?.color != " "
                        ? data?.color
                        : "--"
                    }
                  />
                  {data?.isOtherVendor === "N" && (
                    <>
                      <IconLabelValue
                        label="Brand Warranty"
                        value={data?.warranty || "--"}
                        showInfoPopup={() => setOpenWarrantyInfo(true)}
                      />
                      <IconLabelValue
                        label="Seller Warranty"
                        value={"Not Applicable"}
                        showInfoPopup={() => setOpenWarrantyInfo(true)}
                      />
                    </>
                  )}

                  <IconLabelValue
                    label="Accessories"
                    value={getAccessoriesText(data) || "--"}
                  />
                  <IconLabelValue label="Listed On" value={data?.listingDate} />
                </div>
              )}

              <div>
                <p
                  className="font-Light text-jx py-2 pt-4 border-b-2"
                  style={{ color: "#878787" }}
                >
                  *this phone might be old or refurbished
                </p>
              </div>
            </div>
            <div className="my-4 mx-5" ref={myRef}>
              <ViewReport
                data={data}
                defaultOpen={defaultOpen}
                setDefaultOpen={setDefaultOpen}
                key={defaultOpen}
              />
              {data?.verified && (
                <ViewReport1
                  data={data}
                  defaultOpen={defaultOpen}
                  setDefaultOpen={setDefaultOpen}
                  key={defaultOpen}
                />
              )}
              {data?.isOtherVendor === "N" && !data?.verified && (
                <div className="border-t pt-2">
                  <div className="pt-2">
                    <div className="font-Roboto-Regular text-mx pb-2">
                      This is unverified device!
                    </div>
                    <span className="font-Roboto-Regular text-mx pb-2">
                      Please{" "}
                    </span>
                    <span
                      className="font-Roboto-Bold text-mx font-bold underline pb-2"
                      onClick={() => {
                        if (!authenticated) {
                          setOpenLoginPopup(true);
                          setperformAction3(true);
                        } else if (data?.status == "Active") {
                          setOpenRequestVerificationSuccessPopup(true);
                        } else
                          toast.warning(`This device is sold out`, {
                            toastId: "013",
                          });
                      }}
                    >
                      {" "}
                      Click here{" "}
                    </span>
                    <span className="font-Roboto-Regular text-mx pb-2">
                      {" "}
                      to send the verification request to seller for detailed
                      device report.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 my-5">
              <SellerDetails data={data} />
            </div>
            {data?.compareData && data?.compareData.length > 0 && (
              <div className="py-2 px-5">
                <p className="text-[16px] text-[#2C2F45] font-Roboto-Bold my-3 border-b-2 pb-1 ">
                  Detailed Comparison Between Other Sellers For
                </p>

                {data && (
                  <div className=" pb-5 flex w-full border-b-2">
                    {data && (
                      <div className="relative flex">
                        <Image
                          quality={25}
                          src={
                            ImageError
                              ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                              : getDefaultImage(data?.marketingName) ||
                                "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                          }
                          onError={() => setImageError(true)}
                          className=""
                          height="120"
                          width="90"
                        />
                        <div className="flex flex-col justify-end relative bottom-5 left-6">
                          <CardHeading3 title={data?.marketingName} />

                          {data?.make != "Apple" && (
                            <p className="flex space-x-1">
                              <span>
                                <CardHeading4 title="RAM :" />
                              </span>{" "}
                              <div className="font-Roboto-Bold text-jx pt-0.5 text-[#2C2F45]">
                                {data?.deviceRam}
                              </div>
                            </p>
                          )}

                          <p className="flex space-x-1">
                            <span>
                              <CardHeading4 title="Storage : " />{" "}
                            </span>{" "}
                            <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                              {data?.deviceStorage}
                            </div>
                          </p>
                          <p className="flex space-x-1">
                            <span>
                              <CardHeading4 title="Condition : " />{" "}
                            </span>{" "}
                            <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                              {data?.deviceCondition}
                            </div>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {data?.externalSource && data?.externalSource.length > 0 && (
                  <div className="flex">
                    <span className="text-cx font-Roboto-Light">
                      *The products compared here are either used mobile phones,
                      refurbished/renewed smartphone or second hand mobile
                      phones. These are not new phones.
                    </span>
                  </div>
                )}
                <ComparisonTable
                  data={data?.compareData?.length > 0 ? data?.compareData : []}
                  listingId={
                    data?.listingId !== undefined ? data?.listingId : []
                  }
                />
              </div>
            )}
            {data?.similarListTable && data?.similarListTable.length > 0 && (
              <div className="px-5">
                <div>
                  <p className="text-[16px] text-[#2C2F45] font-Roboto-Bold my-3 border-b-2 pb-1 ">
                    You may also like these deals
                  </p>
                </div>
                <ComparisonTable2
                  data={
                    data?.similarListTable?.length > 0
                      ? data?.similarListTable
                      : []
                  }
                  listingId={
                    data?.listingId !== undefined ? data?.listingId : []
                  }
                />
              </div>
            )}
          </main>
          <SimilarProduct data={data} />
          <Footer />
        </>
      )}

      {openRequestVerificationSuccessPopup && (
        <RequestVerificationSuccessPopup
          open={openRequestVerificationSuccessPopup}
          setOpen={setOpenRequestVerificationSuccessPopup}
          data={data}
        />
      )}

      {openRequestVerificationPopup && (
        <RequestVerificationPopup
          open={openRequestVerificationPopup}
          setOpen={setOpenRequestVerificationPopup}
          data={data}
          setShowNumber={setShowNumber}
          openRequestVerificationSuccessPopup={
            openRequestVerificationSuccessPopup
          }
          setOpenRequestVerificationSuccessPopup={
            setOpenRequestVerificationSuccessPopup
          }
        />
      )}
      <FullImageView
        open={showFullImage}
        close={() => setShowFullImage(false)}
        images={
          (data?.images?.length && data?.images) ||
          (data?.imagePath?.length && [{ fullImage: data?.imagePath }]) ||
          (data?.defaultImage?.fullImage?.length && [data?.defaultImage]) ||
          (data?.vendorLogo?.length && [
            {
              fullImage:
                "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                  ?.src,
            },
          ])
        }
      />
      {openConditionInfo && (
        <ConditionInfo
          open={openConditionInfo}
          setOpen={setOpenConditionInfo}
        />
      )}
      {openVerificationInfo && (
        <VerificationInfo
          open={openVerificationInfo}
          setOpen={setOpenVerificationInfo}
        />
      )}
      {openWarrantyInfo && (
        <WarrantyInfo open={openWarrantyInfo} setOpen={setOpenWarrantyInfo} />
      )}
      <LoginPopup
        open={openLoginPopup}
        setOpen={setOpenLoginPopup}
        fromAddListing
      />
      <ThisPhonePopup open={thisPhonePopup} setOpen={setThisPhonePopup} />
    </Fragment>
  );
}

export default ProductDeatils;

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      <div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="w-44 h-[300px] justify-items-center mx-24 my-14 bg-gray-300 rounded-md"></div>
          </div>
          <div className="flex flex-col gap-6 px-4 w-full">
            <div className="flex flex-col gap-6 px-4 w-full">
              <div className="flex flex-col gap-4 h-3 p-4 w-32 bg-gray-300 rounded-md" />
              <div className="flex flex-col gap-4 h-3 p-4 w-44 bg-gray-300 rounded-md" />
              <div className="flex flex-col gap-4 h-3 p-4 w-full bg-gray-300 rounded-md" />
              <div className="flex flex-col gap-4 pl-4 h-3 p-4 bg-gray-300 rounded-md" />
            </div>
            <div className="flex flex-col gap-4 pl-4 pt-4">
              <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
              </div>
              <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
              </div>
              <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-4 pl-4 h-3 p-6 w-48 bg-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrimayButton = ({ className, children, ...rest }) => (
  <button
    className={`p-2 my-3 bg-primary text-base text-white font-semibold w-full rounded uppercase ${
      className || ""
    }`}
    {...rest}
  >
    {children}
  </button>
);

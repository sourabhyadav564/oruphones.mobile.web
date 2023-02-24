import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import first from "https://d1tl44nezj10jx.cloudfront.net/assets/first.png";
// import second from "https://d1tl44nezj10jx.cloudfront.net/assets/second.png";
// import third from "https://d1tl44nezj10jx.cloudfront.net/assets/third.png";

import Header2 from "@/components/Header/header2";
import {
  ProductPriceHeading,
  ProductNameHeading,
  BannerSellHeading,
} from "@/components/elements/Heading/heading";
import ImageSlider from "@/components/ImageSlider";
import { BiSearch } from "react-icons/bi";
// import star from "@/assets/star.svg";
import { FaRupeeSign } from "react-icons/fa";
// import { BsInfoCircle } from "react-icons/bs";
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
import VerifiedIcon from "@/components/VerifiedIcon";
import UnVerifiedIcon from "@/components/UnVerifiedIcon";
import { useAuthState } from "providers/AuthProvider";
import { useRef } from "react";
import SellerDetails from "@/components/ProdInfo/SellerDetails";
import LoginPopup from "@/components/Popup/LoginPopup";
// import Logo from "@/assets/mobiru_logo.svg";
// import Logo from "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png";
import { BsInfoCircle, BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
// import whatsapp from "https://d1tl44nezj10jx.cloudfront.net/assets/whatsapp.png";
import WarrantyInfo from "@/components/Popup/WarrantyInfo";
import VerificationIcon from "@/components/verificationIcon";
import { AiFillExclamationCircle } from "react-icons/ai";
import {
  CardHeading,
  CardHeading2,
  CardHeading3,
  CardHeading4,
  CardHeading5,
} from "@/components/elements/CardHeading/cardheading";
import SearchBar from "@/components/Header/SearchBar";
import { toast } from "react-toastify";
// import sold_out from "@/assets/soldout.png";
import { FaGreaterThan } from "react-icons/fa";
import ThisPhonePopup from "@/components/Popup/ThisPhonePopup";
import ComparisonTable from "@/components/Tables/ComparisonTable";
import ComparisonTable2 from "@/components/Tables/ComparisonTable2";

// import {
//   otherVandorDataSelector,
//   // otherVandorListingIdSelector,
// } from "../../../../../atoms/globalState";
// import { useRecoilValue } from "recoil";

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

function ProductDeatils({ data }) {
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
  const [deviceListingInfo, setDeviceListingInfo] = useState(data);
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
  // const productData = useRecoilValue(otherVandorDataSelector);

  // const listingId = useRecoilValue(otherVandorListingIdSelector);

  const router = useRouter();
  // const listingId = router.query.prodID;

  // const otherVendorData = [];

  // productData?.filter((item) => {
  //   if (item.listingId === listingId) {
  //     otherVendorData.push(item);
  //   }
  // });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (
  //       openLoginPopup == false &&
  //       performAction == true &&
  //       Cookies.get("userUniqueId") !== undefined &&
  //       data?.isOtherVendor !== "Y"
  //     ) {
  //       if (data?.verified) {
  //         showSellerNumber(data?.listingId);
  //         // handleButtonClick();
  //         // setShowNumber((prev) => !prev);
  //         clearInterval(interval);
  //       } else {
  //         setOpenRequestVerificationPopup(true);
  //         clearInterval(interval);
  //       }
  //     }
  //   }, 1000);
  // }, [openLoginPopup]);

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
          // handleButtonClick();
          // setShowNumber((prev) => !prev);
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

  // function showSellerNumber(e) {
  //   myRef.current.scrollIntoView({ behavior: "smooth" });
  // }

  const showSellerNumber = (e) => {
    // handleButtonClick();
    if (Cookies.get("userUniqueId") == undefined) {
      setperformAction(true);
      //router.push("/login");
      setOpenLoginPopup(true);
      // showSellerNumber(e);
    } else if (data?.verified) {
      //  showSellerNumber(data?.listingId);
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
  // console.log("data", data);

  useEffect(() => {
    // setDeviceListingInfo(data2);
    // setData(
    detailWithUserInfo(
      data?.isOtherVendor,
      data?.listingId,
      0,
      Cookies.get("sessionId") != undefined
        ? Cookies.get("sessionId")
        : localStorage.getItem("sessionId") || ""
    ).then((res) => {
      console.log("res2", res);
      setDeviceListingInfo(res.dataObject);
    });
    // );
    // if (!(data?.isOtherVendor === "Y") && Cookies.get("userUniqueId") !== undefined) {
    //   fetchSellerMobileNumber(data.listingId, Cookies.get("userUniqueId")).then(
    //     (response) => {
    //       setContactSellerMobileNumber(response?.dataObject?.mobileNumber);
    //     }
    //   );
    // }
    // if (data?.isOtherVendor === "N") {
    //   handleButtonClick();
    // }
  }, [data]);

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
  // console.log("Data::", data);

  const handleButtonClick = async () => {
    if (
      !(data?.isOtherVendor === "Y") &&
      Cookies.get("userUniqueId") !== undefined
    ) {
      fetchSellerMobileNumber(
        data?.listingId,
        Cookies.get("userUniqueId")
      ).then((response) => {
        console.log("response", response);
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
    // setDefaultOpen(true);
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
      return <BsStarFill className="text-yellow-400" />;
    } else {
      return <BsStar className="text-black-7e" />;
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
  // console.log("vendor", vendor);

  return (
    <Fragment>
      <Header2 title={data?.marketingName}>
        <div className="absolute right-4 top-3">
          <Link href="/product/buy-old-refurbished-used-mobiles/searchBar">
            <BiSearch size={22} />
          </Link>
        </div>
      </Header2>

      <main className="py-3 relative ">
        {data?.isOtherVendor === "N" && (
          <div className="flex justify-between items-center absolute top-0 left-0 right-0 z-10  text-white px-4 py-2 ">
            <div className="flex space-x-4 items-center ">
              {/* {(data?.verified && (
                <Fragment>
                  <VerifiedIcon width={75} height={32} />
                  <span
                    className="bg-white py-1 px-2 rounded text-black-21 text-xs font-semibold"
                    onClick={executeScroll}
                  >
                    Device Report
                  </span>
                </Fragment>
              )) || (
                <Fragment>
                  <UnVerifiedIcon width={75} height={32} />
                  <p className="flex items-center">
                    <span
                      className="underline text-xs"
                      onClick={() =>
                        !authenticated
                          ? setOpenLoginPopup(true)
                          : setOpenRequestVerificationSuccessPopup(true)
                      }
                    >
                      Request Verification
                    </span>
                    <BsInfoCircle
                      className="ml-1.5"
                      onClick={() => setOpenVerificationInfo(true)}
                    />
                  </p>
                </Fragment>
              )} */}
            </div>
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
                  // fullImage: data?.vendorLogo,
                  // thumbImage: data?.vendorLogo,
                  fullImage: "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png",
                  thumbImage: "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png",
                },
              ])
            }
          />
          {/* <Image
            className="absolute top-4"
            src={sold_out}
            alt="Picture of the author"
            width={100}
            height={100}
          /> */}
        </div>
        <div className="my-4 px-4 ">
          <div className="flex">
            <div className="flex-1  ">
              {/* <p className="text-gray-70 text-xs">List Price</p> */}
              {/* <p className="text-gray-70 text-xs">Price</p> */}
              {/* <p
                className="font-bold flex items-center"
                style={{ fontSize: 29, color: "#000944" }}
              >
                {data?.listingPrice && (
                  <FaRupeeSign className="text-xl font-normal mr-0.5" />
                )}{" "}
                {data?.listingPrice}
              </p> */}
              <ProductPriceHeading
                title={numberWithCommas(data?.listingPrice)}
              />
            </div>
            <div className="m-auto justify-center">
              {(data?.isOtherVendor == "N" && (
                <Fragment>
                  {/* <VerifiedIcon width={75} height={32} /> */}
                  <span
                    className="bg-white py-1 px-2 rounded text-black-21 text-ex font-Light underline "
                    onClick={executeScroll}
                  >
                    Device Report &gt;
                  </span>
                </Fragment>
              )) || (
                  <Fragment>
                    {/* <UnVerifiedIcon width={75} height={32} /> */}
                    {/* <p className="flex items-center">
                    <span
                      className="underline text-xs"
                      onClick={() =>
                        !authenticated
                          ? setOpenLoginPopup(true)
                          : setOpenRequestVerificationSuccessPopup(true)
                      }
                    >
                      Request Verification
                    </span>
                    <BsInfoCircle
                      className="ml-1.5"
                      onClick={() => setOpenVerificationInfo(true)}
                    />
                  </p> */}
                  </Fragment>
                )}
            </div>
          </div>
          <div className="flex flex-col items-start">
            {/* <h1 className="text-black font-Regular text-qx">
              {data?.marketingName}
            </h1> */}

            <h1 className="font-Roboto-Regular text-qx text-[#000000]">
              {data?.marketingName}{" "}
            </h1>

            {/* {data?.isOtherVendor === "N" && (
              <div className="text-gray-20 w-full flex items-center justify-between my-1">
                <p className="text-gray-20 font-semibold text-xs">
                  Listed on: <span>{data?.listingDate || "--"}</span>
                </p>
                <p className="text-gray-20 font-semibold text-xs">
                  Location: <span>{data?.listingLocation || "--"}</span>
                </p>
              </div>
            )} */}
          </div>
          <div className="w-full flex items-center mt-4 mb-jx gap-2">
            <div
              className="w-11/12 h-[40px]  flex items-center m-auto rounded-[5px] justify-center opacity-bg-50"
              style={{ backgroundColor: "#F3F3F3" }}
            >
              <p className="py-jx flex text-[#000000] space-x-1 font-Roboto-Light text-bx opacity-100">
                <span className="self-center"> Varient: </span>
                <CardHeading2 title={data?.deviceStorage} />
                {/* <span className="text-[#000000] font-Roboto-Regular text-jx">
                  {data?.deviceStorage}
                </span> */}
              </p>
            </div>
            <div
              className="w-full grid grid-cols-2  rounded-[5px] px-4 h-[40px]  opacity-bg-50"
              style={{ backgroundColor: "#F3F3F3" }}
              onClick={() => setOpenConditionInfo(true)}
            >
              {/* <p className="text-gray-70 text-xs">List Price</p> */}
              <div className="m-auto justify-center ">
                <span
                  className="font-Roboto-Light text-bx opacity-100 text-[#000] flex leading-tight items-center"
                // onClick={() => setOpenConditionInfo(true)}
                >
                  Condition{" "}
                </span>
                <CardHeading2 title={data?.deviceCondition} />
                {/* <p className="text-jx font-Regular text-black flex items-center">
                  {data?.deviceCondition}
                </p> */}
              </div>
              <div className="flex text-bx space-x-[2.5px] m-auto justify-center ">
                { }
                {Array(5)
                  .fill()
                  .map((_, index) => iconToShow(index))}
              </div>
            </div>
          </div>

          <div className="py-2 pb-4">
            {(data?.verified && (
              <Fragment>
                {/* <VerifiedIcon width={75} height={32} /> */}
                {/* <div
                  className="flex m-auto justify-center text-white px-3 py-0.5 rounded-md "
                  style={{ background: "#4CAF50" }}
                >
                  <div className="flex flex-1  ">
                    <VerificationIcon className="self-center" />
                    <p className="font-Roboto-Light Italic text-ex self-center">
                      Verified
                    </p>
                  </div>
                  <div className="m-auto justify-center ">
                    <p className="text-jx font-Roboto-Light">
                      This phone is verified by ORUphones
                    </p>
                  </div>
                </div> */}
                <div
                  className="flex m-auto justify-center text-white px-3 py-0.5 rounded-md "
                  style={{ background: "#4CAF50" }}
                >
                  <div className="flex flex-1  ">
                    <VerificationIcon className="self-center" />
                    <p className="font-Roboto-Light Italic text-ex self-center">
                      Verified
                    </p>
                    <BsInfoCircle
                      size={26}
                      className="ml-1 pt-[13px] hover:cursor-pointer"
                      onClick={() => setOpenVerificationInfo(true)}
                    />
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
                {/* <span
                    className="bg-white py-1 px-2 rounded text-black-21 text-xs font-semibold"
                    onClick={executeScroll}
                  >
                    Device Report
                  </span> */}
              </Fragment>
            )) || (
                <Fragment>
                  {/* <UnVerifiedIcon width={75} height={32} /> */}
                  {data?.isOtherVendor === "N" && (
                    <div className="w-full  py-2 space-x-2 text-center">
                      <div
                        className="flex py-2 rounded-md"
                        style={{ backgroundColor: "#F9C414" }}
                      >
                        <div className="flex space-x-1 pl-3">
                          {/* <GoUnverified width={80} height={80} className="text-black self-center"/> */}
                          <div className="flex space-x-2">
                            <AiFillExclamationCircle
                              size={20}
                              fill="white"
                              className="self-center text-black"
                            />
                            {/* <UnVerifiedIcon /> */}

                            <span className="text-lx font-Roboto-Light  self-center text-[#000944] italic uppercase">
                              unverified
                            </span>
                            <BsInfoCircle
                              size={18}
                              className="ml-1 pt-1.5 hover:cursor-pointer"
                              onClick={() => setOpenVerificationInfo(true)}
                            />
                            <div className="pl-1">
                              <div className="bg-gray-100 w-[0.5px] h-6 "></div>
                            </div>
                          </div>
                          {/* <span className="text-xs italic self-center uppercase"> unverified</span> */}
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
                          <span className="underline font-Light text-jx">
                            Click here to Request Verification
                          </span>
                          {/* <BsInfoCircle
                          className="ml-1"
                          onClick={() => setOpenVerificationInfo(true)}
                        /> */}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* <p className="flex items-center">
                    <span
                      className="underline text-xs"
                      onClick={() =>
                        !authenticated
                          ? setOpenLoginPopup(true)
                          : setOpenRequestVerificationSuccessPopup(true)
                      }
                    >
                      Request Verification
                    </span>
                    <BsInfoCircle
                      className="ml-1.5"
                      onClick={() => setOpenVerificationInfo(true)}
                    />
                  </p> */}
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
                                ? "https://d1tl44nezj10jx.cloudfront.net/assets/first.png"
                                : index == 1
                                  ? "https://d1tl44nezj10jx.cloudfront.net/assets/second.png"
                                  : index == 2 && "https://d1tl44nezj10jx.cloudfront.net/assets/third.png"
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
                            <p className="flex opacity-40 font-Roboto-Regular text-dx items-center pb-1">
                              {items?.userName}
                            </p>
                            <p className="flex opacity-40 font-Roboto-Regular text-jx items-center pb-0.5 pl-1.5">
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
                        {/* {console.log("items", items)} */}
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
                          <span className="font-Roboto-Bold mr-0.5"> ₹ </span>
                        )}{" "}
                        {numberWithCommas(items?.externalSourcePrice)}
                      </p>
                      <FaGreaterThan size={18} className="pt-1" />
                    </div>
                  </div>
                </>
              ))}
          </div>
          <div className="border-b-2 pb-1 mb-2">
            <BannerSellHeading title="Device Info" />
          </div>
          {/* <h2 className="text-black text-ex border-b-2 pb-1 font-Light my-3">Device Info</h2> */}

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
                  {showNumber ? contactSellerMobileNumber : "Contact Seller"}
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
                          Cookies.get("userUniqueId")
                        ).then((response) => {
                          console.log("response", response);
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
                      src={"https://d1tl44nezj10jx.cloudfront.net/assets/whatsapp.png"}
                      alt="whatsapp"
                      height={30}
                      width={30}
                    />
                  </div>
                }
                {/* {
                  !showNumber && (
                    (
                      <div
                        className=" px-3 pt-[8px] pb-[2px] rounded-md bg-white border"
                        onClick={() =>
                          data?.status == "Active" ? window.open(
                            `https://wa.me/${contactSellerMobileNumber}?text=Hey ${data?.listedBy}, I am interested in your ${data?.marketingName} which is listed at ₹${data?.listingPrice} on ORUphones`,
                            "_blank"
                          ) : toast.warning("This device is sold out")
                        }
                      >
                        <Image src={whatsapp} alt="whatsapp" height={30} width={30} />
                      </div>
                    )
                  )
                } */}
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
              <IconLabelValue label="Color" value={data?.color || "--"} />
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
                value={data?.verifiedDate || "Request Verification"}
                showInfoPopup={() => setOpenVerificationInfo(true)}
                showRequestVerificarionSuccessPopup={() =>
                  !authenticated
                    ? setOpenLoginPopup(true)
                    : setOpenRequestVerificationSuccessPopup(true)
                }
                textAsLink={data?.verifiedDate != null ? false : true}
              />
              <IconLabelValue label="color" value={data?.color || ""} />
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
                  to send the verification request to seller for detailed device
                  report.
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
                {/* <Image
                src={ImageError ? Logo : data?.defaultImage || Logo}
                onError={()=>setImageError(true)}
                className=""
                // alt={`${
                //   type[Math.floor(Math.random() * type.length)]
                // } ${model} ${storage} like new `.toLowerCase()}
                height={120}
                width={90}
              /> */}
                {data && (
                  <div className="relative flex">
                    <Image
                      src={
                        ImageError
                          ? "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                          : getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"
                      }
                      onError={() => setImageError(true)}
                      className=""
                      // alt={`${
                      //   type[Math.floor(Math.random() * type.length)]
                      // } ${model} ${storage} like new `.toLowerCase()}
                      height="120"
                      width="90"
                    />
                    <div className="flex flex-col justify-end relative bottom-5 left-6">
                      {/* <p className="font-bold text-dx text-[#2C2F45]">{data?.marketingName}</p> */}
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
                  refurbished/renewed smartphone or second hand mobile phones.
                  These are not new phones.
                </span>
              </div>
            )}
            <ComparisonTable
              data={data?.compareData.length > 0 ? data?.compareData : []}
              listingId={data?.listingId !== undefined ? data?.listingId : []}
            />
            {/* {console.log("data?.compareData", data?.listingId)} */}
          </div>
        )}
        {data?.similarListTable && data?.similarListTable.length > 0 && <div className="px-5">
          <div>
            <p className="text-[16px] text-[#2C2F45] font-Roboto-Bold my-3 border-b-2 pb-1 ">
              You may also like these deals
            </p>
          </div>
          <ComparisonTable2
            data={
              data?.similarListTable?.length > 0 ? data?.similarListTable : []
            }
            listingId={data?.listingId !== undefined ? data?.listingId : []}
          />
        </div>}
      </main>
      <SimilarProduct data={data} />
      <Footer />

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
              // fullImage: data?.vendorLogo,
              // thumbImage: data?.vendorLogo,
              fullImage: "https://d1tl44nezj10jx.cloudfront.net/assets/oru_phones_logo.png"?.src,
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

export const getServerSideProps = async ({ req, res, query }) => {
  const { userUniqueId, sessionId } = req.cookies;
  const detailWithUserInfo1 = await detailWithUserInfo(
    query.isOtherVendor,
    query.prodID,
    userUniqueId || "Guest",
    sessionId || ""
  );

  return {
    props: {
      data: detailWithUserInfo1?.dataObject || [],
    },
  };
};

const PrimayButton = ({ className, children, ...rest }) => (
  <button
    className={`p-2 my-3 bg-primary text-base text-white font-semibold w-full rounded uppercase ${className || ""
      }`}
    {...rest}
  >
    {children}
  </button>
);

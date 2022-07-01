import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Header2 from "@/components/Header/header2";
import ImageSlider from "@/components/ImageSlider";
import star from "@/assets/star.svg";
import { FaRupeeSign } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { detailWithUserInfo, fetchSellerMobileNumber } from "api-call";
import IconLabelValue from "@/components/IconLabelValue";
import { getAccessoriesText, numberWithCommas } from "@/utils/util";
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
import Logo from "@/assets/mobiru_logo.svg";
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

import {
  otherVandorDataSelector,
  // otherVandorListingIdSelector,
} from "../../../../../atoms/globalState";
import { useRecoilValue } from "recoil";

const RequestVerificationPopup = dynamic(() =>
  import("@/components/Popup/RequestVerificationPopup")
);
const ConditionInfo = dynamic(() => import("@/components/Popup/ConditionInfo"));
const VerificationInfo = dynamic(() =>
  import("@/components/Popup/VerificationInfo")
);
const ViewReport = dynamic(() => import("@/components/ViewReport"));
const RequestVerificationSuccessPopup = dynamic(() =>
  import("@/components/Popup/RequestVerificationSuccessPopup")
);

function ProductDeatils({ data }) {
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
  const [
    openRequestVerificationSuccessPopup,
    setOpenRequestVerificationSuccessPopup,
  ] = useState(false);
  const [openRequestVerificationPopup, setOpenRequestVerificationPopup] =
    useState(false);
  const [deviceListingInfo, setDeviceListingInfo] = useState(data);
  const [contactSellerMobileNumber, setContactSellerMobileNumber] = useState("Loading...");
  const [showNumber, setShowNumber] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [defaultOpen, setDefaultOpen] = useState(false);
  const { authenticated } = useAuthState();
  const myRef = useRef(null);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);

  const productData = useRecoilValue(otherVandorDataSelector);
  console.log("productData ---->", productData);

  console.log("deviceListingInfo", deviceListingInfo);

  // const listingId = useRecoilValue(otherVandorListingIdSelector);
  // console.log("listingId ---->", listingId);

  const router = useRouter();
  const listingId = router.query.prodID;
  console.log("listingId ---->", listingId);

  const otherVendorData = [];

  productData?.filter((item) => {
    if (item.listingId === listingId) {
      otherVendorData.push(item);
    }
  });

  console.log("otherVendorData ---->", otherVendorData);

  const showSellerNumber = async (e) => {
    console.log(e, Cookies.get("info"));
    handleButtonClick();
    if (!authenticated) {
      //router.push("/login");
      setOpenLoginPopup(true);
    } else if (data.verified) {
      setShowNumber((prev) => !prev);
    } else {
      if (showNumber) {
        setShowNumber((prev) => !prev);
      } else {
        setOpenRequestVerificationPopup(true);
      }
    }
  };

  console.log("data ---> from prod", data);

  useEffect(() => {
    setDeviceListingInfo(data);
    // if (!(data?.isOtherVendor === "Y") && Cookies.get("info") !== undefined) {
    //   fetchSellerMobileNumber(data.listingId, Cookies.get("info")).then(
    //     (response) => {
    //       setContactSellerMobileNumber(response?.dataObject?.mobileNumber);
    //       console.log(
    //         "contactSellerMobileNumber",
    //         response?.dataObject?.mobileNumber
    //       );
    //     }
    //   );
    // }
    // if (data?.isOtherVendor === "N") {
    //   handleButtonClick();
    // }
  }, [data]);

  const handleButtonClick = async () => {
    if (!(data?.isOtherVendor === "Y") && Cookies.get("info") !== undefined) {
      fetchSellerMobileNumber(data.listingId, Cookies.get("info")).then(
        (response) => {
          setContactSellerMobileNumber(response?.dataObject?.mobileNumber);
          console.log(
            "contactSellerMobileNumber",
            response?.dataObject?.mobileNumber
          );
        }
      );
    }
  };

  const executeScroll = () => {
    setDefaultOpen(true);
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  function openWebSite(data) {
    if (authenticated) {
      window.open(data);
    } else {
      setOpenLoginPopup(true);
    }
  }

  const conditionText =
    data?.deviceCondition || otherVendorData[0]?.deviceCondition;
  let filled = 0;
  if (conditionText === "Like New") {
    filled = 5;
  } else if (conditionText === "Excellent") {
    filled = 4;
  } else if (conditionText === "Good") {
    filled = 3;
  } else if (conditionText === "Fair") {
    filled = 2;
  }

  let iconToShow = (index) => {
    if (index < filled) {
      return <BsStarFill className="text-yellow-400" />;
    } else {
      return <BsStar className="text-black-7e" />;
    }
  };
  return (
    <Fragment>
      {/* <Header2 title="Product Info" /> */}
      <main className="py-3 relative ">
        {(data?.isOtherVendor === "N" ||
          otherVendorData[0]?.isOtherVendor === "N") && (
          <div className="flex justify-between items-center absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-30 text-white px-4 py-2 ">
            <div className="flex space-x-4 items-center ">
              {(data?.verified && (
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
              )}
            </div>
            <div className="flex space-x-4 items-center ">
              <AddFav
                data={deviceListingInfo}
                setProducts={setDeviceListingInfo}
                height={22}
                width={22}
                color="white"
              />
              <ShareIcon
                data={deviceListingInfo}
                height={22}
                width={22}
                color="white"
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
              (data?.defaultImage && [
                { fullImage: data?.defaultImage?.fullImage },
              ]) ||
              (otherVendorData[0] && [
                { fullImage: otherVendorData[0]?.vendorLogo },
              ])
            }
          />
        </div>
        <div className="my-4 px-4">
          <div className="flex flex-col items-start">
            <h1 className="text-gray-20 font-bold text-lg">
              {data?.marketingName || otherVendorData[0]?.marketingName}​
            </h1>
            <div className="text-gray-20 flex items-center my-1">
              <p className="text-gray-20 font-bold text-sm">
                Varient:{" "}
                <span className="text-gray-20 font-bold text-sm">
                  {data?.deviceStorage || otherVendorData[0]?.deviceStorage}​
                </span>
              </p>
            </div>
            <div className="text-gray-20 w-full flex items-center justify-between my-1">
              <p className="text-gray-20 font-semibold text-xs">
                Listed on:{" "}
                <span>
                  {data?.listingDate || otherVendorData[0]?.listingDate || "--"}
                </span>
              </p>
              <p className="text-gray-20 font-semibold text-xs">
                Location:{" "}
                <span>
                  {data?.listingLocation ||
                    otherVendorData[0]?.listingLocation ||
                    "--"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center border rounded-md my-3">
            <div className="bg-gray-ef flex-1 px-4 py-2 ">
              {/* <p className="text-gray-70 text-xs">List Price</p> */}
              <p className="text-gray-70 text-xs">Price</p>
              <p
                className="font-bold flex items-center text-black-4e"
                style={{ fontSize: 28 }}
              >
                {(data?.listingPrice || otherVendorData?.length) && (
                  <FaRupeeSign className="text-xl font-normal mr-0.5" />
                )}{" "}
                {data?.listingPrice || otherVendorData[0]?.listingPrice}
              </p>
            </div>
            <div className="bg-white flex-1 px-4 py-2">
              {/* <p className="text-gray-70 text-xs">List Price</p> */}
              <span
                className="text-xs text-black-7e flex items-center"
                onClick={() => setOpenConditionInfo(true)}
              >
                Condition{" "}
                <BsInfoCircle className="ml-2 text-sm cursor-pointer" />
              </span>
              <p className="text-sm font-bold text-gray-70 flex items-center">
                {data?.deviceCondition || otherVendorData[0]?.deviceCondition}
              </p>
              <div className="flex space-x-2 my-[3px]">
                {}
                {Array(5)
                  .fill()
                  .map((_, index) => iconToShow(index))}
              </div>
            </div>
          </div>
          {data?.externalSource?.length > 0 && (
            <div>
              <span className="text-xs">Check price from other sellers</span>
            </div>
          )}
          {data?.externalSource?.length > 0 &&
            data?.externalSource.map((items, index) => (
              <>
                <div className="border rounded-md flex items-center key={index}">
                  {/* <div className="flex items-center" key={index}> */}
                    <div className="flex-1 flex flex-col justify-start px-4 py-1">
                      {/* <p className="text-gray-70 text-xs">Seller</p> */}
                      <div>
                        <img
                          src={items?.externalSourceImage}
                          style={{ height: 20, width: "auto" }}
                          alt={items?.externalSourceName}
                        />
                      </div>
                    </div>
                    <div className="flex px-4 py-1">
                      {/* <p className="text-gray-70 text-xs">List Price</p> */}
                      <p className="text-lg flex items-center text-black-4e">
                        {items?.externalSourcePrice && (
                          <span className="font-normal mr-0.5"> ₹ </span>
                        )}{" "}
                        {numberWithCommas(items?.externalSourcePrice)}
                      </p>
                    </div>
                  {/* </div> */}
                </div>
              </>
            ))}
          <h2 className="text-gray-20 font-semibold my-3">Device Info</h2>
          {(data?.isOtherVendor === "Y" ||
            otherVendorData[0]?.isOtherVendor === "Y") && (
            <div className="grid grid-cols-2 space-y-2">
              <IconLabelValue
                label="Storage"
                value={data?.deviceStorage || otherVendorData[0]?.deviceStorage}
              />
              <span></span>
              <IconLabelValue label="Color" value={data?.color || "--"} />
            </div>
          )}
          {(data?.isOtherVendor === "N" ||
            otherVendorData[0]?.isOtherVendor === "N") && (
            <div className="grid grid-cols-2 space-y-2">
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
              <IconLabelValue label="warranty" value={data?.warranty || "--"} />
              <IconLabelValue
                label="Accessories"
                value={getAccessoriesText(data)}
              />
              <IconLabelValue label="Listed On" value={data?.listingDate} />
            </div>
          )}
          <SellerDetails data={data} otherVendorData={otherVendorData} />
        </div>
        <div className="mt-4 w-full" ref={myRef}>
          <ViewReport
            data={data}
            defaultOpen={defaultOpen}
            setDefaultOpen={setDefaultOpen}
            key={defaultOpen}
          />
        </div>
        <div className="px-4 py-2 fixed bottom-0 w-full bg-white z-50">
          {data?.isOtherVendor === "Y" ||
          otherVendorData[0]?.isOtherVendor === "Y" ? (
            <PrimayButton
              onClick={() =>
                openWebSite(data?.vendorLink || otherVendorData[0]?.vendorLink)
              }
            >
              {" "}
              View Website{" "}
            </PrimayButton>
          ) : (
            <PrimayButton onClick={() => showSellerNumber(data?.listingId)}>
              {showNumber ? contactSellerMobileNumber : "Contact Seller"}
            </PrimayButton>
          )}
        </div>
      </main>
      <SimilarProduct data={data} otherVendorData={otherVendorData} />
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
          (data?.imagePath && [{ fullImage: data?.imagePath }]) ||
          (data?.defaultImage && [data?.defaultImage]) ||
          (otherVendorData[0] && [
            { fullImage: otherVendorData[0]?.vendorLogo },
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
      <LoginPopup
        open={openLoginPopup}
        setOpen={setOpenLoginPopup}
        fromAddListing
      />
    </Fragment>
  );
}

export default ProductDeatils;

export const getServerSideProps = async ({ req, res, query }) => {
  const { info } = req.cookies;
  const detailWithUserInfo1 = await detailWithUserInfo(
    query.isOtherVendor,
    query.prodID,
    info || "Guest"
  );
  return {
    props: {
      data: detailWithUserInfo1?.dataObject || [],
    },
  };
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

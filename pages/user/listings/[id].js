import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Header2 from "@/components/Header/header2";
import ImageSlider from "@/components/ImageSlider";

import {
  ProductPriceHeading,
  ProductNameHeading,
} from "@/components/elements/Heading/heading";
import { CardHeading2 } from "@/components/elements/CardHeading/cardheading";

import { activateListing, getListingDetails } from "api-call";
import IconLabelValue from "@/components/IconLabelValue";
import { getAccessoriesText, numberWithCommas } from "@/utils/util";
import Cookies from "js-cookie";
import VerifyFlowPopup from "@/components/Popup/VerifyFlowPopup";
import Footer from "@/components/Footer";

import Star1 from "@/assets/star1.svg";
import Star2 from "@/assets/star2.svg";

import VerifiedIcon from "@/components/VerifiedIcon";
const PauseListing = dynamic(() => import("@/components/Popup/PauseListing"));
const ConditionInfo = dynamic(() => import("@/components/Popup/ConditionInfo"));
const VerificationInfo = dynamic(() =>
  import("@/components/Popup/VerificationInfo")
);
const ListingDeleted = dynamic(() =>
  import("@/components/Popup/ListingDeleted")
);
const ListingActivated = dynamic(() =>
  import("@/components/Popup/ListingActivated")
);
const ViewReport = dynamic(() => import("@/components/ViewReport"));
const ViewReport1 = dynamic(() => import("@/components/ViewReport1"));

function ListingDeatils({ data, id }) {
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
  const [openPauseListing, setOpenPauseListing] = useState(false);
  const [openDeleteListing, setOpenDeleteListing] = useState(false);
  const [openVerifyListing, setOpenVerifyListing] = useState(false);
  const [openActivateListing, setOpenActivateListing] = useState(false);
  const [reason, setReason] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();
    setOpenDeleteListing(true);
  };

  const handleActivate = (e) => {
    e.preventDefault();
    let payLoad = {
      listingId: id,
      userUniqueId: Cookies.get("userUniqueId"),
    };
    activateListing(payLoad, Cookies.get("sessionId")).then((res) => {
      setReason(res?.reason);
      setOpenActivateListing(true);
    });
  };

  let filled =
    data?.deviceCondition?.toLowerCase() == "Like New".toLowerCase()
      ? 5
      : data?.deviceCondition?.toLowerCase() == "Excellent".toLowerCase()
      ? 4
      : data?.deviceCondition?.toLowerCase() == "Good".toLowerCase()
      ? 3
      : data?.deviceCondition?.toLowerCase() == "Fair".toLowerCase()
      ? 2
      : data?.deviceCondition?.toLowerCase() == "Needs Repair".toLowerCase()
      ? 1
      : 5;
  let iconToShow = (index) => {
    if (index < filled) {
      return <Image src={Star2} width={20} height={20} />;
    } else {
      return <Image src={Star1} width={20} height={20} />;
    }
  };

  return (
    <Fragment>
      <Header2 title="Listing Info">
        <div className="absolute right-4 top-3">
          <Link href={`/sell-old-refurbished-used-mobiles/edit/${id}`}>
            <a>
              <Image
                src={"https://d1tl44nezj10jx.cloudfront.net/assets/edit.svg"}
                alt={data?.marketingName}
                width={26}
                height={21}
                className="opacity-90"
              />
            </a>
          </Link>
        </div>
      </Header2>
      <main className="mb-4 mt-16">
        {data?.verified && (
          <div className="px-4 absolute z-10">
            <VerifiedIcon width={70} />
          </div>
        )}
        <div className="px-4">
          <ImageSlider
            images={
              (data?.images?.length && data?.images) ||
              (data?.defaultImage && [
                { fullImage: data?.defaultImage?.fullImage },
              ])
            }
          />
        </div>
        <section className="my-4">
          <div className="px-4 mb-4">
            <div className="flex-1  ">
              <ProductPriceHeading title={data?.listingPrice} />
            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-Roboto-Regular text-qx text-[#000000]">
                {data?.marketingName}
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 21 21"
              >
                <path
                  id="chart"
                  d="M18.649,0a2.268,2.268,0,0,1,1.668.684A2.272,2.272,0,0,1,21,2.351v16.3A2.334,2.334,0,0,1,18.649,21H2.351a2.268,2.268,0,0,1-1.668-.684A2.272,2.272,0,0,1,0,18.649V2.351A2.268,2.268,0,0,1,.684.684,2.272,2.272,0,0,1,2.351,0ZM7,16.351v-8.2H4.649v8.2H7Zm4.649,0V4.649h-2.3v11.7h2.3Zm4.7,0v-4.7H14v4.7Z"
                  fill="#4e4e4e"
                />
              </svg>
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
            <h2 className="text-black text-ex border-b-2 pb-1 font-Light my-3 mt-5">
              Device Info
            </h2>
            <div className="grid grid-cols-2 gap-4  ">
              <IconLabelValue label="RAM" value={data?.deviceRam || "--"} />
              <IconLabelValue
                label="storage"
                value={data?.deviceStorage || "--"}
              />
              <IconLabelValue
                label="location"
                value={data?.listingLocation || "--"}
              />
              <IconLabelValue label="warranty" value={data?.warranty || "--"} />
              <IconLabelValue
                label="Accessories"
                value={getAccessoriesText(data) || "--"}
              />
              <IconLabelValue label="Listed On" value={data?.listingDate} />
            </div>
          </div>
          <div className="mt-4 px-4 w-full">
            <ViewReport data={data} defaultOpen={false} />
          </div>
          {data?.verified && (
            <div className="mt-4 px-4 w-full">
              <ViewReport1 data={data} defaultOpen={false} />
            </div>
          )}
          <Fragment>
            {data?.status.toUpperCase() === "ACTIVE" ? (
              data?.verified ? (
                <div className="p-4">
                  <YellowButton onClick={() => setOpenPauseListing(true)}>
                    {" "}
                    Pause Listing{" "}
                  </YellowButton>
                  <PrimayButton onClick={() => setOpenVerifyListing(true)}>
                    {" "}
                    re-verify{" "}
                  </PrimayButton>
                  <RedButton onClick={handleDelete}> Delete </RedButton>
                </div>
              ) : (
                <div className="p-4">
                  <YellowButton onClick={() => setOpenPauseListing(true)}>
                    {" "}
                    Pause Listing{" "}
                  </YellowButton>
                  <PrimayButton onClick={() => setOpenVerifyListing(true)}>
                    {" "}
                    Verify Now{" "}
                  </PrimayButton>
                  <RedButton onClick={handleDelete}> Delete </RedButton>
                </div>
              )
            ) : data?.status.toUpperCase() !== "ACTIVE" && data?.verified ? (
              <div className="p-4">
                <YellowButton onClick={handleActivate}>
                  {" "}
                  Activate Now{" "}
                </YellowButton>
                <PrimayButton
                  onClick={() => setOpenVerifyListing(true)}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  re-verify
                </PrimayButton>
                <RedButton onClick={handleDelete}> Delete </RedButton>
              </div>
            ) : (
              <div className="p-4">
                <YellowButton onClick={handleActivate}>
                  {" "}
                  Activate Now{" "}
                </YellowButton>
                <PrimayButton
                  onClick={() => setOpenVerifyListing(true)}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  Verify Now
                </PrimayButton>
                <RedButton onClick={handleDelete}> Delete </RedButton>
              </div>
            )}
          </Fragment>
        </section>
      </main>
      <Footer />
      {openVerifyListing && (
        <VerifyFlowPopup
          open={openVerifyListing}
          setOpen={setOpenVerifyListing}
        />
      )}
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
      {openPauseListing && (
        <PauseListing
          open={openPauseListing}
          setOpen={setOpenPauseListing}
          listingId={id}
        />
      )}
      {openActivateListing && (
        <ListingActivated
          open={openActivateListing}
          setOpen={setOpenActivateListing}
          reason={reason}
          setReason={setReason}
        />
      )}
      {openDeleteListing && (
        <ListingDeleted
          open={openDeleteListing}
          setOpen={setOpenDeleteListing}
          data={data}
        />
      )}
    </Fragment>
  );
}

export default ListingDeatils;

export async function getServerSideProps({ req, res, query }) {
  const { cookies } = req;
  if (cookies.userUniqueId === null || cookies.userUniqueId === undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return await getListingDetails(
    query.id,
    cookies.userUniqueId,
    cookies.sessionId
  ).then(
    (res) => {
      return {
        props: { data: res?.dataObject, id: query.id },
      };
    },
    (err) => {
      return {
        redirect: {
          destination: "/user/listings",
          permanent: false,
        },
      };
    }
  );
}

const YellowButton = ({ className, children, ...rest }) => (
  <button
    className={`p-2 mb-4 text-yellow-fb border border-yellow-fb w-full rounded uppercase ${
      className || ""
    }`}
    {...rest}
  >
    {children}
  </button>
);

const RedButton = ({ className, children, ...rest }) => (
  <button
    className={`p-2 mb-4 text-red border border-red w-full rounded uppercase ${
      className || ""
    }`}
    {...rest}
  >
    {children}
  </button>
);

const PrimayButton = ({ className, children, ...rest }) => (
  <button
    className={`p-2 mb-4 text-primary border border-primary w-full rounded uppercase ${
      className || ""
    }`}
    {...rest}
  >
    {children}
  </button>
);

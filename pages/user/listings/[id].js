import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import Header2 from "@/components/Header/header2";
import ImageSlider from "@/components/ImageSlider";
import star from "@/assets/star.svg";
import edit from "@/assets/edit.svg";

import { BsInfoCircle } from "react-icons/bs";
import { activateListing, deleteListing, getListingDetails } from "api-call";
import IconLabelValue from "@/components/IconLabelValue";
import { getAccessoriesText, numberWithCommas } from "@/utils/util";
import Cookies from "js-cookie";
import VerifyFlowPopup from "@/components/Popup/VerifyFlowPopup";
import Footer from "@/components/Footer";

const PauseListing = dynamic(() => import("@/components/Popup/PauseListing"));
const ConditionInfo = dynamic(() => import("@/components/Popup/ConditionInfo"));
const VerificationInfo = dynamic(() => import("@/components/Popup/VerificationInfo"));
const ListingDeleted = dynamic(() => import("@/components/Popup/ListingDeleted"));
const ListingActivated = dynamic(() => import("@/components/Popup/ListingActivated"));
const ViewReport = dynamic(() => import("@/components/ViewReport"));

function ListingDeatils({ data, id }) {
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
  const [openPauseListing, setOpenPauseListing] = useState(false);
  const [openDeleteListing, setOpenDeleteListing] = useState(false);
  const [openVerifyListing, setOpenVerifyListing] = useState(false);
  const [openActivateListing, setOpenActivateListing] = useState(false);
  console.log(data);

  const handleDelete = (e) => {
    e.preventDefault();
    setOpenDeleteListing(true);
  };

  const handleActivate = (e) => {
    e.preventDefault();
    let payLoad = {
      listingId: id,
      userUniqueId: Cookies.get("info"),
    };
    activateListing(payLoad).then(
      () => {
        setOpenActivateListing(true);
      },
      (err) => console.error(err)
    );
  };

  return (
    <Fragment>
      <Header2 title="Listing Info">
        <Link href={`/sell/edit/${id}`}>
          <a>
            <Image src={edit} width={26} height={21} />
          </a>
        </Link>
      </Header2>
      <main className="my-4">
        <div className="px-4">
          <ImageSlider images={(data?.images?.length && data?.images) || (data?.defaultImage && [
                { fullImage: data?.defaultImage?.fullImage },
              ])} />
        </div>
        <section className="my-4">
          <div className="px-4 mb-4">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-20 font-bold text-lg">{data?.marketingName}​</h1>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 21 21">
                <path
                  id="chart"
                  d="M18.649,0a2.268,2.268,0,0,1,1.668.684A2.272,2.272,0,0,1,21,2.351v16.3A2.334,2.334,0,0,1,18.649,21H2.351a2.268,2.268,0,0,1-1.668-.684A2.272,2.272,0,0,1,0,18.649V2.351A2.268,2.268,0,0,1,.684.684,2.272,2.272,0,0,1,2.351,0ZM7,16.351v-8.2H4.649v8.2H7Zm4.649,0V4.649h-2.3v11.7h2.3Zm4.7,0v-4.7H14v4.7Z"
                  fill="#4e4e4e"
                />
              </svg>
            </div>
            <div className="flex items-center border rounded-md my-3">
              <div className="bg-gray-ef flex-1 px-4 py-2 ">
                <p className="text-gray-70 text-sm">List Price</p>
                <span className="text-2xl font-bold">₹ {numberWithCommas(data?.listingPrice)}</span>
              </div>
              <div className="flex-1 flex justify-around px-4 py-2">
                <Image src={star} width={31} height={29} />
                <div className="ml-1">
                  <span className="text-xs text-black-7e flex items-center">
                    Condition <BsInfoCircle className="ml-2 text-sm cursor-pointer" onClick={() => setOpenConditionInfo(true)} />
                  </span>
                  <p className="text-sm font-bold text-gray-70 flex items-center">{data?.deviceCondition}</p>
                </div>
              </div>
            </div>
            <h2 className="text-gray-20 font-semibold my-3">Device Info</h2>
            <div className="grid grid-cols-2 space-y-2">
              <IconLabelValue label="storage" value={data?.deviceStorage} />
              {data?.verified && (
                <IconLabelValue label="verified on" value={data?.verifiedDate} showInfoPopup={() => setOpenVerificationInfo(true)} />
              )}
              <IconLabelValue label="color" value={data?.color || ""} />
              <IconLabelValue label="warranty" value={data?.warranty || "--"} />
              <IconLabelValue label="Accessories" value={getAccessoriesText(data)} />
              <IconLabelValue label="Listed On" value={data?.listingDate} />
            </div>
          </div>
          <div className="mt-4 w-full">
            <ViewReport data={data} defaultOpen={false} />
          </div>
          <Fragment>
            {data?.status.toUpperCase() === "ACTIVE" ? (
              data?.verified ? (
                <div className="p-4">
                  <YellowButton onClick={() => setOpenPauseListing(true)}> Pause Listing </YellowButton>
                  <PrimayButton onClick={() => setOpenVerifyListing(true)}> re-verify </PrimayButton>
                  <RedButton onClick={handleDelete}> Delete </RedButton>
                </div>
              ) : (
                <div className="p-4">
                  <YellowButton onClick={() => setOpenPauseListing(true)}> Pause Listing </YellowButton>
                  <PrimayButton onClick={() => setOpenVerifyListing(true)}> Verify Now </PrimayButton>
                  <RedButton onClick={handleDelete}> Delete </RedButton>
                </div>
              )
            ) : data?.status.toUpperCase() !== "ACTIVE" && data?.verified ? (
              <div className="p-4">
                <YellowButton onClick={handleActivate}> Activate Now </YellowButton>
                <PrimayButton onClick={() => setOpenVerifyListing(true)} className="disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  re-verify
                </PrimayButton>
                <RedButton onClick={handleDelete}> Delete </RedButton>
              </div>
            ) : (
              <div className="p-4">
                <YellowButton onClick={handleActivate}> Activate Now </YellowButton>
                <PrimayButton onClick={() => setOpenVerifyListing(true)} className="disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  Verify Now
                </PrimayButton>
                <RedButton onClick={handleDelete}> Delete </RedButton>
              </div>
            )}
          </Fragment>
        </section>
      </main>
      <Footer />
      {openVerifyListing && <VerifyFlowPopup open={openVerifyListing} setOpen={setOpenVerifyListing} />}
      {openConditionInfo && <ConditionInfo open={openConditionInfo} setOpen={setOpenConditionInfo} />}
      {openVerificationInfo && <VerificationInfo open={openVerificationInfo} setOpen={setOpenVerificationInfo} />}
      {openPauseListing && <PauseListing open={openPauseListing} setOpen={setOpenPauseListing} listingId={id} />}
      {openActivateListing && <ListingActivated open={openActivateListing} setOpen={setOpenActivateListing} />}
      {openDeleteListing && <ListingDeleted open={openDeleteListing} setOpen={setOpenDeleteListing} data={data} />}
    </Fragment>
  );
}

export default ListingDeatils;

export async function getServerSideProps({ req, res, query }) {
  const { cookies } = req;
  if (cookies.info === null || cookies.info === undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return await getListingDetails(query.id, cookies.info).then(
    (res) => {
      return {
        props: { data: res?.dataObject, id: query.id },
      };
    },
    (err) => {
      console.error(err);
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
  <button className={`p-2 mb-4 text-yellow-fb border border-yellow-fb w-full rounded uppercase ${className || ""}`} {...rest}>
    {children}
  </button>
);

const RedButton = ({ className, children, ...rest }) => (
  <button className={`p-2 mb-4 text-red border border-red w-full rounded uppercase ${className || ""}`} {...rest}>
    {children}
  </button>
);

const PrimayButton = ({ className, children, ...rest }) => (
  <button className={`p-2 mb-4 text-primary border border-primary w-full rounded uppercase ${className || ""}`} {...rest}>
    {children}
  </button>
);

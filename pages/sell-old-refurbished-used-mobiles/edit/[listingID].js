import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import EditListingForm from "@/components/Form/EditListingForm";
import { getListingDetails, getMakeModelLists } from "api-call";
import Footer from "@/components/Footer";
import BuySellGuide from "@/components/BuySellGuide";
import Loader from "@/components/Loader/Loader";
import ArrowLeft from "@/assets/leftarrow.svg";
import { useRouter } from "next/router";

function editListing({ data, resultsSet }) {
  const router = useRouter();
  return (
    <Fragment>
      <header
        className={`w-full z-50 flex p-4 h-[45px] bg-[#2C2F45] rounded-b-[10px] text-white items-center  font-Roboto-Regular text-dx relative`}
      >
        <Image
          src={ArrowLeft}
          width={20}
          height={20}
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer"
        />
        <h1 className="absolute pl-2  left-10 right-10 font-Roboto-Regular text-dx ">
          {" "}
          Edit Listing
        </h1>
      </header>
      <main className="container mb-4">
        {data ? <EditListingForm data={data} /> : <Loader />}
        <BuySellGuide />
      </main>
      <Footer />
    </Fragment>
  );
}
export async function getServerSideProps({ req, res, query }) {
  const { userUniqueId, sessionId, make_models } = req.cookies;
  try {
    const data = await getListingDetails(
      query.listingID,
      userUniqueId || "Guest",
      sessionId || "Guest"
    );

    return {
      props: { data: data?.dataObject },
    };
  } catch {
    return {
      props: { data: [] },
    };
  }
}
export default editListing;

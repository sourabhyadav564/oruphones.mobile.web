import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import EditListingForm from "@/components/Form/EditListingForm";
import { getListingDetails, getMakeModelLists } from "api-call";
import Footer from "@/components/Footer";
import BuySellGuide from "@/components/BuySellGuide";
import Loader from "@/components/Loader/Loader";
import ArrowLeft from "@/assets/leftarrow.svg";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function EditListing({ data, resultsSet }) {
  const router = useRouter();
  const [data2, setData2] = useState();
  useEffect(async () => {
    if (router.query.listingID) {
      await getListingDetails(
        router.query.listingID,
        Cookies.get("userUniqueId") || "Guest",
        Cookies.get("sessionId") || ""
      ).then((res) => {
        setData2(res?.dataObject);
      });
    }
  }, [router.query.listingID]);

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
        {data2 ? (
          <EditListingForm data={data2} />
        ) : (
          <div className="flex justify-center items-center flex-col pt-6">
            <Loader />
            <div className="text-center font-Roboto-Regular">
              Please wait, while we are fetching data for you...{" "}
            </div>
          </div>
        )}
        <BuySellGuide />
      </main>
      <Footer />
    </Fragment>
  );
}
export default EditListing;

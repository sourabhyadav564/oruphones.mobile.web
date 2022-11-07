import Image from "next/image";
import Header5 from "@/components/Header/header5";
import { Fragment, useEffect, useState } from "react";
import EditListingForm from "@/components/Form/EditListingForm";
import sellDeviceBanner from "@/assets/sell_device_banner.png";
import { getListingDetails, getMakeModelLists } from "api-call";
import Footer from "@/components/Footer";
import BuySellGuide from "@/components/BuySellGuide";
import Cookies from "js-cookie";
import Loader from "@/components/Loader/Loader";

function editListing({ data, resultsSet }) {
  // const [resultSet, setResultSet] = useState([]);

  const [makeAndModels, setMakeAndModels] = useState([]);

  useEffect(() => {
    if (resultsSet.length === 0) {
      console.log("first");
      setMakeAndModels(JSON.parse(localStorage.getItem("make_models")));
    } else {
      console.log("second");
      localStorage.setItem("make_models", JSON.stringify(resultsSet));
      Cookies.set("make_models", true);
      setMakeAndModels(resultsSet);
    }
  }, []);

  console.log("makeAndModels", makeAndModels);
  return (
    <Fragment>
      {/* <Header5 title={"Edit Listing"} /> */}
      <header className={`w-full z-50 flex p-4 h-[45px] bg-[#2C2F45] rounded-b-[10px] absolute text-white items-center  font-Roboto-Regular text-dx`}>
        <BsArrowLeft
          onClick={() => {
            router.back()
          }}
          className="cursor-pointer" fontSize="20" />
        <span className="absolute pl-2  left-10 right-10 font-Roboto-Regular text-dx "> Edit Listing</span>
      </header>
      <main className="container mt-16 mb-4">
        {/* <div className="flex justify-center">
          <Image
            src={sellDeviceBanner}
            alt={"Sell device banner"}
            width={720}
            height={296}
          />
        </div> */}
        {/* <EditListingForm data={data} resultsSet={resultsSet} /> */}
        {makeAndModels?.length ? (
          <EditListingForm data={data} resultsSet={makeAndModels} />
        ) : (
          <Loader />
        )}
        <BuySellGuide />
      </main>
      <Footer />
    </Fragment>
  );
}
export async function getServerSideProps({ req, res, query }) {
  const { userUniqueId, sessionId, make_models } = req.cookies;
  console.log("make_models", make_models);
  try {
    const data = await getListingDetails(
      query.listingID,
      userUniqueId || "Guest",
      sessionId || "Guest"
    );

    // const result = await getMakeModelLists(
    //   userUniqueId || "Guest",
    //   sessionId || ""
    // );

    let result;
    if (make_models) {
      console.log("found");
      result = [];
    } else {
      console.log("not found");
      const data = await getMakeModelLists(
        userUniqueId || "Guest",
        sessionId || ""
      );
      result = data?.dataObject;
    }

    console.log("data", data);
    console.log("result", result);

    return {
      // props: { data: data?.dataObject, resultsSet: result?.dataObject },
      props: { data: data?.dataObject, resultsSet: result },
    };
  } catch {
    return {
      props: { data: [], resultsSet: [] },
    };
  }
}
export default editListing;

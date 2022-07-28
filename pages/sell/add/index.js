import Image from "next/image";
import Header2 from "@/components/Header/header2";
import { Fragment, useEffect, useState } from "react";
import sellDeviceBanner from "@/assets/sell_device_banner.png";
import AddListingForm from "@/components/Form/AddListing";
import { getMakeModelLists } from "api-call";
import Footer from "@/components/Footer";
import BuySellGuide from "@/components/BuySellGuide";
import Loader from "@/components/Loader/Loader";
import Cookies from "js-cookie";

const index = ({ data }) => {
// const index = () => {
  // const [makeModelLists, setMakeModelLists] = useState([]);

  // useEffect(async () => {
  //   const getMakeModel = async () => {
  //     const result = await getMakeModelLists(
  //       Cookies.get("userUniqueId") || "Guest",
  //       Cookies.get("sessionId") || ""
  //     );
  //     return result;
  //   };
  //   const result = await getMakeModel();
  //   setMakeModelLists(result?.dataObject);
  // }, []);

  const [makeAndModels, setMakeAndModels] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      setMakeAndModels(JSON.parse(localStorage.getItem("make_models")));
    } else {
      localStorage.setItem("make_models", JSON.stringify(data));
      Cookies.set("make_models", true);
      setMakeAndModels(data);
    }
  }, []);

  return (
    <Fragment>
      <Header2 title={"Sell Your Phone"} />
      <main className="container my-4">
        <div className="flex justify-center">
          <Image
            src={sellDeviceBanner}
            alt={"Sell device banner"}
            width={720}
            height={296}
          />
        </div>
        {/* {makeModelLists?.length ? (
          <AddListingForm data={makeModelLists} />
        ) : (
          <Loader />
        )} */}
        {makeAndModels?.length ? (
          <AddListingForm data={makeAndModels} />
        ) : (
          <Loader />
        )}
        <BuySellGuide />
      </main>
      <Footer />
    </Fragment>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const { userUniqueId, sessionId, make_models } = req.cookies;

  try {
    let data;
    // const result = await getMakeModelLists();
    // const data = result?.dataObject;
    if (make_models) {
      data = [];
    } else {
      const result = await getMakeModelLists(
        userUniqueId || "Guest",
        sessionId || ""
      );
      data = result?.dataObject;
    }
    return {
      props: { data },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

export default index;

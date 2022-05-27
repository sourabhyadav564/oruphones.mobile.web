import Image from "next/image";
import Header2 from "@/components/Header/header2";
import { Fragment } from "react";
import EditListingForm from "@/components/Form/EditListingForm";
import sellDeviceBanner from "@/assets/sell_device_banner.png";
import { getListingDetails, getMakeModelLists } from "api-call";
import Footer from "@/components/Footer";
import BuySellGuide from "@/components/BuySellGuide";

function editListing({ data, resultsSet }) {
  // console.log(data);
  return (
    <Fragment>
      <Header2 title={"Edit Listing"} />
      <main className="container my-4">
        <div className="flex justify-center">
          <Image src={sellDeviceBanner} alt={"Sell device banner"} width={720} height={296} />
        </div>
        <EditListingForm data={data} resultsSet={resultsSet} />
        <BuySellGuide />
      </main>
      <Footer />
    </Fragment>
  );
}
export async function getServerSideProps({ req, res, query }) {
  const { cookies } = req;
  try {
    const data = await getListingDetails(query.listingID, cookies.info);
    const result = await getMakeModelLists();
    return {
      props: { data: data.dataObject, resultsSet: result?.dataObject },
    };
  } catch {
    return {
      props: { data: [], resultsSet: [] },
    };
  }
}
export default editListing;

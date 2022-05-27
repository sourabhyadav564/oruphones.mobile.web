import Header2 from "@/components/Header/header2";
import { Fragment } from "react";
import BrandCard from "@/components/Card/BrandCard";
import { fetchBrands } from "api-call";
import Footer from "@/components/Footer";

function Brands({ brandsList }) {
  brandsList = brandsList?.sort((list1, list2) => list2.isPopular - list1.isPopular);
  brandsList = brandsList?.sort((list1, list2) => parseInt(list1.displayOrder) - parseInt(list2.displayOrder));
  return (
    <Fragment>
      {/* <Header2 title="Brands" /> */}
      <main className="text-sm grid grid-cols-3 sm:grid-cols-5">
        {brandsList &&
          brandsList.map((item, index) => (
            <div key={index} className="bg-green-700 border-2 border-gray-100">
              <BrandCard data={item} className="rounded-none border-0 bg-white" />
            </div>
          ))}
      </main>
      <Footer />
    </Fragment>
  );
}

export default Brands;

export const getServerSideProps = async () => {
  const brandsList = await fetchBrands();
  return {
    props: {
      brandsList: brandsList?.dataObject || [],
    },
  };
};

import Header2 from "@/components/Header/header2";
import { Fragment, useEffect, useState } from "react";
import BrandCard from "@/components/Card/BrandCard";
import { fetchBrands } from "api-call";
import Footer from "@/components/Footer";
import Head from "next/head";
import { metaTags } from "@/utils/constant";

function Brands({ brandsList }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (brandsList.length === 0) {
      setBrands(JSON.parse(localStorage.getItem("brands")));
    } else {
      localStorage.setItem("brands", JSON.stringify(brandsList));
      Cookies.set("brands", true);
      setBrands(brandsList);
    }
  }, []);

  // brandsList = brandsList?.sort((list1, list2) => list2.isPopular - list1.isPopular);
  // brandsList = brandsList?.sort((list1, list2) => parseInt(list1.displayOrder) - parseInt(list2.displayOrder));

  // brandsList = brands.sort((list1, list2) => list2.isPopular - list1.isPopular);
  // brandsList = brands.sort(
  //   (list1, list2) =>
  //     parseInt(list1.displayOrder) - parseInt(list2.displayOrder)
  // );


  return (
    <>
      <Head>
        <title>{metaTags.BRANDS.title}</title>
        <meta name="description" content={metaTags.BRANDS.description} />
        <meta property="og:title" content={metaTags.BRANDS.title} />
        <meta property="og:description" content={metaTags.BRANDS.description} />
      </Head>
      <Fragment>
        {/* <Header2 title="Brands" /> */}
        <main className="text-sm grid grid-cols-3 sm:grid-cols-5">
          {brandsList &&
            brandsList.map((item, index) => (
              <div
                key={index}
                className="bg-green-700 border-2 border-gray-100"
              >
                <BrandCard
                  data={item}
                  className="rounded-none border-0 bg-white"
                />
              </div>
            ))}
        </main>
        <Footer />
      </Fragment>
    </>
  );
}

export default Brands;

export const getServerSideProps = async ({ req, res, query }) => {
  const { brands } = req.cookies;

  let brandsList;
  if (brands) {
    brandsList = [];
  } else {
    const data = await fetchBrands();
    brandsList = data?.dataObject;
  }

  // const brandsList = await fetchBrands(userUniqueId || "Guest",
  // sessionId || "");
  return {
    props: {
      // brandsList: brandsList?.dataObject || [],
      brandsList: brandsList || [],
    },
  };
};

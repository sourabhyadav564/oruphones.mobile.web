import { Fragment, useEffect, useState } from "react";
import BrandCard from "@/components/Card/BrandCard";
import Footer from "@/components/Footer";
import Head from "next/head";
import { metaTags } from "@/utils/constant";
import * as Axios from "../api-call/index";
import BottomNav from "@/components/Navigation/BottomNav";
import Header1 from "@/components/Header/header1";
import Cookies from "js-cookie";

function Brands() {
  let brandsList = [];
  if (!Cookies.get("brands")) {
    Axios.fetchBrands(Cookies.get("sessionId")).then((res) => {
      brandsList = res?.dataObject;
      localStorage.setItem("brands", JSON.stringify(brandsList));
      Cookies.set("brands", true);
    });
  } else {
    brandsList = JSON.parse(localStorage.getItem("brands"));
  }
  brandsList = brandsList.sort(
    (list1, list2) => (list2.isPopular = list1.isPopular)
  );

  brandsList = brandsList.sort(
    (list1, list2) =>
      parseInt(list1.displayOrder) - parseInt(list2.displayOrder)
  );

  return (
    <>
      <Head>
        <title>{metaTags.BRANDS.title}</title>
        <meta name="description" content={metaTags.BRANDS.description} />
        <meta property="og:title" content={metaTags.BRANDS.title} />
        <meta property="og:description" content={metaTags.BRANDS.description} />
      </Head>
      <Fragment>
        <Header1 />
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
        <BottomNav />
      </Fragment>
    </>
  );
}

export default Brands;

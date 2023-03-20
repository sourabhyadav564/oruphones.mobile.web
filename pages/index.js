import { Fragment, useEffect, useState } from "react";
import Header1 from "@/components/Header/header1";
import BottomNav from "@/components/Navigation/BottomNav";
import TopBrand from "@/components/Home/TopBrand";
import TopCarousel from "@/components/Home/TopCarousel";
import TopDealNearBy from "@/components/Home/TopDealNearBy";

import {
  fetchBrands,
  fetchTopsellingmodels,
  getMakeModelLists,
  getSessionId,
  shopByPrice,
  fetchTopArticles,
} from "api-call";
import HomeContent from "@/components/Home/HomeContent";
import Footer from "@/components/Footer";
import { useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";
import Head from "next/head";
import { metaTags } from "@/utils/constant";
import ShopBy from "@/components/Home/ShopBy";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const [brands, setBrands] = useState([]);

  useEffect(async () => {
    if (Cookies.get("sessionId") == undefined) {
      getSessionId().then((res) => {
        if (res) {
          Cookies.set("sessionId", res?.dataObject?.sessionId);
          localStorage.setItem("sessionId", res?.dataObject?.sessionId);
        }
      });
    }

    let make_models = true;
    let brandsData = true;
    let data = [];
    let brandsList;
    if (localStorage.getItem("brands") != undefined) {
      brandsList = JSON.parse(localStorage.getItem("brands"));
    } else {
      data = await fetchBrands();
      brandsList = data?.dataObject;
    }
    setBrands(brandsList);

    if (!localStorage.getItem("shopByModel")) {
      let topsellingmodels;
      let shopByModel = [];
      data = await fetchTopsellingmodels();
      topsellingmodels = data?.dataObject;
      shopByModel = data?.allModels;
      if (shopByModel?.length > 0) {
        localStorage.setItem("shopByModel", JSON.stringify(data?.allModels));
      }
      if (topsellingmodels?.length > 0) {
        localStorage.setItem(
          "topsellingmodels",
          JSON.stringify(topsellingmodels)
        );
      }
    }

    if (
      !localStorage.getItem("make_models") ||
      localStorage.getItem("make_models").toString() == "undefined"
    ) {
      make_models = false;
    }
    if (
      !localStorage.getItem("brands") ||
      localStorage.getItem("brands").toString() == "undefined" ||
      localStorage.getItem("brands").toString() == "null" ||
      localStorage.getItem("brands").toString() == "[]"
    ) {
      brandsData = false;
    }

    if (
      !Cookies.get("userUniqueId") ||
      Cookies.get("userUniqueId") == undefined
    ) {
      localStorage.removeItem("listings");
      localStorage.removeItem("favoriteList");
    }

    if (brandsData) {
      setBrands(JSON.parse(localStorage.getItem("brands")));
    } else {
      const data = await fetchBrands(
        Cookies.get("userUniqueId") || "Guest",
        Cookies.get("sessionId")
      );
      if (data) {
        let brandsList = data?.dataObject;
        setBrands(brandsList);
        localStorage.setItem("brands", JSON.stringify(brandsList));
        Cookies.set("brands", true);
      }
    }
  }, []);

  const { selectedSearchCity, loading } = useAuthState();
  return (
    <>
      <Head>
        <title>{metaTags.HOME.title}</title>
        <meta name="description" content={metaTags.HOME.description} />
        <meta property="og:title" content={metaTags.HOME.title} />
        <meta property="og:description" content={metaTags.HOME.description} />
      </Head>

      <Fragment>
        <Header1 />
        <main>
          <TopBrand brandsList={brands} />
          <TopCarousel />
          <ShopBy />
          <TopDealNearBy
            selectedSearchCity={selectedSearchCity}
            loading={loading}
          />
          <HomeContent />
        </main>
        <Footer />
        <BottomNav />
      </Fragment>
    </>
  );
}

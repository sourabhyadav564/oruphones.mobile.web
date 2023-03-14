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



export default function Home({
  brandsList,
  topSellingModels,
  sessionId,
  shopByModel,
  fetchTopArticles,
}) {

  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);
  const [shopByModel2, setShopByModel2] = useState([]);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const [brands, setBrands] = useState([]);

  useEffect(async () => {
    let make_models = true;
    let brandsData = true;

    let sessionID;
    let data = [];
    const session = await getSessionId();
    sessionID = session?.dataObject?.sessionId;
    Cookies.set("sessionId", sessionId);
    localStorage.setItem("sessionId", sessionId);

    let brandsList;
    if (localStorage.getItem("brands") != undefined) {
      brandsList = JSON.parse(localStorage.getItem("brands"));
    } else {
      data = await fetchBrands();
      brandsList = data?.dataObject;
    }
    setBrands(brandsList);

    let topsellingmodels;
    let shopByModel = [];
    data = await fetchTopsellingmodels();
    topsellingmodels = data?.dataObject;
    shopByModel = data?.allModels;

    if (!localStorage.getItem("make_models") || localStorage.getItem("make_models").toString() == "undefined") {
      make_models = false;
    }
    if (!localStorage.getItem("brands") || localStorage.getItem("brands").toString() == "undefined" || localStorage.getItem("brands").toString() == "null" || localStorage.getItem("brands").toString() == "[]") {
      brandsData = false;
    }

    if (!Cookies.get("userUniqueId") || Cookies.get("userUniqueId") == undefined) {
      localStorage.removeItem("listings");
      localStorage.removeItem("favoriteList");
    }

    if (shopByModel2.length > 0) {
      localStorage.setItem("shopByModel", JSON.stringify(shopByModel2));
    }
    if (brandsData) {
      setBrands(JSON.parse(localStorage.getItem("brands")));
    } else {
      const data = await fetchBrands(
        Cookies.get("userUniqueId") || "Guest",
        Cookies.get("sessionId") != undefined ? Cookies.get("sessionId") : localStorage.getItem("sessionId") != undefined ? localStorage.getItem("sessionId") : ""
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

export const getServerSideProps = async ({ req, res, query }) => {
    return {
    props: {
    },
  };
};

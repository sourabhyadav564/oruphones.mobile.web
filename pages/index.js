import { Fragment, useEffect, useState } from "react";
import Header1 from "@/components/Header/header1";
import BottomNav from "@/components/Navigation/BottomNav";
import TopBrand from "@/components/Home/TopBrand";
import TopCarousel from "@/components/Home/TopCarousel";
import TopSellingMobiles from "@/components/Home/TopSellingMobiles";
import TopDealNearBy from "@/components/Home/TopDealNearBy";
import ShopByPrice from "@/components/Home/ShopByPrice";
import {
  fetchBrands,
  fetchTopsellingmodels,
  getMakeModelLists,
  getSessionId,
  shopByPrice,
  fetchTopArticles,
} from "api-call";
import HomeContent from "@/components/Home/HomeContent";
import TopArticles from "@/components/Home/TopArticles";
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
  // fetchShopByPrice,
  sessionId,
  fetchTopArticles,
}) {

  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const [brands, setBrands] = useState([]);
  const [topsellingmodels, setTopsellingmodels] = useState([]);
  const [topArticles, setTopArticles] = useState([]);

  useEffect(async () => {
    Cookies.set("sessionId", sessionId);
    localStorage.setItem("sessionId", sessionId);

    const make_models = Cookies.get("make_models");

    if (brandsList.length === 0) {
      setBrands(JSON.parse(localStorage.getItem("brands")));
    } else {
      localStorage.setItem("brands", JSON.stringify(brandsList));
      Cookies.set("brands", true);
      setBrands(brandsList);
    }
    if (topSellingModels.length === 0) {
      setTopsellingmodels(JSON.parse(localStorage.getItem("top_models")));
    } else {
      localStorage.setItem("top_models", JSON.stringify(topSellingModels));
      Cookies.set("top_models", true);
      setTopsellingmodels(topSellingModels);
    }

    // if (fetchTopArticles.length === 0) {
    //   setTopArticles(JSON.parse(localStorage.getItem("top_articles")));
    // } else {
    //   localStorage.setItem("top_articles", JSON.stringify(fetchTopArticles));
    //   Cookies.set("top_articles", true);
    //   setTopArticles(fetchTopArticles);
    // }

    if (make_models) {
      // setBrands(JSON.parse(localStorage.getItem("make_models")));
      console.log("makeModelLists from local");
    } else {
      const data = await getMakeModelLists(
        Cookies.get("userUniqueId") || "Guest",
        Cookies.get("sessionId") != undefined ? Cookies.get("sessionId") : localStorage.getItem("sessionId") != undefined ? localStorage.getItem("sessionId") : ""
      );
      if (data) {
        let makeModelLists = data?.dataObject;
        localStorage.setItem("make_models", JSON.stringify(makeModelLists));
        Cookies.set("make_models", true);
        //   // setBrands(brandsList);
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
        {/* <meta name="Googlebot" content="noindex"></meta> */}
      </Head>
      
      <Fragment>
        
        <Header1 />     {/* this is search bar element */}
        <main>
          <TopBrand brandsList={brands} />
          <TopCarousel />
          {/* <TopBrand brandsList={brandsList} />
        <TopSellingMobiles topSellingModels={topSellingModels} /> */}

          {/* <TopSellingMobiles topSellingModels={topsellingmodels} /> */}
          <ShopBy />
          <TopDealNearBy
            selectedSearchCity={selectedSearchCity}
            loading={loading}
          />
          {/* <ShopByPrice fetchShopByPrice={fetchShopByPrice} /> */}
          {/* <TopArticles articles={topArticles} /> */}
          <HomeContent />
        </main>
        <Footer />
        <BottomNav />
      </Fragment>
    </>
  );
}

export const getServerSideProps = async ({ req, res, query }) => {
  const {
    userUniqueId,
    sessionId,
    brands,
    top_models,
    make_models,
    top_articles,
  } = req.cookies;

  // try {
  //   fetchShopByPrice = await shopByPrice();
  //   // console.log("fetchShopByPrice", fetchShopByPrice);
  // } catch (err) {
  //   fetchShopByPrice = [];
  //   console.log("fetchShopByPrice error", err);
  // }

  let sessionID;
  if (sessionId) {
    sessionID = sessionId;
  } else {
    const session = await getSessionId();
    sessionID = session?.dataObject?.sessionId;
  }

  let brandsList;
  if (brands) {
    brandsList = [];
  } else {
    const data = await fetchBrands();
    brandsList = data?.dataObject;
  }

  let topsellingmodels;
  if (top_models) {
    topsellingmodels = [];
  } else {
    const data = await fetchTopsellingmodels();
    topsellingmodels = data?.dataObject;
  }

  // let topArticles;
  // if (top_articles) {
  //   topArticles = [];
  // } else {
  //   const data = await fetchTopArticles();
  //   topArticles = data?.dataObject;
  // }

  // return {
  //   props: {
  //     brandsList: brandsList?.dataObject || null,
  //     topSellingModels: topsellingmodels?.dataObject || [],
  //     // fetchShopByPrice: fetchShopByPrice?.dataObject || [],
  //     sessionId: sessionID,
  //   },
  // };

  return {
    props: {
      brandsList: brandsList || [],
      topSellingModels: topsellingmodels || [],
      // fetchShopByPrice: fetchShopByPrice?.dataObject || [],
      sessionId: sessionID,
      // fetchTopArticles: topArticles || [],
    },
  };
};

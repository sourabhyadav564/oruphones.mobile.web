import { Fragment } from "react";
import Header1 from "@/components/Header/header1";
import BottomNav from "@/components/Navigation/BottomNav";
import TopBrand from "@/components/Home/TopBrand";
import TopCarousel from "@/components/Home/TopCarousel";
import TopSellingMobiles from "@/components/Home/TopSellingMobiles";
import TopDealNearBy from "@/components/Home/TopDealNearBy";
import ShopByPrice from "@/components/Home/ShopByPrice";
import { fetchBrands, fetchTopsellingmodels, shopByPrice } from "api-call";
import HomeContent from "@/components/Home/HomeContent";
import TopArticles from "@/components/Home/TopArticles";
import Footer from "@/components/Footer";
import { useAuthState } from "providers/AuthProvider";

export default function Home({
  brandsList,
  topSellingModels,
  // fetchShopByPrice,
}) {
  const { selectedSearchCity, loading } = useAuthState();
  return (
    <Fragment>
      <Header1 />
      <main>
        <TopCarousel />
        <TopBrand brandsList={brandsList} />
        {topSellingModels && (
          <TopSellingMobiles topSellingModels={topSellingModels} />
        )}
        <TopDealNearBy
          selectedSearchCity={selectedSearchCity}
          loading={loading}
        />
        {/* <ShopByPrice fetchShopByPrice={fetchShopByPrice} /> */}
        <TopArticles />
        <HomeContent />
      </main>
      <Footer />
      <BottomNav />
    </Fragment>
  );
}

export const getServerSideProps = async () => {
  let topsellingmodels, brandsList, fetchShopByPrice;
  try {
    brandsList = await fetchBrands();
    // console.log("brandsList", brandsList);
  } catch (err) {
    brandsList = [];
    console.log("fetchBrands error", err);
  }
  try {
    topsellingmodels = await fetchTopsellingmodels();
    // console.log("topsellingmodels", topsellingmodels);
  } catch (err) {
    topsellingmodels = [];
    console.log("fetchTopsellingmodels error", err);
  }

  // try {
  //   fetchShopByPrice = await shopByPrice();
  //   // console.log("fetchShopByPrice", fetchShopByPrice);
  // } catch (err) {
  //   fetchShopByPrice = [];
  //   console.log("fetchShopByPrice error", err);
  // }

  return {
    props: {
      brandsList: brandsList?.dataObject || null,
      topSellingModels: topsellingmodels?.dataObject || [],
      // fetchShopByPrice: fetchShopByPrice?.dataObject || [],
    },
  };
};

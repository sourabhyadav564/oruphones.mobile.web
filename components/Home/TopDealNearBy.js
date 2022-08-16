import React, { useEffect, useState } from "react";
import NearByDealCard from "../Card/NearByDealCard";
import { bestDealNearByYou } from "api-call";
import Cookies from "js-cookie";
import Loader from "../Loader/Loader";
import Spinner from "../Loader/Spinner";
import { FaMapMarkerAlt } from "react-icons/fa";
import LocationPopup from "../Popup/LocationPopup";
import { useRouter } from "next/router";
import LoadingStatePopup from "../Popup/LoadingStatePopup";

function TopDealNearBy({ selectedSearchCity, loading }) {
  const router = useRouter();

  const [bestDeals, setBestDeals] = useState();
  const [bestDealsLength, setBestDealsLength] = useState();
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const [isLoading, setLoading] = useState(true);
  let [pageNumber, setPageNumber] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const loadData = (initialPage) => {
    if (!loading && selectedSearchCity != undefined) {
      bestDealNearByYou(
        selectedSearchCity,
        Cookies.get("userUniqueId") || "Guest",
        initialPage
      ).then((response) => {
        // setBestDealsLength(response?.dataObject?.bestDeals.length);
        setBestDeals([
          ...response?.dataObject?.bestDeals,
          ...response?.dataObject?.otherListings,
        ]);
        setLoading(false);
      });
    }
  };

  const loadMoreData = () => {
    let newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (!loading && selectedSearchCity != undefined) {
      bestDealNearByYou(
        selectedSearchCity,
        Cookies.get("userUniqueId") || "Guest",
        newPages
      ).then((response) => {
        // setBestDealsLength(response?.dataObject?.bestDeals.length);
        setBestDeals((products) => [
          // ...response?.dataObject?.bestDeals,
          ...products,
          ...response?.dataObject?.otherListings,
        ]);

        if (response?.dataObject?.otherListings.length == 0) {
          setIsFinished(true);
        }
        setLoading(false);
        setIsLoadingMore(false);
      });
    }
  };

  useEffect(() => {
    let intialPage = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [loading, selectedSearchCity]);

  return (
    <section className="px-3 text-sm text-gray-70">
      <div className="flex items-center justify-start space-x-2">
        <h1 className="mt-3 mb-2 font-semibold text-base">
          Best Deals Near You
        </h1>
        <div
          className="flex items-center justify-center space-x-2"
          onClick={() => setOpenLocationPopup(true)}
        >
          <span className="mt-3 mb-2 font-bold text-base text-blue-500 underline">
            {selectedSearchCity}
          </span>
          {/* <FaMapMarkerAlt className="text-[#00a483] h-4 w-4 mt-1" /> */}
        </div>
      </div>
      <div className="grid grid-cols-2 -mx-1.5 py-3">
        {(bestDeals?.length > 0 &&
          // bestDeals.slice(0, 16)
          bestDeals?.map((item) => (
            <div
              className="m-1.5"
              key={item.listingId}
              onClick={() => setLoadingState(true)}
            >
              <NearByDealCard data={item} prodLink setProducts={setBestDeals} />
            </div>
          ))) || (
          <div className="space-y-3 col-span-2">
            <Spinner />
            <div className="text-center">
              Please wait, while we are fetching data for you...{" "}
            </div>
          </div>
        )}
        {bestDealsLength > 0 && (
          <div className="h-full m-1.5">
            <NearByDealCard data={{ make: "Show all" }} />
          </div>
        )}
      </div>
      {!isLoading && isFinished === false && (
        <span
          className={`${
            isLoadingMore ? "w-[250px]" : "w-[150px]"
          } rounded-md shadow hover:drop-shadow-lg p-4 bg-m-white flex justify-center items-center hover:cursor-pointer`}
          onClick={loadMoreData}
        >
          <p className="block text-m-green font-semibold">
            {isLoadingMore ? "Fetching more products..." : "Load More"}
          </p>
        </span>
      )}
      <LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </section>
  );
}

export default TopDealNearBy;

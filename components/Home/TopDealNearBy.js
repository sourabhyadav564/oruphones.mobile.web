import Image from "next/image";
import React, { useEffect, useState } from "react";
import NearByDealCard from "../Card/NearByDealCard";
import { bestDealNearByYou, fetchMyFavorites, getUserListings } from "api-call";
import Cookies from "js-cookie";
import Loader from "../Loader/Loader";
import Spinner from "../Loader/Spinner";
import LocationPopup from "../Popup/LocationPopup";
import { useRouter } from "next/router";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import SortPopup from "../Popup/SortPopup";
import Sort from "@/assets/sort.svg";
import { useAuthState } from "providers/AuthProvider";

function TopDealNearBy({ selectedSearchCity, loading }) {
  const router = useRouter();
  const { authenticated, user } = useAuthState();

  const [bestDeals, setBestDeals] = useState();
  const [bestDealsLength, setBestDealsLength] = useState();
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const [isLoading, setLoading] = useState(true);
  let [pageNumber, setPageNumber] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [loadingState, setLoadingState] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [applySortFilter, setSortApplyFilter] = useState();
  const [listings, setListings] = useState([]);
  const [myFavListings, setMyFavListings] = useState([]);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const loadData = async (initialPage) => {
    if (user && user?.userdetails?.userUniqueId && listings.length === 0) {
      await getUserListings(user?.userdetails?.userUniqueId).then(
        (res) => {
          setListings(res.dataObject.map((item2) => item2.listingId));
        },
        (err) => console.error(err)
      );
    }
    if (authenticated && user && user?.userdetails?.userUniqueId) {
      fetchMyFavorites(Cookies.get("userUniqueId")).then((res) => {
        setMyFavListings(res.dataObject.map((item2) => item2.listingId));
      });
    }

    if (!loading && selectedSearchCity != undefined) {
      bestDealNearByYou(
        selectedSearchCity,
        Cookies.get("userUniqueId") || "Guest",
        initialPage,
        applySortFilter
      ).then((response) => {
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
        newPages,
        applySortFilter
      ).then((response) => {
        setBestDeals((products) => [
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
  }, [loading, selectedSearchCity, applySortFilter]);

  return (
    <section className="px-3 text-sm text-gray-70">
      <div className="flex items-center justify-start space-x-2 ">
        <h1 className="mt-3 mb-2 font-Roboto-Semibold text-base ">
          Best Deals Near You
        </h1>
        <div className="flex flex-1 items-center justify-between">
          <div
            className="flex items-center justify-center space-x-2"
            onClick={() => setOpenLocationPopup(true)}
          >
            <span className="mt-3 mb-2 font-Roboto-Bold text-base text-[#d6b034] underline truncate w-20">
              {selectedSearchCity}
            </span>
          </div>
          <span className="">
            {
              <span
                className="cursor-pointer flex items-center font-Roboto-Semibold"
                onClick={() => setOpenSort(true)}
              >
                Sort
                <Image src={Sort} className="ml-1" width={18} height={18} />
              </span>
            }
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 -mx-1.5 py-3">
        {(bestDeals?.length > 0 &&
          bestDeals?.map((item) => (
            <div className="m-1.5" key={item.listingId}>
              <NearByDealCard
                data={item}
                prodLink
                setProducts={setBestDeals}
                myListing={listings}
              />
            </div>
          ))) || (
          <div className="space-y-3 col-span-2">
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
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
            isLoadingMore ? "w-[150px]" : "w-[150px]"
          } rounded-md shadow border m-auto border-[#707070] hover:drop-shadow-lg p-2 bg-m-white flex justify-center items-center hover:cursor-pointer mb-5`}
          onClick={loadMoreData}
        >
          <p className="block text-[#585757] font-Roboto-Semibold">
            {isLoadingMore ? "Loading..." : "View More"}
          </p>
        </span>
      )}
      <LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      <SortPopup
        setSortApplyFilter={setSortApplyFilter}
        openSort={openSort}
        setOpenSort={setOpenSort}
      />
    </section>
  );
}

export default TopDealNearBy;

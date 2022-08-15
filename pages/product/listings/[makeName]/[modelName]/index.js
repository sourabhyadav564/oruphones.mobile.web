import BestDealSection from "@/components/BestDealSection";
import OtherListingCard from "@/components/Card/OtherListingCard";
import Filter from "@/components/FilterAndSort/Filter";
import { fetchByMarketingName, searchFilter } from "api-call";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "providers/AuthProvider";
import { numberFromString, stringToDate } from "@/utils/util";
import Loader from "@/components/Loader/Loader";
import NoMatch from "@/components/NoMatch";

// import {
//   otherVendorDataState,
// } from "../../../../../atoms/globalState";
// import { useRecoilState } from "recoil";

function ModelPage() {
  const router = useRouter();
  let { makeName, modelName } = router.query;
  const { selectedSearchCity } = useAuthState();

  const [bestDeals, setBestDeals] = useState([]);
  const [applyFilter, setApplyFilter] = useState();
  const [otherListings, setOtherListings] = useState([]);
  const [applySortFilter, setSortApplyFilter] = useState();
  const [loading, setLoading] = useState(true);
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  const [loadingState, setLoadingState] = useState(false);
  console.log("loading", loadingState);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const loadData = (intialPage) => {
    if (modelName) {
      fetchByMarketingName(
        selectedSearchCity,
        modelName,
        Cookies.get("userUniqueId") || "Guest",
        intialPage
      ).then(
        (response) => {
          if (response.dataObject?.otherListings.length > -1) {
            setOtherListings(
              (response && response?.dataObject?.otherListings) || []
            );
            // setProductsData(
            //   (response && response?.dataObject?.otherListings) || []
            // );
          }
          if (response.dataObject?.bestDeals.length > -1) {
            setBestDeals((response && response?.dataObject?.bestDeals) || []);
            // setProductsData(
            //   (response && response?.dataObject?.bestDeals) || []
            // );
          }

          if (response?.dataObject?.totalProducts > -1) {
            setTotalProducts(
              (response && response?.dataObject?.totalProducts) || 0
            );
          }
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setLoading(false);
        }
      );
    }
  };

  const loadMoreData = () => {
    let newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (modelName) {
      fetchByMarketingName(
        selectedSearchCity,
        modelName,
        Cookies.get("userUniqueId") || "Guest",
        newPages
      ).then(
        (response) => {
          if (response.dataObject?.otherListings.length > -1) {
            setOtherListings((products) => [
              ...products,
              ...response?.dataObject?.otherListings,
            ]);
            // setProductsData(
            //   (response && response?.dataObject?.otherListings) || []
            // );
          }
          // if (response.dataObject?.bestDeals.length > -1) {
          //   setBestDeals((response && response?.dataObject?.bestDeals) || []);
          //   // setProductsData(
          //   //   (response && response?.dataObject?.bestDeals) || []
          //   // );
          // }

          if (response?.dataObject?.otherListings.length == 0) {
            setIsFinished(true);
          }

          // if (response?.dataObject?.totalProducts > -1) {
          //   setTotalProducts((response && response?.dataObject?.totalProducts) || 0);
          // }
          setLoading(false);
          setIsLoadingMore(false);
        },
        (err) => {
          console.error(err);
          setLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    let intialPage = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [modelName, selectedSearchCity]);

  useEffect(() => {
    if (applyFilter) {
      const {
        brand,
        condition,
        color,
        storage,
        warranty,
        verification,
        priceRange,
      } = applyFilter;
      if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
        if (makeName === "oneplus") {
          makeName = "OnePlus";
        } else {
          makeName = makeName.charAt(0).toUpperCase() + makeName.slice(1);
        }
        let payLoad = {
          listingLocation: selectedSearchCity,
          make: brand?.length > 0 ? brand : [makeName],
          marketingName: [modelName],
          reqPage: "TSM",
          color: [],
          deviceCondition: [],
          deviceStorage: [],
          maxsellingPrice: 200000,
          minsellingPrice: 0,
          verified: "",
        };
        if (priceRange && priceRange.min && priceRange.max) {
          payLoad.minsellingPrice = priceRange.min;
          payLoad.maxsellingPrice = priceRange.max;
        }
        if (condition?.length > 0) {
          payLoad.deviceCondition = condition.includes("all") ? [] : condition;
        }
        if (storage?.length > 0) {
          payLoad.deviceStorage = storage.includes("all") ? [] : storage;
        }
        if (color?.length > 0) {
          payLoad.color = color.includes("all") ? [] : color;
        }
        if (warranty?.length > 0) {
          payLoad.warenty = warranty.includes("all") ? [] : warranty;
        }
        if (verification?.length > 0) {
          payLoad.verified = verification.includes("all") ? null : "verified";
        }
        // setLoading(true);
        searchFilter(
          payLoad,
          localStorage.getItem("userUniqueId") || "Guest",
          pageNumber
        ).then((response) => {
          setOtherListings(response?.dataObject?.otherListings);
          // setBestDeals([]);
          setBestDeals(response?.dataObject?.bestDeals);
          // setLoading(false);
        });
      }
    }
  }, [applyFilter]);

  const sortingProducts = getSortedProducts(applySortFilter, otherListings);

  return (
    <Filter
      searchText={`"${modelName}"`}
      setSortApplyFilter={setSortApplyFilter}
      setApplyFilter={setApplyFilter}
      applyFilter={applyFilter}
    >
      {(loading || bestDeals?.length > 0) && (
        <h1 className="text-lg font-semibold text-gray-20 pl-4 py-2">
          {" "}
          Best Deals{" "}
        </h1>
      )}
      {loading ? (
        <Loader />
      ) : (
        <BestDealSection bestDealData={bestDeals} setProducts={setBestDeals} />
      )}
      {(loading || sortingProducts?.length > 0) && (
        <h2 className="text-lg font-semibold text-black-4e p-2 pl-0 mt-3">
          {" "}
          Other Listings ({totalProducts}){" "}
        </h2>
      )}
      {loading ? (
        <Loader />
      ) : (
        <section className="grid grid-cols-2 py-3 -m-1.5">
          {sortingProducts &&
            sortingProducts?.map((item) => (
              <div
                key={item.listingId}
                className="m-1.5"
                onClick={() => {
                  // setListingId(item.listingId);
                  // setProductsData(otherListings);
                  setLoadingState(true);
                }}
              >
                <OtherListingCard
                  data={item}
                  prodLink
                  setProducts={setOtherListings}
                />
              </div>
            ))}
        </section>
      )}
      {!loading &&
        bestDeals &&
        !(bestDeals.length > 0) &&
        sortingProducts &&
        !sortingProducts.length > 0 && <NoMatch />}

      {!loading &&
        sortingProducts &&
        sortingProducts.length > 0 &&
        isFinished == false && (
          <span
            className={`${
              isLoadingMore ? "w-[250px]" : "w-[150px]"
            } rounded-md shadow hover:drop-shadow-lg p-4 bg-m-white flex justify-center items-center hover:cursor-pointer my-5`}
            onClick={loadMoreData}
          >
            <p className="block text-m-green font-semibold">
              {isLoadingMore ? "Fetching more products..." : "Load More"}
            </p>
          </span>
        )}
    </Filter>
  );
}

function getSortedProducts(applySort, otherListings) {
  var sortedProducts = otherListings ? [...otherListings] : [];
  if (applySort && applySort === "Price - Low to High") {
    sortedProducts.sort((a, b) => {
      return (
        numberFromString(a.listingPrice) - numberFromString(b.listingPrice)
      );
    });
  } else if (applySort && applySort === "Price - High to Low") {
    sortedProducts.sort((a, b) => {
      return (
        numberFromString(b.listingPrice) - numberFromString(a.listingPrice)
      );
    });
  } else if (applySort && applySort === "Newest First") {
    sortedProducts.sort((a, b) => {
      return (
        a.updatedAt &&
        b.updatedAt &&
        stringToDate(b.updatedAt) - stringToDate(a.updatedAt)
      );
    });
  } else if (applySort && applySort === "Oldest First") {
    sortedProducts.sort((a, b) => {
      return (
        a.updatedAt &&
        b.updatedAt &&
        stringToDate(a.updatedAt) - stringToDate(b.updatedAt)
      );
    });
  }
  return sortedProducts;
}

export default ModelPage;

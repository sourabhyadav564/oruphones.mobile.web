import BestDealSection from "@/components/BestDealSection";
import OtherListingCard from "@/components/Card/OtherListingCard";
import Filter from "@/components/FilterAndSort/Filter";
import Filter1 from "@/components/FilterAndSort/FilterAndSort1";
import { fetchByMarketingName, searchFilter } from "api-call";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "providers/AuthProvider";
import { numberFromString, stringToDate } from "@/utils/util";
import Loader from "@/components/Loader/Loader";
import NoMatch from "@/components/NoMatch";
import BottomNav from "@/components/Navigation/BottomNav";
import { Heading } from "@/components/elements/Heading/heading";

function ModelPage() {
  const router = useRouter();
  let { makeName, modelName } = router.query;
  const { selectedSearchCity } = useAuthState();

  const [bestDeals, setBestDeals] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [applyFilter, setApplyFilter] = useState();
  const [otherListings, setOtherListings] = useState([]);
  const [applySortFilter, setSortApplyFilter] = useState();
  const [loading, setLoading] = useState(true);
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  let intialPage = 0;
  let newPages = 0;
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const loadData = (intialPage) => {
    if (modelName && !isFilterApplied && !applyFilter) {
      fetchByMarketingName(
        selectedSearchCity,
        modelName.replace("+", "%2B"),
        Cookies.get("userUniqueId") || "Guest",
        intialPage,
        applySortFilter
      ).then(
        (response) => {
          if (response.dataObject?.otherListings.length > -1) {
            setOtherListings(
              (response && response?.dataObject?.otherListings) || []
            );
          }
          if (response.dataObject?.bestDeals.length > -1) {
            setBestDeals((response && response?.dataObject?.bestDeals) || []);
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
    } else {
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
            marketingName: [modelName.replace("+", "%2B")],
            reqPage: "BBNM",
            color: [],
            deviceCondition: [],
            deviceRam: [],
            deviceStorage: [],
            maxsellingPrice: 200000,
            minsellingPrice: 0,
            verified: "",
            warenty: [],
            pageNumber: intialPage,
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
            payLoad.verified = verification.includes("all") ? "" : "verified";
          }
          searchFilter(
            payLoad,
            localStorage.getItem("userUniqueId") || "Guest",
            localStorage.getItem("sessionId") || "",
            intialPage,
            applySortFilter
          ).then((response) => {
            setOtherListings(response?.dataObject?.otherListings);
            setTotalProducts(response?.dataObject?.totalProducts);
            setBestDeals(response?.dataObject?.bestDeals);
          });
        }
      }
    }
  };

  const loadMoreData = () => {
    newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (modelName && !isFilterApplied) {
      fetchByMarketingName(
        selectedSearchCity,
        modelName.replace("+", "%2B"),
        Cookies.get("userUniqueId") || "Guest",
        newPages,
        applySortFilter
      ).then(
        (response) => {
          if (response.dataObject?.otherListings.length > -1) {
            setOtherListings((products) => [
              ...products,
              ...response?.dataObject?.otherListings,
            ]);
          }
          if (response?.dataObject?.otherListings.length == 0) {
            setIsFinished(true);
          }

          if (response?.dataObject?.totalProducts > -1) {
            setTotalProducts(
              (response && response?.dataObject?.totalProducts) || 0
            );
          }
          setLoading(false);
          setIsLoadingMore(false);
        },
        (err) => {
          console.error(err);
          setLoading(false);
        }
      );
    } else {
      if (applyFilter) {
        setIsFilterApplied(true);
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
            marketingName: [modelName.replace("+", "%2B")],
            reqPage: "BBNM",
            color: [],
            deviceCondition: [],
            deviceRam: [],
            deviceStorage: [],
            maxsellingPrice: 200000,
            minsellingPrice: 0,
            verified: "",
            warenty: [],
            pageNumber: intialPage,
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
            payLoad.verified = verification.includes("all") ? "" : "verified";
          }
          searchFilter(
            payLoad,
            localStorage.getItem("userUniqueId") || "Guest",
            localStorage.getItem("sessionId") || "",
            newPages,
            applySortFilter
          ).then((response) => {
            setIsLoadingMore(false);
            if (newPages == 0) {
              setOtherListings(response?.dataObject?.otherListings);
            } else {
              setOtherListings((products) => [
                ...products,
                ...response?.dataObject?.otherListings,
              ]);
            }
            setTotalProducts(response?.dataObject?.totalProducts);
            if (newPages == 0) {
              setBestDeals(response?.dataObject?.bestDeals);
            } else {
              setBestDeals((products) => [
                ...products,
                ...response?.dataObject?.bestDeals,
              ]);
            }
          });
        }
      }
    }
  };

  useEffect(() => {
    intialPage = 0;
    newPages = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [modelName, selectedSearchCity, applySortFilter, applyFilter]);

  useEffect(() => {
    if (applyFilter) {
      setIsFilterApplied(true);
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
          marketingName: [modelName.replace("+", "%2B")],
          reqPage: "BBNM",
          color: [],
          deviceCondition: [],
          deviceRam: [],
          deviceStorage: [],
          maxsellingPrice: 200000,
          minsellingPrice: 0,
          verified: "",
          warenty: [],
          pageNumber: intialPage,
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
          payLoad.verified = verification.includes("all") ? "" : "verified";
        }
        searchFilter(
          payLoad,
          localStorage.getItem("userUniqueId") || "Guest",
          localStorage.getItem("sessionId") || "",
          intialPage,
          applySortFilter
        ).then((response) => {
          setOtherListings(response?.dataObject?.otherListings);
          setTotalProducts(response?.dataObject?.totalProducts);
          setBestDeals(response?.dataObject?.bestDeals);
        });
      }
    }
  }, [applyFilter, applySortFilter]);

  return (
    <>
      <Filter
        setIsFilterApplied={setIsFilterApplied}
        setApplyFilter={setApplyFilter}
        applyFilter={applyFilter}
       >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="-ml-4 -mr-4 px-6 ">
            <h1 className="text-lg font-semibold text-primary  py-2.5">
              {" "}
              All Deals{" "}
            </h1>
            <BestDealSection bestDealData={bestDeals} setProducts={setBestDeals} />
          </div>
        )}
        {(!loading || otherListings?.length > 0) && (
          <div className="flex mt- pb-0">
            <h2 className=" flex text-lg font-semibold text-gray-20 py-2.5 flex-1">
              {" "}
              <Heading title={`Other Listings (${totalProducts})${" "}`} />
            </h2>
            <p className="font-Roboto-Semibold text-[#707070]  text-cx  capitalize underline">
              <Filter1
                setSortApplyFilter={setSortApplyFilter}
              ></Filter1>
            </p>

          </div>
        )}
        {loading ? (
          <div></div>
        ) : (
          <section className="grid grid-cols-2 py-3 -m-1.5">
            {otherListings &&
              otherListings?.map((item) => (
                <div
                  key={item.listingId}
                  className="m-1.5"
                  onClick={() => {
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
          otherListings &&
          !otherListings.length > 0 && <NoMatch />}

        {!loading &&
          isFinished == false && otherListings.length != totalProducts && (
            <span
              className={`${isLoadingMore ? "w-[250px]" : "w-[150px]"
                } rounded-md shadow hover:drop-shadow-lg p-4 bg-m-white flex justify-center items-center hover:cursor-pointer my-5`}
              onClick={loadMoreData}
            >
              <p className="block text-m-green font-semibold">
                {isLoadingMore ? "Fetching more products..." : "Load More"}
              </p>
            </span>
          )}
      </Filter>
      <BottomNav />
      <Filter1 open={applySortFilter} setOpen={setSortApplyFilter} />
    </>
  );
}

export default ModelPage;

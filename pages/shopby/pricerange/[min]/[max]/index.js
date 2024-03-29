import BestDealSection from "@/components/BestDealSection";
import OtherListingCard from "@/components/Card/OtherListingCard";
import { useRouter } from "next/router";
import { shopByPriceRange, searchFilter } from "api-call";
import Filter from "@/components/FilterAndSort/Filter";
import Filter1 from "@/components/FilterAndSort/FilterAndSort1";
import { useState, useEffect } from "react";
import { useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";
import { numberFromString, stringToDate } from "@/utils/util";
import Loader from "@/components/Loader/Loader";
import NoMatch from "@/components/NoMatch";
import BottomNav from "@/components/Navigation/BottomNav";
import ProductSkeletonCard from "@/components/Card/ProductSkeletonCard";
import { Heading3 } from "@/components/elements/Heading/heading";

function PriceRangePage() {
  const router = useRouter();
  const { min, max } = router.query;
  const { selectedSearchCity } = useAuthState();
  const [shopByPriceBestDeal, setShopByPriceBestDeal] = useState([]);
  const [shopByPriceOtherListings, setShopByPriceOtherListings] = useState([]);
  const [applyFilter, setApplyFilter] = useState();
  const [applySortFilter, setSortApplyFilter] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  let intialPage = 0;
  let newPages = 0;

  const loadData = (intialPage) => {
    if (min && max && !isFilterApplied && !applyFilter) {
      shopByPriceRange(
        max,
        selectedSearchCity,
        min,
        Cookies.get("userUniqueId") || "Guest",
        intialPage,
        applySortFilter,
        Cookies.get("sessionId")
      ).then((response) => {
        setShopByPriceBestDeal(response?.dataObject?.bestDeals);
        setShopByPriceOtherListings(response?.dataObject?.otherListings);
        setTotalProducts(response?.dataObject?.totalProducts);
        setLoading(false);
      });
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
          let payLoad = {
            listingLocation: selectedSearchCity,
            maxsellingPrice: max,
            minsellingPrice: min,
            reqPage: "SBYP",
            make: [],
            marketingName: [],
            color: [],
            deviceCondition: [],
            deviceRam: [],
            deviceStorage: [],
            verified: "",
            warenty: [],
            pageNumber: intialPage,
          };
          if (brand?.length > 0) {
            payLoad.make = brand.includes("all") ? [] : brand;
          }
          if (condition?.length > 0) {
            payLoad.deviceCondition = condition.includes("all")
              ? []
              : condition;
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
            Cookies.get("userUniqueId") || "Guest",
            Cookies.get("sessionId"),
            intialPage,
            applySortFilter
          ).then((response) => {
            setShopByPriceOtherListings(response?.dataObject?.otherListings);
            setTotalProducts(response?.dataObject?.totalProducts);
            setShopByPriceBestDeal(response?.dataObject?.bestDeals);
          });
        }
      }
    }
  };

  const loadMoreData = () => {
    newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (min && max && !isFilterApplied) {
      shopByPriceRange(
        max,
        selectedSearchCity,
        min,
        Cookies.get("userUniqueId") || "Guest",
        newPages,
        applySortFilter,
        Cookies.get("sessionId")
      ).then((response) => {
        setShopByPriceOtherListings((products) => [
          ...products,
          ...response?.dataObject?.otherListings,
        ]);

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
      });
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
          let payLoad = {
            listingLocation: selectedSearchCity,
            maxsellingPrice: max,
            minsellingPrice: min,
            reqPage: "SBYP",
            make: [],
            marketingName: [],
            color: [],
            deviceCondition: [],
            deviceRam: [],
            deviceStorage: [],
            verified: "",
            warenty: [],
            pageNumber: newPages,
          };
          if (brand?.length > 0) {
            payLoad.make = brand.includes("all") ? [] : brand;
          }
          if (condition?.length > 0) {
            payLoad.deviceCondition = condition.includes("all")
              ? []
              : condition;
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
            Cookies.get("userUniqueId") || "Guest",
            Cookies.get("sessionId"),
            newPages,
            applySortFilter
          ).then((response) => {
            setIsLoadingMore(false);
            if (newPages == 0) {
              setShopByPriceOtherListings(response?.dataObject?.otherListings);
            } else {
              setShopByPriceOtherListings((products) => [
                ...products,
                ...response?.dataObject?.otherListings,
              ]);
            }
            setTotalProducts(response?.dataObject?.totalProducts);
            if (newPages == 0) {
              setShopByPriceBestDeal(response?.dataObject?.bestDeals);
            } else {
              setShopByPriceBestDeal((products) => [
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
        let payLoad = {
          listingLocation: selectedSearchCity,
          maxsellingPrice: max,
          minsellingPrice: min,
          reqPage: "SBYP",
          make: [],
          marketingName: [],
          color: [],
          deviceCondition: [],
          deviceRam: [],
          deviceStorage: [],
          verified: "",
          warenty: [],
          pageNumber: intialPage,
        };
        if (brand?.length > 0) {
          payLoad.make = brand.includes("all") ? [] : brand;
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
          Cookies.get("userUniqueId") || "Guest",
          Cookies.get("sessionId"),
          intialPage,
          applySortFilter
        ).then((response) => {
          setShopByPriceOtherListings(response?.dataObject?.otherListings);
          setTotalProducts(response?.dataObject?.totalProducts);
          setShopByPriceBestDeal(response?.dataObject?.bestDeals);
        });
      }
    }
  }, [applyFilter]);

  useEffect(() => {
    intialPage = 0;
    newPages = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [min, max, selectedSearchCity, applySortFilter, applyFilter]);

  return (
    <>
      <Filter
        searchText={`Price Range: ₹${min}${" - "}₹${max}`}
        setSortApplyFilter={setSortApplyFilter}
        setApplyFilter={setApplyFilter}
        applyFilter={applyFilter}
        setIsFilterApplied={setIsFilterApplied}
      >
        {isLoading ? (
          <div className="-ml-4 -mr-4 px-6 bg-gradient-to-b from-[#2C2F45] to-[#ffffff] ">
            <div className="flex">
              <Heading3 title="Best Deals" />
              <span className="flex-1"></span>
            </div>
            <ProductSkeletonCard isBestDeal={true} />
          </div>
        ) : (
          shopByPriceBestDeal?.length > 0 && (
            <div className="-ml-4 -mr-4 px-6 bg-gradient-to-b from-[#2C2F45] to-[#ffffff]">
              <h1 className="text-lg font-Roboto-Semibold text-white py-2.5">
                Best Deals
              </h1>
              <BestDealSection bestDealData={shopByPriceBestDeal} />
            </div>
          )
        )}
        {(!isLoading || shopByPriceOtherListings?.length > 0) && (
          <div className="flex items-center ">
            <h2 className=" text-mx font-Roboto-Light text-black-4e p-2 pl-0 mt-3 flex-1">
              Other Listings ({totalProducts})
            </h2>
            <div className="">
              <Filter1 setSortApplyFilter={setSortApplyFilter}></Filter1>
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="grid grid-cols-2 mx-3 py-3">
            {Array(10)
              .fill()
              .map((_, i) => (
                <ProductSkeletonCard isOtherListing={true} />
              ))}
          </div>
        ) : shopByPriceOtherListings && shopByPriceOtherListings.length > 0 ? (
          <section className="grid grid-cols-2 py-3 -m-1.5">
            {shopByPriceOtherListings &&
              shopByPriceOtherListings.length > 0 &&
              shopByPriceOtherListings.map((item) => (
                <div key={item.listingId} className="m-1.5">
                  <OtherListingCard data={item} prodLink />
                </div>
              ))}
          </section>
        ) : (
          <NoMatch />
        )}

        {!isLoading &&
          isFinished == false &&
          shopByPriceOtherListings.length != totalProducts && (
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
      <BottomNav />
    </>
  );
}

function getSortedProducts(applySort, shopByPriceOtherListings) {
  var sortedProducts = shopByPriceOtherListings
    ? [...shopByPriceOtherListings]
    : [];
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
      return stringToDate(b.modifiedDate) - stringToDate(a.modifiedDate);
    });
  } else if (applySort && applySort === "Oldest First") {
    sortedProducts.sort((a, b) => {
      return stringToDate(a.modifiedDate) - stringToDate(b.modifiedDate);
    });
  }
  return sortedProducts;
}

export default PriceRangePage;

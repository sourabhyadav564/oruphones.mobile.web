import Filter from "@/components/FilterAndSort/Filter";
import Filter1 from "@/components/FilterAndSort/FilterAndSort1";
import React, { useState, useEffect, useContext } from "react";
import { useAuthState } from "providers/AuthProvider";
import { bestDealNearYouAll, searchFilter } from "api-call";
import Cookies from "js-cookie";
import BestDealSection from "@/components/BestDealSection";
import OtherListingCard from "@/components/Card/OtherListingCard";
import { numberFromString, stringToDate } from "@/utils/util";
import Loader from "@/components/Loader/Loader";
import NoMatch from "@/components/NoMatch";
import BottomNav from "@/components/Navigation/BottomNav";
import { Heading } from "@/components/elements/Heading/heading";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: false,
  swipeToSlide: true,
};

function Bestdealnearyou() {
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [products, setProducts] = useState([]);
  const [bestDeal, setBestDeal] = useState([]);
  const [applyFilter, setApplyFilter] = useState();
  const [isLoading, setLoading] = useState(true);
  const { selectedSearchCity } = useAuthState();
  const [applySortFilter, setSortApplyFilter] = useState();
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  let intialPage = 0;
  let newPages = 0;

  const loadData = (intialPage) => {
    if (selectedSearchCity && !isFilterApplied && !applyFilter) {
      bestDealNearYouAll(
        selectedSearchCity,
        Cookies.get("userUniqueId") || "Guest",
        intialPage,
        applySortFilter
      ).then((response) => {
        setProducts(response?.dataObject?.otherListings);
        setBestDeal(response?.dataObject?.bestDeals);
        setTotalProducts(response?.dataObject?.totalProducts);
        setLoading(false);
      });
    } else {
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
          reqPage: "BBNM",
          color: [],
          make: [],
          deviceCondition: [],
          deviceStorage: [],
          deviceRam: [],
          maxsellingPrice: 200000,
          minsellingPrice: 0,
          verified: "",
          warenty: [],
          pageNumber: intialPage,
        };
        if (brand?.length > 0) {
          payLoad.make = brand.includes("all") ? [] : brand;
        }
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
          setProducts(response?.dataObject?.otherListings);
          setTotalProducts(response?.dataObject?.totalProducts);
          setBestDeal(response?.dataObject?.bestDeals);
        });
      }
    }
  };

  const loadMoreData = () => {
    newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (selectedSearchCity && !isFilterApplied) {
      bestDealNearYouAll(
        selectedSearchCity,
        Cookies.get("userUniqueId") || "Guest",
        newPages,
        applySortFilter
      ).then((response) => {
        setProducts((products) => [
          ...products,
          ...response?.dataObject?.otherListings,
        ]);

        if (response?.dataObject?.otherListings.length == 0) {
          setIsFinished(true);
        }

        if (response?.dataObject?.totalProducts > -1) {
          setTotalProducts(response?.dataObject?.totalProducts);
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
            reqPage: "BBNM",
            color: [],
            make: [],
            deviceCondition: [],
            deviceStorage: [],
            deviceRam: [],
            maxsellingPrice: 200000,
            minsellingPrice: 0,
            verified: "",
            warenty: [],
            pageNumber: newPages,
          };
          if (brand?.length > 0) {
            payLoad.make = brand.includes("all") ? [] : brand;
          }
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
              setProducts((products) => [
                ...products,
                ...response?.dataObject?.otherListings,
              ]);
            }
            setTotalProducts(response?.dataObject?.totalProducts);
            if (newPages == 0) {
              setBestDeal(response?.dataObject?.bestDeals);
            } else {
              setBestDeal((products) => [
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
  }, [selectedSearchCity, applySortFilter, applyFilter]);

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
          reqPage: "BBNM",
          color: [],
          make: [],
          deviceCondition: [],
          deviceStorage: [],
          deviceRam: [],
          maxsellingPrice: 200000,
          minsellingPrice: 0,
          verified: "",
          warenty: [],
          pageNumber: intialPage
        };
        if (brand?.length > 0) {
          payLoad.make = brand.includes("all") ? [] : brand;
        }
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
          setProducts(response?.dataObject?.otherListings);
          setTotalProducts(response?.dataObject?.totalProducts);
          setBestDeal(response?.dataObject?.bestDeals);
        });
      }
    }
  }, [applyFilter]);

  return (
    <>
      <Filter
        setIsFilterApplied={setIsFilterApplied}
        setApplyFilter={setApplyFilter}
        applyFilter={applyFilter}
      >

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          bestDeal &&
          bestDeal?.length > 0 && (
            <div className="-ml-4 -mr-4 px-6 bg-gradient-to-b from-[#2C2F45] to-[#ffffff] ">
              <h1 className="text-lg font-semibold text-white py-2.5 ">
                {" "}
                Best Deals{" "}
              </h1>
              <BestDealSection bestDealData={bestDeal} setProducts={setBestDeal} />
            </div>
          )
        )}
        {(!isLoading) && (
          <div className="flex mt-3 pb-0">
            <h2 className="flex text-lg font-semibold text-gray-20 py-2.5 flex-1">
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
        {isLoading ? (
          <></>
        ) : (
          <section className="grid grid-cols-2 py-3 -m-1.5">
            {products &&
              products?.map((item) => (
                <div key={item.listingId} className="m-1.5">
                  <OtherListingCard
                    data={item}
                    prodLink
                    setProducts={setProducts}
                  />
                </div>
              ))}
          </section>
        )}
        {!isLoading &&
          bestDeal &&
          !(bestDeal.length > 0) &&
          products &&
          !products.length > 0 && <NoMatch />}

        {!isLoading &&
          isFinished == false && products.length != totalProducts && (
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

function getSortedProducts(applySort, products) {
  var sortedProducts = products ? [...products] : [];
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

export default Bestdealnearyou;

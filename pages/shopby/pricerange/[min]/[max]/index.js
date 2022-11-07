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

function PriceRangePage() {
  const router = useRouter();
  const { min, max } = router.query;
  const { selectedSearchCity } = useAuthState();
  const [shopByPriceBestDeal, setShopByPriceBestDeal] = useState([]);
  const [shopByPriceOtherListings, setShopByPriceOtherListings] = useState([]);
  const [applyFilter, setApplyFilter] = useState();
  const [applySortFilter, setSortApplyFilter] = useState();
  const [isLoading, setLoading] = useState(true);

  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const loadData = (intialPage) => {
    if (min && max) {
      shopByPriceRange(
        // max === "above" ? "200000" : max,
        max,
        selectedSearchCity,
        min,
        Cookies.get("userUniqueId") || "Guest",
        intialPage,
        applySortFilter
      ).then(
        (response) => {
          setShopByPriceBestDeal(response?.dataObject?.bestDeals);
          setShopByPriceOtherListings(response?.dataObject?.otherListings);
          setTotalProducts(response?.dataObject?.totalProducts);
          setLoading(false);
        },
        (err) => console.error(err)
      );
    }
  };

  const loadMoreData = () => {
    let newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (min && max) {
      shopByPriceRange(
        // max === "above" ? "200000" : max,
        max,
        selectedSearchCity,
        min,
        Cookies.get("userUniqueId") || "Guest",
        newPages,
        applySortFilter
      ).then(
        (response) => {
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
          // setShopByPriceOtherListings(response?.dataObject?.otherListings);
          setLoading(false);
          setIsLoadingMore(false);
        },
        (err) => console.error(err)
      );
    }
  };

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
        let payLoad = {
          listingLocation: selectedSearchCity,
          // maxsellingPrice: max === "above" ? "200000" : max,
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
        // setLoading(true);
        searchFilter(
          payLoad,
          localStorage.getItem("userUniqueId") || "Guest",
          localStorage.getItem("sessionId") != undefined ? localStorage.getItem("sessionId") : "",
          pageNumber
        ).then((response) => {
          setShopByPriceOtherListings(response?.dataObject?.otherListings);
          setTotalProducts(response?.dataObject?.totalProducts);
          setShopByPriceBestDeal(response?.dataObject?.bestDeals);
          // setLoading(false);
        });
      }
    }
  }, [applyFilter]);

  const sortingProducts = getSortedProducts(
    applySortFilter,
    shopByPriceOtherListings
  );

  useEffect(() => {
    let intialPage = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [min, max, selectedSearchCity, applySortFilter]);

  return (
    <Filter
      searchText={`Price Range: ₹${min}${" - "}₹${max}`}
      setSortApplyFilter={setSortApplyFilter}
      setApplyFilter={setApplyFilter}
      applyFilter={applyFilter}
    >
      {/* {(isLoading || shopByPriceBestDeal?.length > 0) && (
        <h1 className="text-lg font-semibold text-gray-20 py-2.5">
          {" "}
          Best Deals{" "}
        </h1>
      )} */}
      {isLoading ? (
        <Loader />
      ) : (
        (shopByPriceBestDeal?.length > 0) && (
          //   <div>
          //      <h1 className="text-lg font-semibold text-gray-20 py-2.5">
          //   {" "}
          //   Best Deals{" "}
          // </h1>
          //   <BestDealSection bestDealData={shopByPriceBestDeal} />
          //   </div>
          <div className="-ml-4 -mr-4 px-6 bg-gradient-to-b from-[#2C2F45] to-[#ffffff]">
            <h1 className="text-lg font-semibold text-white py-2.5">
              Best Deals
            </h1>
            <BestDealSection bestDealData={shopByPriceBestDeal} />
          </div>
        )
      )}
      {(!isLoading || sortingProducts?.length > 0) && (
        <div className="flex items-center " >
          <h2 className=" text-mx font-semibold text-black-4e p-2 pl-0 mt-3 flex-1">
            Other Listings ({totalProducts})
          </h2>
          <div className="">
            <Filter1
              setSortApplyFilter={setSortApplyFilter}
            // setApplyFilter={setApplyFilter}
            ></Filter1>
          </div>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <section className="grid grid-cols-2 py-3 -m-1.5">
          {sortingProducts &&
            sortingProducts.length > 0 &&
            sortingProducts.map((item) => (
              <div key={item.listingId} className="m-1.5">
                <OtherListingCard data={item} prodLink />
              </div>
            ))}
        </section>
      )}
      {shopByPriceBestDeal &&
        shopByPriceBestDeal.length > 0 &&
        sortingProducts &&
        sortingProducts.length > 0 && (
          <NoMatch />
        )}

      {!isLoading &&
        isFinished == false && shopByPriceOtherListings.length != totalProducts && (
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

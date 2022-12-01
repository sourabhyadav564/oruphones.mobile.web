import BestDealSection from "@/components/BestDealSection";
import OtherListingCard from "@/components/Card/OtherListingCard";
import { useRouter } from "next/router";
import { shopByPriceRange, searchFilter } from "api-call";
import Filter from "@/components/FilterAndSort/Filter";
import { useState, useEffect } from "react";
import { useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";
import { numberFromString, stringToDate } from "@/utils/util";
import Loader from "@/components/Loader/Loader";
import NoMatch from "@/components/NoMatch";
import BottomNav from "@/components/Navigation/BottomNav";

function PriceRangePage() {
  const router = useRouter();
  const { min, max } = router.query;
  const { selectedSearchCity } = useAuthState();
  const [shopByPriceBestDeal, setShopByPriceBestDeal] = useState();
  const [shopByPriceOtherListings, setShopByPriceOtherListings] = useState([]);
  const [applyFilter, setApplyFilter] = useState();
  const [applySortFilter, setSortApplyFilter] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (applyFilter) {
      const { brand, condition, color, storage, warranty, verification, priceRange } = applyFilter;
      if (Object.keys(applyFilter).some((i) => applyFilter[i])) {
        let payLoad = {
          listingLocation: selectedSearchCity,
          maxsellingPrice: max === "above" ? "200000" : max,
          minsellingPrice: min,
          reqPage: "SBYP",
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
        searchFilter(payLoad, localStorage.getItem("userUniqueId") || "Guest", localStorage.getItem("sessionId") || "", pageNumber).then((response) => {
          setShopByPriceOtherListings(response?.dataObject?.otherListings);
          setShopByPriceBestDeal([]);
          // setLoading(false);
        });
      }
    }
  }, [applyFilter]);

  const sortingProducts = getSortedProducts(applySortFilter, shopByPriceOtherListings);

  useEffect(() => {
    if (min && max) {
      shopByPriceRange(max === "above" ? "200000" : max, selectedSearchCity, min, Cookies.get("userUniqueId") || "Guest").then(
        (response) => {
          setShopByPriceBestDeal(response?.dataObject?.bestDeals);
          setShopByPriceOtherListings(response?.dataObject?.otherListings);
          setLoading(false);
        },
        (err) => console.error(err)
      );
    }
  }, [min, max, selectedSearchCity]);

  return (
    <>
      <Filter
        searchText={`Price Range: ₹${min}${" - "}₹${max}`}
        setSortApplyFilter={setSortApplyFilter}
        setApplyFilter={setApplyFilter}
        applyFilter={applyFilter}
      >
        {(isLoading || shopByPriceBestDeal?.length > 0) && <p className="text-lg font-semibold text-gray-20 py-2.5"> Best Deals </p>}
        {isLoading ? <Loader /> : shopByPriceBestDeal?.length > 0 && <BestDealSection bestDealData={shopByPriceBestDeal} />}
        {(isLoading || sortingProducts?.length > 0) && (
          <h1 className="text-lg font-semibold text-black-4e p-2 pl-0 mt-3"> Other Listings ({sortingProducts?.length}) </h1>
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
        {shopByPriceBestDeal && shopByPriceBestDeal.length > 0 && sortingProducts && sortingProducts.length > 0 ? null : <NoMatch />}
      </Filter>
      <BottomNav />
    </>
  );
}

function getSortedProducts(applySort, shopByPriceOtherListings) {
  var sortedProducts = shopByPriceOtherListings ? [...shopByPriceOtherListings] : [];
  if (applySort && applySort === "Price - Low to High") {
    sortedProducts.sort((a, b) => {
      return numberFromString(a.listingPrice) - numberFromString(b.listingPrice);
    });
  } else if (applySort && applySort === "Price - High to Low") {
    sortedProducts.sort((a, b) => {
      return numberFromString(b.listingPrice) - numberFromString(a.listingPrice);
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

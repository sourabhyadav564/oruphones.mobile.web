import Filter from "@/components/FilterAndSort/Filter";
import React, { useState, useEffect, useContext } from "react";
import { useAuthState } from "providers/AuthProvider";
import { bestDealNearYouAll, searchFilter } from "api-call";
import Cookies from "js-cookie";
import BestDealSection from "@/components/BestDealSection";
import OtherListingCard from "@/components/Card/OtherListingCard";
import { numberFromString, stringToDate } from "@/utils/util";
import Loader from "@/components/Loader";
import NoMatch from "@/components/NoMatch";

import {
  otherVendorDataState,
  // otherVandorListingIdState,
} from "../../../atoms/globalState";
import { useRecoilState } from "recoil";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
  infinite: false,
  swipeToSlide: true,
};

function Bestdealnearyou() {
  const [products, setProducts] = useState([]);
  const [bestDeal, setBestDeal] = useState([]);
  const [applyFilter, setApplyFilter] = useState();
  const [isLoading, setLoading] = useState(true);
  const { selectedSearchCity } = useAuthState();
  const [applySortFilter, setSortApplyFilter] = useState();

  const [product, setProductsData] = useRecoilState(otherVendorDataState);
  console.log("product from make best deal near you page----->", product);

  useEffect(() => {
    if (selectedSearchCity) {
      bestDealNearYouAll(
        selectedSearchCity,
        Cookies.get("info") || "Guest"
      ).then((response) => {
        console.log("bestDealNearYouAll ", bestDealNearYouAll);
        setProducts(response?.dataObject?.otherListings);
        setBestDeal(response?.dataObject?.bestDeals);
        setProductsData([...response?.dataObject?.otherListings, ...response?.dataObject?.bestDeals]);
        // setProductsData(response?.dataObject?.bestDeals);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSearchCity]);

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
          reqPage: "BBNM",
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
          payLoad.verified = verification.includes("all") ? null : "verified";
        }
        console.log("BDNY PAYLAOD ", payLoad);
        searchFilter(
          payLoad,
          localStorage.getItem("userUniqueId") || "Guest"
        ).then((response) => {
          console.log("searchFilter ", response?.dataObject);
          setProducts(response?.dataObject?.otherListings);
          setBestDeal([]);
          // setLoading(false);
        });
      }
    }
  }, [applyFilter]);

  const sortingProducts = getSortedProducts(applySortFilter, products);

  return (
    <Filter
      searchText={`"Listings near me"`}
      setSortApplyFilter={setSortApplyFilter}
      setApplyFilter={setApplyFilter}
      applyFilter={applyFilter}
    >
      {(isLoading || bestDeal?.length > 0) && (
        <h1 className="text-lg font-semibold text-gray-20 py-2.5">
          {" "}
          Best Deals{" "}
        </h1>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        bestDeal?.length > 0 && (
          <BestDealSection bestDealData={bestDeal} setProducts={setBestDeal} />
        )
      )}
      {(isLoading || sortingProducts?.length > 0) && (
        <h2 className="text-lg font-semibold text-black-4e p-2 pl-0 mt-3">
          {" "}
          Other Listings ({sortingProducts?.length}){" "}
        </h2>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <section className="grid grid-cols-2 py-3 -m-1.5">
          {sortingProducts &&
            sortingProducts?.map((item) => (
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
        sortingProducts &&
        !sortingProducts.length > 0 && <NoMatch />}
    </Filter>
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
      return stringToDate(b.modifiedDate) - stringToDate(a.modifiedDate);
    });
  } else if (applySort && applySort === "Oldest First") {
    sortedProducts.sort((a, b) => {
      return stringToDate(a.modifiedDate) - stringToDate(b.modifiedDate);
    });
  }
  console.log("--> sortedProducts ", sortedProducts);
  return sortedProducts;
}

export default Bestdealnearyou;

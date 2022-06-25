import React, { useEffect, useState } from "react";
import NearByDealCard from "../Card/NearByDealCard";
import { bestDealNearByYou } from "api-call";
import Cookies from "js-cookie";
import Loader from "../Loader";
import Spinner from "../Loader/Spinner";

function TopDealNearBy({ selectedSearchCity, loading }) {
  const [bestDeals, setBestDeals] = useState();
  const [bestDealsLength, setBestDealsLength] = useState();

  useEffect(() => {
    if (!loading && selectedSearchCity != undefined) {
      bestDealNearByYou(
        selectedSearchCity,
        Cookies.get("info") || "Guest"
      ).then((response) => {
        setBestDealsLength(response?.dataObject?.bestDeals.length);
        setBestDeals(response?.dataObject?.bestDeals);
      });
    }
  }, [loading, selectedSearchCity]);

  console.log("TopDealNearBy -> ", bestDeals);

  return (
    <section className="px-3 text-sm text-gray-70">
      <h1 className="mt-3 mb-2  font-semibold text-base">
        Best Deals Near You ({selectedSearchCity})
      </h1>
      <div className="grid grid-cols-2 -mx-1.5 py-3">
        {(bestDeals?.length > 0 &&
          bestDeals.slice(0, 16).map((item) => (
            <div className="m-1.5" key={item.listingId}>
              <NearByDealCard data={item} prodLink setProducts={setBestDeals} />
            </div>
          ))) || (
          <div className="text-center">
            Sorry, there are no best deals near you
          </div>
          // <Loader />
        )}
        {bestDealsLength > 0 && (
          <div className="h-full m-1.5">
            <NearByDealCard data={{ make: "Show all" }} />
          </div>
        )}
      </div>
    </section>
  );
}

export default TopDealNearBy;

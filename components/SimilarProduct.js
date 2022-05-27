import { useEffect, useState } from "react";
import OtherListingCard from "./Card/OtherListingCard";
import { useAuthState } from "providers/AuthProvider";
import { fetchSimilarProducts } from "api-call";
import Cookies from "js-cookie";
import Loader from "@/components/Loader";

import {
  otherVendorDataState,
  // otherVandorListingIdState,
} from "../atoms/globalState";
import { useRecoilState } from "recoil";

function SimilarProduct({ data, otherVendorData }) {
  const { selectedSearchCity } = useAuthState();
  const [similar_listings, setSimilar_listings] = useState();

  console.log("data from similar products --> N", data);
  console.log("data from similar products -- > Y", otherVendorData);

  useEffect(() => {
    let payLoad = {
      listingLocation: selectedSearchCity,
      make: [data.make || otherVendorData[0]?.make],
      marketingName: [data.marketingName || otherVendorData[0]?.marketingName],
      reqPage: "TSM",
      color: [],
      deviceCondition: [],
      deviceStorage: [],
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: ""
    };
    fetchSimilarProducts(payLoad, Cookies.get("info") || "Guest").then((response) => {
      console.log(
        "response",
        response?.dataObject?.otherListings.filter((items) => {
          return items.listingId !== data.listingId;
        })
      );
      setSimilar_listings(
        response?.dataObject?.otherListings.filter((items) => {
          return items.listingId !== data.listingId;
        })
      );
    });
  }, [data?.make, data?.marketingName]);

  const [product, setProductsData] = useRecoilState(otherVendorDataState);
  console.log("product from similar page state variable----->", product);

  return (
    <section className="px-4">
      <h1 className="font-semibold text-base"> Similar Products </h1>
      <div className="grid grid-cols-2 -m-1.5 py-4">
        {similar_listings && similar_listings.length > 0 ? (
          similar_listings.map((item) => (
            <div className="m-1.5" key={item.listingId}
            onClick={() => {
              // setListingId(item.listingId);
              setProductsData(similar_listings || []);
            }}
            >
              <OtherListingCard data={item} setProducts={setSimilar_listings} prodLink />
            </div>
          ))
        ) : (
          // <div className="col-span-4">
          // <Loader />
          // </div>
          <div className="text-center pt-2 col-span-4 h-20">There are no similar products</div>
        )}
      </div>
    </section>
  );
}

export default SimilarProduct;

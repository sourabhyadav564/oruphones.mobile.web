import { useEffect, useState } from "react";
import OtherListingCard from "./Card/OtherListingCard";
import { useAuthState } from "providers/AuthProvider";
import { fetchSimilarProducts } from "api-call";
import Cookies from "js-cookie";
import Loader from "@/components/Loader/Loader";

// import {
//   otherVendorDataState,
//   // otherVandorListingIdState,
// } from "../atoms/globalState";
// import { useRecoilState } from "recoil";

function SimilarProduct({ data }) {
  const { selectedSearchCity } = useAuthState();
  let [similar_listings, setSimilar_listings] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadData = () => {
    let payLoad = {
      listingLocation: selectedSearchCity,
      make: [data.make],
      marketingName: [data.marketingName],
      reqPage: "TSM",
      color: [],
      deviceCondition: [],
      deviceStorage: [],
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: "",
    };
    fetchSimilarProducts(payLoad, Cookies.get("userUniqueId") || "Guest", pageNumber).then(
      (response) => {
        setSimilar_listings(
          response?.dataObject?.otherListings.filter((items) => {
            return items.listingId !== data.listingId;
          })
        );
        setTotalProducts(response?.dataObject?.totalProducts);
        setPageNumber(pageNumber + 1);
      }
    );
  }

  const loadMoreData = () => {
    setIsLoadingMore(true);
    let payLoad = {
      listingLocation: selectedSearchCity,
      make: [data.make],
      marketingName: [data.marketingName],
      reqPage: "TSM",
      color: [],
      deviceCondition: [],
      deviceStorage: [],
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: "",
    };
    fetchSimilarProducts(payLoad, Cookies.get("userUniqueId") || "Guest", pageNumber).then(
      (response) => {
        setSimilar_listings(
          response?.dataObject?.otherListings.filter((items) => {
            return items.listingId !== data.listingId;
          })
        );
        setTotalProducts(response?.dataObject?.totalProducts);
        setPageNumber(pageNumber + 1);
        setIsLoadingMore(false);
      }
    );
  }

  const handelScroll = (e) => {
    // console.log("top", e.target.documentElement.scrollTop);
    // console.log("win", window.innerHeight);
    // console.log("height", e.target.documentElement.scrollHeight);

    if (
      totalProducts >= 20 && window.innerHeight + e.target.documentElement.scrollTop + 1 >
      e.target.documentElement.scrollHeight
    ) {
      loadMoreData();
    }
  };


  useEffect(() => {
    loadData();
    window.addEventListener("scroll", handelScroll);
  }, [data?.make, data?.marketingName]);

  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  similar_listings = similar_listings?.filter((item) => {
    return item.listingId != data?.listingId;
  });


  return (
    <section className="px-4">
      <h1 className="font-semibold text-base"> Similar Products ({similar_listings?.length}) </h1>
      <div className="grid grid-cols-2 -m-1.5 py-4">
        {similar_listings && similar_listings.length > 0 ? (
          similar_listings.map((item) => (
            <div
              className="m-1.5"
              key={item.listingId}
              // onClick={() => {
              //   // setListingId(item.listingId);
              //   setProductsData(similar_listings || []);
              // }}
            >
              <OtherListingCard
                data={item}
                setProducts={setSimilar_listings}
                prodLink
              />
            </div>
          ))
        ) : (
          // <div className="col-span-4">
          // <Loader />
          // </div>
          <div className="text-center pt-2 col-span-4 h-20">
            There are no similar products
          </div>
        )}
         {isLoadingMore && (
          <div className="flex items-center justify-center my-5 text-lg font-semibold animate-pulse">
            <span>Fetching more products...</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default SimilarProduct;

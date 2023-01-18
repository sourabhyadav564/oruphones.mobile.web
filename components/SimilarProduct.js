import { useEffect, useState } from "react";
import OtherListingCard from "./Card/OtherListingCard";
import { useAuthState } from "providers/AuthProvider";
import { fetchSimilarProducts } from "api-call";
import Cookies from "js-cookie";
import Loader from "@/components/Loader/Loader";

// import {
//   otherVendorDataState,
// } from "../atoms/globalState";
// import { useRecoilState } from "recoil";

function SimilarProduct({ data }) {
  const { selectedSearchCity } = useAuthState();
  let [similar_listings, setSimilar_listings] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const loadData = (intialPage) => {
    let payLoad = {
      listingLocation: selectedSearchCity,
      make: [data.make],
      marketingName: [data.marketingName],
      reqPage: "TSM",
      color: [],
      deviceCondition: [],
      deviceStorage: [],
      deviceRam: [],
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: "",
      warenty: [],
    };
    fetchSimilarProducts(
      payLoad,
      Cookies.get("userUniqueId") || "Guest",
      intialPage
    ).then((response) => {
      setSimilar_listings(
        response?.dataObject?.otherListings.filter((items) => {
          return items.listingId !== data.listingId;
        })
      );
      setTotalProducts(response?.dataObject?.totalProducts);
    });
  };

  const loadMoreData = () => {
    let newPages = pageNumber + 1;
    setPageNumber(newPages);
    setIsLoadingMore(true);
    let payLoad = {
      listingLocation: selectedSearchCity,
      make: [data.make],
      marketingName: [data.marketingName],
      reqPage: "TSM",
      color: [],
      deviceCondition: [],
      deviceStorage: [],
      deviceRam: [],
      maxsellingPrice: 200000,
      minsellingPrice: 0,
      verified: "",
      warenty: [],
    };
    fetchSimilarProducts(
      payLoad,
      Cookies.get("userUniqueId") || "Guest",
      newPages
    ).then((response) => {
      // setSimilar_listings(
      //   response?.dataObject?.otherListings.filter((items) => {
      //     return items.listingId !== data.listingId;
      //   })
      // );

      let data = response?.dataObject?.otherListings.filter((items) => {
        return items?.listingId !== data?.listingId;
      });

      setSimilar_listings((products) => [...products, ...data]);

      if (response?.dataObject?.otherListings.length == 0) {
        setIsFinished(true);
      }
      setIsLoadingMore(false);
    });
  };

  useEffect(() => {
    let intialPage = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [data?.make, data?.marketingName]);

  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  similar_listings = similar_listings?.filter((item) => {
    return item.listingId != data?.listingId;
  });

  return (
    <section className="px-4">
      <p className="font-Roboto-Light text-ex text-black border-b-2 pb-2">
        {" "}
        {/* Similar Products ({similar_listings?.length || 0}){" "} */}
        Similar Products
      </p>
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
          <div className="text-center pt-2 col-span-4 h-20 font-Roboto-Regular">
            There are no similar products
          </div>
        )}
        {/* {isLoadingMore && (
          <div className="flex items-center justify-center my-5 text-lg font-semibold animate-pulse">
            <span>Fetching more products...</span>
          </div>
        )} */}
      </div>
      {similar_listings && similar_listings.length > 0 &&
        isFinished == false && (
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
    </section>
  );
}

export default SimilarProduct;

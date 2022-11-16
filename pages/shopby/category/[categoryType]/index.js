import BestDealSection from "@/components/BestDealSection";
import OtherListingCard from "@/components/Card/OtherListingCard";
import { useRouter } from "next/router";
import { fetchByMakeList, searchFilter, shopByCategory } from "api-call";
import Filter from "@/components/FilterAndSort/Filter";
import Filter1 from "@/components/FilterAndSort/FilterAndSort1";
import { useState, useEffect } from "react";
import { useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";
import { numberFromString, stringToDate } from "@/utils/util";
import Loader from "@/components/Loader/Loader";
import NoMatch from "@/components/NoMatch";
import { metaTags } from "@/utils/constant";
import Head from "next/head";
import BottomNav from "@/components/Navigation/BottomNav";

// import {
//   otherVendorDataState,
//   // otherVandorListingIdState,
// } from "../../../../atoms/globalState";
// import { useRecoilState } from "recoil";

function CategoryPage() {
  const { selectedSearchCity, loading } = useAuthState();
  const router = useRouter();
  let { categoryType } = router.query;
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [bestDeals, setBestDeals] = useState([]);
  const [applyFilter, setApplyFilter] = useState();
  const [otherListings, setOtherListings] = useState([]);
  const [applySortFilter, setSortApplyFilter] = useState();
  const [isLoading, setLoading] = useState(true);
  let [pageNumber, setPageNumber] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  let intialPage = 0;
  let newPages = 0;
  const [title, setTitle] = useState(metaTags.BRANDS.title);
  const [description, setDescription] = useState(metaTags.BRANDS.description);

  // const [product, setProductsData] = useRecoilState(otherVendorDataState);
  // const [listingId, setListingId] = useRecoilState(otherVandorListingIdState);

  console.log("isLoading", isLoading);

  const loadData = (intialPage) => {
    if (categoryType && !isFilterApplied) {
      shopByCategory(
        selectedSearchCity,
        categoryType,
        Cookies.get("userUniqueId") || "Guest",
        intialPage,
        applySortFilter
      ).then(
        (response) => {
          if (response.dataObject?.otherListings.length > -1) {
            setOtherListings(
              (response && response?.dataObject?.otherListings) || []
            );
            // setProductsData(
            //   (response && response?.dataObject?.otherListings) || []
            // );
          }
          if (response.dataObject?.bestDeals.length > -1) {
            setBestDeals((response && response?.dataObject?.bestDeals) || []);
            // setProductsData(
            //   (response && response?.dataObject?.bestDeals) || []
            // );
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
    } else if (isFilterApplied) {
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
            make: [],
            marketingName: [],
            reqPage: "BRAND",
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
            // setBestDeals([]);
            setTotalProducts(response?.dataObject?.totalProducts);
            setBestDeals(response?.dataObject?.bestDeals);
          });
        }
      }
    }
  };

  const loadMoreData = () => {
    newPages = pageNumber + 1;
    // setPageNumber(newPages);
    setIsLoadingMore(true);
    if (categoryType && !isFilterApplied) {
      shopByCategory(
        selectedSearchCity,
        categoryType,
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
            // setProductsData(
            //   (response && response?.dataObject?.otherListings) || []
            // );
          }
          // if (response.dataObject?.bestDeals.length > -1) {
          //   setBestDeals((response && response?.dataObject?.bestDeals) || []);
          //   // setProductsData(
          //   //   (response && response?.dataObject?.bestDeals) || []
          //   // );
          // }

          if (response?.dataObject?.totalProducts > -1) {
            setTotalProducts(
              (response && response?.dataObject?.totalProducts) || 0
            );
          }

          if (response?.dataObject?.otherListings.length == 0) {
            setIsFinished(true);
          }

          setLoading(false);
          setIsLoadingMore(false);
        },
        (err) => {
          console.error(err);
          setLoading(false);
        }
      );
    } else if (isFilterApplied) {
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
            make: [],
            marketingName: [],
            reqPage: "BRAND",
            color: [],
            deviceCondition: [],
            deviceRam: [],
            deviceStorage: [],
            maxsellingPrice: 200000,
            minsellingPrice: 0,
            verified: "",
            warenty: [],
            pageNumber: newPages,
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
            // setBestDeals([]);
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
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [categoryType, selectedSearchCity, applySortFilter]);

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
          make: [],
          marketingName: [],
          reqPage: "BRAND",
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
          pageNumber,
          applySortFilter
        ).then((response) => {
          setOtherListings(response?.dataObject?.otherListings);
          // setBestDeals([]);
          setTotalProducts(response?.dataObject?.totalProducts);
          setBestDeals(response?.dataObject?.bestDeals);
        });
      }
    }
  }, [applyFilter]);

  // const sortingProducts = getSortedProducts(applySortFilter, otherListings);

  useEffect(() => {
    switch (categoryType) {
      case "apple":
        setTitle(metaTags.APPLE.title);
        setDescription(metaTags.APPLE.description);
        break;
      case "samsung":
        setTitle(metaTags.SAMSUNG.title);
        setDescription(metaTags.SAMSUNG.description);
        break;
      case "oppo":
        setTitle(metaTags.OPPO.title);
        setDescription(metaTags.OPPO.description);
        break;
      case "oneplus":
        setTitle(metaTags.ONEPLUS.title);
        setDescription(metaTags.ONEPLUS.description);
        break;
      case "xiaomi":
        setTitle(metaTags.XIAOMI.title);
        setDescription(metaTags.XIAOMI.description);
        break;
      case "vivo":
        setTitle(metaTags.VIVO.title);
        setDescription(metaTags.VIVO.description);
        break;
      case "realme":
        setTitle(metaTags.REALME.title);
        setDescription(metaTags.REALME.description);
        break;
      case "lenovo":
        setTitle(metaTags.LENOVO.title);
        setDescription(metaTags.LENOVO.description);
        break;
      case "nokia":
        setTitle(metaTags.NOKIA.title);
        setDescription(metaTags.NOKIA.description);
        break;
      case "google":
        setTitle(metaTags.GOOGLE.title);
        setDescription(metaTags.GOOGLE.description);
        break;
      case "honor":
        setTitle(metaTags.HONOR.title);
        setDescription(metaTags.HONOR.description);
        break;
      case "asus":
        setTitle(metaTags.ASUS.title);
        setDescription(metaTags.ASUS.description);
        break;
      case "blackberry":
        setTitle(metaTags.BLACKBERRY.title);
        setDescription(metaTags.BLACKBERRY.description);
        break;
      default:
        setTitle(metaTags.BRANDS.title);
        setDescription(metaTags.BRANDS.description);
        break;
    }
  }, [categoryType]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <Filter
        // searchText={makeName}
        // setSortApplyFilter={setSortApplyFilter}
        setIsFilterApplied={setIsFilterApplied}
        setApplyFilter={setApplyFilter}
        applyFilter={applyFilter}
      >

        {/* {(isLoading || (bestDeals.length > 0)) && (
            <h1 className="text-lg font-semibold text-gray-20 py-2.5">
              Best Deals
            </h1>
          )} */}

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
            <CardHeading4 title={"Please wait, while we are fetching the data for you..."} />
          </div>
        ) : (
          bestDeals.length > 0 && (
            <div className="-ml-4 -mr-4 px-6 bg-gradient-to-b from-[#2C2F45] to-[#ffffff]">
              <h1 className="text-lg font-semibold text-white py-2.5">
                Best Deals
              </h1>

              <BestDealSection
                bestDealData={bestDeals}
                setProducts={setBestDeals}
              />
            </div>
          )
        )}

        {(!isLoading || (otherListings && otherListings.length > 0)) && (
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
          // <Loader />
          <></>
        ) : (
          <section className="grid grid-cols-2 py-3 -m-1.5">
            {otherListings &&
              otherListings?.map((item) => (
                <div
                  key={item.listingId}
                  className="m-1.5"
                // onClick={() => {
                //   // setListingId(item.listingId);
                //   setProductsData(otherListings);
                // }}
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
        {!isLoading &&
          bestDeals &&
          !(bestDeals.length > 0) &&
          otherListings &&
          !otherListings.length > 0 && <NoMatch />}
        {!isLoading &&
          isFinished === false && otherListings.length != totalProducts && (
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
    </>
  );
}

function getSortedProducts(applySort, otherListings) {
  var sortedProducts = otherListings ? [...otherListings] : [];
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

export default CategoryPage;

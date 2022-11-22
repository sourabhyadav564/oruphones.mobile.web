import BestDealSection from "@/components/BestDealSection";
import ShopByBrandsSection from "@/components/ShopByBrandsSection"
import OtherListingCard from "@/components/Card/OtherListingCard";
import { BiSortAlt2, BiFilterAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchByMakeList, searchFilter, getMakeModelLists } from "api-call";
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
import { FiTablet } from "react-icons/fi";
import { CardHeading2, CardHeading4, CardHeading5 } from "@/components/elements/CardHeading/cardheading";
import { Heading, Heading3 } from "@/components/elements/Heading/heading";
import BrandCard from "@/components/Card/BrandCard";
import BasicCarousel from "@/components/Carousel/BasicCarousel";
import BottomNav from "@/components/Navigation/BottomNav";
import LoadingStatePopup from "@/components/Popup/LoadingStatePopup";


// import {
//   otherVendorDataState,
//   // otherVandorListingIdState,
// } from "../../../../atoms/globalState";
// import { useRecoilState } from "recoil";

function MakePage({ bestDealData, shopbymodeldata, data }) {
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const { selectedSearchCity, loading } = useAuthState();
  const router = useRouter();
  let { makeName } = router.query;
  const [loadingState, setLoadingState] = useState(false);
  const [index, setIndex] = useState(-1);
  const [bestDeals, setBestDeals] = useState([]);
  const [shopbymodel, setshopbymodel] = useState([]);
  const [openSort, setOpenSort] = useState(false);
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
  let brandResult = [];
  const [title, setTitle] = useState(metaTags.BRANDS.title);
  const [description, setDescription] = useState(metaTags.BRANDS.description);

  // const [product, setProductsData] = useRecoilState(otherVendorDataState);
  // const [listingId, setListingId] = useRecoilState(otherVandorListingIdState);

  const loadData = (intialPage) => {
    if (makeName && !isFilterApplied && !applyFilter) {
      fetchByMakeList(
        selectedSearchCity,
        makeName,
        Cookies.get("userUniqueId") || "Guest",
        Cookies.get("sessionId") || "",
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
    } else {
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
          if (makeName === "oneplus") {
            makeName = "OnePlus";
          } else {
            makeName = makeName.charAt(0).toUpperCase() + makeName.slice(1);
          }
          let payLoad = {
            listingLocation: selectedSearchCity,
            make: brand?.length > 0 ? brand : [makeName],
            reqPage: "BRAND",
            color: [],
            deviceCondition: [],
            deviceStorage: [],
            deviceRam: [],
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
            Cookies.get("sessionId") != undefined ? Cookies.get("sessionId") : localStorage.getItem("sessionId") != undefined ? localStorage.getItem("sessionId") : "",
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
    setPageNumber(newPages);
    setIsLoadingMore(true);
    if (makeName && !isFilterApplied) {
      fetchByMakeList(
        selectedSearchCity,
        makeName,
        Cookies.get("userUniqueId") || "Guest",
        Cookies.get("sessionId") || "",
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
        },
        (err) => {
          console.error(err);
          setLoading(false);
        }
      );
    } else {
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
          if (makeName === "oneplus") {
            makeName = "OnePlus";
          } else {
            makeName = makeName.charAt(0).toUpperCase() + makeName.slice(1);
          }
          let payLoad = {
            listingLocation: selectedSearchCity,
            make: brand?.length > 0 ? brand : [makeName],
            reqPage: "BRAND",
            color: [],
            deviceCondition: [],
            deviceStorage: [],
            deviceRam: [],
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
            Cookies.get("sessionId") != undefined ? Cookies.get("sessionId") : localStorage.getItem("sessionId") != undefined ? localStorage.getItem("sessionId") : "",
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


  useEffect(async () => {
    const getMakeModel = async () => {
      const result = await getMakeModelLists(
        Cookies.get("userUniqueId") || "Guest",
        Cookies.get("sessionId") != undefined ? Cookies.get("sessionId") : localStorage.getItem("sessionId") != undefined ? localStorage.getItem("sessionId") : "",
        makeName,
        "Y"
      );
      return result;
    };
    if (makeName != undefined) {
      brandResult = await getMakeModel();
    }
    console.log("result", brandResult);
    setshopbymodel(brandResult?.dataObject);
    // setshopbymodel(JSON.parse(localStorage.getItem("make_models")));
  }, [makeName]);


  useEffect(() => {
    intialPage = 0;
    newPages = 0;
    setPageNumber(intialPage);
    loadData(intialPage);
  }, [makeName, selectedSearchCity, applySortFilter, applyFilter]);

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
        if (makeName === "oneplus") {
          makeName = "OnePlus";
        } else {
          makeName = makeName.charAt(0).toUpperCase() + makeName.slice(1);
        }
        let payLoad = {
          listingLocation: selectedSearchCity,
          make: brand?.length > 0 ? brand : [makeName],
          reqPage: "BRAND",
          color: [],
          deviceCondition: [],
          deviceStorage: [],
          deviceRam: [],
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
          Cookies.get("sessionId") != undefined ? Cookies.get("sessionId") : localStorage.getItem("sessionId") != undefined ? localStorage.getItem("sessionId") : "",
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
  }, [applyFilter]);

  // const sortingProducts = getSortedProducts(applySortFilter, otherListings);


  useEffect(() => {
    switch (makeName) {
      case "apple":
        setIndex(1);
        setTitle(metaTags.APPLE.title);
        setDescription(metaTags.APPLE.description);
        break;
      case "nothing":
        setIndex(0);
        setTitle(metaTags.NOTHING.title);
        setDescription(metaTags.NOTHING.description);
        break;
      case "samsung":
        setIndex(26);
        setTitle(metaTags.SAMSUNG.title);
        setDescription(metaTags.SAMSUNG.description);
        break;
      case "oppo":
        setIndex(19);
        setTitle(metaTags.OPPO.title);
        setDescription(metaTags.OPPO.description);
        break;
      case "gionee":
        setIndex(3);
        setTitle(metaTags.GIONEE.title);
        setDescription(metaTags.GIONEE.description);
        break;
      case "oneplus":
        setIndex(18);
        setTitle(metaTags.ONEPLUS.title);
        setDescription(metaTags.ONEPLUS.description);
        break;
      case "xiaomi":
        setIndex(24);
        setTitle(metaTags.XIAOMI.title);
        setDescription(metaTags.XIAOMI.description);
        break;
      case "vivo":
        setIndex(27);
        setTitle(metaTags.VIVO.title);
        setDescription(metaTags.VIVO.description);
        break;
      case "alcatel":
        setIndex(28);
        setTitle(metaTags.ALCATEL.title);
        setDescription(metaTags.ALCATEL.description);
        break;
      case "realme":
        setIndex(21);
        setTitle(metaTags.REALME.title);
        setDescription(metaTags.REALME.description);
        break;
      case "sony":
        setIndex(22);
        setTitle(metaTags.SONY.title);
        setDescription(metaTags.SONY.description);
        break;
      case "tecno":
        setIndex(23);
        setTitle(metaTags.TECNO.title);
        setDescription(metaTags.TECNO.description);
        break;
      case "micromax":
        setIndex(14);
        setTitle(metaTags.MICROMAX.title);
        setDescription(metaTags.MICROMAX.description);
        break;
      case "lenovo":
        setIndex(12);
        setTitle(metaTags.LENOVO.title);
        setDescription(metaTags.LENOVO.description);
        break;
      case "nokia":
        setIndex(17);
        setTitle(metaTags.NOKIA.title);
        setDescription(metaTags.NOKIA.description);
        break;
      case "google":
        setIndex(4);
        setTitle(metaTags.GOOGLE.title);
        setDescription(metaTags.GOOGLE.description);
        break;
      case "honor":
        setIndex(5);
        setTitle(metaTags.HONOR.title);
        setDescription(metaTags.HONOR.description);
        break;
      case "asus":
        setIndex(2);
        setTitle(metaTags.ASUS.title);
        setDescription(metaTags.ASUS.description);
        break;
      case "blackberry":
        setIndex(-1);
        setTitle(metaTags.BLACKBERRY.title);
        setDescription(metaTags.BLACKBERRY.description);
        break;
      case "lava":
        setIndex(11);
        setTitle(metaTags.LAVA.title);
        setDescription(metaTags.LAVA.description);
        break;
      case "panasonic":
        setIndex(20);
        setTitle(metaTags.PANASONIC.title);
        setDescription(metaTags.PANASONIC.description);
        break;
      case "meizu":
        setIndex(15);
        setTitle(metaTags.MEIZU.title);
        setDescription(metaTags.MEIZU.description);
        break;
      case "zte":
        setIndex(26);
        setTitle(metaTags.ZTE.title);
        setDescription(metaTags.ZTE.description);
        break;
      case "lg":
        setIndex(13);
        setTitle(metaTags.LG.title);
        setDescription(metaTags.LG.description);
        break;
      case "motorola":
        setIndex(16);
        setTitle(metaTags.MOTOROLA.title);
        setDescription(metaTags.MOTOROLA.description);
        break;
      case "karbonn":
        setIndex(10);
        setTitle(metaTags.KARBONN.title);
        setDescription(metaTags.KARBONN.description);
        break;
      case "intex":
        setIndex(9);
        setTitle(metaTags.INTEX.title);
        setDescription(metaTags.INTEX.description);
        break;
      case "infinix":
        setIndex(8);
        setTitle(metaTags.INFINIX.title);
        setDescription(metaTags.INFINIX.description);
        break;
      case "huawei":
        setIndex(7);
        setTitle(metaTags.HUAWEI.title);
        setDescription(metaTags.HUAWEI.description);
        break;
      case "htc":
        setIndex(6);
        setTitle(metaTags.HTC.title);
        setDescription(metaTags.HTC.description);
        break;
      default:
        setTitle(metaTags.BRANDS.title);
        setDescription(metaTags.BRANDS.description);
        break;
    }
  }, [makeName]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Filter
        // searchText={`Home > Shop By Brands > ${makeName}`}
        // setSortApplyFilter={setSortApplyFilter}
        setIsFilterApplied={setIsFilterApplied}
        setApplyFilter={setApplyFilter}
        applyFilter={applyFilter}
      >
        {/* <div className="-ml-4 -mr-8 px-6 bg-gradient-to-b from-[#2C2F45] to-[#ffffff] "> */}
        {/* {(isLoading || (bestDeals && bestDeals.length > 0)) && (
          
        )}  */}

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
            {/* <CardHeading4 title={"Please wait, while we are fetching the data for you..."} /> */}
          </div>
        ) : (
          bestDeals &&
          bestDeals.length > 0 && (
            <>
              <div className="-ml-4 -mr-4 px-6 bg-gradient-to-b from-[#2C2F45] to-[#ffffff] ">
                <div className="flex">
                  <Heading3 title="Best Deals" />
                  <span className="flex-1"></span>
                  <Heading3 title={makeName} />
                </div>
                <BestDealSection
                  bestDealData={bestDeals}
                  setProducts={setBestDeals}
                />
              </div>
              <div>
                {/* <div className="space-y-4 bg-[#EEEEEE] -mx-4 my-2 px-6 pt-4 pb-2">
                  <CardHeading2 title="Shop by Model" />
                  <ShopByBrandsSection
                    bestDealData={makeName}
                  />
                </div> */}
              </div>

            </>
          )

        )}


        {(isLoading || isFilterApplied) && (brandResult == [] || brandResult == "") ? (
          <></>
        ) : (
          <div className="space-y-2 h-[106px] bg-[#EEEEEE] opacity-bg-40 -mx-4 my-2 px-6 pt-1 items-center">
            <CardHeading2 title="Shop by Model" />
            <ShopByBrandsSection
              shopbymodeldata={shopbymodel} brandResult={brandResult} location={selectedSearchCity}
            />
          </div>
        )}
        {/* </div> */}

        {/* <div className="bg-[#EEEEEE] -mx-4 px-6">
            <h1 className="text-[#707070] text-cx font-normal"> Shop By Model </h1>
         </div> */}

        {(!isLoading && (otherListings && otherListings.length > 0)) && (
          <div className="flex mt-3">

            <h2 className=" font-normal text-[#707070] m-auto  text-cx  pl-0  capitalize flex-1">
              {/* Other Listings ({totalProducts}) */}
              <Heading title={`${makeName} Phones (${totalProducts})`} />
            </h2>
            <p className="font-normal text-[#707070]  text-cx  -mt-2  capitalize underline">
              {/* <p className="cursor-pointer flex items-center " onClick={() => setOpenSort(true)}>
              sort <BiSortAlt2 className="ml-1" />
            </p> */}
              <Filter1
                setSortApplyFilter={setSortApplyFilter}
              // setApplyFilter={setApplyFilter}
              ></Filter1>
            </p>
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
              className={`${isLoadingMore ? "w-[150px]" : "w-[150px]"
                } border border-[#707070] m-auto  rounded-md shadow hover:drop-shadow-lg p-2 bg-m-white flex justify-center items-center hover:cursor-pointer my-5`}
              onClick={loadMoreData}
            >
              <p className="block text-[#585757]  font-Semibold h-[23px]">
                {isLoadingMore ? "Loading..." : "View More"}
              </p>
            </span>
          )}
      </Filter>
      <BottomNav />
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      <Filter1 open={applySortFilter} setOpen={setSortApplyFilter} />
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

export default MakePage;

import {
  Heading,
  SellPhoneHeading1,
} from "@/components/elements/Heading/heading";
import Input from "@/components/Form/Input";
import React from "react";
import { useState } from "react";
import Header4 from "../../components/Header/header4";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addListingBrandSelector,
  addListingBrandState,
  addListingModelSelector,
  addListingModelState,
  addListingStorageState,
} from "atoms/globalState";
import { CardHeading4 } from "@/components/elements/CardHeading/cardheading";
import ModelPopup from "@/components/AddListing/ModelPopup";
import BrandPopup from "@/components/AddListing/BrandPopup";
import StorageInfo from "@/components/Popup/StorageInfo";
import { useEffect } from "react";
import {
  getExternalSellSourceData,
  getModelLists,
  getRecommandedPrice,
  searchFilter,
} from "api-call";
import Link from "next/link";
import { numberWithCommas } from "@/utils/util";
import useFilterOptions from "@/hooks/useFilterOptions";
import OtherListingCard from "@/components/Card/OtherListingCard";
import NoMatch from "@/components/NoMatch";

function Index() {
  const [defaultBrand, setDefaultBrand] = useRecoilState(addListingBrandState);
  const [defaultModel, setDefaultModel] = useRecoilState(addListingModelState);
  const [defaultStorage, setDefaultStorage] = useRecoilState(
    addListingStorageState
  );
  const [sellSelected, setSellSelected] = useState(true);
  const [openBrandPopup, setOpenBrandPopup] = useState(false);
  const selectedBrand = useRecoilValue(addListingBrandSelector);
  const [mktNameOpt, setMktNameOpt] = useState();
  const [make, setMake] = useState();
  const selectedModel = useRecoilValue(addListingModelSelector);
  const [model, setModel] = useState();
  const [bestDeals, setBestDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [otherListings, setOtherListings] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [modelInfo, setModelInfo] = useState();
  const [storageColorOption, setStorageColorOption] = useState();
  const [storage, setStorage] = useState();
  const [recommandedPrice, setRecommandedPrice] = useState();
  const [condition, setCondition] = useState();
  const [openModelPopup, setOpenModelPopup] = useState(false);
  const [openStorageInfo, setOpenStorageInfo] = useState(false);
  const [page, setPage] = useState(0);
  var type = ["old phone", "your"];
  const [getExternalSellerData, setGetExternalSellerData] = useState([]);
  const conditionList = ["Like New", "Excellent", "Good", "Fair"];
  const [loadingState, setLoadingState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  useEffect(() => {
    if (make) {
      setStorage();
      setStorageColorOption();
      setCondition();
      const interval = setInterval(() => {
        setDefaultModel("");
        setModel("");
        clearInterval(interval);
      }, 1000);
    }
  }, [make]);

  useEffect(() => {
    if (model) {
      setStorage();
      setCondition();
    }
  }, [model]);

  useEffect(() => {
    setIsFilterApplied(true);
    if (make && model && storage && condition) {
      if (make === "oneplus") {
        setMake("OnePlus");
      } else {
        setMake(make.charAt(0).toUpperCase() + make.slice(1));
      }
      let payLoad = {
        listingLocation: "India",
        make: [make],
        marketingName: [model.replace("+", "%2B")],
        reqPage: "BBNM",
        color: [],
        deviceCondition: [condition],
        deviceRam: [],
        deviceStorage: [storage.split("/")[0]],
        maxsellingPrice: 200000,
        minsellingPrice: 0,
        verified: "",
        warenty: [],
        pageNumber: 0,
      };
      searchFilter(
        payLoad,
        localStorage.getItem("userUniqueId") || "Guest",
        localStorage.getItem("sessionId") || "",
        0,
        "Featured"
      ).then((response) => {
        setOtherListings(response?.dataObject?.bestDeals);
        setOtherListings((otherListings) => [
          ...otherListings,
          ...response?.dataObject?.otherListings,
        ]);
        setLoading(false);
      });
    }
  }, [storage, condition]);
  const handleSelectChange = async (name) => {
    if (name === "make") {
      setMake(selectedBrand);
      const models3 = await getModelLists("", "", selectedBrand, "");
      setMktNameOpt(models3?.dataObject[0]?.models);
    } else if (name === "model") {
      setModel(selectedModel);
      let index = mktNameOpt?.findIndex(
        (i) => i.marketingname === selectedModel
      );
      if (mktNameOpt) {
        setStorageColorOption(mktNameOpt[index]);
      }
    } else if (name === "condition") {
      setCondition(e.value);
    } else {
      console.error(e);
    }
  };
  useEffect(() => {
    if (sellSelected) {
      let payload = {
        deviceStorage: storage?.toString().includes("/")
          ? storage?.split("/")[0]
          : storage,
        deviceRam: storage?.toString().includes("/")
          ? storage
            ?.toString()
            .split("/")[1]
            .toString()
            .replace(/GB/g, " GB")
            .replace(/RAM/, "")
            .trim()
          : "",
        make: make,
        marketingName: model,
        deviceCondition: "Like New",
        warrantyPeriod: "zero",
        hasCharger: "Y",
        hasEarphone: "Y",
        hasOriginalBox: "Y",
      };
      if (
        make !== null &&
        model !== null &&
        storage !== null &&
        make != undefined &&
        model != undefined &&
        storage != undefined
      ) {
        getExternalSellSourceData(payload).then((response) => {
          setGetExternalSellerData(response?.dataObject);
        });
      }
    }
  }, [make, model, storage]);

  useEffect(() => {
    if (sellSelected) {
      let reqParams = {
        make: make,
        marketingName: model,
        devicestorage: storage?.toString().includes("/")
          ? storage?.split("/")[0]
          : storage,
        deviceRam: storage?.toString().includes("/")
          ? storage
            ?.toString()
            .split("/")[1]
            .toString()
            .replace(/GB/g, " GB")
            .replace(/RAM/, "")
            .trim()
          : "",
        deviceCondition: "Like New",
        earPhones: "Y",
        charger: "Y",
        originalBox: "Y",
        warrantyPeriod: "zero",
        verified: "no",
      };
      if (make && model && storage) {
        getRecommandedPrice(reqParams).then(
          ({ dataObject }) => {
            setDefaultBrand(make);
            setDefaultModel(model);
            setDefaultStorage(storage);
            setRecommandedPrice(dataObject);
          },
          (err) => console.error(err)
        );
      }
    }
  }, [make, model, storage]);

  useEffect(() => {
    if (selectedBrand) {
      handleSelectChange("make");
    }
    if (selectedModel) {
      handleSelectChange("model");
    }
  }, [selectedBrand, selectedModel]);

  return (
    <>
      <Header4 title="Price Comparison" />
      <div className="flex justify-center items-center pt-4">
        <div
          className="pr-6"
          onClick={() => {
            setSellSelected(true);
            setMake("");
            setModel("");
            setStorage("");
            setCondition("");
            setStorageColorOption([]);
            setGetExternalSellerData([]);
            setRecommandedPrice([]);
            setDefaultBrand("");
            setDefaultModel("");
          }}
        >
          <button
            className={`${sellSelected == true
              ? "bg-primary py-1 w-32 h-9 border-2 rounded-lg border-primary text-yellow-fb text-smallFontSize self-center items-center font-Roboto-Semibold"
              : "bg-white py-1 w-32 h-9 border-2 rounded-lg border-primary text-primary text-smallFontSize self-center items-center font-Roboto-Semibold"
              }`}
          >
            Sell
          </button>
        </div>
        <div
          className="pl-6"
          onClick={() => {
            setSellSelected(false);
            setMake("");
            setModel("");
            setStorage("");
            setCondition("");
            setStorageColorOption([]);
            setOtherListings([]);
            setDefaultBrand("");
            setDefaultModel("");
          }}
        >
          <button
            className={`${sellSelected == false
              ? " bg-primary py-1 w-32 h-9 border-2 rounded-lg border-primary text-yellow-fb text-smallFontSize self-center items-center font-Roboto-Semibold"
              : " bg-white py-1 w-32 h-9 border-2 rounded-lg border-primary text-primary text-smallFontSize self-center items-center font-Roboto-Semibold"
              }`}
          >
            Buy
          </button>
        </div>
      </div>
      <div>
        <form
          className="grid grid-cols-1 space-y-4 container my-4"
          onSubmit={handleSubmit}
        >
          {page === 0 && (
            <>
              <div
                className="space-y-2"
              >
                <SellPhoneHeading1 title="Enter your Phone details" />

                <div className="space-y-nx"
                  onClick={() => {
                    setOpenBrandPopup(true);
                  }}
                >
                  <p className="pt-rx flex space-x-0.5">
                    <CardHeading4 title="Brand" />{" "}
                    <span className="text-red-400 -mt-1">*</span>
                  </p>
                  <Input
                    value={make}
                    disabled
                    placeholder="Please Select Brand "
                    type="text"
                    className="font-Regular  text-jx text-[#2C2F45]"
                  ></Input>
                </div>
              </div>
              {mktNameOpt && mktNameOpt.length > 0 && (
                <div
                  onClick={() => {
                    setOpenModelPopup(true);
                    setModelInfo();
                  }}
                  className="space-y-2"
                >
                  <div className="space-y-nx">
                    <p className="flex space-x-0.5">
                      <CardHeading4 title="Model" />{" "}
                      <span className="text-red-400 -mt-1">*</span>
                    </p>
                    <Input
                      value={model}
                      disabled
                      placeholder="Please Select Model "
                      type="text"
                      className="font-Regular  text-jx text-[#2C2F45]"
                    ></Input>
                  </div>
                </div>
              )}
              {storageColorOption && storageColorOption?.storage && (
                <div className="space-y-2">
                  <div className="space-y-nx">
                    <p className="flex space-x-0.5">
                      <CardHeading4 title="Storage Variant " />{" "}
                      <span className="text-red-400 -mt-1">*</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 ">
                    {storageColorOption &&
                      storageColorOption?.storage &&
                      storageColorOption.storage.map((item, index) => (
                        <div
                          className={`${storage == item
                            ? "bg-[#E8E8E8] font-Roboto-Semibold hover:border-primary text-jx opacity-bg-80 border-2 border-white text-[#2C2F45] opacity-100"
                            : "bg-white opacity-bg-50 opacity-70 border-2 border-[#2C2F45] border-opacity-40 ] "
                            }  active:bg-[#2C2F45] duration-300 p-2 flex items-center font-Regular rounded-[5px]  justify-center`}
                          onClick={() => setStorage(item)}
                          key={index}
                        >
                          <CardHeading4 title={item} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </form>
      </div>
      {sellSelected == false && storage && (
        <div className="space-y-2 px-4">
          <div className="space-y-nx">
            <p className="flex space-x-0.5">
              <CardHeading4 title="Condition " />{" "}
              <span className="text-red-400 -mt-1">*</span>
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 ">
            {conditionList &&
              conditionList.map((item, index) => (
                <div
                  className={`${condition == item
                    ? "bg-[#E8E8E8] font-Roboto-Semibold text-jx opacity-bg-80 border-2 border-white text-[#2C2F45] opacity-100"
                    : "bg-white opacity-bg-50 opacity-70 border-2 border-[#2C2F45] border-opacity-40 ] "
                    }  active:bg-[#2C2F45] duration-300 p-2 flex items-center font-Regular rounded-[5px]  justify-center`}
                  onClick={() => setCondition(item)}
                  key={index}
                >
                  <CardHeading4 title={item} />
                </div>
              ))}
          </div>
        </div>
      )}
      {storage && sellSelected && (
        <div className="text-sm bg-white border-[1px] border-primary flex justify-between p-2 rounded-md mx-4  ">
          <div className="">
            <span className="font-Roboto-Regular text-ex  m-auto justify-center text-primary">
              ORU Price
            </span>
            <br />
            {(recommandedPrice && recommandedPrice?.leastSellingprice && (
              <p className="font-Roboto-Bold text-[#2C2F45] text-px m-auto justify-center">
                <span className="mr-1 ">&#x20B9;</span>
                {recommandedPrice?.leastSellingprice} -
                {" " + recommandedPrice?.maxsellingprice}
              </p>
            )) || <p>--</p>}
          </div>
          <Link href={{ pathname: "/sell-old-refurbished-used-mobiles/add" }}>
            <div className="bg-primary py-2 px-9 text-white rounded-lg font-Roboto-Semibold">
              Sell Now
            </div>
          </Link>
        </div>
      )}
      <div className="px-2 pt-2  text-primary font-semibold">
        {getExternalSellerData &&
          getExternalSellerData.length > 0 &&
          sellSelected && <Heading title="Check prices from other buyers " />}
      </div>
      {getExternalSellerData &&
        getExternalSellerData.length > 0 &&
        sellSelected && (
          <div className=" pb-6 px-4">
            <div className="rounded-md mb-3 w-full space-y-2 ">
              {getExternalSellerData.map((items, index) => (
                <div
                  className="px-4 py-2 bg-[#F9F9F9] rounded-md flex justify-between w-full "
                  key={index}
                >
                  <p className="text-dx text-[#100] flex items-center font-Roboto-Semibold">
                    {items?.externalSourcePrice && (
                      <span className="font-normal mr-0.5"> ₹ </span>
                    )}
                    {numberWithCommas(items?.externalSourcePrice)}
                  </p>
                  <div className="">
                    <img
                      src={items?.externalSourceImage}
                      style={{
                        width: "auto",
                        height: 40,
                        backgroundSize: "auto",
                        backgroundOrigin: "content-box",
                      }}
                      alt={items?.externalSourceName}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {!sellSelected && otherListings && bestDeals && (
        <div>
          {!loading && storage && (
            <div className="text-lg font-semibold text-primary pt-2.5 px-4">
              <p>Best Deals</p>
            </div>
          )}
          {(!loading || otherListings?.length > 0) && (
            <div className="flex mt- pb-0">
              <p className="font-Roboto-Semibold text-[#707070]  text-cx  capitalize underline">
              </p>
            </div>
          )}
          {loading ? (
            <div></div>
          ) : (
            <section className="grid grid-cols-2 py-3">
              {otherListings &&
                otherListings?.map((item) => (
                  <div
                    key={item.listingId}
                    className="m-1.5"
                    onClick={() => {
                      setLoadingState(true);
                    }}
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
          <div className="-my-28">
            {!loading && otherListings?.length == 0 && make && model && storage && condition &&
              <NoMatch />}
          </div>
        </div>
      )}

      <ModelPopup
        open={openModelPopup}
        setOpen={setOpenModelPopup}
        mktNameOpt={mktNameOpt}
      />
      <BrandPopup open={openBrandPopup} setOpen={setOpenBrandPopup} />
      {openStorageInfo && (
        <StorageInfo
          open={openStorageInfo}
          setOpen={setOpenStorageInfo}
          brand={make}
        />
      )}
    </>
  );
}

export default Index;

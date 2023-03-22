import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import MySelect from "./Select";
import ImageInput from "./ImageInput";
import Input from "./Input";
import {
  getRecommandedPrice,
  saveLisiting,
  uploadImage,
  getExternalSellSourceData,
  getGlobalCities,
  marketingNameByModel,
  getModelLists,
} from "api-call";
import { useAuthState, useAuthDispatch } from "providers/AuthProvider";
import { numberWithCommas, numberFromString } from "@/utils/util";
import ListingAdded from "../Popup/ListingAdded";
import CB from "../Form/Checkbox";
import ConditionInfo from "../Popup/ConditionInfo";
import router, { useRouter } from "next/router";
import LoginPopup from "../Popup/LoginPopup";
import BrandPopup from "../AddListing/BrandPopup";
import ModelPopup from "../AddListing/ModelPopup";

import LeftArrow from "@/assets/leftarrow.svg";
import ArrowBack from "@/assets/chevronleft.svg";
import ArrowForward from "@/assets/rightarrow.svg";

import CurrentLocation from "@/assets/currentlocation.svg";

const VerifyFlowPopup = dynamic(() =>
  import("@/components/Popup/VerifyFlowPopup")
);

import {
  addListingBrandSelector,
  addListingModelSelector,
  addListingBrandState,
  addListingModelState,
  addListingStorageSelector,
} from "../../atoms/globalState";
import { useRecoilState, useRecoilValue } from "recoil";
import { deviceConditionQuestion } from "@/utils/constant";
import ConditionOptionLarge from "../Condition/ConditionOptionLarge";
import DeviceConditionCard from "../Condition/DeviceConditionCard";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import StorageInfo from "../Popup/StorageInfo";
import Spinner from "../Loader/Spinner";
import Geocode from "react-geocode";
import Cookies from "js-cookie";
import { getCityFromResponse } from "@/utils/util";
import {
  CardHeading4,
  CardHeading3,
  PanelHeading,
} from "@/components/elements/CardHeading/cardheading.js";
import VerifyListingPopup from "../Popup/VerifyListingPopup";
import PricePopup from "../Popup/PricePopup";
import { Heading, SellPhoneHeading1 } from "../elements/Heading/heading";
import UnverifiedListingPopup from "../Popup/UnverifiedListingPoup";
import Input3 from "./input3";
import TermsconditionPopup from "../Popup/TermsconditionPopup";

const initialState = [{ panel: "front" }, { panel: "back" }];

const NewAddListingForm = ({ data }) => {
  const deviceWarrantyCheck = [
    { value: "zero", label: "0-3 Months Ago" },
    { value: "four", label: "4-6 Months Ago" },
    { value: "seven", label: "7-11 Months Ago" },
    { value: "more", label: "More Than 11 Months Ago" },
  ];

  const router = useRouter();
  const [defaultBrand, setDefaultBrand] = useRecoilState(addListingBrandState);
  const [defaultModel, setDefaultModel] = useRecoilState(addListingModelState);
  const selectedStorage = useRecoilValue(addListingStorageSelector);
  const selectedBrand = useRecoilValue(addListingBrandSelector);
  const selectedModel = useRecoilValue(addListingModelSelector);
  const [make, setMake] = useState(selectedBrand);
  const [model, setModel] = useState(selectedModel);
  const [color, setColor] = useState();
  const [storage, setStorage] = useState();
  const [condition, setCondition] = useState();
  const [charging, setCharging] = useState(false);
  const [headphone, setHeadphone] = useState(false);
  const [originalbox, setOriginalbox] = useState(false);
  const [recommandedPrice, setRecommandedPrice] = useState();
  const [inputUsername, setInputUsername] = useState("");
  const [inputSellPrice, setInputSellPrice] = useState("");
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [mktNameOpt, setMktNameOpt] = useState();
  const [termsAndCondition, setTermsAndCondition] = useState(true);
  const [images, setImages] = useState(initialState);
  const [storageColorOption, setStorageColorOption] = useState();
  const [getExternalSellerData, setGetExternalSellerData] = useState([]);
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openStorageInfo, setOpenStorageInfo] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [sellValueRequired, setSellValueRequired] = useState("");
  const [nameValueRequired, setNameValueRequired] = useState("");
  const [listingAdded, setListingAdded] = useState(false);
  const [Open, setOpen] = useState(false);

  const { user, authenticated, loading, selectedSearchCity } = useAuthState();

  const [makeRequired, setMakeRequired] = useState("");
  const [marketingNameRequired, setMarketingNameRequired] = useState("");
  const [storageRequired, setStorageRequired] = useState("");
  const [deviceConditionRequired, setDeviceConditionRequired] = useState("");
  const [locationRequired, setLocationRequired] = useState("");
  const [showTCPopUp, setShowTCPopup] = useState(false);
  const [globalCities, setGlobalCities] = useState();
  const userSelectedLocation =
    selectedSearchCity === "India" ? "" : selectedSearchCity;
  const [selectedCity, setSelectedCity] = useState(userSelectedLocation);

  const dispatch = useAuthDispatch();

  const [conditionResults, setConditionResults] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imageIndex, setImageIndex] = useState();

  const [warranty, setWarranty] = useState("more");
  const [showWarranty, setShowWarranty] = useState(false);
  const [isGettingPrice, setIsGettingPrice] = useState(false);

  const [openBrandPopup, setOpenBrandPopup] = useState(false);
  const [openModelPopup, setOpenModelPopup] = useState(false);

  const [modelInfo, setModelInfo] = useState();
  const [page, setPage] = useState(0);
  const [openVerifyFlow, setOpenVerifyFlow] = useState(false);
  const [openPricePopup, setOpenPricePopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verifySubmit, setVerifySubmit] = useState(false);
  const [verifyListingAdded, setVerifyListingAdded] = useState(false);
  const [unverifiedListing, setUnverifiedListing] = useState(false);
  const [unverifiedListingType, setUnverifiedListingType] = useState("");
  const [unverifiedListingReason, setUnverifiedListingReason] = useState("");
  const [performAction, setPerformAction] = useState(false);
  var sellValueTag = document.querySelector("#sellValue") || "";
  var sellValue = sellValueTag.value || "";

  var type = ["old phone", "your"];
  const soldout = `bestdeals buy ${
    type[Math.floor(Math.random() * type.length)]
  } ${data?.marketingName} ${data?.deviceStorage} ${
    data?.deviceCondition
  } soldout`.toLowerCase();

  useEffect(() => {
    if (make) {
      setDefaultModel("");
      setModel("");
      setColor();
      setStorage();
      setStorageColorOption();

      setCondition();
      setConditionResults({});
      setQuestionIndex(0);
    }
  }, [make]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cities"))?.length > 0) {
      setGlobalCities(JSON.parse(localStorage.getItem("cities")));
    } else {
      getGlobalCities("", Cookies.get("sessionId")).then((response) => {
        setGlobalCities(response.dataObject);
      });
    }
  }, []);

  useEffect(() => {
    if (model) {
      setColor();
      setStorage();
      setCondition();
      setConditionResults({});
      setQuestionIndex(0);
    }
  }, [model]);

  useEffect(() => {
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
      deviceCondition: condition,
      warrantyPeriod: warranty,
      hasCharger: headphone ? "Y" : "N",
      hasEarphone: charging ? "Y" : "N",
      hasOriginalBox: originalbox ? "Y" : "N",
    };
    if (
      make !== null &&
      model !== null &&
      storage !== null &&
      condition !== null &&
      make != undefined &&
      model != undefined &&
      storage != undefined &&
      condition != undefined
    ) {
      getExternalSellSourceData(payload, Cookies.get("sessionId")).then(
        (response) => {
          setGetExternalSellerData(response?.dataObject);
        }
      );
    }
  }, [
    make,
    model,
    storage,
    condition,
    headphone,
    charging,
    originalbox,
    warranty,
  ]);

  useEffect(() => {
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
      deviceCondition: condition,
      earPhones: headphone ? "Y" : "N",
      charger: charging ? "Y" : "N",
      originalBox: originalbox ? "Y" : "N",
      warrantyPeriod: warranty,
      verified: "no",
    };
    if (
      make &&
      model &&
      storage &&
      condition &&
      (charging || headphone || originalbox || warranty || true)
    ) {
      getRecommandedPrice(reqParams, Cookies.get("sessionId")).then(
        ({ dataObject }) => {
          setRecommandedPrice(dataObject);
        }
      );
    }
  }, [
    make,
    model,
    storage,
    condition,
    charging,
    headphone,
    originalbox,
    warranty,
  ]);

  useEffect(() => {
    let check = true;
    const interval = setInterval(async () => {
      if (
        selectedBrand &&
        selectedModel &&
        selectedStorage &&
        selectedBrand != undefined &&
        selectedModel != undefined &&
        selectedStorage != undefined
      ) {
        setMake(selectedBrand);
        setModel(selectedModel);
        if (check) {
          setModel(selectedModel);
        }
        const models3 = await getModelLists(
          Cookies.get("userUniqueId") || 0,
          Cookies.get("sessionId"),
          selectedBrand,
          ""
        );
        setMktNameOpt(models3?.dataObject[0]?.models);
        setStorageColorOption(
          models3?.dataObject[0]?.models?.find(
            (i) => i.marketingname == selectedModel
          )
        );
      }
      clearInterval(interval);
    }, 1000);
  }, []);

  const handleSelectChange = async (name) => {
    if (name === "make") {
      setMake(selectedBrand);
      const models3 = await getModelLists(
        Cookies.get("userUniqueId") || 0,
        Cookies.get("sessionId"),
        selectedBrand,
        ""
      );
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
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        openLoginPopup == false &&
        performAction == true &&
        Cookies.get("userUniqueId") != undefined
      ) {
        completeListing();
        setPerformAction(true);
        clearInterval(interval);
      }
    }, 1000);
  }, [openLoginPopup]);

  const completeListing = () => {
    let payload = {
      make,
      color,
      marketingName: model,
      deviceStorage: storage.toString().split("/")[0].toString().trim(),
      deviceRam: storage
        .toString()
        .split("/")[1]
        .toString()
        .replace(/GB/g, " GB")
        .replace(/RAM/, "")
        .trim(),
      deviceCondition: condition,
      listingPrice: inputSellPrice.trim(),
      listingLocation: selectedCity,
      listedBy: inputUsername || user?.userdetails?.userName || "",
      platform: "mobWeb",
      charger: charging ? "Y" : "N",
      earphone: headphone ? "Y" : "N",
      originalbox: originalbox ? "Y" : "N",
      userUniqueId: Cookies.get("userUniqueId"),
      images: images.filter(
        (item) => item?.fullImage && item.fullImage !== null
      ),
      model: model,
      cosmetic: conditionResults,
      warranty: warranty,
    };
    saveLisiting(payload, Cookies.get("sessionId")).then((res) => {
      if (verifySubmit === true) {
        setVerifyListingAdded(true);
      } else {
        if (res.type != null && res.type != "") {
          setUnverifiedListingReason(res.reason);
          setUnverifiedListingType(res.type);
          setUnverifiedListing(true);
        } else {
          setListingAdded(true);
        }
      }
      dispatch("REFRESH");
    });
  };

  const handleImageChange = async (e, index) => {
    setIsUploading(true);
    const { name, files } = e.target;
    if (files && files.length) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(files[0], options);

      let formData = new FormData();
      formData.append("image", compressedFile);
      uploadImage(
        formData,
        {
          deviceFace: name,
          deviceStorage: storage?.toString().includes("/")
            ? storage?.split("/")[0]
            : storage,
          make,
          model,
          userUniqueId: user?.userdetails?.userUniqueId || "Guest",
        },
        Cookies.get("sessionId")
      ).then(({ status, dataObject }) => {
        if (status === "SUCCESS") {
          let tempImages = [...images];
          tempImages[index] = {
            ...tempImages[index],
            thumbImage: dataObject?.thumbnailImagePath,
            fullImage: dataObject?.imagePath,
          };
          setImages(tempImages);
          setIsUploading(false);
        }
      });
    }
  };

  const clearImage = (e, index) => {
    e.preventDefault();
    let tempImages = [...images];
    tempImages[index] = { ...tempImages[index], thumbImage: "", fullImage: "" };
    setImages(tempImages);
  };

  const onLocChange = async (e) => {
    const citiesResponse = await getGlobalCities(e, Cookies.get("sessionId"));
    setGlobalCities(citiesResponse?.dataObject);
  };

  useEffect(() => {
    if (selectedBrand) {
      handleSelectChange("make");
    }
    if (selectedModel) {
      handleSelectChange("model");
    }
  }, [selectedBrand, selectedModel, data]);

  useEffect(() => {
    if (make && model && storage) {
      setIsGettingPrice(true);
      let payload = {
        deviceStorage: storage?.toString().includes("/")
          ? storage?.split("/")[0]
          : storage,
        make: make,
        marketingName: model,
        model: "",
        ram: storage?.toString().includes("/")
          ? storage
              ?.toString()
              .split("/")[1]
              .toString()
              .replace(/GB/g, " GB")
              .replace(/RAM/, "")
              .trim()
          : "",
      };
      marketingNameByModel(payload, Cookies.get("sessionId")).then(
        ({ dataObject }) => {
          setModelInfo(dataObject);
          setIsGettingPrice(false);
        }
      );
    }
  }, [storage]);

  const [location, setLocation] = useState({
    loaded: false,
    city: "",
  });

  const handleNearme = async (e) => {
    e.preventDefault();
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  };

  const onSuccess = async (location) => {
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    Geocode.setApiKey("AIzaSyAh6-hbxmUdNaznjA9c05kXi65Vw3xBl3w");

    Geocode.setLanguage("en");
    Geocode.enableDebug();
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        let address = response?.plus_code?.compound_code;
        address = getCityFromResponse(address);
        setLocation({
          loaded: true,
          city: address,
        });
        setSelectedCity(address);
      },
      (error) => {
        setLocation({
          loaded: true,
          city: "India",
        });
        setSelectedCity("India");
      }
    );
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      city: "India",
    });
    setOpen(false);
  };

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  useEffect(() => {
    if (location.loaded && location.city && location.city.length > 0) {
      if (authenticated && user) {
        let searchID = 0;
        let searchLocId = user?.address?.filter((items) => {
          return items.addressType === "SearchLocation";
        });
        if (searchLocId) {
          searchID = searchLocId[0]?.locationId;
        }
      }
      dispatch("ADDCITY", location.city);
      localStorage.setItem("usedLocation", location.city);
    }
  }, [location]);

  useEffect(
    (e) => {
      if (submitting === true) {
        submit();
      }
    },
    [submitting]
  );

  async function submit() {
    sellValueTag = document.querySelector("#sellValue");
    sellValue = sellValueTag.value;

    if (
      (sellValue <
        (recommandedPrice && recommandedPrice?.leastSellingprice * 0.7) ||
        sellValue >
          (recommandedPrice && recommandedPrice?.maxsellingprice * 1.2)) &&
      recommandedPrice?.leastSellingprice != "-" &&
      recommandedPrice?.maxsellingprice != "-" &&
      submitting != true
    ) {
      setOpenPricePopup(true);
      if (submitting === false) {
        return;
      }
    }
    var inputNameTag = document.querySelector("#inputName");
    var inputName = inputUsername || user?.userdetails?.userName;

    if (
      selectedCity === undefined ||
      selectedCity === "" ||
      selectedCity === "India" ||
      make === undefined ||
      model === undefined ||
      storage === undefined ||
      condition === undefined ||
      !sellValue ||
      (sellValue && sellValue.trim() < 1000) ||
      !inputName
    ) {
      if (make === undefined) {
        window.scroll(0, 0);
        setMakeRequired("border-red");
      }
      if (model === undefined) {
        window.scroll(0, 0);
        setMarketingNameRequired("border-red");
      }
      if (storage === undefined) {
        window.scroll(0, 0);
        setStorageRequired("border-red");
      }
      if (condition === undefined) {
        window.scroll(0, 0);
        setDeviceConditionRequired("border-red");
      }
      if (
        selectedCity === "" ||
        selectedCity === "India" ||
        selectedCity === undefined
      ) {
        window.scroll(0, 1000);
        setLocationRequired("border-red");
      }
      if (!sellValue || sellValue < 1000) {
        setSellValueRequired("border-red");
      }
      if (!inputName || inputName === "") {
        setNameValueRequired("border-red");
      }
    } else if (!loading && !authenticated) {
      setOpenLoginPopup(true);
      setPerformAction(true);
    } else if (authenticated && performAction == false) {
      completeListing();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const calculateDeviceCondition = () => {
    if (conditionResults[0].toString() == "No") {
      setCondition("Needs Repair");
      setConditionResults({ 0: "No" });
    } else if (
      conditionResults[1].toString().includes("Has significant scratches") ||
      conditionResults[2].toString().includes("Has significant scratches")
    ) {
      setCondition("Fair");
    } else if (
      conditionResults[1].toString().includes("Up to 5") ||
      conditionResults[2].toString().includes("Up to 5")
    ) {
      setCondition("Good");
    } else if (
      conditionResults[1].toString().includes("Up to 2") ||
      conditionResults[2].toString().includes("Up to 2")
    ) {
      setCondition("Excellent");
    } else if (
      conditionResults[1].toString().includes("No scratch") ||
      conditionResults[2].toString().includes("No scratch")
    ) {
      setCondition("Like New");
    } else {
      setCondition("Good");
    }
  };

  const handleBack = () => {
    if (conditionResults[0] == "No") {
      setPage(page - 1);
      setQuestionIndex(0);
    } else {
      if ((questionIndex == 0 || page > 2) && conditionResults[0] != "No") {
        setPage(page - 1);
      } else {
        setQuestionIndex(questionIndex > 0 ? questionIndex - 1 : 0);
      }
    }
  };

  const handleForward = () => {
    questionIndex in conditionResults
      ? setQuestionIndex(
          questionIndex < deviceConditionQuestion.length - 1
            ? questionIndex + 1
            : deviceConditionQuestion.length - 1
        )
      : toast.warning("Please select condition", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: "007",
        });
    if (String(conditionResults[0]) == "No") {
      calculateDeviceCondition();
      setPage(page + 1);
    } else {
      questionIndex == deviceConditionQuestion.length - 1 &&
        calculateDeviceCondition();
      questionIndex == deviceConditionQuestion.length - 1 && setPage(page + 1);
    }
  };

  useEffect(() => {
    setModel("");
    setMake("");
    setDefaultModel("");
    setDefaultBrand("");
  }, [router.pathname]);

  return (
    <Fragment>
      <header
        className={`flex  p-4 py-3 bg-[#2C2F45] rounded-b-xl text-white text-lg relative`}
      >
        {router.pathname !== "/" && (
          <Image
            src={LeftArrow}
            width={22}
            height={22}
            className="cursor-pointer"
            onClick={() => {
              page == 2 || page == 3
                ? handleBack()
                : page != 0
                ? setPage(page - 1)
                : router.back();
            }}
          />
        )}
        {
          <h1 className="m-auto flex justify-center font-Roboto-Regular text-dx text-[#FFFFFF]">
            Sell Your Phone
          </h1>
        }
      </header>
      <form
        className="grid grid-cols-1 space-y-4 container my-4"
        onSubmit={handleSubmit}
      >
        {page === 0 && (
          <>
            <div
              onClick={() => {
                setOpenBrandPopup(true);
                setModelInfo();
              }}
              className="space-y-2"
            >
              <div className="m-auto pl-28 pb-px mb-4 border-b ">
                <Image
                  quality={25}
                  src={
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/icons/phone.svg"
                  }
                  width={120}
                  height={200}
                  alt={` sell ${
                    type[Math.floor(Math.random() * type.length)]
                  } ${model} ${storage} like new`.toLowerCase()}
                />
              </div>

              <SellPhoneHeading1 title="Enter your Phone details" />

              <div className="space-y-nx">
                <p className="pt-rx flex space-x-0.5">
                  <CardHeading4 title="Brands" />{" "}
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
                        className={`${
                          storage == item
                            ? "bg-[#E8E8E8] font-Roboto-Semibold text-jx opacity-bg-80 border-2 border-white text-[#2C2F45] opacity-100"
                            : "bg-white opacity-bg-50 opacity-70 border-2 border-[#2C2F45] border-opacity-40 ] "
                        }  active:bg-[#2C2F45] duration-300 p-2 flex items-center font-Regular rounded-[5px]  justify-center`}
                        onClick={() => setStorage(item)}
                        key={index}
                      >
                        <CardHeading4 title={item} />
                      </div>
                    ))}
                </div>
                <p
                  className="text-sm whitespace-nowrap underline cursor-pointer text-primary hover:text-blue-800"
                  onClick={() => setOpenStorageInfo(true)}
                >
                  How to check?
                </p>
              </div>
            )}
            {modelInfo && !isGettingPrice && (
              <div className="border-t-2 border-b-2 py-[24px]">
                <p className=" flex space-x-2 ">
                  <div className="font-Regular self-center  text-mx text-[#2C2F45]">
                    Get up to:
                  </div>
                  <div className="font-Roboto-Bold text-qx  text-[#4CAF50]">
                    {" "}
                    ₹{modelInfo?.price}
                  </div>
                </p>
                <div className="font-Roboto-Regular text-mx text-primary-light">
                  <b>
                    <u>Disclaimer</u>
                  </b>
                  :- Price shown here are indicative and only for reference
                  purposes. Also, these prices are based on current market
                  conditions and are likely to change from time to time.
                </div>
              </div>
            )}

            {isGettingPrice && (
              <div className="py-5 flex justify-center">
                <Spinner />
              </div>
            )}
            <span className="pb-20" />
          </>
        )}

        {page === 1 && (
          <>
            {modelInfo && (
              <div className="relative p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  quality={25}
                  src={
                    modelInfo?.imagePath ||
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                  }
                  className=""
                  alt={`sell ${
                    type[Math.floor(Math.random() * type.length)]
                  } ${model} ${storage} like new `.toLowerCase()}
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="RAM :" />
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceRam?.split("/")[1] ||
                        storage
                          ?.toString()
                          .split("/")[1]
                          .toString()
                          .replace(/GB/g, " GB")
                          .replace(/RAM/, "")
                          .trim()}
                    </div>
                  </p>

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="Storage : " />{" "}
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                </div>
              </div>
            )}
            <div>
              <div className="py-rx">
                <SellPhoneHeading1 title="Do you have the followings?" />
              </div>
              <div className="grid grid-cols-2 gap-4 ">
                <Checkbox
                  src={
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/charging-station.svg"
                  }
                  text="Original Charger"
                  onChange={() => setCharging((prev) => !prev)}
                  checked={charging}
                />
                <Checkbox
                  src={
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/headphones-line.svg"
                  }
                  text="Original Earphones"
                  onChange={() => setHeadphone((prev) => !prev)}
                  checked={headphone}
                />
                <Checkbox
                  src={
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/box.svg"
                  }
                  text="Original Box"
                  onChange={() => setOriginalbox((prev) => !prev)}
                  checked={originalbox}
                />
                <Checkbox
                  src={
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/original-bill.svg"
                  }
                  text="Original Bill"
                  onChange={() => {
                    setShowWarranty((prev) => !prev);
                    setWarranty("more");
                  }}
                  checked={showWarranty}
                />
              </div>
              {showWarranty && (
                <>
                  <p className="font-Roboto-Light text-[#2C2F45] text-mx mt-5 border-b pb-1">
                    What is your mobile age?
                  </p>
                  <div className="my-5 grid grid-cols-2 gap-5">
                    {deviceWarrantyCheck?.map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          warranty == item?.value
                            ? "bg-[#F3F3F3] text-[#2C2F45] border-2 border-[#F3F3F3] font-Roboto-Light text-mx"
                            : "opacity-60 border-2 border-[#9597A2] font-Roboto-Light text-mx "
                        } py-3 px-5 rounded-md font-Roboto-Light text-mx hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 duration-300  flex items-center justify-start text-sm`}
                        onClick={() => setWarranty(item.value)}
                      >
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <span className="pb-20" />
          </>
        )}

        {page === 2 && (
          <>
            {modelInfo && (
              <div className="relative p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  quality={25}
                  src={
                    modelInfo?.imagePath ||
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                  }
                  className=""
                  alt={` sell ${
                    type[Math.floor(Math.random() * type.length)]
                  } ${model} ${storage} like new `.toLowerCase()}
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="RAM :" />
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceRam?.split("/")[1] ||
                        storage
                          ?.toString()
                          .split("/")[1]
                          .toString()
                          .replace(/GB/g, " GB")
                          .replace(/RAM/, "")
                          .trim()}
                    </div>
                  </p>

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="Storage : " />{" "}
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                </div>
              </div>
            )}

            <div>
              <SellPhoneHeading1
                title={deviceConditionQuestion[questionIndex]?.title}
              />
              {deviceConditionQuestion[questionIndex]?.options?.map(
                (item, index) => (
                  <div
                    onClick={() => {
                      setConditionResults((prev) => {
                        return {
                          ...prev,
                          [questionIndex]: item?.title,
                        };
                      });
                    }}
                    key={index}
                  >
                    <ConditionOptionLarge
                      title={item?.title}
                      options={item?.options}
                      conditionResults={conditionResults}
                      questionIndex={questionIndex}
                    />
                  </div>
                )
              )}
            </div>
            <span className="pb-20" />
          </>
        )}

        {page === 3 && (
          <>
            {modelInfo && (
              <div className="relative p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  quality={25}
                  src={
                    modelInfo?.imagePath ||
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                  }
                  className=""
                  alt={` sell ${
                    type[Math.floor(Math.random() * type.length)]
                  } ${model} ${storage} `.toLowerCase()}
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="RAM :" />
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceRam?.split("/")[1] ||
                        storage
                          ?.toString()
                          .split("/")[1]
                          .toString()
                          .replace(/GB/g, " GB")
                          .replace(/RAM/, "")
                          .trim()}
                    </div>
                  </p>

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="Storage : " />{" "}
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                </div>
              </div>
            )}
            <>
              <DeviceConditionCard
                condition={condition}
                answer={conditionResults}
              />
            </>
            <SellPhoneHeading1 title="Upload Photos" />
            <div className="grid grid-cols-2 relative">
              <div className="flex justify-center font-Roboto-Semibold text-cx text-gray-600">
                Product Image
              </div>
              <div className="flex justify-center font-Roboto-Semibold text-cx text-gray-600">
                Product Image
              </div>
              {images.map((item, index) => (
                <div
                  key={index}
                  className="relative pt-4 item-center even:ml-2 odd:mr-2 mb-2  rounded-md bg-[#E8E8E8]"
                >
                  <ImageInput
                    type="file"
                    preview={item?.fullImage}
                    name={item?.panel}
                    onChange={(e) => {
                      handleImageChange(e, index);
                      setImageIndex(index);
                    }}
                    clearImage={(e) => clearImage(e, index)}
                    accept="image/*"
                    clickIndex={imageIndex}
                    loading={isUploading}
                    index={index}
                  />
                </div>
              ))}
              {images && images.length < 8 && (
                <span
                  className="absolute -bottom-6 text-sm right-0 pr-2 font-Roboto-Regular text-[#2C2F45] cursor-pointer"
                  onClick={() =>
                    setImages((prev) => [
                      ...prev,
                      { panel: images.length > 1 && images.length - 1 },
                      { panel: images.length > 1 && images.length },
                    ])
                  }
                >
                  + Add more
                </span>
              )}
            </div>
            <span className="pb-20" />
          </>
        )}

        {page === 4 && (
          <>
            {modelInfo && (
              <div className="relative p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  quality={25}
                  src={
                    modelInfo?.imagePath ||
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                  }
                  className=""
                  alt={` sell ${
                    type[Math.floor(Math.random() * type.length)]
                  } ${model} ${storage} ${condition} `.toLowerCase()}
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="RAM :" />
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceRam?.split("/")[1] ||
                        storage
                          ?.toString()
                          .split("/")[1]
                          .toString()
                          .replace(/GB/g, " GB")
                          .replace(/RAM/, "")
                          .trim()}
                    </div>
                  </p>

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="Storage : " />{" "}
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                </div>
              </div>
            )}
            <>
              <DeviceConditionCard
                condition={condition}
                answer={conditionResults}
              />
            </>
            <div className="relative">
              <div className="space-y-1 text-jx text-[#92949F] font-Regular">
                <p className="flex  space-x-1">
                  {" "}
                  <CardHeading4 title="Name" />{" "}
                  <span className="text-[#F9C414]">*</span>
                </p>
                <Input
                  id="inputName"
                  defaultValue={user?.userdetails?.userName}
                  placeholder="Enter seller name ex: Ram, Mega Traders etc"
                  onChange={(e) => {
                    setInputUsername(e.target.value);
                    setNameValueRequired("");
                  }}
                  type="text"
                  maxLength="30"
                  errorClass={`border ${nameValueRequired}`}
                  disabled={user?.userdetails?.userName ? true : false}
                ></Input>
                {nameValueRequired && (
                  <span className="text-red text-sm absolute -bottom-6">
                    Please enter your name first
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="space-y-1 text-jx font-Regular mt-2">
                <p className="flex space-x-1">
                  <CardHeading4 title="Location" />{" "}
                  <span className="text-[#F9C414]">*</span>
                </p>
              </div>
              <div className="flex w-full justify-center items-center mt-1">
                <MySelect
                  placeholder={selectedCity}
                  value={selectedCity}
                  className={`${locationRequired}  text-jx text-Regular`}
                  onFocus={(e) => {
                    setLocationRequired("");
                    onLocChange("");
                  }}
                  onChange={(e) => {
                    setSelectedCity(e.value);
                  }}
                  onInputChange={(e) => {
                    onLocChange(e);
                  }}
                  options={globalCities
                    ?.sort((a, b) => a.city.localeCompare(b.city))
                    ?.filter((item) => item.city != "India")
                    .map((items) => {
                      return { label: items.city, value: items.city };
                    })}
                />
                <div
                  className="h-10 w-16 bg-gray-200 rounded-r-lg -ml-1 inline-flex justify-center items-center hover:cursor-pointer"
                  onClick={handleNearme}
                >
                  <Image src={CurrentLocation} width={24} height={24} />
                </div>
              </div>
              <div
                className="flex flex-row pt-3 text-mx w-full font-Roboto-Semibold"
                onClick={handleNearme}
              >
                <Image src={CurrentLocation} width={20} height={20} />
                <div className="pl-1 pt-0.5">Use Your Current Location</div>
              </div>
              {locationRequired && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red">
                  Please select this field
                </p>
              )}
            </div>
            <span className="pb-40" />
          </>
        )}

        {page === 5 && (
          <>
            {modelInfo && (
              <div className="relative p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  quality={25}
                  src={
                    modelInfo?.imagePath ||
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                  }
                  className=""
                  alt={` sell ${
                    type[Math.floor(Math.random() * type.length)]
                  } ${model} ${storage} ${condition} `.toLowerCase()}
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="RAM :" />
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceRam?.split("/")[1] ||
                        storage
                          ?.toString()
                          .split("/")[1]
                          .toString()
                          .replace(/GB/g, " GB")
                          .replace(/RAM/, "")
                          .trim()}
                    </div>
                  </p>

                  <p className="flex space-x-1">
                    <span>
                      <CardHeading4 title="Storage : " />{" "}
                    </span>{" "}
                    <div className="font-Roboto-Bold text-jx text-[#2C2F45] pt-0.5">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                </div>
              </div>
            )}

            <DeviceConditionCard
              condition={condition}
              answer={conditionResults}
            />
            <p className="flex space-x-1 pt-4">
              <SellPhoneHeading1 title="Enter your sell price " />
              <span className="text-red-400">*</span>
            </p>
            <div className="grid grid-cols-7 gap-4 relative">
              <Input3
                id="sellValue"
                prefix={"₹"}
                pattern="[0-9]*"
                type="text"
                inputClass="text-[24px] text-[#2C2F45] pl-1 font-bold"
                className={`h-full col-span-4 text-qx font-bold  `}
                errorClass={`border ${sellValueRequired}`}
                onChange={(e) => {
                  setInputSellPrice(e.target.value);
                  setSellValueRequired("");
                }}
              ></Input3>

              <div className="text-sm bg-[#E8E8E8] col-span-3 px-2 py-1 rounded-md -ml-1 relative  ">
                <div className="m-auto">
                  <span className="font-semibold text-jx opacity-50 m-auto justify-center text-[#2C2F45]">
                    Recommended Price
                  </span>
                  <br />
                  {(recommandedPrice && recommandedPrice?.leastSellingprice && (
                    <p className="font-bold text-[#2C2F45] text-ex m-auto justify-center">
                      <span className="mr-1">&#x20B9;</span>
                      {recommandedPrice?.leastSellingprice} -
                      {" " + recommandedPrice?.maxsellingprice}
                    </p>
                  )) || <p>--</p>}
                </div>
              </div>
            </div>
            {sellValueRequired && (
              <span className="text-red text-sm ">
                Enter price more than ₹1000
              </span>
            )}
            <div className="flex">
              <CB
                checked={termsAndCondition}
                onChange={(e) => setTermsAndCondition(e.target.checked)}
              >
                <label
                  className=" underline font-Light text-mx cursor-pointer"
                  onClick={() => setShowTCPopup(true)}
                >
                  Accept terms and conditions
                </label>
              </CB>
            </div>
            {getExternalSellerData && getExternalSellerData.length > 0 && (
              <Heading title="Price from other vendors :" />
            )}
            {getExternalSellerData && getExternalSellerData.length > 0 && (
              <div className="border-b-2 pb-6">
                <div className="rounded-md  mb-3 w-full space-y-2 ">
                  {getExternalSellerData.map((items, index) => (
                    <div
                      className="px-4 py-2 bg-[#F9F9F9] rounded-md   flex  justify-between w-full"
                      key={index}
                    >
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
                      <p className="text-dx text-[#100] flex items-center font-Roboto-Semibold">
                        {items?.externalSourcePrice && (
                          <span className="font-normal mr-0.5"> ₹ </span>
                        )}
                        {numberWithCommas(items?.externalSourcePrice)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="uppercase rounded py-3 text-[#2C2F45] font-Roboto-Regular bg-[#F3F3F3] "
              disabled={!termsAndCondition}
            >
              SUBMIT AS UNVERIFIED
            </button>

            <div className="text-center font-[Segoe UI] text-mx ">
              <p className="underline text-[#2C2F45]">or</p>
            </div>

            <button
              className="w-full uppercase rounded py-3 text-center text-dx text-[#FFFFFF] font-Regular bg-[#2C2F45] m-auto "
              disabled={!termsAndCondition}
              onClick={(e) => {
                if (authenticated) {
                  setVerifySubmit(true);
                }
              }}
            >
              TAKE ME TO VERIFICATION
            </button>
            <div className="h-10" />
          </>
        )}
      </form>

      <div className="bg-white flex items-center justify-between py-3 px-5 z-50 fixed bottom-0 w-full">
        <div
          className={`bg-white px-5 py-2 text-center text-black font-semibold rounded-md
        border-2 border-gray-200 items-center duration-300 flex justify-center space-x-5`}
          onClick={() => {
            if (page == 3 || page == 2) {
              handleBack();
            } else if (page != 0) {
              setPage(page - 1);
            }
          }}
        >
          <Image src={ArrowBack} width={15} height={15} />
          <span>Back</span>
        </div>
        <div
          className={`bg-[#2C2F45] items-center  text-center px-5 py-2  text-white font-semibold rounded-md border-2 border-[#2C2F45] duration-300 flex justify-center space-x-5 ${
            page === 5 ? "hidden" : ""
          }`}
          onClick={() => {
            if (page == 0) {
              if (
                make !== null &&
                model !== null &&
                storage !== null &&
                make != undefined &&
                model != undefined &&
                storage != undefined
              ) {
                setPage(page + 1);
              } else {
                toast.warning(
                  `${
                    make == ""
                      ? "Please select a brand"
                      : model == ""
                      ? "Please select a model"
                      : "Please select a storage variant"
                  }`,
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    limit: 0,
                    toastId: "001",
                  }
                );
              }
            } else if (page == 1 || page == 3) {
              setPage(page + 1);
            } else if (page == 2) {
              handleForward();
            } else if (page == 4) {
              if (
                !(selectedCity == undefined) &&
                !(selectedCity == "") &&
                !(selectedCity == "India") &&
                !(inputName?.value == "")
              ) {
                setPage(page + 1);
              } else {
                toast.warning(
                  `${
                    selectedCity == "India"
                      ? "Please select a different city"
                      : selectedCity == "" || selectedCity == undefined
                      ? "Please select a city"
                      : inputName?.value == ""
                      ? "Please enter your name"
                      : "Please select a city"
                  }`,
                  {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    limit: 1,
                    toastId: "002",
                  }
                );
              }
            }
          }}
        >
          <span className="font-Regular text-dx flex-1 mr-5">Next</span>
          <Image
            src={ArrowForward}
            width={15}
            height={15}
            className="text-qx font-Regular"
          />
        </div>
      </div>

      <ListingAdded open={listingAdded} setOpen={setListingAdded} />
      <VerifyListingPopup
        open={verifyListingAdded}
        setOpen={setVerifyListingAdded}
        make={make || ""}
      />
      <PricePopup
        open={openPricePopup}
        setOpen={setOpenPricePopup}
        price={sellValue}
        leastPrice={recommandedPrice?.leastSellingprice}
        maxPrice={recommandedPrice?.maxsellingprice}
        setSubmitting={setSubmitting}
      />
      {openConditionInfo && (
        <ConditionInfo
          open={openConditionInfo}
          setOpen={setOpenConditionInfo}
        />
      )}
      {openStorageInfo && (
        <StorageInfo
          open={openStorageInfo}
          setOpen={setOpenStorageInfo}
          brand={make}
        />
      )}
      <LoginPopup
        open={openLoginPopup}
        setOpen={setOpenLoginPopup}
        fromAddListing
      />
      <UnverifiedListingPopup
        open={unverifiedListing}
        setOpen={setUnverifiedListing}
        unverifiedListingReason={unverifiedListingReason}
        unverifiedListingType={unverifiedListingType}
      />
      <TermsconditionPopup open={showTCPopUp} setOpen={setShowTCPopup} />
      <BrandPopup open={openBrandPopup} setOpen={setOpenBrandPopup} />
      <ModelPopup
        open={openModelPopup}
        setOpen={setOpenModelPopup}
        mktNameOpt={mktNameOpt}
      />
      {openVerifyFlow && (
        <VerifyFlowPopup open={openVerifyFlow} setOpen={setOpenVerifyFlow} />
      )}
    </Fragment>
  );
};

export default NewAddListingForm;

const Checkbox = ({ src, text, checked, onChange }) => (
  <div
    className={`border-2 opacity-bg-60  rounded-md py-4 relative h-20 ${
      checked && "bg-[#E8E8E8] opacity-bg-50 "
    }`}
    onClick={onChange}
  >
    <div className="relative w-7 h-7 mx-auto">
      <Image src={src} layout="fill" alt="ORU checkbox" />
    </div>

    <input
      type="checkbox"
      className="accent-gray-500  opacity-bg-40 absolute  top-1 left-1.5 rounded "
      checked={checked}
      readOnly
    />
    <span className="text-cx font-Regular mt-2 text-center block text-black-4e">
      {text}
    </span>
  </div>
);

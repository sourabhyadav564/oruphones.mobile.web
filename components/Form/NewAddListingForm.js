import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
// import chargingImg from "@/assets/charging-station.svg";
// import headphoneImg from "@/assets/headphones-line.svg";
// import originalBoxImg from "@/assets/box.svg";
import dynamic from "next/dynamic";
import chargingImg from "@/assets/charging-station.png";
import headphoneImg from "@/assets/headphones-line.png";
import originalBoxImg from "@/assets/box.png";
import originalBillImg from "@/assets/original-bill.png";
import { BiCurrentLocation } from "react-icons/bi";
import MySelect from "./Select";
import ImageInput from "./ImageInput";
import PhoneImage from "@/assets/icons/istock.png";
import Input from "./Input";
import {
  getRecommandedPrice,
  saveLisiting,
  uploadImage,
  getExternalSellSourceData,
  getGlobalCities,
  marketingNameByModel,
} from "api-call";
import { useAuthState, useAuthDispatch } from "providers/AuthProvider";
import { numberWithCommas, numberFromString } from "@/utils/util";
import ListingAdded from "../Popup/ListingAdded";
import CB from "../Form/Checkbox";
import ConditionInfo from "../Popup/ConditionInfo";
import router, { useRouter } from "next/router";
import LoginPopup from "../Popup/LoginPopup";
import Link from "next/link";
import TermsconditionPopup from "../Popup/TermsconditionPopup";
import BrandPopup from "../AddListing/BrandPopup";
import ModelPopup from "../AddListing/ModelPopup";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const VerifyFlowPopup = dynamic(() => import("@/components/Popup/VerifyFlowPopup"));
import { TiTick } from "react-icons/ti";
import {
  addListingBrandSelector,
  addListingModelSelector,
  addListingBrandState,
  addListingModelState,
} from "../../atoms/globalState";
import { useRecoilState, useRecoilValue } from "recoil";
import { deviceConditionQuestion } from "@/utils/constant";
import ConditionOptionLarge from "../Condition/ConditionOptionLarge";
import DeviceConditionCard from "../Condition/DeviceConditionCard";
import Logo from "@/assets/oru_phones_logo.png";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import StorageInfo from "../Popup/StorageInfo";
import Loader from "../Loader/Loader";
import Spinner from "../Loader/Spinner";
import Geocode from "react-geocode";
import Cookies from "js-cookie";
import { getCityFromResponse } from "@/utils/util";
import Header4 from "../Header/header4";
import { CardHeading4, CardHeading3, PanelHeading } from "@/components/elements/CardHeading/cardheading.js";
// import Header2 from "../Header/header2";
import VerifyListingPopup from "../Popup/VerifyListingPopup";
import PricePopup from "../Popup/PricePopup";
import { BsArrowLeft } from "react-icons/bs";
import { Heading, SellPhoneHeading1, ProductPriceHeading, AgeHeading } from "../elements/Heading/heading";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [openPricePopup, setOpenPricePopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [verifySubmit, setVerifySubmit] = useState(false);
  const [verifyListingAdded, setVerifyListingAdded] = useState(false);
  var sellValueTag = document.querySelector("#sellValue") || "";
  var sellValue = sellValueTag.value || "";


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
      getGlobalCities().then(
        (response) => {
          setGlobalCities(response.dataObject);
          localStorage.setItem("cities", JSON.stringify(response.dataObject));
        },
        (err) => console.error(err)
      );
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
      getExternalSellSourceData(payload).then((response) => {
        setGetExternalSellerData(response?.dataObject);
      });
    }
  }, [make, model, storage, condition, headphone, charging, originalbox]);

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
      (charging || headphone || originalbox || true)
    ) {
      getRecommandedPrice(reqParams).then(
        ({ dataObject }) => {
          setRecommandedPrice(dataObject);
        },
        (err) => console.error(err)
      );
    }
  }, [make, model, storage, condition, charging, headphone, originalbox]);

  const handleSelectChange = (name) => {
    if (name === "make") {
      setMake(selectedBrand);
      let index = data.findIndex((i) => i.make === selectedBrand);
      setMktNameOpt(data[index]?.models);
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
      uploadImage(formData, {
        deviceFace: name,
        deviceStorage: storage?.toString().includes("/")
          ? storage?.split("/")[0]
          : storage,
        make,
        model,
        userUniqueId: user?.userdetails?.userUniqueId || "Guest",
      }).then(
        ({ status, dataObject }) => {
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
        },
        (err) => console.error(err)
      );
    }
  };

  const clearImage = (e, index) => {
    e.preventDefault();
    let tempImages = [...images];
    tempImages[index] = { ...tempImages[index], thumbImage: "", fullImage: "" };
    setImages(tempImages);
  };

  useEffect(() => {
    if (selectedBrand) {
      handleSelectChange("make");
    }
    if (selectedModel) {
      handleSelectChange("model");
    }
  }, [selectedBrand, selectedModel]);

  useEffect(() => {
    if (make && model && storage) {
      // setModelInfo();
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
      marketingNameByModel(payload).then(
        ({ dataObject }) => {
          setModelInfo(dataObject);
          setIsGettingPrice(false);
        },
        (err) => console.error(err)
      );
    }
  }, [storage]);

  // console.log("deviceCosmeticQuestion", conditionResults);

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
    // Geocode.setRegion("es");
    // Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    // Get address from latitude & longitude.
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        let address = response?.plus_code?.compound_code;
        address = getCityFromResponse(address);
        setLocation({
          loaded: true,
          city: address,
        });
        setSelectedCity(address);
        // setOpen(false);
      },
      (error) => {
        console.error(error);
        setLocation({
          loaded: true,
          city: "India",
        });
        setSelectedCity("India");
        // setOpen(false);
      }
    );
  };

  const onError = (error) => {
    // alert(error.message);
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

  // useEffect(() => {
  //   const initialState = localStorage.getItem("usedLocation");
  //   if (!initialState || initialState == null) {
  //     setOpen(true);
  //   } else {
  //     dispatch("ADDCITY", initialState);
  //   }
  // }, [])

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
        let payLoad = {
          city: location.city,
          country: "India",
          state: "",
          locationId: searchID,
          userUniqueId: Cookies.get("userUniqueId"),
        };
        // updateAddress(payLoad).then((res) => {
        //   const mobileNumber = Cookies.get("mobileNumber");
        //   const countryCode = Cookies.get("countryCode");
        //   getUserDetails(countryCode, mobileNumber).then((resp) => {
        //     dispatch("LOGIN", resp.dataObject);
        //   });
        // });
      }
      dispatch("ADDCITY", location.city);
      localStorage.setItem("usedLocation", location.city);
    }
  }, [location]);

  useEffect((e) => {
    if (submitting === true) {
      submit();
    }
  }, [submitting]);

  async function submit() {
    sellValueTag = document.querySelector("#sellValue");
    sellValue = sellValueTag.value;

    if ((sellValue < (recommandedPrice && recommandedPrice?.leastSellingprice * 0.7)
      || sellValue > (recommandedPrice && recommandedPrice?.maxsellingprice * 1.2))
      && recommandedPrice?.leastSellingprice != "-"
      && recommandedPrice?.maxsellingprice != "-" && submitting != true) {
      setOpenPricePopup(true);
      console.log("submitting", submitting);
      if (submitting === false) {
        return;
      }
    }
    var inputNameTag = document.querySelector("#inputName");
    // var inputName = inputNameTag.value;
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
    } else {
      let payload = {
        make,
        color,
        marketingName: model,
        // deviceStorage: storage?.split("/")[0],
        // deviceRam: storage?.split("/")[1].replace("RAM", ""),
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
        platform: make === "Apple" ? "iOS" : "Android",
        charger: charging ? "Y" : "N",
        earphone: headphone ? "Y" : "N",
        originalbox: originalbox ? "Y" : "N",
        userUniqueId: user?.userdetails?.userUniqueId,
        images: images.filter(
          (item) => item?.fullImage && item.fullImage !== null
        ),
        model: model,
        cosmetic: conditionResults,
      };
      saveLisiting(payload).then(
        () => {
          if (verifySubmit === true) {
            setVerifyListingAdded(true);
          } else {
            setListingAdded(true);
          }
          dispatch("REFRESH");
        },
        (err) => console.error(err)
      );
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const calculateDeviceCondition = () => {
    if (conditionResults[0].toString() == "No") {
      setCondition("Needs Repair");
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
    if (conditionResults[0].toString() == "No") {
      setPage(page - 1);
      setQuestionIndex(0);
    }
    else {
      if ((questionIndex == 0 || page > 2) && conditionResults[0].toString() != "No") {
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
      });
    if (conditionResults[0].toString() == "No") {
      calculateDeviceCondition();
      setPage(page + 1);
    }
    else {
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
      <header className={`flex  p-4 py-3 bg-[#2C2F45] rounded-b-xl text-white text-lg relative`}>
        {(
          router.pathname !== "/" && <BsArrowLeft onClick={() => { page == 2 || page == 3 ? handleBack() : page != 0 ? setPage(page - 1) : router.back() }} className="cursor-pointer" fontSize="22" />
        )}
        {<span className="m-auto flex justify-center font-Roboto-Regular text-[15px] text-[#FFFFFF]">
          Sell Your Phone
        </span>}
      </header>
      {/* {(makeRequired.length > 0 ||
        marketingNameRequired.length > 0 ||
        deviceConditionRequired.length > 0 ||
        storageRequired.length > 0) && (
        <h1 className="text-red pt-4">
          Please fill all the required fields properly
        </h1>
      )} */}
      {/* <Header4 title="Sell your Phone" /> */}
      <form
        className="grid grid-cols-1 space-y-4 container my-4 font-SF-Pro"
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
              {/* <p className="font-semibold text-sm">
                Brand <span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                placeholder="Please select brand"
                className="border-2 border-gray-200 p-2 w-full rounded-md duration-200"
                value={make}
              /> */}
              <div className="m-auto pl-16 pb-[20px] mb-4 border-b ">
                <Image src={PhoneImage} width={200} height={200} />
              </div>

              <SellPhoneHeading1 title="Enter your Phone details" />

              <div className="space-y-[5px]">
                <p className="pt-[25px] flex space-x-0.5">
                  <CardHeading4 title="Brands" /> <span className="text-red-400 -mt-1">*</span>
                </p>
                <Input
                  value={make}
                  disabled
                  placeholder="Please Select Brand "
                  type="text"
                  className="font-Regular  text-[12px] text-[#2C2F45]"
                >
                  {/* Make */}
                </Input>
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
                {/* <p className="font-semibold text-sm">
                  Model <span className="text-red-400">*</span>
                </p>
                <input
                  type="text"
                  placeholder="Please select model"
                  className="border-2 border-gray-200 p-2 w-full rounded-md duration-200"
                  value={model}
                /> */}
                <div className="space-y-[5px]">
                  <p className="flex space-x-0.5">
                    <CardHeading4 title="Model" /> <span className="text-red-400 -mt-1">*</span>
                  </p>
                  <Input
                    value={model}
                    disabled
                    placeholder="Please Select Model "
                    type="text"
                    className="font-Regular  text-[12px] text-[#2C2F45]"
                  >
                    {/* Make */}
                  </Input>
                </div>

                {/* <p className="font-Regular text-[12dp] text-[#2C2F45]">
                  Model <span className="text-red-400 ">*</span>
                </p> */}
                {/* <Input
                  value={model}
                  disabled
                  placeholder="Please select model"
                  type="text"
                  className="font-Regular text-[12px] text-[#2C2F45]"
                > */}
                {/* Model */}
                {/* </Input> */}
              </div>
            )}
            {storageColorOption && storageColorOption?.storage && (

              <div className="space-y-2">
                <div className="space-y-[5px]">
                  <p className="flex space-x-0.5" >
                    <CardHeading4 title="Storage Variant " /> <span className="text-red-400 -mt-1">*</span>
                  </p>
                </div>
                {/* <p className="font-Regular text-[12dp] text-[#2C2F45]">
                  Storage Variant <span className="text-red-400">*</span>
                </p> */}
                <div className="grid grid-cols-2 gap-3 ">
                  {storageColorOption &&
                    storageColorOption?.storage &&
                    storageColorOption.storage.map((item, index) => (
                      <div
                        className={`${storage == item
                          ? "bg-[#E8E8E8]  text-[12dp] opacity-bg-80 rounded-[5px] border-2 border-white text-[#2C2F45] opacity-100"
                          : "bg-white opacity-bg-50 opacity-70 border-2 border-[#2C2F45] border-opacity-40 rounded-[5px]"
                          }  active:bg-[#2C2F45] duration-300 p-2 flex items-center font-Regular  justify-center`}
                        onClick={() => setStorage(item)}
                        key={index}
                      >
                        <CardHeading4 title={item} />
                        {/* <span>{item}</span> */}
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
            {/* {storageColorOption && storageColorOption?.color && (
              <div className="space-y-2">
                <p className="font-semibold text-sm">Color</p>
                <div className="grid grid-cols-3 gap-3">
                  {storageColorOption &&
                    storageColorOption?.color &&
                    storageColorOption.color.map((item, index) => (
                      <div
                        className={`${color == item
                          ? "bg-gray-300 border-[1.5px] border-black"
                          : "bg-white"
                          } border-2 active:bg-gray-200 duration-300 p-2 flex items-center justify-center rounded-md`}
                        onClick={() => setColor(item)}
                        key={index}
                      >
                        <span>{item}</span>
                      </div>
                    ))}
                </div>
              </div>
            )} */}
            {modelInfo && !isGettingPrice && (
              <div className="border-t-2 border-b-2 py-[24px]">
                <p className=" flex space-x-2 ">
                  <div className="font-Regular self-center  text-[13px] text-[#2C2F45]">Get up to:</div>
                  <div className="font-Roboto-Bold text-[22px]  text-[#4CAF50]"> ₹{modelInfo?.price}
                    {/* <span className="absolute pl-1 text-[16px] text-[#F9C414]"> *</span> */}
                  </div>
                  {/* <ProductPriceHeading title={modelInfo?.price} color='#4CAF50'/> */}
                </p>
                {/* <div> <h1 className="font-Regular text-[10px]  text-[#F9C414]  opacity-80 "> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h1> </div> */}

              </div>
            )}


            {isGettingPrice && (
              <div className="py-5">
                <Spinner />
              </div>
            )}
            <span className="pb-20" />
          </>
        )}

        {page === 1 && (
          <>
            {modelInfo && (
              <div className="p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  {/* <p className="font-bold text-[15px] text-[#2C2F45]">{modelInfo?.marketingName}</p> */}
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span><CardHeading4 title="RAM :" /></span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
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
                    <span><CardHeading4 title="Storage :" /> </span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                </div>
              </div>
            )}
            <div>
              <div className="py-[25px]">
                <SellPhoneHeading1 title="Do you have the followings?" />
              </div>
              {/* <p className="font-Bold text-[#2C2F45] text-[20px]">
                Do you have the followings?
              </p> */}
              <div className="grid grid-cols-2 gap-4 ">
                <Checkbox
                  src={chargingImg}
                  text="Original Charger"
                  onChange={() => setCharging((prev) => !prev)}
                  checked={charging}
                />
                <Checkbox
                  src={headphoneImg}
                  text="Original Earphones"
                  onChange={() => setHeadphone((prev) => !prev)}
                  checked={headphone}
                />
                <Checkbox
                  src={originalBoxImg}
                  text="Original Box"
                  onChange={() => setOriginalbox((prev) => !prev)}
                  checked={originalbox}
                />
                <Checkbox
                  src={originalBillImg}
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


                  <p className="font-Roboto-Light text-[#2C2F45] text-[13px] mt-5 border-b pb-1">
                    What is your mobile age?
                  </p>
                  <div className="my-5 grid grid-cols-2 gap-5">
                    {deviceWarrantyCheck?.map((item, index) => (
                      <div
                        key={index}
                        className={`${warranty == item?.value
                          ? "bg-[#F3F3F3] text-[#2C2F45] border-2 border-[#F3F3F3] font-Roboto-Light text-[13px]"
                          : "opacity-60 border-2 border-[#9597A2] font-Roboto-Light text-[13px] "
                          } py-3 px-5 rounded-md font-Roboto-Light text-[13px] hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 duration-300  flex items-center justify-start text-sm`}
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
              <div className="p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  {/* <p className="font-bold text-[15px] text-[#2C2F45]">{modelInfo?.marketingName}</p> */}
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span><CardHeading4 title="RAM :" /></span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
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
                    <span><CardHeading4 title="Storage : " /> </span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                </div>
              </div>
            )}

            <div>
              <SellPhoneHeading1 title={deviceConditionQuestion[questionIndex]?.title} />
              {/* <h3 className="text-left font-Bold  text-[#2C2F45] text-[20px]">
                {deviceConditionQuestion[questionIndex]?.title}
              </h3> */}
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
              <div className="p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  {/* <p className="font-bold text-[15px] text-[#2C2F45]">{modelInfo?.marketingName}</p> */}
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span><CardHeading4 title="RAM :" /></span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
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
                    <span><CardHeading4 title="Storage : " /> </span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                </div>
              </div>
            )}
            <>
              {/* <DeviceConditionCard
                  condition={condition}
                  answer={conditionResults}
                /> */}
              <div className="flex bg-[#F3F3F3] p-2  rounded-md space-x-2">
                <span className="font-Roboto-Medium self-center text-[10px]">Your Device is in</span>
                <p className="font-Roboto-Bold self-center text-[12px]">
                  {condition}
                  <span>Condition</span>

                </p>
              </div>
              {/* <p
                className="text-sm whitespace-nowrap underline cursor-pointer text-[primary] hover:text-primary"
                onClick={() => setOpenConditionInfo(true)}
              >
                What&apos;s this?
              </p> */}


            </>
            {/* <p className="font-Bold text-[20px]  text-[#2C2F45]">Upload Photos</p> */}
            <SellPhoneHeading1 title="Upload Photos" />
            <PanelHeading title="Back Panel" />
            <div className="grid  grid-cols-2 relative">

              {images.map((item, index) => (

                <div key={index} className="relative pt-4 even:ml-2 odd:mr-2 mb-2 rounded-md bg-[#E8E8E8]">
                  {index === 0 ? (
                    <PanelHeading title="Front Panel" />
                    // <span className="absolute bottom-4 left-16 font-Light text-[11px] opacity-50"> Front Panel </span>
                  ) : index === 1 ? (
                    <PanelHeading title="Back Panel" />
                    // <span className="absolute bottom-4 left-16 font-Light text-[11px] opacity-50"> Back Panel</span>
                  ) : (
                    ""
                  )}
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
              <div className="p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  {/* <p className="font-bold text-[15px] text-[#2C2F45]">{modelInfo?.marketingName}</p> */}
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span><CardHeading4 title="RAM :" /></span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
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
                    <span><CardHeading4 title="Storage : " /> </span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                </div>
              </div>
            )}
            <>
              {/* <DeviceConditionCard
                  condition={condition}
                  answer={conditionResults}
                /> */}
              <div className="flex bg-[#F3F3F3] p-2  rounded-md space-x-1">
                <span className="font-Medium self-center text-[10px]">Your Device is in</span>
                <p className="font-bold self-center text-[12px]">
                  {condition}
                  <span> Condition</span>
                </p>
              </div>
              {/* <p
                className="text-sm whitespace-nowrap underline cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => setOpenConditionInfo(true)}
              >
                What&apos;s this?
              </p>.
               */}
            </>
            <div className="relative">
              <div className="space-y-1 text-[12px] text-[#92949F] font-Regular">

                <p className="flex  space-x-1"> <CardHeading4 title="Name" /> <span className="text-[#F9C414]">*</span></p>
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
                >
                  {/* Name* */}
                </Input>
                {nameValueRequired && (
                  <span className="text-red text-sm absolute -bottom-6">
                    Please enter your name first
                  </span>
                )}
              </div>
            </div>


            <div>
              <div className="space-y-1 text-[12px] font-Regular mt-2">
                <p className="flex space-x-1"><CardHeading4 title="Location" /> <span className="text-[#F9C414]">*</span></p>
              </div>
              <div className="flex w-full justify-center items-center mt-1">
                <MySelect
                  placeholder={selectedCity}
                  value={selectedCity}
                  className={`${locationRequired}  text-[12px] text-Regular`}
                  onFocus={(e) => {
                    setLocationRequired("");
                  }}
                  onChange={(e) => {
                    setSelectedCity(e.value);
                  }}
                  options={globalCities
                    ?.sort((a, b) => a.city.localeCompare(b.city))
                    // ?.filter((item) => item.displayWithImage != "1")
                    .map((items) => {
                      return { label: items.city, value: items.city };
                    })}
                />
                <div className="h-10 w-16 bg-gray-200 rounded-r-lg -ml-1 inline-flex justify-center items-center hover:cursor-pointer"
                  onClick={handleNearme}>
                  <BiCurrentLocation size={24} />
                </div>
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
              <div className="p-5 flex space-x-4 drop-shadow-2xl border-b-2 ">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="120"
                  width="90"
                />
                <div className="flex flex-col  absolute bottom-5 left-36">
                  {/* <p className="font-bold text-[15px] text-[#2C2F45]">{modelInfo?.marketingName}</p> */}
                  <CardHeading3 title={modelInfo?.marketingName} />

                  <p className="flex space-x-1">
                    <span><CardHeading4 title="RAM :" /></span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
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
                    <span><CardHeading4 title="Storage : " /> </span>{" "}
                    <div className="font-Roboto-Bold text-[12px] text-[#2C2F45]">
                      {modelInfo?.deviceStorage?.split("/")[0] ||
                        storage?.split("/")[0]}
                    </div>
                  </p>
                  <div className="flex font-Roboto-Bold text-[12px] text-[#2C2F45] ">
                    {condition && (
                      <p className="flex space-x-">
                        <span><CardHeading4 title="Condition : " /> </span> <span>{"  "} {condition} </span>
                      </p>
                    )}
                  </div>



                </div>
              </div>
            )}
            <p className="flex space-x-1 pt-4">
              <SellPhoneHeading1 title="Enter your sell price " />
              {/* Enter your sell price  */}
              <span className="text-red-400">*</span>
            </p>
            <div className="grid grid-cols-7 gap-4 relative">

              <Input
                id="sellValue"
                prefix={"₹"}
                type="number"
                max="999999"
                inputClass="text-[24px] text-[#2C2F45] pl-1 font-bold"
                className={`h-full col-span-4 text-[22px] font-bold  `}
                errorClass={`border ${sellValueRequired}`}
                onChange={(e) => {
                  setInputSellPrice(e.target.value);
                  setSellValueRequired("");
                }}
              >
                {/* Enter your sell price* */}
              </Input>


              <div className="text-sm bg-[#E8E8E8] col-span-3 px-2 py-1 rounded-md -ml-1 relative  ">
                <div className="m-auto">
                  <span className="font-semibold text-[12px] opacity-50 m-auto justify-center text-[#2C2F45]">Recommended Price</span>
                  <br />
                  {(recommandedPrice && recommandedPrice?.leastSellingprice && (
                    <p className="font-bold text-[#2C2F45] text-[14px] m-auto justify-center">
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
                  className=" underline font-Light text-[13px] cursor-pointer"
                  onClick={() => setShowTCPopup(true)}
                >
                  Accept terms and conditions
                </label>
              </CB>
            </div>
            {getExternalSellerData && getExternalSellerData.length > 0 && (
              <Heading title="Price from other vendors :" />
              // <p
              //   className="font-Light text-[15px] border-b-2 pb-1"
              //   style={{ color: "#707070" }}
              // >
              //   Price from other vendors :
              // </p>
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
                          style={{ width: "auto", height: 40, backgroundSize: "auto", backgroundOrigin: "content-box" }}
                          alt={items?.externalSourceName}
                        />
                      </div>
                      <p className="text-[15px] text-[#100] flex items-center font-Roboto-Semibold">
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

            <div className="text-center font-[Segoe UI] text-[13px] ">
              <p className="underline text-[#2C2F45]">or</p>
            </div>

            <button
              className="w-full uppercase rounded py-3 text-center text-[15px] text-[#FFFFFF] font-Regular bg-[#2C2F45] m-auto "
              disabled={!termsAndCondition}
              onClick={(e) => {
                setVerifySubmit(true);
                // e.preventDefault();
              }}
            >
              TAKE ME TO VERIFICATION
            </button>
          </>
        )}
      </form>

      <div className="bg-white flex items-center justify-between py-3 px-5 z-50 fixed bottom-0 w-full">
        <div
          className={`bg-white px-5 py-2 text-center text-black font-semibold rounded-md
        border-2 border-gray-200 duration-300 flex items-center justify-center space-x-5`}
          onClick={() => {
            if (page == 3 || page == 2) {
              handleBack();
            } else if (page != 0) {
              setPage(page - 1);
            }
          }}
        >
          <IoIosArrowBack className="text-xl" />
          <span>Back</span>
        </div>
        <div
          className={`bg-[#2C2F45]  text-center px-5 py-2  text-white font-semibold rounded-md border-2 border-[#2C2F45] duration-300 flex items-center justify-center space-x-5 ${page === 5 ? "hidden" : ""
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
                  `${make == ""
                    ? "Please select a make"
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
                  `${selectedCity == "India"
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
                  }
                );
              }
            }
          }}
        >
          <span className="font-Regular text-[15px] flex-1">Next</span>
          <IoIosArrowForward className="text-[22px] font-Regular" />
        </div>
      </div>

      <ListingAdded open={listingAdded} setOpen={setListingAdded} />
      <VerifyListingPopup open={verifyListingAdded} setOpen={setVerifyListingAdded} make={make || ""} />
      <PricePopup open={openPricePopup} setOpen={setOpenPricePopup} price={sellValue} leastPrice={recommandedPrice?.leastSellingprice} maxPrice={recommandedPrice?.maxsellingprice} setSubmitting={setSubmitting} />
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
      <TermsconditionPopup open={showTCPopUp} setOpen={setShowTCPopup} />
      <BrandPopup open={openBrandPopup} setOpen={setOpenBrandPopup} />
      <ModelPopup
        open={openModelPopup}
        setOpen={setOpenModelPopup}
        mktNameOpt={mktNameOpt}
      />
      {openVerifyFlow && <VerifyFlowPopup open={openVerifyFlow} setOpen={setOpenVerifyFlow} />}
    </Fragment>
  );
};

export default NewAddListingForm;

const Checkbox = ({ src, text, checked, onChange }) => (
  <div
    className={`border-2 opacity-bg-60  rounded-md py-4 relative h-20 ${checked && "bg-[#E8E8E8] opacity-bg-50 "}`}
    onClick={onChange}
  >
    <div className="relative w-7 h-7 mx-auto ">
      <Image src={src} layout="fill" />
    </div>

    <input
      type="checkbox"
      className="absolute  top-1 left-1.5 rounded bg-black"
      checked={checked}
      readOnly
    />
    <span className="text-[11px] font-Regular mt-2 text-center block text-black-4e">{text}</span>
  </div>
);

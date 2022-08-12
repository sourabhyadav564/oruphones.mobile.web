import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
// import chargingImg from "@/assets/charging-station.svg";
// import headphoneImg from "@/assets/headphones-line.svg";
// import originalBoxImg from "@/assets/box.svg";
import chargingImg from "@/assets/charging-station.png";
import headphoneImg from "@/assets/headphones-line.png";
import originalBoxImg from "@/assets/box.png";

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
} from "api-call";
import { useAuthState, useAuthDispatch } from "providers/AuthProvider";
import { numberWithCommas, numberFromString } from "@/utils/util";
import ListingAdded from "../Popup/ListingAdded";
import CB from "../Form/Checkbox";
import ConditionInfo from "../Popup/ConditionInfo";
import router from "next/router";
import LoginPopup from "../Popup/LoginPopup";
import Link from "next/link";
import TermsconditionPopup from "../Popup/TermsconditionPopup";
import BrandPopup from "../AddListing/BrandPopup";
import ModelPopup from "../AddListing/ModelPopup";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

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

const initialState = [{ panel: "front" }, { panel: "back" }];

const NewAddListingForm = ({ data }) => {
  const deviceWarrantyCheck = [
    { value: "zero", label: "0-3 Months Ago" },
    { value: "four", label: "4-6 Months Ago" },
    { value: "seven", label: "7-11 Months Ago" },
    { value: "more", label: "More Than 11 Months Ago" },
  ];

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

  const [openBrandPopup, setOpenBrandPopup] = useState(false);
  const [openModelPopup, setOpenModelPopup] = useState(false);

  const [modelInfo, setModelInfo] = useState();
  const [page, setPage] = useState(0);

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
    if (storage) {
      setModelInfo();
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
        },
        (err) => console.error(err)
      );
    }
  }, [storage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var sellValueTag = document.querySelector("#sellValue");
    var sellValue = sellValueTag.value;

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
      };
      saveLisiting(payload).then(
        () => {
          setListingAdded(true);
          dispatch("REFRESH");
        },
        (err) => console.error(err)
      );
    }
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
    if (questionIndex == 0) {
      setPage(page - 1);
    } else {
      setQuestionIndex(questionIndex > 0 ? questionIndex - 1 : 0);
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
    questionIndex == deviceConditionQuestion.length - 1 &&
      calculateDeviceCondition();
    questionIndex == deviceConditionQuestion.length - 1 && setPage(page + 1);
  };

  return (
    <Fragment>
      {/* {(makeRequired.length > 0 ||
        marketingNameRequired.length > 0 ||
        deviceConditionRequired.length > 0 ||
        storageRequired.length > 0) && (
        <h1 className="text-red pt-4">
          Please fill all the required fields properly
        </h1>
      )} */}

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
              {/* <p className="font-semibold text-sm">
                Brand <span className="text-red-400">*</span>
              </p>
              <input
                type="text"
                placeholder="Please select brand"
                className="border-2 border-gray-200 p-2 w-full rounded-md duration-200"
                value={make}
              /> */}
              <p className="font-semibold text-sm">
                Make <span className="text-red-400">*</span>
              </p>
              <Input
                value={make}
                disabled
                placeholder="Please select brand"
                type="text"
              >
                {/* Make */}
              </Input>
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
                <p className="font-semibold text-sm">
                  Model <span className="text-red-400">*</span>
                </p>
                <Input
                  value={model}
                  disabled
                  placeholder="Please select model"
                  type="text"
                >
                  {/* Model */}
                </Input>
              </div>
            )}
            {storageColorOption && storageColorOption?.storage && (
              <div className="space-y-2">
                <p className="font-semibold text-sm">
                  Storage Variant <span className="text-red-400">*</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {storageColorOption &&
                    storageColorOption?.storage &&
                    storageColorOption.storage.map((item, index) => (
                      <div
                        className={`${
                          storage == item
                            ? "bg-gray-300 border-[1.5px] border-black"
                            : "bg-white"
                        } border-2 active:bg-gray-200 duration-300 p-2 flex items-center justify-center rounded-md`}
                        onClick={() => setStorage(item)}
                        key={index}
                      >
                        <span>{item}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {storageColorOption && storageColorOption?.color && (
              <div className="space-y-2">
                <p className="font-semibold text-sm">Color</p>
                <div className="grid grid-cols-3 gap-3">
                  {storageColorOption &&
                    storageColorOption?.color &&
                    storageColorOption.color.map((item, index) => (
                      <div
                        className={`${
                          color == item
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
            )}
            {modelInfo && (
              <p className="bg-gray-300 p-3 rounded-md">
                <span className="font-bold">Get up to:</span> Rs.
                {modelInfo?.price}
              </p>
            )}
            <span className="pb-20" />
          </>
        )}

        {page === 1 && (
          <>
            {modelInfo && (
              <div className="bg-white p-5 flex space-x-4 rounded-md drop-shadow-2xl">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="100"
                  width="70"
                />
                <div className="flex flex-col mt-3">
                  <p className="font-bold">{modelInfo?.marketingName}</p>
                  <p>
                    <span className="font-bold">Storage:</span>{" "}
                    {modelInfo?.deviceStorage?.split("/")[0] ||
                      storage?.split("/")[0]}
                  </p>
                  <p>
                    <span className="font-bold">RAM:</span>{" "}
                    {modelInfo?.deviceRam?.split("/")[1] ||
                      storage
                        ?.toString()
                        .split("/")[1]
                        .toString()
                        .replace(/GB/g, " GB")
                        .replace(/RAM/, "")
                        .trim()}
                  </p>
                </div>
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-700">
                Do you have the followings?
              </p>
              <div className="grid grid-cols-2 gap-4 mt-5">
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
                  src={originalBoxImg}
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
                  <p className="font-semibold text-gray-700 mt-5">
                    What is your mobile age?
                  </p>
                  <div className="my-5 grid grid-cols-2 gap-5">
                    {deviceWarrantyCheck?.map((item, index) => (
                      <div
                        key={index}
                        className={`${
                          warranty == item?.value
                            ? "bg-gray-300 border-[1.5px] border-black"
                            : "bg-white"
                        } py-3 px-5 rounded-md hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 duration-300 border-2 border-gray-200 flex items-center justify-start text-sm`}
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
              <div className="bg-white p-5 flex space-x-4 rounded-md drop-shadow-2xl">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="100"
                  width="70"
                />
                <div className="flex flex-col mt-3">
                  <p className="font-bold">{modelInfo?.marketingName}</p>
                  <p>
                    <span className="font-bold">Storage:</span>{" "}
                    {modelInfo?.deviceStorage?.split("/")[0] ||
                      storage?.split("/")[0]}
                  </p>
                  <p>
                    <span className="font-bold">RAM:</span>{" "}
                    {modelInfo?.deviceRam?.split("/")[1] ||
                      storage
                        ?.toString()
                        .split("/")[1]
                        .toString()
                        .replace(/GB/g, " GB")
                        .replace(/RAM/, "")
                        .trim()}
                  </p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-center font-semibold text-xl">
                {deviceConditionQuestion[questionIndex]?.title}
              </h3>
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
              <div className="bg-white p-5 flex space-x-4 rounded-md drop-shadow-2xl">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="100"
                  width="70"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{modelInfo?.marketingName}</p>
                  <p>
                    <span className="font-bold">Storage:</span>{" "}
                    {modelInfo?.deviceStorage?.split("/")[0] ||
                      storage?.split("/")[0]}
                  </p>
                  <p>
                    <span className="font-bold">RAM:</span>{" "}
                    {modelInfo?.deviceRam?.split("/")[1] ||
                      storage
                        ?.toString()
                        .split("/")[1]
                        .toString()
                        .replace(/GB/g, " GB")
                        .replace(/RAM/, "")
                        .trim()}
                  </p>
                  {condition && (
                    <p>
                      <span className="font-bold">Condition:</span> {condition}
                    </p>
                  )}
                </div>
              </div>
            )}
            <>
              {/* <DeviceConditionCard
                  condition={condition}
                  answer={conditionResults}
                /> */}
              <div className="flex flex-col bg-white p-5 rounded-md drop-shadow-2xl">
                <span className="font-semibold">Your Device is in</span>
                <p className="font-bold text-xl">
                  {condition}
                  <span> Condition</span>
                </p>
              </div>
              <p
                className="text-sm whitespace-nowrap underline cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => setOpenConditionInfo(true)}
              >
                What&apos;s this?
              </p>
            </>
            <p className="text-gray-70 font-semibold">Upload Photos</p>
            <div className="grid grid-cols-2 relative">
              {images.map((item, index) => (
                <div key={index} className="even:ml-2 odd:mr-2 mb-2">
                  {index === 0 ? (
                    <span className="ml-2 pb-2 block">Front Panel </span>
                  ) : index === 1 ? (
                    <span className="ml-2 pb-2 block"> Back Panel</span>
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
                  className="absolute -bottom-6 text-sm right-0 text-primary cursor-pointer"
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
              <div className="bg-white p-5 flex space-x-4 rounded-md drop-shadow-2xl">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="100"
                  width="70"
                />
                <div className="flex flex-col mt-3">
                  <p className="font-bold">{modelInfo?.marketingName}</p>
                  <p>
                    <span className="font-bold">Storage:</span>{" "}
                    {modelInfo?.deviceStorage?.split("/")[0] ||
                      storage?.split("/")[0]}
                  </p>
                  <p>
                    <span className="font-bold">RAM:</span>{" "}
                    {modelInfo?.deviceRam?.split("/")[1] ||
                      storage
                        ?.toString()
                        .split("/")[1]
                        .toString()
                        .replace(/GB/g, " GB")
                        .replace(/RAM/, "")
                        .trim()}
                  </p>
                  {condition && (
                    <p>
                      <span className="font-bold">Condition:</span> {condition}
                    </p>
                  )}
                </div>
              </div>
            )}
            <>
              {/* <DeviceConditionCard
                  condition={condition}
                  answer={conditionResults}
                /> */}
              <div className="flex flex-col bg-white p-5 rounded-md drop-shadow-2xl">
                <span className="font-semibold">Your Device is in</span>
                <p className="font-bold text-xl">
                  {condition}
                  <span> Condition</span>
                </p>
              </div>
              <p
                className="text-sm whitespace-nowrap underline cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => setOpenConditionInfo(true)}
              >
                What&apos;s this?
              </p>
            </>
            <div className="relative">
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
            <div>
              <MySelect
                labelName="Location*"
                placeholder={selectedCity}
                className={`${locationRequired} mt-4`}
                onFocus={(e) => {
                  setLocationRequired("");
                }}
                onChange={(e) => {
                  setSelectedCity(e.value);
                }}
                options={globalCities
                  ?.filter((item) => item.displayWithImage != "-1")
                  .map((items) => {
                    return { label: items.city, value: items.city };
                  })}
              />
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
              <div className="bg-white p-5 flex space-x-4 rounded-md drop-shadow-2xl">
                <Image
                  src={modelInfo?.imagePath || Logo}
                  className=""
                  alt="model"
                  height="100"
                  width="70"
                />
                <div className="flex flex-col mt-3">
                  <p className="font-bold">{modelInfo?.marketingName}</p>
                  <p>
                    <span className="font-bold">Storage:</span>{" "}
                    {modelInfo?.deviceStorage?.split("/")[0] ||
                      storage?.split("/")[0]}
                  </p>
                  <p>
                    <span className="font-bold">RAM:</span>{" "}
                    {modelInfo?.deviceRam?.split("/")[1] ||
                      storage
                        ?.toString()
                        .split("/")[1]
                        .toString()
                        .replace(/GB/g, " GB")
                        .replace(/RAM/, "")
                        .trim()}
                  </p>
                  {condition && (
                    <p>
                      <span className="font-bold">Condition:</span> {condition}
                    </p>
                  )}
                </div>
              </div>
            )}
            <p className="font-bold text-sm  pt-5">
              Enter your sell price <span className="text-red-400">*</span>
            </p>
            <div className="grid grid-cols-5 relative">
              <Input
                id="sellValue"
                prefix={"₹"}
                type="number"
                max="999999"
                inputClass="text-3xl font-bold"
                className={`h-full col-span-3 text-3xl font-bold rounded-r-none border-r-0`}
                errorClass={`border ${sellValueRequired}`}
                onChange={(e) => {
                  setInputSellPrice(e.target.value);
                  setSellValueRequired("");
                }}
              >
                {/* Enter your sell price* */}
              </Input>
              {sellValueRequired && (
                <span className="text-red text-sm absolute -bottom-6 ">
                  Enter price more than 1000
                </span>
              )}

              <div className="text-sm bg-gray-c7 text-black-4e col-span-2 px-2 py-1 rounded-r -ml-1 relative">
                <span>Recommended Price</span>
                <br />
                {(recommandedPrice && recommandedPrice?.leastSellingprice && (
                  <p className="font-bold">
                    <span className="mr-1">&#x20B9;</span>
                    {recommandedPrice?.leastSellingprice} -
                    {" " + recommandedPrice?.maxsellingprice}
                  </p>
                )) || <p>--</p>}
              </div>
            </div>
            {getExternalSellerData && getExternalSellerData.length > 0 && (
              <p
                className="font-semibold mt-1 pt-3"
                style={{ color: "#707070" }}
              >
                Check prices from other buyers:
              </p>
            )}
            {getExternalSellerData && getExternalSellerData.length > 0 && (
              <div className="border rounded-md mb-3 w-full">
                {getExternalSellerData.map((items, index) => (
                  <div
                    className="px-4 py-2 flex justify-between items-center w-full"
                    key={index}
                  >
                    <p className="text-2xl flex items-center">
                      {items?.externalSourcePrice && (
                        <span className="font-normal mr-0.5"> ₹ </span>
                      )}
                      {numberWithCommas(items?.externalSourcePrice)}
                    </p>
                    <div>
                      <img
                        src={items?.externalSourceImage}
                        style={{ width: 100, height: "auto" }}
                        alt={items?.externalSourceName}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-center items-center mt-2 pt-5">
              <CB
                checked={termsAndCondition}
                onChange={(e) => setTermsAndCondition(e.target.checked)}
              >
                <label
                  className="ml-2 underline cursor-pointer"
                  onClick={() => setShowTCPopup(true)}
                >
                  Accept terms and conditions
                </label>
              </CB>
            </div>
            <button
              className="bg-primary uppercase rounded py-3 text-white disabled:opacity-60"
              disabled={!termsAndCondition}
            >
              submit
            </button>
            <span className="pb-20" />
          </>
        )}
      </form>

      <div className="bg-white flex items-center justify-between py-3 px-5 z-50 fixed bottom-0 w-full">
        <div
          className={`bg-white px-5 py-2 text-center text-black font-semibold rounded-md
        border-2 border-gray-200 duration-300 flex items-center justify-center space-x-5`}
          onClick={() => {
            if (page == 2) {
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
          className={`bg-primary px-5 py-2 text-center text-white font-semibold rounded-md border-2 border-primary duration-300 flex items-center justify-center space-x-5 ${
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
                  }
                );
              }
            }
          }}
        >
          <span>Next</span>
          <IoIosArrowForward className="text-xl" />
        </div>
      </div>

      <ListingAdded open={listingAdded} setOpen={setListingAdded} />
      {openConditionInfo && (
        <ConditionInfo
          open={openConditionInfo}
          setOpen={setOpenConditionInfo}
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
    </Fragment>
  );
};

export default NewAddListingForm;

const Checkbox = ({ src, text, checked, onChange }) => (
  <div
    className={`border rounded py-4 relative h-20 ${checked && "bg-gray-300"}`}
    onClick={onChange}
  >
    <div className="relative w-8 h-8 mx-auto">
      <Image src={src} layout="fill" />
    </div>
    <input
      type="checkbox"
      className="absolute top-2 left-2 rounded"
      checked={checked}
      readOnly
    />
    <span className="text-xs mt-2 text-center block text-black-4e">{text}</span>
  </div>
);

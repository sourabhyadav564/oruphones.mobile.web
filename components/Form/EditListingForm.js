import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import MySelect from "./Select";
import ImageInput from "./ImageInput";
import Input from "./Input";
import {
  getExternalSellSourceData,
  getGlobalCities,
  getModelLists,
  getRecommandedPrice,
  updateLisiting,
  uploadImage,
} from "api-call";
import { useAuthState, useAuthDispatch } from "providers/AuthProvider";
import ListingAdded from "../Popup/ListingAdded";
import StorageInfo from "../Popup/StorageInfo";
import {
  getCityFromResponse,
  getDefaultImage,
  numberFromString,
  numberWithCommas,
} from "@/utils/util";
import ConditionInfo from "../Popup/ConditionInfo";

import ArrowDown from "@/assets/arrow-drop-down.svg";
import CurrentLocation from "@/assets/currentlocation.svg";

import Geocode from "react-geocode";
import Cookies from "js-cookie";
import ConditionPopup from "../Popup/ConditionPopup";
import PricePopup from "../Popup/PricePopup";
import imageCompression from "browser-image-compression";

const EditListingForm = ({ data }) => {
  const [make] = useState(data?.make);
  const [marketingName] = useState(data?.marketingName);
  const [deviceStorage] = useState(data?.deviceStorage);
  const [color] = useState(data?.color);
  const [condition, setCondition] = useState(data?.deviceCondition);
  const [charging, setCharging] = useState(data?.charger === "Y");
  const [headphone, setHeadphone] = useState(data?.earphone === "Y");
  const [originalbox, setOriginalbox] = useState(data?.originalbox === "Y");
  const [openStorageInfo, setOpenStorageInfo] = useState(false);
  const [recommandedPrice, setRecommandedPrice] = useState();
  const [inputUsername, setInputUsername] = useState("");
  const [inputSellPrice, setInputSellPrice] = useState(data?.listingPrice);
  const [deviceColors, setDeviceColors] = useState();
  const [deviceStorages, setDeviceStorages] = useState();
  const [devColor, setDevColor] = useState();
  const [devStorage, setDevStorage] = useState();
  const [sellValueRequired, setSellValueRequired] = useState("");
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [globalCities, setGlobalCities] = useState();
  const { authenticated, selectedSearchCity } = useAuthState();
  const userSelectedLocation =
    selectedSearchCity === "India" ? "" : selectedSearchCity;
  const [selectedCity, setSelectedCity] = useState(userSelectedLocation);
  const [openCondition, setopenCondition] = useState(false);
  const [ConditionResultEdit, setConditionResultEdit] = useState(condition);
  const [ConditionQuestionEdit, setConditionQuestionEdit] = useState("");
  const [warranty, setWarranty] = useState(data?.warranty);
  const deviceWarrantyCheck = [
    { value: "zero", label: "0-3 Months Ago", label2: "More than 9 months" },
    { value: "four", label: "4-6 Months Ago", label2: "More than 6 months" },
    { value: "seven", label: "7-11 Months Ago", label2: "More than 3 months" },
    { value: "more", label: "More Than 11 Months Ago", label2: "None" },
  ];
  const [warranty2, setWarranty2] = useState(
    deviceWarrantyCheck?.map(
      (item, index) => data?.warranty == item.label2 && item.value
    )
  );
  const [showWarranty, setShowWarranty] = useState(data?.warranty != "None");
  const [getExternalSellerData, setGetExternalSellerData] = useState([]);
  let initialState;

  if (data?.images && data.images.length === 1) {
    initialState = [...data?.images, { panel: "back" }];
  } else if (data?.images && data.images.length === 3) {
    initialState = [...data?.images, { panel: 4 }];
  } else if (data?.images && data.images.length === 5) {
    initialState = [...data?.images, { panel: 6 }];
  } else {
    initialState = [
      ...(data?.images || [{ panel: "front" }, { panel: "back" }]),
    ];
  }

  const [images, setImages] = useState(initialState);
  const [listingAdded, setListingAdded] = useState(false);
  const [openPricePopup, setOpenPricePopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  var sellValueTag;
  var sellValue;
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (
      warranty == "zero" ||
      warranty == "four" ||
      warranty == "seven" ||
      warranty == "more"
    ) {
      deviceWarrantyCheck?.map(
        (item, index) => warranty == item.value && setWarranty2(warranty)
      );
    } else {
      deviceWarrantyCheck?.map(
        (item, index) => warranty == item.label2 && setWarranty2(item.value)
      );
    }
  }, [warranty]);

  useEffect(() => {
    let payload = {
      deviceStorage: devStorage?.toString().includes("/")
        ? devStorage?.split("/")[0]
        : data?.deviceStorage,
      deviceRam: devStorage?.toString().includes("/")
        ? devStorage
            ?.toString()
            .split("/")[1]
            .toString()
            .replace(/GB/g, " GB")
            .replace(/RAM/, "")
            .trim()
        : data?.deviceRam,
      make: data?.make,
      marketingName: data?.marketingName,
      deviceCondition: condition || data?.deviceCondition,
      warrantyPeriod: warranty,
      hasCharger: headphone ? "Y" : "N",
      hasEarphone: charging ? "Y" : "N",
      hasOriginalBox: originalbox ? "Y" : "N",
    };
    if (
      make !== null &&
      marketingName !== null &&
      deviceStorage !== null &&
      condition !== null &&
      make != undefined &&
      marketingName != undefined &&
      deviceStorage != undefined &&
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
    marketingName,
    devStorage,
    condition,
    headphone,
    charging,
    originalbox,
    warranty,
  ]);

  useEffect(async () => {
    sellValueTag = document.querySelector("#sellValue") || "";
    sellValue = sellValueTag.value || "";
    if (data != undefined && data != null) {
      let models3;
      await getModelLists(
        Cookies.get("userUniqueId") || 0,
        Cookies.get("sessionId"),
        data?.make,
        data?.marketingName || ""
      ).then((response) => {
        models3 = response;
      });
      const models4 = models3?.dataObject[0].models.filter(
        (item) => item.marketingname === data?.marketingName
      );
      setDeviceColors(models4[0]?.color);
      setDeviceStorages(models4[0]?.storage);
    }
  }, [data]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cities"))?.length > 0) {
      setGlobalCities(JSON.parse(localStorage.getItem("cities")));
    } else {
      getGlobalCities("", Cookies.get("sessionId")).then((response) => {
        setGlobalCities(response.dataObject);
      });
    }
  }, []);

  const onLocChange = async (e) => {
    const citiesResponse = await getGlobalCities(e, Cookies.get("sessionId"));
    setGlobalCities(citiesResponse?.dataObject);
  };

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
        let payLoad = {
          city: location.city,
          country: "India",
          state: "",
          locationId: searchID,
          userUniqueId: Cookies.get("userUniqueId"),
        };
      }
      dispatch("ADDCITY", location.city);
      localStorage.setItem("usedLocation", location.city);
    }
  }, [location]);

  useEffect(() => {
    let reqParams = {
      make,
      marketingName,
      devicestorage: deviceStorage,
      deviceRam: data?.deviceRam,
      deviceCondition: condition || data?.deviceCondition,
      earPhones: headphone ? "Y" : "N",
      charger: charging ? "Y" : "N",
      originalBox: originalbox ? "Y" : "N",
      warrantyPeriod: warranty,
    };
    if (
      (condition || data?.deviceCondition) &&
      (charging || headphone || originalbox || warranty || true)
    ) {
      getRecommandedPrice(reqParams, Cookies.get("sessionId")).then(
        ({ dataObject }) => {
          setRecommandedPrice(dataObject);
        }
      );
    }
  }, [condition, charging, headphone, originalbox, warranty]);

  useEffect(() => {
    setCondition(ConditionResultEdit);
    setConditionQuestionEdit(ConditionQuestionEdit);
  }, [setopenCondition, ConditionResultEdit, ConditionQuestionEdit]);

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
          deviceStorage,
          make,
          model: marketingName,
          userUniqueId: user?.userdetails?.userUniqueId,
        },
        Cookies.get("sessionId")
      ).then(({ status, dataObject }) => {
        if (status === "SUCCESS") {
          setIsUploading(false);
          let tempImages = [...images];
          tempImages[index] = {
            ...tempImages[index],
            thumbImage: dataObject?.thumbnailImagePath,
            fullImage: dataObject?.imagePath,
          };
          setImages(tempImages);
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

  useEffect(
    (e) => {
      if (submitting === true) {
        submit();
      }
    },
    [submitting]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  async function submit() {
    sellValueTag = document.querySelector("#sellValue");
    sellValue = sellValueTag.value;

    if (!sellValue || (sellValue && sellValue.trim() < 1000)) {
      return setSellValueRequired("border-red");
    }

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
    let payload = {
      listingId: data.listingId,
      make,
      marketingName,
      deviceStorage: devStorage?.toString().includes("/")
        ? devStorage?.split("/")[0]
        : data?.deviceStorage,
      deviceRam: devStorage?.toString().includes("/")
        ? devStorage
            ?.toString()
            .split("/")[1]
            .toString()
            .replace(/GB/g, " GB")
            .replace(/RAM/, "")
            .trim()
        : data?.deviceRam,
      color: devColor || color,
      deviceCondition: condition || data?.deviceCondition,
      listingPrice: inputSellPrice,
      platform: "mobWeb",
      charger: charging ? "Y" : "N",
      earphone: headphone ? "Y" : "N",
      originalbox: originalbox ? "Y" : "N",
      warranty: warranty2,
      userUniqueId: user?.userdetails?.userUniqueId,
      verified: data.verified,
      listedBy: inputUsername || data?.listedBy,
      recommendedPriceRange:
        recommandedPrice?.leastSellingprice +
        "-" +
        recommandedPrice?.maxsellingprice,
      images: images.filter(
        (item) => item?.fullImage && item.fullImage !== null
      ),
      listingLocation: selectedCity || data?.listingLocation,
      cosmetic: ConditionQuestionEdit || data?.cosmetic,
    };
    updateLisiting(payload, Cookies.get("sessionId")).then(() => {
      setListingAdded(true);
      dispatch("REFRESH");
    });
  }

  return (
    <Fragment>
      <form
        className="grid grid-cols-1 font-SF-Pro space-y-6 mt-4"
        onSubmit={handleSubmit}
      >
        {data && (
          <div className="flex bg-white p-5  space-x-4 rounded-md drop-shadow-md">
            <Image
              quality={25}
              src={
                imageError
                  ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
                  : getDefaultImage(data?.marketingName) ||
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"
              }
              onError={() => {
                setImageError(true);
              }}
              className=""
              alt="model"
              height="80"
              width="60"
            />

            <div className="flex flex-col relative top-6 left-2">
              <p className="font-Roboto-Semibold text-dx text-[#2C2F45]">
                {data?.marketingName}
              </p>

              <p className="flex space-x-1">
                <span className=" font-Roboto-Regular text-jx text-[#2C2F45]">
                  RAM:
                </span>{" "}
                <div className="font-Roboto-Bold text-jx text-[#2C2F45]">
                  {devStorage
                    ? devStorage
                        ?.toString()
                        .split("/")[1]
                        .toString()
                        .replace(/GB/g, " GB")
                        .replace(/RAM/, "")
                        .trim()
                    : data?.deviceRam ||
                      data.storage
                        ?.toString()
                        .split("/")[1]
                        .toString()
                        .replace(/GB/g, " GB")
                        .replace(/RAM/, "")
                        .trim()}
                </div>
              </p>
              <p className="flex space-x-1 relative">
                <span className="font-Roboto-Regular text-jx text-[#2C2F45]">
                  Storage:
                </span>{" "}
                <div className=" font-Roboto-Bold text-jx text-[#2C2F45]">
                  {devStorage
                    ? devStorage.split("/")[0]
                    : data?.deviceStorage?.split("/")[0]}
                </div>
              </p>
              <p>
                <span className="font-Roboto-bold"></span>
              </p>
            </div>
          </div>
        )}
        <span>
          <p className="block font-Roboto-Medium border-b-2 mt-2 pb-2 text-[#000000] text-tx">
            Edit details
          </p>
        </span>
        {data && data?.deviceStorage && !data?.verified && (
          <div className="space-y-2">
            <p className="font-Roboto-Regular text-ex">
              Storage Variant <span className="text-red-400">*</span>
            </p>
            <div className="grid grid-cols-2 gap-3">
              {data &&
                data?.deviceStorage &&
                deviceStorages?.map((item, index) =>
                  devStorage ? (
                    <div
                      className={`${
                        devStorage == item
                          ? "bg-[#F3F3F3] border-2 border-[#F3F3F3] text[#2C2F45] font-Roboto-Medium text-jx opacity-100"
                          : "bg[#9597A2] border-2 text[#2C2F45] font-Roboto-Medium text-jx opacity-70"
                      }  active:bg-gray-200 duration-300 p-2 flex items-center justify-center rounded-md`}
                      onClick={() => setDevStorage(item)}
                      key={index}
                    >
                      <span>{item}</span>
                    </div>
                  ) : (
                    <div
                      className={`${
                        data?.deviceStorage +
                          "/" +
                          data?.deviceRam.replace(" ", "") +
                          " RAM" ==
                        item
                          ? "bg-[#F3F3F3] border-2 border-[#F3F3F3] text[#2C2F45] text-jx font-Roboto-Medium opacity-100"
                          : "bg[#9597A2] border-2 text[#2C2F45] text-jx font-Roboto-Medium opacity-70"
                      } active:bg-gray-200 duration-300 p-2 flex items-center justify-center rounded-md`}
                      onClick={() => setDevStorage(item)}
                      key={index}
                    >
                      <span>{item}</span>
                    </div>
                  )
                )}
            </div>
            <p
              className="text-sm whitespace-nowrap font-Roboto-Semibold underline cursor-pointer text-primary hover:text-blue-800"
              onClick={() => setOpenStorageInfo(true)}
            >
              How to check?
            </p>
          </div>
        )}
        <div>
          <div className="space-y-1 text-jx font-Regular mt-2">
            <p className="bg-white px-0.5 font-Roboto-Regular text-ex">
              Location <span className="text-[#F9C414]">*</span>
            </p>
          </div>
          <div className="flex flex-row w-full justify-center items-center mt-1">
            <MySelect
              placeholder={selectedCity ? selectedCity : data?.listingLocation}
              value={selectedCity ? selectedCity : data?.listingLocation}
              className="text-[#2C2F45] "
              onFocus={(e) => {
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
                .map((items) => {
                  return { label: items.city, value: items.city };
                })}
            />
            <div
              className="h-10 w-16 bg-gray-200 rounded-r-lg  inline-flex justify-center items-center hover:cursor-pointer"
              onClick={handleNearme}
            >
              <Image src={CurrentLocation} width={24} height={24} />
            </div>
          </div>
          <div
            className="flex flex-row pt-3 text-mx w-full font-Roboto-Semibold"
            onClick={handleNearme}
          >
            <Image src={CurrentLocation} width={24} height={24} />
            <div className="pl-1">Use Your Current Location</div>
          </div>
        </div>

        <div className="text-jx font-Regular mt-1">
          <p className="bg-white px-0.5   -mb-5 font-Roboto-Regular text-ex">
            Device Condition<span className="text-[#F9C414]">*</span>
          </p>
        </div>
        <div
          className={`outline px-3 outline-none relative w-full focus:outline-none focus:ring-0 rounded   h-10 flex  text-[#2C2F45] text-ex items-center justify-between bg-[#F3F3F3] `}
          onClick={() => setopenCondition(true)}
        >
          <div
            className="flex items-center flex-1"
            value={
              ConditionResultEdit ? ConditionResultEdit : data?.deviceCondition
            }
          >
            {ConditionResultEdit ? ConditionResultEdit : data?.deviceCondition}
          </div>
          <span className="-mr-6">
            <Image src={ArrowDown} width={24} height={24} />
          </span>
          <label></label>
        </div>
        <></>
        <p className="text-[#000000] font-Roboto-Regular text-ex border-b-2 pb-1 ">
          Upload Photos
        </p>
        <div className="grid grid-cols-2 relative">
          <div className="flex justify-center font-Roboto-Semibold text-cx text-gray-600">
            Product Image
          </div>
          <div className="flex justify-center font-Roboto-Semibold text-cx text-gray-600">
            Product Image
          </div>
          {images &&
            images.map((item, index) => (
              <div
                key={index}
                className="relative pt-4 even:ml-2 odd:mr-2 mb-2 rounded-md bg-[#E8E8E8]"
              >
                <ImageInput
                  type="file"
                  preview={item?.fullImage}
                  name={item?.panel}
                  onChange={(e) => {
                    handleImageChange(e, index);
                  }}
                  clearImage={(e) => clearImage(e, index)}
                  accept="image/*"
                  clickIndex={item?.imageIndex}
                  loading={isUploading}
                  index={index}
                />
              </div>
            ))}
          {images.length == 0 && (
            <span className="absolute -bottom-6 text-sm right-0 text-primary cursor-pointer">
              {setImages((prev) => [
                ...prev,
                { panel: images.length > 1 && images.length - 0 },
                { panel: images.length > 1 && images.length },
              ])}
            </span>
          )}
          {images && images.length < 8 && (
            <span
              className="absolute -bottom-6 text-sm right-0 text-primary cursor-pointer"
              onClick={() =>
                setImages((prev) => [
                  ...prev,
                  { panel: images.length > 1 && images.length - 0 },
                  { panel: images.length > 1 && images.length },
                ])
              }
            >
              + Add more
            </span>
          )}
        </div>
        <div className="pt-4">
          <p className="font-Roboto-Regular text-gx  text-[#000000]">
            Do you have the followings?
          </p>
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
              src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/box.svg"}
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
                setWarranty2("more");
              }}
              checked={showWarranty}
            />
          </div>
          {showWarranty && (
            <>
              <p className="font-Roboto-Regular  text-[#2C2F45] text-mx mt-8">
                What is your mobile age?
              </p>
              <div className="my-5 grid grid-cols-2 gap-5">
                {deviceWarrantyCheck?.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      warranty == item?.label2 || warranty == item?.value
                        ? "bg-gray-400 border border-[#F3F3F3]  text-black textmx"
                        : " border border-[#9597A2] text-[#2C2F45] textmx opacity-60"
                    } py-2 px-5 rounded-md hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 duration-300 border-2 border-gray-200 flex items-center justify-start text-sm`}
                    onClick={() => setWarranty(item.value)}
                  >
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="text-jx font-Roboto-Regular mt-2">
          <p className="bg-white px-0.5 font-Roboto-Regular text-[#2C2F45] -mb-4 text-jx">
            Name <span className="text-[#F9C414]">*</span>
          </p>
        </div>
        <Input
          placeholder={"Enter your name"}
          defaultValue={data?.listedBy || ""}
          onChange={(e) => setInputUsername(e.target.value)}
          disabled
        />
        <div className="text-jx font-Roboto-Regular mt-2">
          <p className="bg-white px-0.5 font-Roboto-Regular text-[#2C2F45] -mb-4 text-jx">
            Enter your sell price <span className="text-[#F9C414]">*</span>
          </p>
        </div>
        <div className="grid grid-cols-7 gap-4 relative">
          <Input
            id="sellValue"
            prefix={"₹"}
            type="number"
            max="999999"
            value={numberFromString(inputSellPrice)}
            inputClass="text-px text-[#2C2F45] pl-1 my-0 font-Roboto-Bold"
            className={`h-full col-span-4 text-[#2C2F45] text-px font-Roboto-Bold  `}
            errorClass={`border ${sellValueRequired}`}
            onChange={(e) => {
              setInputSellPrice(e.target.value);
              setSellValueRequired("");
            }}
          ></Input>
          {sellValueRequired && (
            <span className="text-red text-sm absolute -bottom-6 ">
              Enter price more than ₹1000
            </span>
          )}

          <div className="text-sm bg-[#E8E8E8] col-span-3 px-2  leading-tight rounded-md -ml-1 relative  ">
            <div className="m-auto">
              <span className="font-Roboto-Semibold text-cx opacity-50 m-auto justify-center text-[#2C2F45]">
                Recommended Price
              </span>
              <br />
              {(recommandedPrice && recommandedPrice?.leastSellingprice && (
                <p className="font-Roboto-bold text-[#2C2F45] text-ex m-auto justify-center">
                  <span className="mr-1">&#x20B9;</span>
                  {recommandedPrice?.leastSellingprice} -
                  {" " + recommandedPrice?.maxsellingprice}
                </p>
              )) || <p>--</p>}
            </div>
          </div>
        </div>
        {getExternalSellerData && getExternalSellerData.length > 0 && (
          <p
            className="font-Roboto-Light text-dx border-b-2 pb-1"
            style={{ color: "#707070" }}
          >
            Price from other vendors :
          </p>
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
                  <p className="text-dx text-[#141111] flex items-center font-Roboto-Semibold">
                    {items?.externalSourcePrice && (
                      <span className="font-Roboto-Regular mr-0.5"> ₹ </span>
                    )}
                    {numberWithCommas(items?.externalSourcePrice)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="bg-primary uppercase font-Roboto-Regular rounded py-3 text-white">
          {" "}
          submit{" "}
        </button>
      </form>
      {openStorageInfo && (
        <StorageInfo
          open={openStorageInfo}
          setOpen={setOpenStorageInfo}
          brand={make}
        />
      )}
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
      <ListingAdded open={listingAdded} setOpen={setListingAdded} />
      <PricePopup
        open={openPricePopup}
        setOpen={setOpenPricePopup}
        price={sellValue}
        leastPrice={recommandedPrice?.leastSellingprice}
        maxPrice={recommandedPrice?.maxsellingprice}
        setSubmitting={setSubmitting}
      />
      <ConditionPopup
        openCondition={openCondition}
        setopenCondition={setopenCondition}
        setConditionResultEdit={setConditionResultEdit}
        setConditionQuestionEdit={setConditionQuestionEdit}
      />
    </Fragment>
  );
};

export default EditListingForm;

const Checkbox = ({ src, text, checked, onChange }) => (
  <div
    className={`border-2 opacity-bg-60  rounded-md py-4 relative h-20 ${
      checked && "bg-[#E8E8E8] opacity-bg-50 "
    }`}
    onClick={onChange}
  >
    <div className="relative w-7 h-7 mx-auto">
      <Image src={src} layout="fill" alt="ORU user checkclick" />
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

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import chargingImg from "@/assets/charging-station.png";
import headphoneImg from "@/assets/headphones-line.png";
import originalBoxImg from "@/assets/box.png";
import originalBillImg from "@/assets/original-bill.png";
import MySelect from "./Select";
import ImageInput from "./ImageInput";
import Input from "./Input";
import { getExternalSellSourceData, getGlobalCities, getRecommandedPrice, updateLisiting, uploadImage } from "api-call";
import { useAuthState, useAuthDispatch } from "providers/AuthProvider";
import ListingAdded from "../Popup/ListingAdded";
import StorageInfo from "../Popup/StorageInfo";
import { getCityFromResponse, numberFromString, numberWithCommas } from "@/utils/util";
import ConditionInfo from "../Popup/ConditionInfo";
import { BiChevronDown, BiCurrentLocation } from "react-icons/bi";
import Geocode from "react-geocode";
import Cookies from "js-cookie";
import ConditionPopup from "../Popup/ConditionPopup";
import PricePopup from "../Popup/PricePopup";
import Logo from "@/assets/oru_phones_logo.png";
import imageCompression from "browser-image-compression";

const EditListingForm = ({ data, resultsSet }) => {
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
  const { authenticated, loading, selectedSearchCity } = useAuthState();
  const userSelectedLocation =
    selectedSearchCity === "India" ? "" : selectedSearchCity;
  const [selectedCity, setSelectedCity] = useState(userSelectedLocation);
  const [openCondition, setopenCondition] = useState(false);
  const [ConditionResultEdit, setConditionResultEdit] = useState(condition);
  const [ConditionQuestionEdit, setConditionQuestionEdit] = useState("");
  const [warranty, setWarranty] = useState("more");
  const [showWarranty, setShowWarranty] = useState(data?.warranty != "None");
  const [locationRequired, setLocationRequired] = useState("");
  // const [openStorageInfo, setOpenStorageInfo] = useState(false);
  const deviceWarrantyCheck = [
    { value: "zero", label: "0-3 Months Ago" },
    { value: "four", label: "4-6 Months Ago" },
    { value: "seven", label: "7-11 Months Ago" },
    { value: "more", label: "More Than 11 Months Ago" },
  ];
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
  const [verifySubmit, setVerifySubmit] = useState(false);
  var sellValueTag = document.querySelector("#sellValue") || "";
  var sellValue = sellValueTag.value || "";

  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

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
      getExternalSellSourceData(payload).then((response) => {
        console.log("response", response);
        setGetExternalSellerData(response?.dataObject);
      });
    }
  }, [make, marketingName, devStorage, condition, headphone, charging, originalbox]);


  useEffect(() => {
    if (data != undefined && data != null) {
      let modelData = resultsSet?.filter((item) => item.make === data?.make);
      let models = modelData[0]?.models.filter(
        (item) => item.marketingname === data?.marketingName
      );
      setDeviceColors(models[0]?.color);
      setDeviceStorages(models[0]?.storage);
    }
  }, [data]);

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
    };
    if (condition && (charging || headphone || originalbox || true)) {
      getRecommandedPrice(reqParams).then(
        ({ dataObject }) => {
          setRecommandedPrice(dataObject);
        },
        (err) => console.error(err)
      );
    }
  }, [condition, charging, headphone, originalbox, warranty]);

  const handleSelectChange = (e, name) => {
    if (name === "condition") {
      setCondition(e.value);
    } else {
      console.error(e);
    }
  };

  useEffect(() => {
    setCondition(ConditionResultEdit);
    setConditionQuestionEdit(ConditionQuestionEdit);
  }, [setopenCondition, ConditionResultEdit, ConditionQuestionEdit]);

  const handleImageChange = async (e, index) => {
    setIsUploading(true);
    const { name, files } = e.target;
    if (files && files.length) {
      // let formData = new FormData();
      // formData.append("image", files[0]);
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
        deviceStorage,
        make,
        model: marketingName,
        userUniqueId: user?.userdetails?.userUniqueId,
      }).then(
        ({ status, dataObject }) => {
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

  useEffect((e) => {
    if (submitting === true) {
      submit();
    }
  }, [submitting]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var sellValueTag = document.querySelector("#sellValue");
    var sellValue = sellValueTag.value;

    if (!sellValue || (sellValue && sellValue.trim() < 1000)) {
      return setSellValueRequired("border-red");
    }
    let payload = {
      listingId: data.listingId,
      make,
      marketingName,
      deviceStorage,
      color: devColor || color,
      deviceCondition: condition || data?.deviceCondition,
      listingPrice: inputSellPrice,
      platform: "mobWeb",
      charger: charging ? "Y" : "N",
      earphone: headphone ? "Y" : "N",
      originalbox: originalbox ? "Y" : "N",
      warrantyPeriod: warranty,
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
      listingLocation: selectedCity,
      cosmetic: ConditionQuestionEdit || data?.cosmetic,
    };
    updateLisiting(payload).then(
      () => {
        setListingAdded(true);
        dispatch("REFRESH");
      },
      (err) => console.error(err)
    );
  };

  return (
    <Fragment>
      <form className="grid grid-cols-1 font-SF-Pro space-y-6 mt-4" onSubmit={handleSubmit}>
        {/* <Input value={data?.make} disabled>
          Make
        </Input>
        <Input value={data?.marketingName} disabled>
          Model
        </Input> */}
        {data && (
          <div className="flex bg-white p-5  space-x-4 rounded-md drop-shadow-md">

            <Image
              src={data?.defaultImage?.fullImage || Logo}
              className=""
              alt="model"
              height="80"
              width="60"
            />

            <div className="flex flex-col relative top-6 left-2">
              <p className="font-Roboto-Semibold text-dx text-[#2C2F45]">{data?.marketingName}</p>

              <p className="flex space-x-1">
                <span className=" font-Roboto-Regular text-jx text-[#2C2F45]">RAM:</span>{" "}
                <div className="font-Roboto-Bold text-jx text-[#2C2F45]">
                  {devStorage ? devStorage?.toString()
                    .split("/")[1]
                    .toString()
                    .replace(/GB/g, " GB")
                    .replace(/RAM/, "")
                    .trim() : data?.deviceRam
                      ?.split("/")[1]
                  ||
                  data.storage
                    ?.toString()
                    .split("/")[1]
                    .toString()
                    .replace(/GB/g, " GB")
                    .replace(/RAM/, "")
                    .trim()
                  }
                </div>
              </p>
              <p className="flex space-x-1 relative">
                <span className="font-Roboto-Regular text-jx text-[#2C2F45]">Storage:</span>{" "}
                <div className=" font-Roboto-Bold text-jx text-[#2C2F45]">
                  {devStorage ? devStorage.split("/")[0] :
                    data?.deviceStorage?.split("/")[0]}
                </div>
              </p>
              {/* {condition && (
                <p>
                  <span className="font-bold">Condition:</span> {condition}
                </p>

              )} */}
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
                deviceStorages?.map((item, index) => (
                  devStorage ? <div
                    className={`${devStorage == item
                      ? "bg-[#F3F3F3] border-2 border-[#F3F3F3] text[#2C2F45] font-Roboto-Medium text-jx opacity-100"
                      : "bg[#9597A2] border-2 text[#2C2F45] font-Roboto-Medium text-jx opacity-70"
                      }  active:bg-gray-200 duration-300 p-2 flex items-center justify-center rounded-md`}
                    onClick={() => setDevStorage(item)}
                    key={index}
                  >
                    <span>{item}</span>
                  </div>
                    : <div
                      className={`${(data?.deviceStorage + "/" + data?.deviceRam.replace(" ", "") + " RAM") == item
                        ? "bg-[#F3F3F3] border-2 border-[#F3F3F3] text[#2C2F45] text-jx font-Roboto-Medium opacity-100"
                        : "bg[#9597A2] border-2 text[#2C2F45] text-jx font-Roboto-Medium opacity-70"
                        } active:bg-gray-200 duration-300 p-2 flex items-center justify-center rounded-md`}
                      onClick={() => setDevStorage(item)}
                      key={index}
                    >
                      <span>{item}</span>
                    </div>
                ))}
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
            <p className="bg-white px-0.5 font-Roboto-Regular text-ex">Location <span className="text-[#F9C414]">*</span></p>
          </div>
          <div className="flex flex-row w-full justify-center items-center mt-1">

            <MySelect
              // labelName="Location*"
              placeholder={selectedCity ? selectedCity : data?.listingLocation}
              value={selectedCity ? selectedCity : data?.listingLocation}
              // className={`${locationRequired}`}
              className="text-[#2C2F45] "
              onFocus={(e) => {
                // setLocationRequired("");
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
            <div className="h-10 w-16 bg-gray-200 rounded-r-lg  inline-flex justify-center items-center hover:cursor-pointer"
              onClick={handleNearme}>
              <BiCurrentLocation size={24} />
            </div>
          </div>
          {/* {locationRequired && (
            <p className="text-sm whitespace-nowrap cursor-pointer text-red">
              Please select this field
            </p>
          )} */}
        </div>
        {/* {data?.verified ? (
          <Input value={data?.deviceStorage} disabled>
            Storage
          </Input>
        ) : (
          <MySelect
            labelName="Storage"
            placeholder={data?.deviceStorage}
            onChange={(e) => setDevStorage(e.value)}
            options={deviceStorages?.map((item) => {
              return { label: item, value: item };
            })}
          />
        )} */}
        {/* <MySelect
          labelName="Color"
          placeholder={data?.color}
          onChange={(e) => setDevColor(e.value)}
          options={deviceColors?.map((item) => {
            return { label: item, value: item };
          })}
        /> */}
        <div className="text-jx font-Regular mt-1">
          <p className="bg-white px-0.5   -mb-5 font-Roboto-Regular text-ex">Device Condition<span className="text-[#F9C414]">*</span></p>
        </div>
        <div className={`outline px-3 outline-none relative w-full focus:outline-none focus:ring-0 rounded   h-10 flex  text-[#2C2F45] text-ex items-center justify-between bg-[#F3F3F3] `}
          onClick={() => setopenCondition(true)}>
          <div className="flex items-center flex-1"
            // labelName="Device Condition"
            // placeholder={condition ? condition : data?.condition}
            value={ConditionResultEdit ? ConditionResultEdit : data?.deviceCondition}
          // onChange={(e) => handleSelectChange(e, condition)}
          // options={["Like New", "Excellent", "Good"].map((i) => {
          //   return { label: i, value: i };
          // })}
          >
            {ConditionResultEdit ? ConditionResultEdit : data?.deviceCondition}
          </div>
          <span className="-mr-6">
            <BiChevronDown size={24} />
          </span>
          {/* <label
            style={{ color: "rgba(0, 0, 0, 0.6)" }}
      className="absolute top-0 left-0 text-[#2C2F45] bg-white z-1 duration-300 origin-0 font-semibold text-sm">Device Condition*</label> */}
          <label>

          </label>
        </div>
        <>
          {/* <DeviceConditionCard
                  condition={condition}
                  answer={conditionResults}
                /> */}
          {/* <div className="flex flex-col bg-white p-5 rounded-md drop-shadow-md">
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
          </p> */}
        </>
        <p className="text-[#000000] font-Roboto-Regular text-ex border-b-2 pb-1 ">Upload Photos</p>
        <div className="grid grid-cols-2 relative">
          {images &&
            images.map((item, index) => (
              <div key={index} className="relative pt-4 even:ml-2 odd:mr-2 mb-2 rounded-md bg-[#E8E8E8]">
                {index === 0 ? (
                  <span className="absolute bottom-4 left-14 font-Roboto-Light text-cx opacity-50">Front Panel </span>
                ) : index === 1 ? (
                  <span className="absolute bottom-4 left-14 font-Roboto-Light text-cx opacity-50"> Back Panel</span>
                ) : (
                  ""
                )}
                {/* <ImageInput
                  type="file"
                  preview={item?.fullImage}
                  name={item?.panel}
                  onChange={(e) => handleImageChange(e, index)}
                  clearImage={(e) => clearImage(e, index)}
                  accept="image/*"
                /> */}
                <ImageInput
                  type="file"
                  preview={item?.fullImage}
                  name={item?.panel}
                  onChange={(e) => {
                    handleImageChange(e, index);
                    // setImageIndex(index);
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
            <span
              className="absolute -bottom-6 text-sm right-0 text-primary cursor-pointer">
              {
                setImages((prev) => [
                  ...prev,
                  { panel: images.length > 1 && images.length - 0 },
                  { panel: images.length > 1 && images.length },
                ])
              }
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
        {/* <p className="text-gray-70 font-semibold capitalize">Add accessories</p> */}
        {/* <div className="grid grid-cols-3 space-x-2">
          <Checkbox
            src={chargingImg}
            text="Charger"
            onChange={() => setCharging((prev) => !prev)}
            checked={charging}
          />
          <Checkbox
            src={headphoneImg}
            text="Earphones"
            onChange={() => setHeadphone((prev) => !prev)}
            checked={headphone}
          />
          <Checkbox
            src={originalBoxImg}
            text="Original Box"
            onChange={() => setOriginalbox((prev) => !prev)}
            checked={originalbox}
          />
        </div> */}
        <div className="pt-4">
          <p className="font-Roboto-Regular text-gx  text-[#000000]">
            Do you have the followings?
          </p>
          {/* <div className="grid grid-cols-2 gap-4 mt-5">
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
          </div> */}
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
              <p className="font-Roboto-Regular  text-[#2C2F45] text-mx mt-8">
                What is your mobile age?
              </p>
              <div className="my-5 grid grid-cols-2 gap-5">
                {deviceWarrantyCheck?.map((item, index) => (
                  <div
                    key={index}
                    className={`${warranty == item?.value
                      ? "bg-[#F3F3F3] border border-[#F3F3F3]  text-[#2C2F45] textmx"
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
          <p className="bg-white px-0.5 font-Roboto-Regular text-[#2C2F45] -mb-4 text-jx">Name <span className="text-[#F9C414]">*</span></p>
        </div>
        <Input
          placeholder={"Enter your name"}
          defaultValue={data?.listedBy || ""}
          onChange={(e) => setInputUsername(e.target.value)}
          disabled
        />
        <div className="text-jx font-Roboto-Regular mt-2">
          <p className="bg-white px-0.5 font-Roboto-Regular text-[#2C2F45] -mb-4 text-jx">Enter your sell price <span className="text-[#F9C414]">*</span></p>
        </div>
        {/* <div className="grid grid-cols-5 relative">
          
          <Input
            id="sellValue"
            prefix={"₹"}
            value={numberFromString(inputSellPrice)}
            type="number"
            inputClass="text-3xl font-bold"
            className={`h-full col-span-3 text-3xl font-bold rounded-r-none border-r-0`}
            errorClass={`border ${sellValueRequired}`}
            onChange={(e) => {
              setInputSellPrice(e.target.value);
              setSellValueRequired("");
            }}
          />
           
          {sellValueRequired && (
            <span className="text-red text-sm absolute -bottom-6">
              Enter price more than 1000
            </span>
          )}
          <div className="text-sm bg-gray-c7 text-black-4e col-span-2 px-2 py-1 rounded -ml-1 z-10">
            <span>Recommended Price</span>
            <br />
            {recommandedPrice && (
              <p>
                <span className="mr-1">&#x20B9;</span>{" "}
                {recommandedPrice?.leastSellingprice} -{" "}
                {recommandedPrice?.maxsellingprice}
              </p>
            )}
          </div>
        </div> */}
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
          >
            {/* Enter your sell price* */}
          </Input>
          {sellValueRequired && (
            <span className="text-red text-sm absolute -bottom-6 ">
              Enter price more than ₹1000
            </span>
          )}

          <div className="text-sm bg-[#E8E8E8] col-span-3 px-2  leading-tight rounded-md -ml-1 relative  ">
            <div className="m-auto">
              <span className="font-Roboto-Semibold text-cx opacity-50 m-auto justify-center text-[#2C2F45]">Recommended Price</span>
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

        {/* {getExternalSellerData && getExternalSellerData.length > 0 && (
          <p
            className="font-semibold mt-1 pt-3"
            style={{ color: "#707070" }}
          >
            Check prices from other buyers:
          </p>
        )} */}
        {/* {getExternalSellerData && getExternalSellerData.length > 0 && (
          <div className="border rounded-md mb-3 w-full">
            {getExternalSellerData.map((items, index) => (
              <div
                className="px-4 flex justify-between items-center w-full"
                key={index}
              >
                <p className="text-xl flex items-center">
                  {items?.externalSourcePrice && (
                    <span className="font-Regular mr-0.5"> ₹ </span>
                  )} */}
        {/* {numberWithCommas( */}
        {/* {items?.externalSourcePrice} */}
        {/* )} */}
        {/* </p>
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
        )} */}

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
                      style={{ width: "auto", height: 40, backgroundSize: "auto", backgroundOrigin: "content-box" }}
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
      {
        openConditionInfo && (
          <ConditionInfo
            open={openConditionInfo}
            setOpen={setOpenConditionInfo}
          />
        )
      }
      {
        openStorageInfo && (
          <StorageInfo
            open={openStorageInfo}
            setOpen={setOpenStorageInfo}
            brand={make}
          />
        )
      }
      <ListingAdded open={listingAdded} setOpen={setListingAdded} />
      <PricePopup open={openPricePopup} setOpen={setOpenPricePopup} price={sellValue} leastPrice={recommandedPrice?.leastSellingprice} maxPrice={recommandedPrice?.maxsellingprice} setSubmitting={setSubmitting} />
      <ConditionPopup openCondition={openCondition} setopenCondition={setopenCondition} setConditionResultEdit={setConditionResultEdit} setConditionQuestionEdit={setConditionQuestionEdit} />
    </Fragment >
  );
};

export default EditListingForm;

const Checkbox = ({ src, text, checked, onChange }) => (
  <div
    className={`border rounded-md bg-[#E8E8E8] py-4 relative h-20 opacity-bg-90 ${checked && "bg-[#c9c9d0]"}`}
    onClick={onChange}
  >
    <div className="relative w-7 h-7 mx-auto ">
      <Image src={src} layout="fill" />
    </div>
    <label>

      <input
        type="checkbox"
        className="absolute top-1 left-1.5 rounded text-white"
        checked={checked}
        readOnly
      />
    </label>

    <span className="text-cx font-Roboto-Regular mt-2 text-center block text-black-4e">{text}</span>
  </div>
);


// const Checkbox = ({ src, text, checked, onChange }) => (
//   <div
//     className={`border rounded-md bg-[#ffffff] py-4 relative h-20 opacity-90 ${checked && "bg-[#e2e1e1]"} `}
//     onClick={onChange}
//   >
//     <div className="relative w-7 h-7 mx-auto">
//       <Image src={src} layout="fill"/>
//     </div>

//     <input
//       type="checkbox"
//       className="absolute top-2 left-2 rounded accent-pink-500 "
//       checked={checked}
//       readOnly
//     />
//     <span className="text-xs mt-2 text-center block text-black-4e">
//       {" "}
//       {text}{" "}
//     </span>
//   </div>
// );

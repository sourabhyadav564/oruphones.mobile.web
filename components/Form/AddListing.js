import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import chargingImg from "@/assets/charging-station.svg";
import headphoneImg from "@/assets/headphones-line.svg";
import originalBoxImg from "@/assets/box.svg";
import MySelect from "./Select";
import ImageInput from "./ImageInput";
import Input from "./Input";
import {
  getRecommandedPrice,
  saveLisiting,
  uploadImage,
  getExternalSellSourceData,
  getGlobalCities,
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

const initialState = [{ panel: "front" }, { panel: "back" }];

const AddListingForm = ({ data }) => {
  const [make, setMake] = useState();
  const [model, setModel] = useState();
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

  useEffect(() => {
    if (make) {
      setModel();
      setColor();
      setStorage();
      setStorageColorOption();
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
    }
  }, [model]);

  useEffect(() => {
    let payload = {
      deviceStorage: storage?.split("/")[0],
      make: make,
      marketingName: model,
      deviceCondition: condition,
      warrantyPeriod: "more",
      hasCharger: headphone ? "Y" : "N",
      hasEarphone: charging ? "Y" : "N",
      hasOriginalBox: originalbox ? "Y" : "N",
    };
    if (
      make !== null &&
      model !== null &&
      storage !== null &&
      condition !== null
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
      devicestorage: storage?.split("/")[0],
      deviceCondition: condition,
      earPhones: headphone ? "Y" : "N",
      charger: charging ? "Y" : "N",
      originalBox: originalbox ? "Y" : "N",
      warrantyPeriod: "more",
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

  const handleSelectChange = (e, name) => {
    if (name === "make") {
      setMake(e.value);
      let index = data.findIndex((i) => i.make === e.value);
      setMktNameOpt(data[index]?.models);
    } else if (name === "model") {
      setModel(e.value);
      let index = mktNameOpt.findIndex((i) => i.marketingname === e.value);
      setStorageColorOption(mktNameOpt[index]);
    } else if (name === "storage") {
      setStorage(e.value);
    } else if (name === "color") {
      setColor(e.value);
    } else if (name === "condition") {
      setCondition(e.value);
    } else {
      console.error(e);
    }
  };

  const handleImageChange = (e, index) => {
    const { name, files } = e.target;
    if (files && files.length) {
      let formData = new FormData();
      formData.append("image", files[0]);
      uploadImage(formData, {
        deviceFace: name,
        deviceStorage: storage,
        make,
        model,
        userUniqueId: user?.userdetails?.userUniqueId,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    var sellValueTag = document.querySelector("#sellValue");
    console.log(sellValueTag);
    var sellValue = sellValueTag.value;

    var inputNameTag = document.querySelector("#inputName");
    console.log(inputNameTag);
    var inputName = inputNameTag.value;

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
        platform: "mobWeb",
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

  return (
    <Fragment>
      {(makeRequired.length > 0 ||
        marketingNameRequired.length > 0 ||
        deviceConditionRequired.length > 0 ||
        storageRequired.length > 0) && (
        <h1 className="text-red pt-4">
          Please fill all the required fields properly
        </h1>
      )}
      <form className="grid grid-cols-1 space-y-6 mt-8" onSubmit={handleSubmit}>
        <div>
          <MySelect
            labelName="Brand*"
            placeholder=""
            className={makeRequired}
            onFocus={(e) => {
              setMakeRequired("");
            }}
            value={{ label: make, value: make }}
            onChange={(e) => handleSelectChange(e, "make")}
            options={
              data &&
              data.map((i) => {
                return { label: i.make, value: i.make };
              })
            }
          />
          {makeRequired && (
            <p className="text-sm whitespace-nowrap cursor-pointer text-red">
              Please select this field
            </p>
          )}
        </div>
        <div>
          <MySelect
            labelName="Model*"
            placeholder=""
            className={marketingNameRequired}
            onFocus={(e) => {
              setMarketingNameRequired("");
            }}
            onChange={(e) => handleSelectChange(e, "model")}
            value={{ label: model, value: model }}
            options={
              mktNameOpt &&
              mktNameOpt.map((i) => {
                return { label: i.marketingname, value: i.marketingname };
              })
            }
          />
          {marketingNameRequired && (
            <p className="text-sm whitespace-nowrap cursor-pointer text-red">
              Please select this field
            </p>
          )}
        </div>
        <div>
          <MySelect
            labelName="Storage*"
            placeholder=""
            className={storageRequired}
            onFocus={(e) => {
              setStorageRequired("");
            }}
            value={{ label: storage, value: storage }}
            onChange={(e) => handleSelectChange(e, "storage")}
            options={
              storageColorOption &&
              storageColorOption?.storage &&
              storageColorOption.storage.map((i) => {
                return { label: i, value: i };
              })
            }
          />
          {storageRequired && (
            <p className="text-sm whitespace-nowrap cursor-pointer text-red">
              Please select this field
            </p>
          )}
        </div>
        <MySelect
          labelName="Color"
          placeholder=""
          value={{ label: color, value: color }}
          onChange={(e) => handleSelectChange(e, "color")}
          options={
            storageColorOption &&
            storageColorOption?.color &&
            storageColorOption.color.map((i) => {
              return { label: i, value: i };
            })
          }
        />
        <div>
          <MySelect
            labelName="Device Condition*"
            placeholder=""
            className={deviceConditionRequired}
            onFocus={(e) => {
              setDeviceConditionRequired("");
            }}
            value={{ label: condition, value: condition }}
            onChange={(e) => handleSelectChange(e, "condition")}
            options={["Like New", "Excellent", "Good", "Fair"].map((i) => {
              return { label: i, value: i };
            })}
          />
          {deviceConditionRequired && (
            <p className="text-sm whitespace-nowrap cursor-pointer text-red">
              Please select this field
            </p>
          )}
          <p
            className="text-sm whitespace-nowrap underline cursor-pointer text-blue-600 hover:text-blue-800"
            onClick={() => setOpenConditionInfo(true)}
          >
            What&apos;s this?
          </p>
        </div>
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
                onChange={(e) => handleImageChange(e, index)}
                clearImage={(e) => clearImage(e, index)}
                accept="image/*"
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
        <p className="text-gray-70 font-semibold capitalize">Add accessories</p>
        <div className="grid grid-cols-3 space-x-2">
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
        </div>
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
          >
            Name*
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
              ?.filter((item) => item.displayWithImage === "0")
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
            Enter your sell price*
          </Input>
          {sellValueRequired && (
            <span className="text-red text-sm absolute -bottom-6">
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
          <p className="font-semibold mt-1" style={{ color: "#707070" }}>
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
        <div className="flex justify-center items-center mt-2">
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
      </form>
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
    </Fragment>
  );
};

export default AddListingForm;

const Checkbox = ({ src, text, checked, onChange }) => (
  <div
    className={`border rounded py-4 relative ${checked && "bg-gray-ef"}`}
    onClick={onChange}
  >
    <div className="relative w-12 h-12 mx-auto">
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

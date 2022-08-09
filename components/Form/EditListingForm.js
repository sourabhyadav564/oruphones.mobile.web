import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import chargingImg from "@/assets/charging-station.svg";
import headphoneImg from "@/assets/headphones-line.svg";
import originalBoxImg from "@/assets/box.svg";
import MySelect from "./Select";
import ImageInput from "./ImageInput";
import Input from "./Input";
import { getRecommandedPrice, updateLisiting, uploadImage } from "api-call";
import { useAuthState, useAuthDispatch } from "providers/AuthProvider";
import ListingAdded from "../Popup/ListingAdded";
import { numberFromString } from "@/utils/util";

const EditListingForm = ({ data, resultsSet }) => {
  const [make] = useState(data?.make);
  const [marketingName] = useState(data?.marketingName);
  const [deviceStorage] = useState(data?.deviceStorage);
  const [color] = useState(data?.color);
  const [condition, setCondition] = useState(data?.deviceCondition);
  const [charging, setCharging] = useState(data?.charger === "Y");
  const [headphone, setHeadphone] = useState(data?.earphone === "Y");
  const [originalbox, setOriginalbox] = useState(data?.originalbox === "Y");
  const [recommandedPrice, setRecommandedPrice] = useState();
  const [inputUsername, setInputUsername] = useState("");
  const [inputSellPrice, setInputSellPrice] = useState(data?.listingPrice);
  const [deviceColors, setDeviceColors] = useState();
  const [deviceStorages, setDeviceStorages] = useState();
  const [devColor, setDevColor] = useState();
  const [devStorage, setDevStorage] = useState();
  const [sellValueRequired, setSellValueRequired] = useState("");

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

  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  console.log("resultsSet --->", resultsSet);

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
    let reqParams = {
      make,
      marketingName,
      devicestorage: deviceStorage,
      deviceCondition: condition,
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
  }, [condition, charging, headphone, originalbox]);

  const handleSelectChange = (e, name) => {
    if (name === "condition") {
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
        deviceStorage,
        make,
        model: marketingName,
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
      deviceCondition: condition,
      listingPrice: inputSellPrice,
      platform: make === "Apple" ? "iOS" : "Android",
      charger: charging ? "Y" : "N",
      earphone: headphone ? "Y" : "N",
      originalbox: originalbox ? "Y" : "N",
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
      <form className="grid grid-cols-1 space-y-6 mt-8" onSubmit={handleSubmit}>
        <Input value={data?.make} disabled>
          Make
        </Input>
        <Input value={data?.marketingName} disabled>
          Model
        </Input>
        {data?.verified ? (
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
        )}
        <MySelect
          labelName="Color"
          placeholder={data?.color}
          onChange={(e) => setDevColor(e.value)}
          options={deviceColors?.map((item) => {
            return { label: item, value: item };
          })}
        />
        <MySelect
          labelName="Device Condition"
          placeholder=""
          value={{ label: condition, value: condition }}
          onChange={(e) => handleSelectChange(e, "condition")}
          options={["Like New", "Excellent", "Good"].map((i) => {
            return { label: i, value: i };
          })}
        />
        <p className="text-gray-70 font-semibold">Upload Photos</p>
        <div className="grid grid-cols-2 relative">
          {images &&
            images.map((item, index) => (
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
        <Input
          placeholder={"Enter your name"}
          defaultValue={data?.listedBy || ""}
          onChange={(e) => setInputUsername(e.target.value)}
        >
          Name
        </Input>
        <div className="grid grid-cols-5 relative">
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
          >
            Enter your sell price
          </Input>
          {sellValueRequired && (
            <span className="text-red text-sm absolute -bottom-6">
              Enter price more than 1000
            </span>
          )}
          <div className="text-sm bg-gray-c7 text-black-4e col-span-2 px-2 py-1 rounded-r -ml-1 z-10">
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
        </div>
        <button className="bg-primary uppercase rounded py-3 text-white">
          {" "}
          submit{" "}
        </button>
      </form>
      <ListingAdded open={listingAdded} setOpen={setListingAdded} />
    </Fragment>
  );
};

export default EditListingForm;

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
    <span className="text-xs mt-2 text-center block text-black-4e">
      {" "}
      {text}{" "}
    </span>
  </div>
);

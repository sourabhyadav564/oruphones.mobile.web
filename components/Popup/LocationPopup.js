import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import MySelect from "../Form/Select";
import Modal1 from "./Modal1";
import { getGlobalCities, updateAddress, getUserDetails } from "api-call";
import { useAuthDispatch, useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";

function LocationPopup({ open, setOpen }) {
  const [globalCities, setGlobalCities] = useState();
  const selectedCity = useRef();
  const [searchLocationID, setSearchLocationID] = useState();
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    const callApi = () => {
      if (!open) return null;
      getGlobalCities().then(
        (response) => {
          setGlobalCities(response.dataObject);
        },
        (err) => console.error(err)
      );
    };
    callApi();
  }, [open]);

  function handleCityChange(city) {
    // console.log("selectedCity ", city);
    selectedCity.current = city;
    if (user != null) {
      let cityInfo = [];
      cityInfo = globalCities.filter((item) => item.city === city);
      // console.log("submitSelectedCity cityInfo", cityInfo);

      let payLoad = {
        city: city,
        country: cityInfo[0].country,
        state: cityInfo[0].state,
        locationId: searchLocationID,
        userUniqueId: Cookies.get("userUniqueId"),
      };
      updateAddress(payLoad).then((res) => {
        // console.log("updateAddress RES -> ", res);
        getUserDetails(Cookies.get("countryCode"), Cookies.get("mobileNumber")).then((resp) => {
          // console.log("userProfile -> ", resp.dataObject);
          dispatch("LOGIN", resp.dataObject);
        });
      });
    }
    dispatch("ADDCITY", city);
    localStorage.setItem("usedLocation", city);
    setOpen(false);
  }

  useEffect(() => {
    let searchID = searchLocationID;
    // console.log("MW USER ", user);
    let searchLocId = user?.address?.filter((items) => {
      return items.addressType === "SearchLocation";
    });
    if (searchLocId) {
      searchID = searchLocId[0]?.locationId;
    }
    // console.log("setSearchLocationID ", searchID);
    setSearchLocationID(searchID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.address]);

  return (
    <Modal1 open={open} setOpen={setOpen}>
      <div className="bg-white px-4 py-6 pb-4">
        <div className="text-left sm:mt-0 sm:ml-4 sm:text-left text-black-4e">
          <Dialog.Title as="h1" className="text-lg leading-6 font-semibold ">
            Select Location
          </Dialog.Title>
          <form className="mb-4 mt-3 w-full text-sm space-y-2 pt-4">
            <MySelect
              labelName="Location"
              onChange={(e) => {
                handleCityChange(e.value);
              }}
              options={globalCities
                ?.filter((item) => item.displayWithImage === "0")
                .map((items) => {
                  return { label: items.city, value: items.city };
                })}
            />
            <span className="block text-base w-full text-center">or</span>
            <div className="grid grid-cols-3 text-center -mx-1" style={{ minHeight: "40vh" }}>
              {globalCities &&
                globalCities
                  .filter((item) => item.displayWithImage === "1")
                  .slice(0, 9)
                  .map((items) => (
                    <div
                      className={`border rounded px-0 py-2 m-1 ${selectedCity.current === items.city && "border-primary"}`}
                      key={items.city}
                      onClick={() => handleCityChange(items.city)}
                    >
                      <div className="relative w-14 h-14 mx-auto">
                        <Image src={items.imgpath} alt={items.city} width={"100%"} height={"100%"} objectFit="contain" />
                      </div>
                      <span className="block capitalize text-m-grey-1 mt-2 text-xs px-2 w-full truncate">{items.city}</span>
                    </div>
                  ))}
            </div>
          </form>
        </div>
      </div>
    </Modal1>
  );
}

export default LocationPopup;

const Button = ({ children, active, ...rest }) => (
  <p
    className={`block rounded-md text-xs border mr-3 my-2 px-4 py-1 ${active ? "bg-primary-light text-primary border-primary" : "border-gray-c7"}`}
    {...rest}
  >
    {children}
  </p>
);

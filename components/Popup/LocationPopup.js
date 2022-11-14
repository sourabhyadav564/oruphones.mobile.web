import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import MySelect2 from "../Form/Select2";
import Modal1 from "./Modal1";
import { getGlobalCities, updateAddress, getUserDetails } from "api-call";
import { useAuthDispatch, useAuthState } from "providers/AuthProvider";
import BasicCarousel from "../Carousel/BasicCarousel";
import Cookies from "js-cookie";
import { BiCurrentLocation } from "react-icons/bi";
import LocationPicker from "../Popup/LocationPicker";
import Geocode from "react-geocode";
import { getCityFromResponse } from "@/utils/util";

function LocationPopup({ open, setOpen }) {
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const [globalCities, setGlobalCities] = useState();
  const selectedCity = useRef();
  const [searchLocationID, setSearchLocationID] = useState();
  const { user, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();

  const [location, setLocation] = useState({
    loaded: false,
    city: "",
  });

  useEffect(() => {
    if (
      localStorage.getItem("cities") != undefined &&
      JSON.parse(localStorage.getItem("cities"))?.length > 0
    ) {
      setGlobalCities(JSON.parse(localStorage.getItem("cities")));
      console.log("cities from local");
    } else {
      console.log("cities from api");
      const callApi = () => {
        if (!open) return null;
        getGlobalCities().then(
          (response) => {
            setGlobalCities(response.dataObject);
            localStorage.setItem("cities", JSON.stringify(response.dataObject));
          },
          (err) => console.error(err)
        );
      };
      callApi();
    }
  }, [open]);

  function handleCityChange(city) {
    selectedCity.current = city;
    if (user != null) {
      let cityInfo = [];
      cityInfo = globalCities.filter((item) => item.city === city);

      let payLoad = {
        city: city,
        country: cityInfo[0].country,
        state: cityInfo[0].state,
        locationId: searchLocationID,
        userUniqueId: Cookies.get("userUniqueId"),
      };
      // updateAddress(payLoad).then((res) => {
      //   getUserDetails(Cookies.get("countryCode"), Cookies.get("mobileNumber")).then((resp) => {
      //     dispatch("LOGIN", resp.dataObject);
      //   });
      // });
    }
    dispatch("ADDCITY", city);
    localStorage.setItem("usedLocation", city);
    setOpen(false);
  }

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
        setOpen(false);
      },
      (error) => {
        console.error(error);
        setLocation({
          loaded: true,
          city: "India",
        });
        setOpen(false);
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
    let searchID = searchLocationID;
    let searchLocId = user?.address?.filter((items) => {
      return items.addressType === "SearchLocation";
    });
    if (searchLocId) {
      searchID = searchLocId[0]?.locationId;
    }
    setSearchLocationID(searchID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.address]);

  return (
    <Modal1 open={open} setOpen={setOpen}>
      <div className="bg-white px-4 py-6 pb-4">
        <div className="text-left sm:mt-0 sm:ml-4  sm:text-left text-black-4e">
          <Dialog.Title as="h1" className="text-ex  font-Roboto-Bold">
            Select Location
          </Dialog.Title>
          <form className="mb-4 w-full text-sm space-y-2 pt-4">
            <div className="flex flex-rpw">
              <MySelect2
                // labelName="Location"
                onChange={(e) => {
                  handleCityChange(e.value);
                }}
                options={globalCities
                  ?.sort((a, b) => a.city.localeCompare(b.city))
                  // ?.filter((item) => item.displayWithImage === "-1")
                  ?.map((items) => {
                    return { label: items.city, value: items.city };
                  })}
              />
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-r-md cursor-pointer"
                onClick={handleNearme}>
                <p className="text-m text-gray-4e flex font-bold justify-center">
                  <BiCurrentLocation className="h-5 w-5" />
                </p>
              </span>
            </div>
            {/* <span className="block text-base w-full text-center">or</span> */}
            {/* <BasicCarousel
        slidesPerView={4.4}
        spaceBetween={8}
        style={{ padding: "8px"}}
      > */}
            <div
              className="flex text-center -mx-1 py-4 overflow-x-scroll no-scrollbar"
            // style={{ minHeight: "40vh" }}
            >
              {globalCities &&
                globalCities
                  .filter((item) => item.displayWithImage === "1")
                  // .slice(0, 9)
                  .map((items) => (
                    <div
                      className={`border-0 bg-[#F1F1F1] rounded px-4 py-2 m-1  ${selectedCity.current === items.city && "border-primary"
                        }`}
                      key={items.city}
                      onClick={() => handleCityChange(items.city)}
                    >
                      <div className="relative w-14 mx-auto">
                        <Image
                          src={items.imgpath}
                          alt={items.city}
                          width={47}
                          height={32}
                          objectFit="contain"
                        />
                      </div>
                      <span className="block capitalize text-[#2C2F45] text-cx font-Roboto-Regular text-xs px-2 w-full truncate">
                        {items.city}
                      </span>
                    </div>
                  ))}
            </div>

            <div className="">
              <h1 className="uppercase text-ex border-b pb-1.5 border-black-4e font-Roboto-Medium ">all cities</h1>
              <div className="pt-2 h-80 overflow-y-scroll no-scrollbar">
                {globalCities && globalCities.map((items) => (
                  <div className="pb-2" onClick={() => handleCityChange(items.city)}>
                    <p className="border-b px-2 pb-2">{items.city}</p>
                  </div>
                ))
                }
              </div>
            </div>
            {/* </BasicCarousel> */}
          </form>
        </div>
      </div>
      <LocationPicker openLocationPopup={() => setOpenLocationPopup(true)} />
    </Modal1 >
  );
}

export default LocationPopup;

const Button = ({ children, active, ...rest }) => (
  <p
    className={`block rounded-md text-xs border mr-3 my-2 px-4 py-1 ${active ? "bg-primary-light text-primary border-primary" : "border-gray-c7"
      }`}
    {...rest}
  >
    {children}
  </p>
);

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import Modal1 from "./Modal1";
import { getGlobalCities } from "api-call";
import { useAuthDispatch, useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";
import CurrentLocation from "@/assets/currentlocation.svg";
import Geocode from "react-geocode";
import { getCityFromResponse } from "@/utils/util";
import MySelect from "../Form/Select";

function LocationPopup({ open, setOpen }) {
  const [cityResponse2, setCitiesResponse2] = useState("");
  const [globalCities, setGlobalCities] = useState();
  const selectedCity = useRef();
  const [searchLocationID, setSearchLocationID] = useState();
  const { user, authenticated } = useAuthState();
  const dispatch = useAuthDispatch();
  const [globalCities2, setGlobalCities2] = useState();
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
    } else {
      const callApi = () => {
        if (!open) return null;
        getGlobalCities("", Cookies.get("sessionId")).then((response) => {
          let india = response.dataObject.filter(
            (item) => item.city === "India"
          );
          let otherCities = response.dataObject.filter(
            (item) => item.city !== "India"
          );
          setGlobalCities(india.concat(otherCities));
        });
      };
      callApi();
    }
  }, [open]);

  function handleCityChange(city) {
    selectedCity.current = city;
    if (user != null) {
      let cityInfo = [];
      cityInfo = globalCities.filter((item) => item.city === city);
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
    Geocode.enableDebug();
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
        setLocation({
          loaded: true,
          city: "India",
        });
        setOpen(false);
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

  const onLocChange = async (e) => {
    const citiesResponse = await getGlobalCities(e, Cookies.get("sessionId"));
    setCitiesResponse2(citiesResponse?.dataObject);
    setGlobalCities2(citiesResponse?.dataObject);
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
    let searchID = searchLocationID;
    let searchLocId = user?.address?.filter((items) => {
      return items.addressType === "SearchLocation";
    });
    if (searchLocId) {
      searchID = searchLocId[0]?.locationId;
    }
    setSearchLocationID(searchID);
  }, [user?.address]);

  return (
    <Modal1 open={open} setOpen={setOpen}>
      <div className="bg-white px-4 py-6 pb-4">
        <div className="text-left sm:mt-0 sm:ml-4  sm:text-left text-black-4e">
          <Dialog.Title as="p" className="text-ex  font-Roboto-Bold">
            Select Location
          </Dialog.Title>
          <form className="mb-4 w-full text-sm space-y-2 pt-4">
            <div className="flex flex-rpw">
              <MySelect
                placeholder="Search Location"
                onChange={(e) => {
                  handleCityChange(e.value);
                }}
                onInputChange={(e) => {
                  onLocChange(e);
                }}
                options={globalCities2?.map((items, index) => {
                  return { label: items.city, value: items.city };
                })}
              />
              <span
                className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-r-md cursor-pointer"
                onClick={handleNearme}
              >
                <p className="text-m text-gray-4e flex font-bold justify-center">
                  <Image src={CurrentLocation} width={20} height={20} />
                </p>
              </span>
            </div>
            <div
              className="flex flex-row pt-3 text-mx w-full font-Roboto-Semibold"
              onClick={handleNearme}
            >
              <Image src={CurrentLocation} width={20} height={20} />
              <div className="pl-1">Use Your Current Location</div>
            </div>
            <div className="text-center -mx-1 py-4 grid grid-cols-3">
              {globalCities &&
                globalCities
                  .filter((item) => item.displayWithImage === "1")
                  .map((items) => (
                    <div
                      className={`border-0 bg-[#F1F1F1] rounded px-4 py-2 m-1  ${
                        selectedCity.current === items.city && "border-primary"
                      }`}
                      key={items.city}
                      onClick={() => handleCityChange(items.city)}
                    >
                      <div className="relative w-14 mx-auto">
                        <Image
                          src={items.imgpath}
                          alt={items.city}
                          width={90}
                          height={60}
                          objectFit="contain"
                        />
                      </div>
                      <span className="block capitalize text-[#2C2F45] text-cx font-Roboto-Regular text-xs px-2 w-full truncate">
                        {items.city}
                      </span>
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
    className={`block rounded-md text-xs border mr-3 my-2 px-4 py-1 ${
      active ? "bg-primary-light text-primary border-primary" : "border-gray-c7"
    }`}
    {...rest}
  >
    {children}
  </p>
);

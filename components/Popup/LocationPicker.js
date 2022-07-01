import axios from "axios";
import Image from "next/image";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";
import MapIcon from "@/assets/map-icon.svg";
import { Dialog, Transition } from "@headlessui/react";
import { useRef } from "react";
import { useState } from "react";
import Geocode from "react-geocode";
import { getCityFromResponse } from "@/utils/util";
import { useEffect } from "react";
import { useAuthDispatch, useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";
import { getUserDetails, updateAddress } from "api-call";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function LocationPicker({ openLocationPopup }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const dispatch = useAuthDispatch();
  const { authenticated, user } = useAuthState();

  const [location, setLocation] = useState({
    loaded: false,
    city: "",
  });

  console.log("location from picker", location);
  console.log("user from picker", user);
  console.log("authenticated from picker", authenticated);
  // location.loaded && location.city && location.city.length > 0
  console.log("1", location.loaded);
  console.log("2", location.city);
  console.log("3", location.city.length);

  const onSuccess = async (location) => {
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    // console.log(lat, lng);
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

  useEffect(() => {
    const initialState = localStorage.getItem("usedLocation");
    // console.log("initialState : ", initialState);
    if (!initialState || initialState == null) {
      setOpen(true);
    } else {
      dispatch("ADDCITY", initialState);
    }
  }, []);

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
          userUniqueId: Cookies.get("info"),
        };
        console.log("updateAddress -> payLoad", payLoad);
        updateAddress(payLoad).then((res) => {
          console.log("updateAddress RES -> ", res);
          const mobileNumber = Cookies.get("mobileNumber");
          const countryCode = Cookies.get("countryCode");
          getUserDetails(countryCode, mobileNumber).then((resp) => {
            console.log("userProfile -> ", resp.dataObject);
            dispatch("LOGIN", resp.dataObject);
          });
        });
      }
      console.log("location.city", location.city);
      dispatch("ADDCITY", location.city);
      localStorage.setItem("usedLocation", location.city);
    }
  }, [location]);

  if (!open) {
    return null;
  }

  return (
    <Transition.Root show={open}>
      <Dialog as="section" className="fixed inset-0 z-50 bg-white container text-black py-4" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex flex-col justify-center items-center space-y-8 pt-8 max-w-sm">
          <div className="w-full flex justify-center">
            <Image src={Logo} alt={"Logo"} width={49} height={30} />
          </div>
          <div className="w-full flex justify-center ">
            <Image src={MapIcon} alt={"MAP"} width={219} height={116} />
          </div>
          <div className="text-center space-y-4 px-4">
            <h1 className="text-xl">Where do you want to buy/sell products?</h1>
            <p className="text-sm">to enjoy all that Mobiru has to offer you, we need to know where to look for them</p>
          </div>
          <div className="text-center space-y-5 w-full px-4">
            <button className="uppercase font-semibold bg-primary text-white p-2 w-full rounded" onClick={handleNearme}>
              Near me
            </button>
            <button
              className="underline text-primary"
              onClick={() => {
                setOpen(false);
                openLocationPopup();
              }}
            >
              Other address
            </button>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default LocationPicker;

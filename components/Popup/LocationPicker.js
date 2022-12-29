import axios from "axios";
import Image from "next/image";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/logo_square.svg";
// import Logo from "@/assets/oru_phones_logo.png";
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
import { useRouter } from "next/router";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function LocationPicker({ openLocationPopup }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const dispatch = useAuthDispatch();
  const { authenticated, user } = useAuthState();
//     useEffect(() => {
//     const onBackButtonEvent = (e) => {
//         e.preventDefault();
//         setOpen(false);
//     }

//     window.history.pushState(null, null, window.location.pathname);
//     window.addEventListener('popstate', onBackButtonEvent);
//     return () => {
//         window.removeEventListener('popstate', onBackButtonEvent);  
//     };
// });

  const [location, setLocation] = useState({
    loaded: false,
    city: "",
  });

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
    if(router.pathname !== '/showListings' && router.pathname !== '/oops'){
      const initialState = localStorage.getItem("usedLocation");
      if (!initialState || initialState == null ) {
        setOpen(true);
      } else{
        dispatch("ADDCITY", initialState);
      }
    }else{
      setOpen(false);
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

  if (!open) {
    return null;
  }

  return (
    <Transition.Root show={open}>
      <Dialog as="section" className="fixed top-40 z-50 bg-white container text-black py-4 " initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex flex-col bg-white shadow-2xl justify-center items-center space-y-8 py-8 max-w-sm rounded-2xl">
          {/* <div className="w-40 flex justify-center">
            <Image src={Logo} alt={"Logo"} width={79} height={30} />
          </div> */}
          {/* <div className="w-full flex justify-center ">
            <Image src={MapIcon} alt={"MAP"} width={219} height={116} />
          </div> */}
          <div className="text-center space-y-4 px-4">
            <p className="text-xl font-Roboto-Semibold">Where do you want to buy/sell products?</p>
            <p className="text-sm font-Roboto-Regular">to enjoy all that ORUphones has to offer you, we need to know where to look for them</p>
          </div>
          <div className="text-center space-y-5 w-full px-8">
            <button className="uppercase font-Roboto-Medium bg-primary text-white p-2 w-full rounded" onClick={handleNearme}>
              Near me
            </button>
            {/* <button
              className="underline text-primary"
              onClick={() => {
                setOpen(false);
                openLocationPopup();
              }}
            >
              Other address
            </button> */}
            <button className="underline text-primary font-Roboto-Regular"
              onClick={() => {
                setOpen(false)
              }}>
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default LocationPicker;

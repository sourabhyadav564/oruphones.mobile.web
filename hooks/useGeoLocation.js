import axios from "axios";
import { useState, useEffect } from "react";

const API_KEY = "8e97586183249450356ad36a59901f65";
const MAP_MY_IND_URL = `https://apis.mapmyindia.com/advancedmaps/v1/${API_KEY}/rev_geocode`;
// rev_geocode?lat=28.569548&lng=77.856954&region=IND&lang=hi

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    city: "",
  });

  const onSuccess = async (location) => {
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    try {
      const res = await axios.get(`${MAP_MY_IND_URL}?lat=${lat}&lng=${lng}&region=IND`);
      setLocation({
        loaded: true,
        city: "",
      });
    } catch (e) {
      setLocation({
        loaded: true,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []);

  return location;
};

export default useGeoLocation;

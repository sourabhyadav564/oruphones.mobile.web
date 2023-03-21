import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { addFavotie, getUserListings, removeFavotie } from "api-call";
import router from "next/router";
import { Fragment } from "react";
import { useAuthState } from "providers/AuthProvider";
import HeartBlack from "@/assets/heart_black.svg";
import HeartFill from "@/assets/heartfill.svg";
import HeartOutline from "@/assets/heartoutline.svg";
import { toast } from "react-toastify";
import LoginPopup from "./Popup/LoginPopup";
import Image from "next/image";

function AddFav({ data, setProducts, color, ...rest }) {
  const { authenticated, loading, user } = useAuthState();
  const [listings, setListings] = useState([]);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [performAction, setPerformAction] = useState(false);

  function handleFavoties() {
    setProducts((prevState) => {
      let tempVal;
      if (Array.isArray(prevState)) {
        let index = prevState.findIndex((i) => i.listingId === data?.listingId);
        tempVal = [...prevState];
        tempVal[index] = { ...tempVal[index], favourite: !data?.favourite };
      } else {
        tempVal = { ...prevState, favourite: !data?.favourite };
      }
      return tempVal;
    });
    let payLoad = {
      listingId: data?.listingId,
      userUniqueId: Cookies.get("userUniqueId") || "Guest",
    };
    const addFavorite = () => {
      let favList = localStorage.getItem("favoriteList");
      if (favList) {
        favList = favList.split(",");
        favList.push(data?.listingId);
        localStorage.setItem("favoriteList", favList);
      } else {
        localStorage.setItem("favoriteList", data?.listingId);
      }
      addFavotie(payLoad, Cookies.get("sessionId")).then((response) => {});
    };
    const removeFavorite = () => {
      let favList = localStorage.getItem("favoriteList");
      if (favList) {
        favList = favList.split(",");
        favList = favList.filter((item) => item !== data?.listingId);
        localStorage.setItem("favoriteList", favList);
      }
      removeFavotie(
        data?.listingId,
        Cookies.get("userUniqueId"),
        Cookies.get("sessionId")
      ).then((response) => {});
    };
    if (
      data?.favourite ||
      (localStorage.getItem("favoriteList") &&
        localStorage.getItem("favoriteList").includes(data?.listingId))
    ) {
      data?.status == "Active"
        ? removeFavorite()
        : toast.warning(`This device is sold out`, { toastId: "004" });
    } else {
      data?.status == "Active"
        ? addFavorite()
        : toast.warning(`This device is sold out`, { toastId: "003" });
    }
  }
  useEffect(() => {
    if (openLoginPopup == false && performAction == true) {
      handleFavoties();
    }
  }, [openLoginPopup]);
  function redirectToLogin() {
    setOpenLoginPopup(true);
  }
  if (loading) return <svg width="16" height="16" {...rest} />;

  if (!authenticated) {
    return (
      <Fragment>
        <Image
          src={HeartBlack}
          width={20}
          height={20}
          onClick={(e) => {
            e.preventDefault();
            redirectToLogin();
            setPerformAction(true);
          }}
        />
        <LoginPopup open={openLoginPopup} setOpen={setOpenLoginPopup} />
      </Fragment>
    );
  }
  if (authenticated) {
    return localStorage.getItem("favoriteList") != null &&
      (localStorage.getItem("favoriteList").includes(data?.listingId) ||
        data?.favourite) ? (
      <Image
        src={HeartFill}
        width={20}
        height={20}
        onClick={(e) => {
          e.preventDefault();
          handleFavoties(data);
        }}
      />
    ) : (
      <Image
        src={HeartOutline}
        width={20}
        height={20}
        onClick={(e) => {
          e.preventDefault();
          handleFavoties(data);
        }}
      />
    );
  }
}

export default AddFav;

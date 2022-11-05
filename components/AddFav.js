import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { addFavotie, getUserListings, removeFavotie } from "api-call";
import router from "next/router";
import { Fragment } from "react";
import { useAuthState } from "providers/AuthProvider";
import { BsHeart } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

function AddFav({ data, setProducts, color, ...rest }) {
  const { authenticated, loading, user } = useAuthState();
  const [listings, setListings] = useState([]);

  // if (user && user?.userdetails?.userUniqueId) {
  //   getUserListings(user?.userdetails?.userUniqueId).then(
  //     (res) => {
  //       setListings(res.dataObject.map((item2) => item2.listingId));
  //       // console.log("res.dataObject", listings);
  //       // setListingsLoading(false);
  //     },
  //     (err) => console.error(err)
  //   );
  // }

  function handleFavoties() {
    setProducts((prevState) => {
      let tempVal;
      if (Array.isArray(prevState)) {
        let index = prevState.findIndex((i) => i.listingId === data.listingId);
        tempVal = [...prevState];
        tempVal[index] = { ...tempVal[index], favourite: !data.favourite };
      } else {
        tempVal = { ...prevState, favourite: !data.favourite };
      }
      return tempVal;
    });
    let payLoad = {
      listingId: data.listingId,
      userUniqueId: Cookies.get("userUniqueId") || "Guest",
    };
    const addFavorite = () => {
      addFavotie(payLoad).then((response) => {
        console.log("addFav RES", response);
      });
    };
    const removeFavorite = () => {
      removeFavotie(data?.listingId, Cookies.get("userUniqueId")).then((response) => {
        console.log("removeFav RES", response);
      });
    };
    if (data.favourite) {
      data?.status == "Active" ? removeFavorite() : toast.warning("This device is sold out");
    } else {
      data?.status == "Active" ? addFavorite() : toast.warning("This device is sold out");
    }
  }

  function redirectToLogin() {
    router.push("/login");
  }
  if (loading) return <svg width="16" height="16" {...rest} />;

  if (!authenticated) {
    return (
      <Fragment>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          {...rest}
          onClick={(e) => {
            e.preventDefault();
            redirectToLogin();
          }}
          className="hover:cursor-pointer"
        >
          <path
            id="hearts"
            d="M8.024,16a1.135,1.135,0,0,0-.274-.672,4.437,4.437,0,0,0-.734-.734q-.461-.375-1.062-.812T4.688,12.8q-.664-.539-1.328-1.164a11.035,11.035,0,0,1-1.266-1.43,11.907,11.907,0,0,1-1.062-1.7A9.065,9.065,0,0,1,.3,6.445,10.626,10.626,0,0,1,.024,4,3.854,3.854,0,0,1,1.2,1.172,3.854,3.854,0,0,1,4.024,0,3.854,3.854,0,0,1,6.852,1.172,3.854,3.854,0,0,1,8.024,4,3.854,3.854,0,0,1,9.2,1.172,3.854,3.854,0,0,1,12.024,0a3.854,3.854,0,0,1,2.828,1.172A3.854,3.854,0,0,1,16.024,4a10.659,10.659,0,0,1-.274,2.445,9.037,9.037,0,0,1-.734,2.062,11.96,11.96,0,0,1-1.062,1.7,10.991,10.991,0,0,1-1.266,1.43q-.664.625-1.328,1.164t-1.266.977q-.6.437-1.062.812a4.46,4.46,0,0,0-.734.734A1.131,1.131,0,0,0,8.023,16Z"
            transform="translate(-0.024)"
            fill={color || "#C7C7C7"}
          />
        </svg> */}
        <AiOutlineHeart
          className="hover:cursor-pointer"
          size='18px'
          fill={"#000000"}
          onClick={
            (e) => {
              e.preventDefault();
              redirectToLogin();
            }
          }
        />
      </Fragment>
    );
  }
  if (authenticated) {
    return (
      // <svg
      //   xmlns="http://www.w3.org/2000/svg"
      //   width="16"
      //   height="16"
      //   viewBox="0 0 16 16"
      //   {...rest}
      //   onClick={(e) => {
      //     e.preventDefault();
      //     handleFavoties(data);
      //   }}
      //   className="hover:cursor-pointer"
      // >
      //   <path
      //     id="hearts"
      //     d="M8.024,16a1.135,1.135,0,0,0-.274-.672,4.437,4.437,0,0,0-.734-.734q-.461-.375-1.062-.812T4.688,12.8q-.664-.539-1.328-1.164a11.035,11.035,0,0,1-1.266-1.43,11.907,11.907,0,0,1-1.062-1.7A9.065,9.065,0,0,1,.3,6.445,10.626,10.626,0,0,1,.024,4,3.854,3.854,0,0,1,1.2,1.172,3.854,3.854,0,0,1,4.024,0,3.854,3.854,0,0,1,6.852,1.172,3.854,3.854,0,0,1,8.024,4,3.854,3.854,0,0,1,9.2,1.172,3.854,3.854,0,0,1,12.024,0a3.854,3.854,0,0,1,2.828,1.172A3.854,3.854,0,0,1,16.024,4a10.659,10.659,0,0,1-.274,2.445,9.037,9.037,0,0,1-.734,2.062,11.96,11.96,0,0,1-1.062,1.7,10.991,10.991,0,0,1-1.266,1.43q-.664.625-1.328,1.164t-1.266.977q-.6.437-1.062.812a4.46,4.46,0,0,0-.734.734A1.131,1.131,0,0,0,8.023,16Z"
      //     transform="translate(-0.024)"
      //     fill={data.favourite ? "#FF0000" : color || "#C7C7C7"}
      //   />
      // </svg>
      localStorage.getItem("favoriteList") != null && localStorage.getItem("favoriteList").includes(data?.listingId) ? (<AiFillHeart
        className="hover:cursor-pointer"
        color="#FF0000"
        size='18px'
        onClick={
          (e) => {
            e.preventDefault();
            // !listings.includes(data.listingId) ? 
            handleFavoties(data)
            //  : toast.error("You can't add your own listing to your favorites");
          }
        }
      />) :
        (<AiOutlineHeart
          className="hover:cursor-pointer"
          color="#FF0000"
          size='18px'
          onClick={
            (e) => {
              e.preventDefault();
              // !listings.includes(data.listingId) ? 
              handleFavoties(data);
              //  : toast.error("You can't add your own listing to your favorites");
            }
          }
        />)
    );
  }
}

export default AddFav;

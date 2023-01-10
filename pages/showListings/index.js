import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getSessionId, getUserDetailsViaUUID } from "api-call";
import { useAuthState } from "providers/AuthProvider";
import Cookies from 'js-cookie';


function index() {
  const router = useRouter()
  const { authenticated, loading } = useAuthState();
  const [userdata, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [username, setusername] = useState("user");
  const [userMobileNumber, setUserMobileNumber] = useState("");
  const [userUniqueId, setUserUniqueId] = useState(router.query?.routeto);

  let userUniqueId2 = (router.asPath);
  // userUniqueId2 = userUniqueId2.replace("/showListings?routeto=", "");

  useEffect(() => {
    if (!authenticated) {
      const interval = setInterval(async () => {
        if (userUniqueId2 != undefined && userUniqueId2 != null && userUniqueId2 != "") {
          userUniqueId2 = userUniqueId2.replace("/showListings?routeto=", "");
          setUserUniqueId(userUniqueId2);
          await getUserDetailsViaUUID(userUniqueId2).then((response) => {
            window.localStorage.clear();
            sessionStorage.removeItem("getUserDetails");
            setUserData(response?.dataObject?.userdetails);
            setusername(response?.dataObject?.userdetails?.userName);
            sessionStorage.setItem("getUserDetails", JSON.stringify(response?.dataObject?.userdetails));
            Cookies.set('userUniqueId', response?.dataObject?.userdetails?.userUniqueId);
            Cookies.set('mobileNumber', response?.dataObject?.userdetails?.mobileNumber);
            Cookies.set('countryCode', response?.dataObject?.userdetails?.countryCode);
            setUserMobileNumber(response?.dataObject?.userdetails?.mobileNumber);
            clearInterval(interval);
          },
            (err) => {
              Cookies.remove('userUniqueId');
              clearInterval(interval);
            }
          );
        }
      }, 1000);

      const interval1 = setInterval(() => {
        if (!Cookies.get("userUniqueId") && !sessionStorage.getItem("getUserDetails")) {
          router.push("/oops");
          clearInterval(interval1);
        }
        else {
          router.push("/user/listings");
          clearInterval(interval1);
        }
        // clearInterval(interval1);
      }, 3000);
    }
  }, [])

  return (
    <div className='flex justify-center'>
      <div className=''>
        <div className='mt-52 flex items-center justify-center text-px font-Roboto-Semibold text-primary'> Loading...</div>
        <div className=' text-px font-Roboto-Light '>
          <p className='pt-24 text-center' > Hey {`${username}`}
            <br />Welcome to <span className='font-Roboto-Semibold text-primary'>ORUphones </span></p>
        </div>
      </div>
    </div>
  )
}
export default index

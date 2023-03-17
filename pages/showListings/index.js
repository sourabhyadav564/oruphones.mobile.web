import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserDetailsViaUUID } from "api-call";
import { useAuthDispatch, useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";
import Image from "next/image";

function index() {
  const router = useRouter();
  const { authenticated, loading } = useAuthState();
  const [userdata, setUserData] = useState(null);
  const [username, setusername] = useState("user");
  const [userMobileNumber, setUserMobileNumber] = useState("");
  const [userUniqueId, setUserUniqueId] = useState(router.query?.routeto);
  const dispatch = useAuthDispatch();

  let userUniqueId2 = router.asPath;

  useEffect(() => {
    const interval = setInterval(async () => {
      if (
        authenticated &&
        Cookies.get("userUniqueId") &&
        Cookies.get("userUniqueId") !=
          userUniqueId2.replace("/showListings?routeto=", "")
      ) {
        dispatch("LOGOUT");
        clearInterval(interval);
      }
    }, 1000);
  }, [authenticated]);

  useEffect(() => {
    if (!authenticated) {
      const interval = setInterval(async () => {
        if (
          userUniqueId2 != undefined &&
          userUniqueId2 != null &&
          userUniqueId2 != ""
        ) {
          userUniqueId2 = userUniqueId2.replace("/showListings?routeto=", "");
          setUserUniqueId(userUniqueId2);
          await getUserDetailsViaUUID(userUniqueId2).then(
            (response) => {
              window.localStorage.clear();
              sessionStorage.removeItem("getUserDetails");
              setUserData(response?.dataObject?.userdetails);
              setusername(response?.dataObject?.userdetails?.userName);
              sessionStorage.setItem(
                "getUserDetails",
                JSON.stringify(response?.dataObject?.userdetails)
              );
              Cookies.set(
                "userUniqueId",
                response?.dataObject?.userdetails?.userUniqueId
              );
              Cookies.set(
                "mobileNumber",
                response?.dataObject?.userdetails?.mobileNumber
              );
              Cookies.set(
                "countryCode",
                response?.dataObject?.userdetails?.countryCode
              );
              setUserMobileNumber(
                response?.dataObject?.userdetails?.mobileNumber
              );
              dispatch("LOGIN", response?.dataObject);
              clearInterval(interval);
            },
            (err) => {
              Cookies.remove("userUniqueId");
              clearInterval(interval);
            }
          );
        }
      }, 1000);

      const interval1 = setInterval(() => {
        if (
          !Cookies.get("userUniqueId") &&
          !sessionStorage.getItem("getUserDetails")
        ) {
          router.push("/");
          clearInterval(interval1);
        } else {
          router.push("/user/listings");
          clearInterval(interval1);
        }
      }, 3000);
    }
  }, []);

  return (
    <div className="flex justify-center h-full">
      <div className="h-full">
        <div className="flex justify-center pt-10">
          <Image
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"}
            height={40}
            width={80}
            alt="ORUphones"
            className="w-px-300 h-px-300 "
          />
        </div>
        <div className="">
          <div class="">
            <div class="loader"></div>
            <div class="loader"></div>
            <div class="loader"></div>
          </div>
        </div>
        <div className=" text-px font-Roboto-Light items-end">
          <p className="pt-24 text-center">
            {" "}
            Hey {`${username}`}
            <br />
            Welcome to{" "}
            <span className="font-Roboto-Semibold text-primary">
              ORUphones{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default index;

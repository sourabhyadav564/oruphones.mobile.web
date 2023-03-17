import {
  createUser,
  resendOTP,
  validateUser,
  addUserSearchLocation,
  addUserProfileLocation,
} from "api-call";

import Cookies from "js-cookie";
import router from "next/router";
import { useAuthDispatch } from "providers/AuthProvider";
import { useState, useEffect } from "react";
import ArrowLeft from "@/assets/leftarrow.svg";
import Image from "next/image";

function OTPVerification({
  formData,
  dataObject,
  fromAddListing,
  setStep,
  setOpen,
  login,
}) {
  const [counter, setCounter] = useState(30 || dataObject?.maxTime);
  const [error, setError] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAuthDispatch();

  useEffect(() => {
    var timer = null;
    if (counter > 0) {
      timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  const reSendOtp = (e) => {
    setLoading(false);
    e.preventDefault();
    resendOTP(formData?.countryCode, formData?.mobile).then(
      (res) => setCounter(30),
    );
    setError(false);
    setOtpInput("");
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    validateUser(formData?.countryCode, formData?.mobile, otpInput).then(
      ({ status }) => {
        if (status === "SUCCESS") {
          const countryCode = formData?.countryCode;
          const mobile = formData?.mobile;
          Cookies.set("mobileNumber", formData?.mobile);
          Cookies.set("countryCode", formData?.countryCode);
          setLoading(false);
          dispatch("REFRESH");
            if(login){
              router.push("/");
            }
            else{
              setOpen(false);
            }
        } else {
          setError(true);
          setLoading(false);
        }
      }
    );
  };


  const handleChange = (e) => {
    const { value } = e.target;
    setOtpInput(value);
    setError(false);
  };

  return (
    <form
      className="flex flex-col w-full space-y-4"
      onSubmit={handleSubmit}
    >
      <Image src={ArrowLeft} width={22} height={22}  onClick={() => setStep(1)} className="cursor-pointer fixed top-2 left-2"/>
      <div className="">
        <h1 className=" text-px font-bold py-1" style={{ color: "#2C2F45" }}>
          Verify Mobile No
        </h1>

        <p className="text-left text-cx font-regular pb-2" style={{ color: "#2C2F45" }}>
          Please enter the 4 digit verification code sent to your mobile number{" "}
          <span className="whitespace-nowrap">
            {" "}
            {`+${formData?.countryCode}-${formData?.mobile}`}{" "}
          </span>{" "}
          via SMS.
        </p>
      </div>

      <div className="outline relative w-full focus:outline-none">

        <input
          type="number"
          name="OTP"
          required
          className={` block p-4 w-full text-center rounded appearance-none border-1  bg-transparent  ${error
            ? "ring-2 ring-red-600 focus:ring-2 focus:ring-red-600"
            : "ring-0 focus:ring-0"
            }`}

          style={{
            border: "1px solid rgba(0, 0, 0, 0.12)",
            color: "rgba(0, 0, 0, 0.6)",
          }}
          value={otpInput}
          onChange={handleChange}

        />
        <label
          htmlFor="mobile"
          className=" absolute top-0 bg-white p-4 -z-1 origin-0 "
          style={{ color: "rgba(0, 0, 0, 0.6)" }}
        >
          OTP
        </label>

        {error && (
          <span className="text-sm pt-1" style={{ color: "#B00020" }}>
            Invalid OTP. Please try again
          </span>
        )}
      </div>
      <button className="bg-primary  rounded py-3 text-white text-dx font-Semibold w-full">
        {loading ? "Verifying..." : "Verify"}
      </button>
      <div className="w-full text-right underline" style={{ color: "#2C2F45" }}>
        {counter < 1 ? (

          <span
            className="text-primary  mb-4 ml-auto text-Light text-mx"
            onClick={reSendOtp}
          >
            Resend OTP
          </span>
        ) : (
          <span className="mb-4 ml-auto text-sm text-gray-70">
            Resend OTP in {counter} Sec
          </span>
        )}
      </div>
    </form>
  );
}

export default OTPVerification;

import { createUser, resendOTP, validateUser, addUserSearchLocation, addUserProfileLocation } from "api-call";
import Cookies from "js-cookie";
import router from "next/router";
import { useAuthDispatch } from "providers/AuthProvider";
import { useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";

function OTPVerification({ formData, dataObject, fromAddListing, setStep, setOpen }) {
  const [counter, setCounter] = useState(30 || dataObject?.maxTime);
  const [error, setError] = useState(false);
  const [otpInput, setOtpInput] = useState("");

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
    e.preventDefault();
    resendOTP(formData?.countryCode, formData?.mobile).then(
      (res) => setCounter(30),
      (err) => console.error(err)
    );
    setError(false);
    setOtpInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateUser(formData?.countryCode, formData?.mobile, otpInput).then(
      ({ status }) => {
        if (status === "SUCCESS") {
          console.log("formData", formData);
          createUser(formData?.countryCode, formData?.mobile).then(
            (response) => {
              if (response.status === "SUCCESS") {
                addUserSearchandProfileLocations(response.dataObject.userUniqueId);
              }
              Cookies.set("mobileNumber", formData?.mobile);
              Cookies.set("countryCode", formData?.countryCode);
              dispatch("REFRESH");
              if (!fromAddListing) {
                router.push("/");
              } else {
                setOpen(false);
              }
            },
            (err) => console.error(err)
          );
        } else {
          setError(true);
        }
      },
      (err) => console.error(err)
    );
  };

  const addUserSearchandProfileLocations = async (data) => {
    const locationPayload = {
      city: "Hyderabad",
      country: "India",
      locationId: "0",
      state: "Telangana",
      userUniqueId: data,
    };

    const addUserSearchLocationResponse = await addUserSearchLocation(locationPayload);
    const addUserProfileLocationResponse = await addUserProfileLocation(locationPayload);

  };

  const handleChange = (e) => {
    const { value } = e.target;
    setOtpInput(value);
    setError(false);
  };


  return (
    <form className="flex flex-col items-center w-full space-y-8" onSubmit={handleSubmit}>
      <FiChevronLeft onClick={() => setStep(1)} className="cursor-pointer fixed top-2 left-2" fontSize="22" />
      <h1 className="text-primary-dark text-xl font-extrabold py-2">Verify Mobile No</h1>
      <p className="text-center pb-2">
        Please enter the 4 digit verification code sent to your mobile number{" "}
        <span className="whitespace-nowrap"> {`+${formData?.countryCode}-${formData?.mobile}`} </span> via SMS.
      </p>
      <div className="outline relative w-full focus:outline-none">
        <input
          type="number"
          name="OTP"
          required
          className={`text-center block p-4 w-full rounded appearance-none border-1  bg-transparent ${
            error ? "ring-2 ring-red-600 focus:ring-2 focus:ring-red-600" : "ring-0 focus:ring-0"
          }`}
          style={{ border: "1px solid rgba(0, 0, 0, 0.12)", color: "rgba(0, 0, 0, 0.6)" }}
          value={otpInput}
          onChange={handleChange}
        />
        <label htmlFor="mobile" className="absolute top-0  bg-white p-4 -z-1 duration-300 origin-0" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
          OTP
        </label>
        {error && (
          <span className="text-sm pt-1" style={{ color: "#B00020" }}>
            Invalid OTP. Please try again
          </span>
        )}
      </div>
      {counter < 1 ? (
        <span className="text-primary uppercase -translate-y-4 mb-4 ml-auto text-sm" onClick={reSendOtp}>
          Resend OTP
        </span>
      ) : (
        <span className="mb-4 ml-auto text-sm text-gray-70">Resend OTP in {counter} Sec</span>
      )}
      <button className="bg-primary uppercase rounded py-3 text-white w-full">Verify</button>
    </form>
  );
}

export default OTPVerification;

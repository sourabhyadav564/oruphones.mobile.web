import { useState } from "react";
import Image from "next/image";
import OTPVerification from "@/components/Login/OTPVerification";
import Input2 from "../Form/input2";
import { generateOTP } from "api-call";
import Checkbox from "@/components/Form/Checkbox";
import Modal1 from "./Modal1";
import TermsconditionPopup from "./TermsconditionPopup";
import { useEffect } from "react";
import Cookies from "js-cookie";

function LoginPopup({ open, setOpen, fromAddListing }) {
  const login = false;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    countryCode: "91",
    mobile: "",
    termsAndCondition: true,
  });
  const [error, setError] = useState({ message: "", is: false });
  const [response, setResponse] = useState();
  const [showTCPopUp, setShowTCPopup] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!formData.mobile || formData?.mobile?.length < 10) {
      setError({ is: true, message: "10 digits number is required" });
    } else if (formData?.mobile?.length == 10) {
      const res = await generateOTP(
        formData?.countryCode,
        formData.mobile,
        Cookies.get("sessionId")
      );
      setResponse(res);
      setStep(2);
    }
  };
  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    if (name === "mobile") {
      setError({ is: false, message: "" });
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <Modal1 open={open} setOpen={setOpen}>
      <main className="bg-loginBg bg-contain  pt-16 min-h-screen">
        <section className="container px-8 flex flex-col items-center space-y-8 max-w-sm">
          <div className="w-full flex justify-center ">
            <Image
              src={
                "https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"
              }
              alt={"Logo"}
              width={80}
              height={40}
            />
          </div>
          {step === 1 ? (
            <form
              className="flex flex-col items-center w-full space-y-8"
              onSubmit={sendOtp}
            >
              <p className="text-primary-dark text-qx font-Roboto-Bold py-2">
                Sign In
              </p>
              <div className="w-full my-8 relative">
                <Input2
                  className="bg-white font-Roboto-Regular"
                  name="mobile"
                  pattern="[0-9]*"
                  type="text"
                  prefix="+91-"
                  value={formData?.mobile}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  Mobile No
                </Input2>
                {error?.is && (
                  <span className="absolute p-1 text-xs bg-red-500 w-full rounded text-white mt-2">
                    {" "}
                    {error.message}{" "}
                  </span>
                )}
              </div>
              <Checkbox
                type="checkbox"
                name="termsAndCondition"
                checked={formData?.termsAndCondition}
                onChange={handleChange}
                className="rounded border text-transparent form-checkbox border-primary focus:ring-transparent font-Roboto-Light"
              >
                <label
                  className="ml-2 underline cursor-pointer text-black-4e"
                  onClick={() => setShowTCPopup(true)}
                >
                  Accept terms and conditions
                </label>
              </Checkbox>

              <button
                className="bg-primary uppercase rounded py-3 font-Roboto-Medium text-white w-full disabled:opacity-60"
                disabled={!formData?.termsAndCondition}
              >
                next
              </button>
            </form>
          ) : (
            <OTPVerification
              formData={formData}
              dataObject={response?.dataObject}
              fromAddListing={fromAddListing}
              setStep={setStep}
              setOpen={setOpen}
              login={login}
            />
          )}
        </section>
        <TermsconditionPopup open={showTCPopUp} setOpen={setShowTCPopup} />
      </main>
    </Modal1>
  );
}

export default LoginPopup;

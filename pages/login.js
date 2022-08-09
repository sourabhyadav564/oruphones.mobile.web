import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/logo_square.svg";
import OTPVerification from "@/components/Login/OTPVerification";
import Input from "@/components/Form/Input";
import { generateOTP } from "api-call";
import router from "next/router";
import { useAuthState } from "providers/AuthProvider";
import Checkbox from "@/components/Form/Checkbox";
import TermsconditionPopup from "@/components/Popup/TermsconditionPopup";
import CloseIcon from "@/assets/close-icon.svg";
import Spinner from "@/components/Loader/Spinner";

function Login() {
  const [step, setStep] = useState(1);
  const [openPoup, setOpenPopup] = useState(false);
  const [formData, setFormData] = useState({
    countryCode: "91",
    mobile: "",
    termsAndCondition: true,
  });
  const [error, setError] = useState({ message: "", is: false });
  const [response, setResponse] = useState();
  const { authenticated, loading } = useAuthState();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (!loading && authenticated) {
      router.push("/");
    }
  }, [authenticated, loading]);

  if (loading || authenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!formData.mobile || formData?.mobile?.length !== 10) {
      setError({ is: true, message: "Please enter valid mobile number" });
    } else {
      const res = await generateOTP(formData?.countryCode, formData.mobile);
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
    <main className="bg-loginBg bg-contain pt-16 min-h-screen relative">
      <div className="absolute text-3xl z-50 p-2 top-3 right-3 cursor-pointer">
        {showLoader ? (
          <Spinner />
          ) : (
            <img
              className="w-7 h-7"
              src={CloseIcon.src}
              onClick={() => {
                router.push("/");
                setShowLoader(true);
              }}
            />
        )}
      </div>
      <section className="container px-8 flex flex-col items-center space-y-8 max-w-sm">
        <div className="w-full flex justify-center ">
          <Image src={Logo} alt={"Logo"} width={80} height={40} />
        </div>
        {step === 1 ? (
          <form
            className="flex flex-col items-center w-full space-y-8"
            onSubmit={sendOtp}
            autoComplete="off"
          >
            <h1 className="text-primary-dark text-2xl font-extrabold py-2">
              Sign In
            </h1>
            <div className="w-full my-8 relative">
              <Input
                className="bg-white"
                name="mobile"
                type="number"
                prefix="+91-"
                value={formData?.mobile}
                errorClass={error.is && "border border-red-500 border-[2px]"}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                Mobile No
              </Input>
              {error?.is && (
                <span className="absolute p-1 text-xs w-full rounded text-red-500">
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
              className="rounded border text-transparent form-checkbox border-primary focus:ring-transparent"
            >
              <label
                onClick={() => setOpenPopup(true)}
                className="ml-2 underline cursor-pointer text-black-4e"
              >
                Accept terms and conditions
              </label>
            </Checkbox>
            <button
              className="bg-primary uppercase rounded py-3 text-white w-full disabled:opacity-60"
              disabled={!formData?.termsAndCondition}
            >
              next
            </button>
            <span className="text-sm text-gray-70"> or </span>
            <Link href="/">
              <button
                type="button"
                className="text-sm text-primary disabled:opacity-60"
                disabled={!formData?.termsAndCondition}
              >
                Continue as Guest
              </button>
            </Link>
          </form>
        ) : (
          <OTPVerification
            formData={formData}
            dataObject={response?.dataObject}
            setStep={setStep}
          />
        )}
      </section>
      <TermsconditionPopup open={openPoup} setOpen={setOpenPopup} />
    </main>
  );
}

export default Login;

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OTPVerification from "@/components/Login/OTPVerification";
import Input from "@/components/Form/input2";
import { generateOTP } from "api-call";
import router from "next/router";
import { useAuthState } from "providers/AuthProvider";
import Checkbox from "@/components/Form/Checkbox";
import TermsconditionPopup from "@/components/Popup/TermsconditionPopup";


function Login() {
  const login = true;
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
    } else if(formData?.mobile?.length == 10){
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
    <main className="bg-loginBg bg-contain md:pb-10 pt-16 min-h-screen relative">
      <section className="container px-8 flex flex-col items-center space-y-8 max-w-sm">
        <div className="mt-14" data-aos="fade-down">
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/logo_square.svg"} alt={"Logo"} width={108} height={53} />
        </div>
        {step === 1 ? (
          <form
            className="flex flex-col items-center w-full "
            onSubmit={sendOtp}
            autoComplete="off"
          >
            <div className="w-full my-8 relative ">
              <p className="text-lg font-bold px-1">Welcome</p>
              <h1 className="text-xs text-gray-400 font-medium pb-3 px-1 ">Sign in to continue </h1>
              <Input
                name="mobile"
                pattern="[0-9]*"
                type="text"
                value={formData?.mobile}
                errorClass={error.is && "border border-red-500 border-[2px]"}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder={"Mobile Number"}
                style={{ fontSize: '13px' }}
              />
              {error?.is && (
                <div>
                  <span className="absolute p-1 text-xs w-full rounded text-red-500">
                    {" "}
                    {error.message}{" "}
                  </span>
                </div>
              )}
            </div>
            <div className="w-full space-y-4">
              <div className="w-full grid gap-2">
                <button
                  className="bg-primary rounded py-3 text-white text-sm w-full disabled:opacity-60" data-aos="fade-down"
                  disabled={!formData?.termsAndCondition}
                >
                  Sign In
                </button>
                <Checkbox
                  type="checkbox"
                  name="termsAndCondition"
                  checked={formData?.termsAndCondition}
                  onChange={handleChange}
                  className="rounded border text-transparent form-checkbox border-primary focus:ring-transparent"
                >
                  <label
                    onClick={() => setOpenPopup(true)}
                    className="underline cursor-pointer text-sm text-black-4e"
                  >
                    Accept terms and conditions
                  </label>
                </Checkbox>
              </div>
              <div className="relative w-full justify-center text-center">
                <span className="text-sm text-gray-70"> or </span>
                <br />

                <Link href="/">
                  <button
                    type="button"
                    className="w-full rounded text-sm  text-primary font-medium border-2 border-gray-300 disabled:opacity-60 mt-2 p-2"
                    disabled={!formData?.termsAndCondition}
                  >
                    Continue as Guest
                  </button>
                </Link>
              </div>
            </div>
          </form>
        ) : (
          <OTPVerification
            formData={formData}
            dataObject={response?.dataObject}
            setStep={setStep}
            login={login}
          />
        )}
      </section>
      <TermsconditionPopup open={openPoup} setOpen={setOpenPopup} />
    </main>
  );
}

export default Login;

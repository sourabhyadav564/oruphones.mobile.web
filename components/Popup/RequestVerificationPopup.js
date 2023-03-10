import { sendverification } from "api-call";
import Cookies from "js-cookie";
import { useState } from "react";
import Alert from "@/assets/alert.svg";
import Modal2 from "./Modal2";
import RequestVerificationSuccessPopup from "./RequestVerificationSuccessPopup";
import Image from "next/image";

function RequestVerificationPopup({ open, setOpen, data, setShowNumber, setOpenRequestVerificationSuccessPopup, openRequestVerificationSuccessPopup }) {

  const sendVerificationLink = () => {
    setOpenRequestVerificationSuccessPopup(true);
  };

  const [resData, setResData] = useState([]);
  const [listingid, setListingid] = useState(data?.listingId);

  const requestVerification = async () => {
    setOpen(false);
    setListingid(data?.listingId);
    await sendverification(
      listingid,
      Cookies.get("userUniqueId") || "Guest"
    ).then((response) => {
      setResData(response);
      console.log("responseData", response);
      // if (response.status == "SUCCESS") {
      setOpen(false);
      setOpenRequestVerificationSuccessPopup(true);
      // }
    });
  };

  // useEffect(() => {
  //   if (open) {
  //     const onBackButtonEvent = (e) => {
  //       e.preventDefault();
  //       setOpen(false);
  //     }
  //     window.history.pushState(null, null, window.location.pathname);
  //     window.addEventListener('popstate', onBackButtonEvent);
  //     return () => {
  //       window.removeEventListener('popstate', onBackButtonEvent);
  //     };
    // } else {
    //   const onBackButtonEvent = (e) => {
    //     e.preventDefault();
    //     window.history.back();
    //   }
    //   window.history.pushState(null, null, window.location.pathname);
    //   window.addEventListener('popstate', onBackButtonEvent);
    //   return () => {
    //     window.removeEventListener('popstate', onBackButtonEvent);
    //   };
  //   }
  // }, [open]);

  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e">
        {/* <FiAlertOctagon size={44} color="#f7e17d" /> */}
        <Image src={Alert} width={44} height={44}/>
        <p className="font-Roboto-Bold mt-1">Alert</p>
        <div className="text-sm my-2 text-center font-Roboto-Regular">
          <p>
            This device is unverified. Press Request Verification button to ask the seller to perform verification. You will receive a notification
            once Seller completes verification. This listing will also be added to My Favorites. Press Continue to proceed without verification
          </p>
        </div>
        <div className="mb-2 mt-4 flex flex-col">
          <button className="border border-primary px-4 py-2 rounded text-primary uppercase w-full font-Roboto-Medium"
            // onClick={() => sendVerificationLink()}
            // onClick={() => {
            //   setOpenRequestVerificationSuccessPopup(true);
            //   setOpen(false);
            // }}
            onClick={() => {
              if (Cookies.get("userUniqueId") === undefined) {
                setPerformAction2(true);
                setShowLoginPopup(true);
              } else {
                // setOpen(false);
                requestVerification();
              }
            }}
          >
            Request Verification
          </button>
          <button
            className="border border-primary w-full px-4 py-2 rounded text-primary mt-2 font-Roboto-Medium"
            onClick={() => {
              setShowNumber(true);
              setOpen(false);
            }}
          >
            CONTINUE
          </button>
        </div>
      </div>
      <RequestVerificationSuccessPopup open={openRequestVerificationSuccessPopup} setOpen={setOpenRequestVerificationSuccessPopup} data={data} />
    </Modal2 >
  );
}

export default RequestVerificationPopup;

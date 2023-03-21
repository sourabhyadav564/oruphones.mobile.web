import { sendverification } from "api-call";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Modal2 from "./Modal2";
import Check from "@/assets/gcheck.svg";
import Alert from "@/assets/alert.svg";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";

function RequestVerificationSuccessPopup({ open, setOpen, data }) {
  const [resData, setResData] = useState({});
  useEffect(() => {
    if (open) {
      sendverification(
        data.listingId,
        Cookies.get("userUniqueId") || "Guest",
        Cookies.get("sessionId")
      ).then((response) => {
        setResData(response);
      });
    }
  }, [data]);

  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e py-2">
        {resData?.statusCode ? (
          <>
            {resData?.statusCode === 200 ? (
              <Image src={Check} width={42} height={42}/>
            ) : (
              <Image src={Alert} width={44} height={44}/>
            )}
            <p className="font-Roboto-Bold my-2 text-gx">
              {resData?.statusCode === 200
                ? "Request Sent"
                : "Request Already Sent"}
            </p>
            <p className="text-xs my-2 text-center font-Roboto-Regular">
              {resData?.statusCode === 200
                ? "You will receive a notification once Seller completes verification."
                : "You have already sent verification request for this listing."}
              <br />{" "}
              {resData?.statusCode === 200
                ? "This listing will also be added to My Favorites"
                : "You will receive a notification once Seller completes verification. A new verification request can only be sent after 7 days of the previous request."}
            </p>
          </>
        ) : (
          <div className="font-Roboto-Regular">
            <div className="flex items-center justify-center">

            <Loader />
            </div>
            <p className="text-mx">
              Your verification request will be sent soon...
            </p>
          </div>
        )}
        <div className="mb-2 mt-4 font-Roboto-Regular">
          <button
            className="border border-primary w-32 px-4 py-2 rounded text-primary"
            onClick={() => {
              setOpen(false);
            }}
          >
            {" "}
            OK{" "}
          </button>
        </div>
      </div>
    </Modal2>
  );
}

export default RequestVerificationSuccessPopup;

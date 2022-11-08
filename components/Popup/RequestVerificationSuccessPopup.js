import { sendverification } from "api-call";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import Modal2 from "./Modal2";
import { FiAlertOctagon } from "react-icons/fi";
import Loader from "@/components/Loader/Loader";

function RequestVerificationSuccessPopup({ open, setOpen, data }) {
  useEffect(() => {
    if (open) {
      sendverification(data.listingId, Cookies.get("userUniqueId") || "Guest").then(
        (response) => {
          setResData(response);
        }
      );
    }
  }, [data]);

  const [resData, setResData] = useState({});

  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e">
        {resData?.statusCode ? (
          <>
            {resData?.statusCode === 200 ? (
              <BsCheck2Circle size={42} color="#00A483" />
            ) : (
              <FiAlertOctagon size={44} color="#f7e17d" />
            )}
            <h1 className="font-Roboto-Bold my-2">
              {resData?.statusCode === 200
                ? "Request Sent"
                : "Request Already Sent"}
            </h1>
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
            <Loader />
            <h1>Your verification request will be sent soon...</h1>
          </div>
        )}
        <div className="mb-2 mt-4 font-Roboto-Regular">
          <button
            className="border border-primary w-32 px-4 py-2 rounded text-primary"
            onClick={(e) => {
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

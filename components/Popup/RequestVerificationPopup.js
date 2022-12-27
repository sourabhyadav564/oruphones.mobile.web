import { sendverification } from "api-call";
import Cookies from "js-cookie";
import { FiAlertOctagon } from "react-icons/fi";
import Modal2 from "./Modal2";

function RequestVerificationPopup({ open, setOpen, data, setShowNumber, setOpenRequestVerificationSuccessPopup }) {
 
  const sendVerificationLink = () => {
    setOpen(false);
    setOpenRequestVerificationSuccessPopup(true);
  };

  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e">
        <FiAlertOctagon size={44} color="#f7e17d" />
        <p className="font-Roboto-Bold mt-1">Alert</p>
        <div className="text-sm my-2 text-center font-Roboto-Regular">
          <p>
            This device is unverified. Press Request Verification button to ask the seller to perform verification. You will receive a notification
            once Seller completes verification. This listing will also be added to My Favorites. Press Continue to proceed without verification
          </p>
        </div>
        <div className="mb-2 mt-4 flex flex-col">
          <button className="border border-primary px-4 py-2 rounded text-primary uppercase w-full font-Roboto-Medium" onClick={() => sendVerificationLink()}>
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
    </Modal2>
  );
}

export default RequestVerificationPopup;

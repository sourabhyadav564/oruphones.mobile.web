import { Dialog } from "@headlessui/react";
import { getTinyUrl } from "api-call";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Modal1 from "./Modal1";

function VerifyFlowPopup({ open, setOpen }) {
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );

  const [qrValue2, setQrValue2] = useState(
    "https://play.google.com/store/apps/details?id=com.oruphones.oru"
  );

  // useEffect(() => {
  //   getTinyUrl().then((response) => {
  //     setQrValue(response?.dataObject?.tinyurl);
  //   });
  // }, []);

  return (
    <Modal1 open={open} setOpen={setOpen}>
      <div className="bg-white p-6 pb-4 sm:p-6 sm:pb-4">
        <div className="text-left sm:mt-0 sm:ml-4 sm:text-left text-black-4e">
          <Dialog.Title as="h1" className="text-lg leading-6 font-Roboto-Semibold ">
            Just one more step
          </Dialog.Title>
          <div className="mt-3 w-full text-sm flex flex-wrap mb-4 items-center font-Roboto-Regular">
            <ul className="list-disc text-sm flex flex-col space-y-4 px-4">
              <li>
                Interact directly with the buyers and sellers of latest mobile
                phones and save yourself the extra commission on ORUphones app.
              </li>
              <li>
                Get a detailed diagnosis of your device and a suitable price you
                can put on the same to get verified buyers.
              </li>
              <li>
                Hassle-free buying of mobiles with our AI-based tech which gets
                to you verified and interested buyers for your mobile.
              </li>
              <li>
                Scan the QR code or follow the link to download the ORUphones
                app on the phone you want to sell.
              </li>
              <li>
                Wondering how to transfer your data from your old phone before
                selling it? We&apos;ve got you covered here. The ORUphones app
                also allows you to get access to FREE data transfer feature. Now
                don&apos;t get missed on transferring your content from your old
                phone to a new phone.
              </li>
            </ul>
            <div className="flex space-x-6 pt-5 justify-center items-center px-7">
              <div className="flex flex-col justify-center items-center space-y-3">
                {/* <a href={qrValue1}>
                  <p className="w-32 h-10 bg-appStore bg-no-repeat bg-contain" />
                  </a>
                  <a href={qrValue2}>
                  <p className="w-32 mt-4 h-10 bg-playStore bg-no-repeat bg-contain" />
                </a> */}
                <QRCode value={qrValue1 || ""} size={120} level={"H"} />
                <a href={qrValue1}>
                  <p className="w-32 h-10 bg-appStore bg-no-repeat bg-contain" />
                </a>
              </div>
              <div className="flex flex-col justify-center items-center space-y-3">
                {/* <a href={qrValue1}>
                  <p className="w-32 h-10 bg-appStore bg-no-repeat bg-contain" />
                  </a>
                  <a href={qrValue2}>
                  <p className="w-32 mt-4 h-10 bg-playStore bg-no-repeat bg-contain" />
                </a> */}
                <QRCode value={qrValue2 || ""} size={120} level={"H"} />
                <a href={qrValue2}>
                  <p className="w-32 h-10 bg-playStore bg-no-repeat bg-contain" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal1>
  );
}

export default VerifyFlowPopup;

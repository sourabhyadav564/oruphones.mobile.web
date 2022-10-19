import Image from "next/image";
import Link from "next/link";
import patchCheck from "@/assets/patch-check.svg";
import Modal2 from "./Modal2";
import { useState } from "react";
import QRCode from "react-qr-code";

function VerifyListingPopup({ open, setOpen, make }) {
    const QRValue = make == "Apple"
        ? "https://apps.apple.com/in/app/oruphones/id1629378420"
        : "https://play.google.com/store/apps/details?id=com.oruphones.oru";

    return (
        <Modal2 open={open} setOpen={setOpen}>
            <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e">
                <Image src={patchCheck} height={50} width={50} />
                <h1 className="font-bold mb-2 mt-3">Congratulations!</h1>
                <p className="text-xs my-2 text-center">
                    Your device has been submitted for listing. To verify the device kindly download the ORUphones app. We recommend that you verify the device in order to sell it quickly.
                </p>
                <div className="mb-2 mt-4">
                    <div className="flex flex-col justify-center items-center space-y-3 pb-4">
                        <QRCode value={QRValue || ""} size={120} level={"H"} />
                        <a href={QRValue}>
                            {make == "Apple" ? <p className="w-32 h-10 bg-appStore bg-no-repeat bg-contain" /> : <p className="w-32 h-10 bg-playStore bg-no-repeat bg-contain" />}
                        </a>
                    </div>
                    <Link href="/user/listings">
                        <a>
                            <button className="border border-primary w-32 px-4 py-2 rounded text-primary"> OK </button>
                        </a>
                    </Link>
                </div>
            </div>
        </Modal2>
    );
}

export default VerifyListingPopup;

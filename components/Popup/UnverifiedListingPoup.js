import Link from "next/link";
import { useState } from "react";
import  ErrorWarningAlert from "@/assets/alert.svg";
import Modal2 from "./Modal2";
import VerifyListingPopup from "./VerifyListingPopup";
import Image from "next/image";

function UnverifiedListingPopup({ open, setOpen, unverifiedListingType, unverifiedListingReason }) {
    const [openVerifyListingPopup, setOpenVerifyListingPopup] = useState(false);
    const [loadingState, setLoadingState] = useState(false);
    const handleContinue = () => {
        setOpenVerifyListingPopup(true);
    }

    const handleCancel = () => {
        setLoading
        setOpen(false);
    }
    return (
        <Modal2 open={open} setOpen={setOpen}>
            <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e">
                <Image src={ErrorWarningAlert} width={52} height={52}/>
                <p className="text-gx font-Roboto-Bold mb-2 mt-3">{unverifiedListingType}</p>
                <p className="text-xs my-2 font-Roboto-Regular text-center">
                    {unverifiedListingReason}
                </p>
                <div className="mb-2 mt-4 font-Roboto-Medium">
                    <Link href="/user/listings"
                        onClick={handleCancel}
                    >
                        <span className="border border-primary w-32 px-1 mx-1 py-2 rounded text-primary"> CANCEL </span>
                    </Link>
                    <a
                        onClick={handleContinue}
                    >
                        <span className="border border-primary w-24 px-3 mx-3 py-2 rounded bg-primary text-white"> CONTINUE </span>
                    </a>
                </div>
            </div>
            <VerifyListingPopup open={openVerifyListingPopup} setOpen={setOpenVerifyListingPopup} />
        </Modal2>
    );
}

export default UnverifiedListingPopup;

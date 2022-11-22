import Link from "next/link";
import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Modal2 from "./Modal2";
import VerifyListingPopup from "./VerifyListingPopup";

function UnverifiedListingPopup({ open, setOpen, unverifiedListingType, unverifiedListingReason }) {
    const [openVerifyListingPopup, setOpenVerifyListingPopup] = useState(false);
    const [loadingState, setLoadingState] = useState(false);

    const handleContinue = () => {
        setOpenVerifyListingPopup(true);
        // setOpen(false);
    }

    const handleCancel = () => {
        setLoading
        setOpen(false);
    }

    // const priceDiff = price < leastPrice ? "Low" : price > maxPrice && "High";
    return (
        <Modal2 open={open} setOpen={setOpen}>
            <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e">
                <RiErrorWarningLine
                    size={52}
                    color="#FFC107"
                />
                <h1 className="font-Roboto-Bold mb-2 mt-3">{unverifiedListingType}</h1>
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

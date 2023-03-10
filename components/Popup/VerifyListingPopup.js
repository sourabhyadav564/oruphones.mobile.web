import Image from "next/image";
import Link from "next/link";
import Modal2 from "./Modal2";
import AppleStore from "@/assets/apple_store.svg";
import PlayStore from "@/assets/playstore.svg";

function VerifyListingPopup({ open, setOpen, make }) {
    console.log("make", make);
    const QRValue = make == "Apple"
        ? "https://apps.apple.com/in/app/oruphones/id1629378420"
        : "https://play.google.com/store/apps/details?id=com.oruphones.oru";
    // useEffect(() => {
    //     if (open) {
    //         const onBackButtonEvent = (e) => {
    //             e.preventDefault();
    //             setOpen(false);
    //         }

    //         window.history.pushState(null, null, window.location.pathname);
    //         window.addEventListener('popstate', onBackButtonEvent);
    //         return () => {
    //             window.removeEventListener('popstate', onBackButtonEvent);
    //         };
        // } else {
        //     const onBackButtonEvent = (e) => {
        //         e.preventDefault();
        //         window.history.back();
        //     }
        //     window.history.pushState(null, null, window.location.pathname);
        //     window.addEventListener('popstate', onBackButtonEvent);
        //     return () => {
        //         window.removeEventListener('popstate', onBackButtonEvent);
        //     };
    //     }
    // }, [open]);

    return (
        <Modal2 open={open} setOpen={setOpen}>
            <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e">
                <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/patch-check.svg"} height={50} width={50} alt={make} />
                <h1 className="font-Roboto-Bold mb-2 mt-3">Congratulations!</h1>
                <p className="text-xs my-2 text-center font-Roboto-Regular">
                    Your device has been submitted for listing. To verify the device kindly download the ORUphones app. We recommend that you verify the device in order to sell it quickly.
                </p>
                <div className="mb-2 mt-4">
                    <div className="flex flex-col justify-center items-center space-y-3 pb-4">
                    <Image src={AppleStore} width={96} height={96} alt=""/>
                        <a href={QRValue}>
                            {make == "Apple" ? <p className="w-32 h-10 bg-appStore bg-no-repeat bg-contain" /> : <p className="w-32 h-10 bg-playStore bg-no-repeat bg-contain" />}
                        </a>
                    </div>
                    <Link href="/user/listings">
                        <a>
                            <button className="border border-primary w-32 px-4 py-2 rounded font-Roboto-Medium text-primary"> OK </button>
                        </a>
                    </Link>
                </div>
            </div>
        </Modal2>
    );
}

export default VerifyListingPopup;

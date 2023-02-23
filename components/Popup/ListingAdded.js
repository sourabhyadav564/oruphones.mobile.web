import Image from "next/image";
import Link from "next/link";
// import patchCheck from "https://d1tl44nezj10jx.cloudfront.net/assets/patch-check.svg";
import Modal2 from "./Modal2";
import { useEffect } from "react";

function ListingAdded({ open, setOpen }) {
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
        <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/patch-check.svg"} height={50} width={50} alt="ORU my listings" />
        <h1 className="font-Roboto-Bold mb-2 mt-3">Congratulations!</h1>
        <p className="text-xs my-2 text-center font-Roboto-Regular">
          Your device has been submitted for listing. We recommend that you verify the device in order to sell it quickly.
        </p>
        <div className="mb-2 mt-4 font-Roboto-Medium">
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

export default ListingAdded;

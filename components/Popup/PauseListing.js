import router from "next/router";
import Cookies from "js-cookie";
import Modal2 from "./Modal2";
import { pauseListing } from "api-call";
import PauseCircle from "@/assets/pausecircle.svg";
import { useEffect } from "react";
import Image from "next/image";

function PauseListing({ open, setOpen, listingId }) {
  const handleClick = (e) => {
    e.preventDefault();
    let payLoad = {
      listingId,
      userUniqueId: Cookies.get("userUniqueId"),
    };
    pauseListing(payLoad, Cookies.get("sessionId")).then((res) => {
      if (res.status === "SUCCESS") {
        router.reload();
      }
    });
  };

  return (
    <Modal2 open={open} setOpen={setOpen} title={"Pause"}>
      <div className="flex flex-col space-y-3 text-base text-black-4e py-4">
        <div className="px-6 flex flex-col items-center space-y-2">
          <Image src={PauseCircle} width={44} height={44} />
          <h1 className="font-Roboto-Bold mb-2 text-center">Pause Listing? </h1>
          <p className="text-center font-Roboto-Regular py-4">
            Do you want to pause the listing?
          </p>
          <div className="flex space-x-6 justify-center text-white items-center text-sm">
            <span
              className="font-Roboto-Medium px-6 py-2 text-black-21 rounded uppercase cursor-pointer border border-primary"
              onClick={() => setOpen(false)}
            >
              NO
            </span>
            <span
              className="font-Roboto-Medium px-6 py-2 bg-primary rounded uppercase cursor-pointer"
              onClick={handleClick}
            >
              YES
            </span>
          </div>
        </div>
      </div>
    </Modal2>
  );
}

export default PauseListing;

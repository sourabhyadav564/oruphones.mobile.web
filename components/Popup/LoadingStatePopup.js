import Image from "next/image";
import Link from "next/link";
import patchCheck from "@/assets/patch-check.svg";
import Modal2 from "./Modal2";
import Spinner from "../Loader/Spinner";

function LoadingStatePopup({ open, setOpen }) {
  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-6 py-6 text-base text-black-4e">
        <Spinner />
        <h1 className="font-bold mb-2 mt-3">Loading...</h1>
        <p className="text-xs my-2 text-center">
          Please wait, while we are fetching data for you...{" "}
        </p>
      </div>
    </Modal2>
  );
}

export default LoadingStatePopup;

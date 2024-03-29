import Modal2 from "./Modal2";
import Spinner from "../Loader/Spinner";

function LoadingStatePopup({ open, setOpen }) {
  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-6 py-6 text-base text-black-4e">
        <Spinner />
        <p className="font-Roboto-Bold mb-2 mt-3">Loading...</p>
        <p className="text-xs font-Roboto-Regular my-2 text-center">
          Please wait, while we are fetching data for you...{" "}
        </p>
      </div>
    </Modal2>
  );
}

export default LoadingStatePopup;

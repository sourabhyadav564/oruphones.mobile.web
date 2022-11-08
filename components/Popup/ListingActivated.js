import router from "next/router";
import Modal2 from "./Modal2";

function ListingActivated({ open, setOpen, reason, setReason }) {
  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-10 text-base text-black-4e">
        <h1 className="font-Roboto-Bold my-4">{reason}</h1>
        <div className="my-4">
          <button
            className="border border-primary font-Roboto-Medium w-32 px-4 py-2 rounded text-primary"
            onClick={() => {
              setReason("");
              setOpen(false);
              router.reload();
            }}
          >
            OK
          </button>
        </div>
      </div>
    </Modal2>
  );
}

export default ListingActivated;

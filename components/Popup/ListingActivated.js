import router from "next/router";
import Modal2 from "./Modal2";

function ListingActivated({ open, setOpen }) {
  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-10 text-base text-black-4e">
        <h1 className="font-bold my-4">Your listing is now activated</h1>
        <div className="my-4">
          <button
            className="border border-primary w-32 px-4 py-2 rounded text-primary"
            onClick={() => {
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

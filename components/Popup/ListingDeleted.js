import { deleteListing } from "api-call";
import Cookies from "js-cookie";
import router from "next/router";
import { FaRegTrashAlt } from "react-icons/fa";
import MySelect from "../Form/Select";
import Modal2 from "./Modal2";

const optionsList = [{ value: "Sold my mobile", label: "Sold my mobile" }];

function ListingDeleted({ open, setOpen, data, setListings }) {
  function handleDelete() {
    let payload = {
      listingId: data?.listingId,
      userUniqueId: Cookies.get("userUniqueId"),
    };

    deleteListing(payload).then((response) => {
      if (response.status === "SUCCESS") {
        if (setListings) {
          setListings((prev) => {
            return prev.filter((i) => i.listingId !== data?.listingId);
          });
          setOpen(false);
        } else {
          router.push("/user/listings");
        }
      }
    });
  }

  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-6 space-y-2 text-base text-black-21">
        <FaRegTrashAlt size={34} color="#f92b2b" />
        <h1 className="font-bold mb-2"> Delete Listing? </h1>
        <div className="w-full space-y-8 py-2">
          <p>Do you want to Delete the listing?</p>
          <MySelect labelName="Reason for deletion" options={optionsList} />
        </div>
        <div className="my-4">
          <div className="flex space-x-6 justify-center text-white items-center text-sm">
            <span className="font-medium text-primary rounded uppercase cursor-pointer" onClick={() => setOpen(false)}>
              Cancel
            </span>
            <span className="font-medium px-4 py-2 bg-primary rounded uppercase cursor-pointer" onClick={handleDelete}>
              Ok
            </span>
          </div>
        </div>
      </div>
    </Modal2>
  );
}

export default ListingDeleted;

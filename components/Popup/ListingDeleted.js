import { deleteListing } from "api-call";
import Cookies from "js-cookie";
import router from "next/router";
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import MySelect from "../Form/Select";
import Modal2 from "./Modal2";

const optionsList = [
  { value: "Sold my mobile", label: "Sold my mobile" },
  { value: "Other", label: "Other" },
];

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

  useEffect(() => {
    if (open) {
      const onBackButtonEvent = (e) => {
        e.preventDefault();
        setOpen(false);
      }

      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener('popstate', onBackButtonEvent);
      return () => {
        window.removeEventListener('popstate', onBackButtonEvent);
      };
    } else {
      const onBackButtonEvent = (e) => {
        e.preventDefault();
        window.history.back();
      }
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener('popstate', onBackButtonEvent);
      return () => {
        window.removeEventListener('popstate', onBackButtonEvent);
      };
    }
  }, [open]);


  return (
    <Modal2 open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center max-w-sm px-6 py-2 space-y-2 text-base text-black-21">
        <FaRegTrashAlt size={34} color="#f92b2b" />
        <p className="text-gx font-Roboto-Bold mb-2"> Delete Listing? </p>
        <p>Do you want to Delete the listing?</p>
        <div className="w-full font-Roboto-Regular space-y-8 py-6">
          <MySelect labelName="Reason for deletion" options={optionsList} />
        </div>
        <div className="my-4">
          <div className="flex space-x-6 justify-center text-white items-center text-sm">
            <span
              className="font-Roboto-Semibold text-primary rounded uppercase cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </span>
            <span
              className="font-Roboto-Semibold px-4 py-2 bg-primary rounded uppercase cursor-pointer"
              onClick={handleDelete}
            >
              Ok
            </span>
          </div>
        </div>
      </div>
    </Modal2>
  );
}

export default ListingDeleted;

import { deleteListing } from "api-call";
import Cookies from "js-cookie";
import router from "next/router";
import { useEffect } from "react";
import Trash from "@/assets/trash.svg";
import MySelect from "../Form/Select";
import Modal2 from "./Modal2";
import Image from "next/image";

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

    deleteListing(payload, Cookies.get("sessionId")).then((response) => {
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
      <div className="flex flex-col items-center max-w-sm px-6 py-2 space-y-2 text-base text-black-21">
        <Image src={Trash} width={34} height={34}/>
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

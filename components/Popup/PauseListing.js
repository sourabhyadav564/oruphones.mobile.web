import router from "next/router";
import Cookies from "js-cookie";
import Modal2 from "./Modal2";
import { pauseListing } from "api-call";
// import MySelect from "../Form/Select";
import { AiOutlinePauseCircle } from "react-icons/ai";

function PauseListing({ open, setOpen, listingId }) {
  // const optionsList = [{ value: "Sold my mobile", label: "Sold my mobile" }];

  const handleClick = (e) => {
    e.preventDefault();
    let payLoad = {
      listingId,
      userUniqueId: Cookies.get("info"),
    };
    pauseListing(payLoad).then(
      (res) => {
        if (res.status === "SUCCESS") {
          router.reload();
        }
      },
      (err) => console.error(err)
    );
  };

  return (
    <Modal2 open={open} setOpen={setOpen} title={"Pause"}>
      <div className="flex flex-col space-y-3 text-base text-black-4e py-4">
        <div className="px-6 flex flex-col items-center space-y-2">
          <AiOutlinePauseCircle size={44} color="#f7e17d" />
          <h1 className="font-bold mb-2 text-center">Pause Listing? </h1>
          <p className="text-center py-4">Do you want to pause the listing?</p>
          {/* <MySelect labelName="Reason for pausing" options={optionsList} /> */}
          <div className="flex space-x-6 justify-center text-white items-center text-sm">
            <span
              className="font-medium px-6 py-2 text-black-21 rounded uppercase cursor-pointer border border-primary"
              onClick={() => setOpen(false)}
            >
              NO
            </span>
            <span className="font-medium px-6 py-2 bg-primary rounded uppercase cursor-pointer" onClick={handleClick}>
              YES
            </span>
          </div>
        </div>
      </div>
    </Modal2>
  );
}

export default PauseListing;

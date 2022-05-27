import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Modal1 from "./Modal1";

function SortPopup({ openSort, setOpenSort, setSortApplyFilter }) {

  const [range, setRange] = useState("Newest First");

  function handleChange(data){
    console.log(data);
    setRange(data)
  }

  const submit = (e) => {
    e.preventDefault();
    setSortApplyFilter(range);
    setOpenSort(false);
  };

  return (
    <Modal1 open={openSort} setOpen={setOpenSort}>
      <div className="bg-white p-6 pb-4 sm:p-6 sm:pb-4">
        <div className="text-left sm:mt-0 sm:ml-4 sm:text-left text-black-4e">
          <Dialog.Title as="h1" className="text-lg leading-6 font-semibold ">
            Sort by
          </Dialog.Title>
          <div className="mt-3 w-full text-sm flex flex-wrap mb-4 items-center">
            {/* <Button active={range === "All"} onClick={()=>handleChange("All")}> All </Button> */}
            <Button active={range === "Price - Low to High"} onClick={()=>handleChange("Price - Low to High")}> Price - Low to High </Button>
            <Button active={range === "Price - High to Low"} onClick={()=>handleChange("Price - High to Low")}> Price - High to Low </Button>
            <Button active={range === "Newest First"} onClick={()=>handleChange("Newest First")}> Newest First </Button>
            <Button active={range === "Oldest First"} onClick={()=>handleChange("Oldest First")}> Oldest First </Button>
          </div>
        </div>
        <button className="uppercase bg-primary text-white w-full rounded text-sm py-2 my-2" onClick={submit}> Apply </button>
      </div>
    </Modal1>
  );
}

export default SortPopup;

const Button = ({ children, active, ...rest }) => (
  <p
    className={`block rounded-md text-xs border mr-3 my-2 px-4 py-1 ${active ? "bg-primary-light text-primary border-primary" : "border-gray-c7"}`}
    {...rest}
  >
    {children}
  </p>
);

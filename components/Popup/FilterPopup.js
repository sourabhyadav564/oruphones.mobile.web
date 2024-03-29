import { Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import PriceFilter from "../FilterAndSort/PriceFilter";
import Modal1 from "./Modal1";
import { useRouter } from "next/router";
import InfoCircle from "@/assets/infocircle2.svg";

import ConditionInfo from "./ConditionInfo";
import VerificationInfo from "./VerificationInfo";
import { useEffect } from "react";
import Image from "next/image";

function FilterPopup({
  openFilter,
  setOpenFilter,
  filterOptions,
  setApplyFilter,
  setIsFilterApplied
}) {
  const [selectedValues, setSelectedValues] = useState({
    condition: ["all"],
    color: ["all"],
    storage: ["all"],
    Ram: ["all"],
    warranty: ["all"],
    verification: "",
  });
  const [openConditionPopup, setOpenConditionPopup] = useState(false);
  const [openVerificationPopup, setOpenVerificationPopup] = useState(false);

  const router = useRouter();
  const openPopup = (id) => {
    if (id === "condition") {
      return (
        <div className="ml-1">
        <Image src={InfoCircle} width={10} height={10}  className="text-sm cursor-pointer ml-1 " onClick={() => setOpenConditionPopup(true)}/>
      </div>
      );
    } else if (id === "verification") {
      return (
        <div className="ml-1">
        <Image src={InfoCircle} width={10} height={10}  className="text-sm cursor-pointer ml-1" onClick={() => setOpenVerificationPopup(true)}/>
        </div>
      );
    }
  };

  const handleChange = (key, value) => {
    let tempVal = { ...selectedValues };

    if (tempVal[key] && tempVal[key].includes(value)) {
      tempVal[key] = tempVal[key].filter((i) => i !== value);
    } else {
      if (tempVal[key]) {
        tempVal[key] = [...tempVal[key], value];
      } else {
        tempVal[key] = [value];
      }
    }

    if (tempVal[key]) {
      if (value === "all") {
        tempVal[key] = ["all"];
      } else {
        tempVal[key] = tempVal[key].filter((i) => i !== "all");
      }
    }

    setSelectedValues(tempVal);
  };

  const clearFilter = () => {
    setSelectedValues({
      condition: ["all"],
      color: ["all"],
      storage: ["all"],
      Ram: ["all"],
      warranty: ["all"],
      verification: "",
    });
    setApplyFilter({
      condition: ["all"],
      color: ["all"],
      storage: ["all"],
      Ram: ["all"],
      warranty: ["all"],
      verification: "",
    });
    setIsFilterApplied(false);
    setOpenFilter(false);
  };

  const submit = (e) => {
    e.preventDefault();
    setApplyFilter(selectedValues);
    setOpenFilter(false);
  };

  return (
    <Modal1 open={openFilter} setOpen={setOpenFilter}>
      <div className="bg-white p-6 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:mt-0 sm:ml-4 sm:text-left text-black-4e">
          <Dialog.Title className={"flex justify-between"}>
            <span as="h1" className="text-lg leading-6 font-Roboto-Semibold ">
              Filters
            </span>
            <span
              className="text-sm text-red-500 text-semibold font-Roboto-Regular underline"
              onClick={() => clearFilter()}
            >
              Clear Filter
            </span>
          </Dialog.Title>

          <div className="mt-3 w-full">
            {filterOptions &&
              filterOptions.map((section) =>
                section.id === "price" ? (
                  <PriceFilter
                    key={section?.id}
                    setSelectedValues={setSelectedValues}
                    router={router}
                    seletedValues={selectedValues}
                  ></PriceFilter>
                ) : (
                  <Fragment key={section?.id}>
                    <p className="text-base font-Roboto-Regular flex items-center">
                      {section.name} {openPopup(section.id)}
                    </p>
                    <div className="flex text-sm pt-2 pb-4 font-Roboto-Regular capitalize space-x-2 overflow-x-auto filterPopup">
                      {section?.options.map((option) => (
                        <Button
                          key={option.value}
                          active={
                            (selectedValues[section.id] &&
                              selectedValues[section.id].includes(
                                option.value
                              )) ||
                            option?.active
                          }
                          disabled={option?.disabled}
                          onClick={() => handleChange(section.id, option.value)}
                        >
                          {option.value}
                        </Button>
                      ))}
                    </div>
                  </Fragment>
                )
              )}
          </div>
        </div>
        <button
          className="uppercase bg-primary text-white w-full rounded text-sm py-2 my-2 font-Roboto-Medium"
          onClick={submit}
        >
          Apply
        </button>
        <div className="py-5"></div>
        <ConditionInfo
          open={openConditionPopup}
          setOpen={setOpenConditionPopup}
        ></ConditionInfo>
        <VerificationInfo
          open={openVerificationPopup}
          setOpen={setOpenVerificationPopup}
        ></VerificationInfo>
      </div>
    </Modal1>
  );
}

export default FilterPopup;

const Button = ({ children, active, ...rest }) => (
  <button
    className={`capitalize rounded-md text-xs max-w-max border px-3 py-1 flex-shrink-0 ${active
      ? "bg-primary-light opacity-50 text-white border-primary"
      : "border-gray-c7"
      }`}
    {...rest}
  >
    {children}
  </button>
);

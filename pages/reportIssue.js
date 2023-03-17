import { CardHeading4 } from "@/components/elements/CardHeading/cardheading";
import { SellPhoneHeading1 } from "@/components/elements/Heading/heading";
import Header4 from "@/components/Header/header4";
import Input from "@/components/Form/Input";
import React, { useEffect, useState } from "react";
import BrandPopup from "@/components/AddListing/BrandPopup";
import { useRecoilValue } from "recoil";
import {
  addListingBrandSelector,
  addListingModelSelector,
} from "atoms/globalState";
import ModelPopup from "@/components/AddListing/ModelPopup";
import { getModelLists } from "api-call";
import MySelect from "@/components/Form/Select";
import { useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";

const ReportIssue = () => {
  const optionsList = [
    { value: "Verification Issue", label: "Verification Issue" },
    { value: "Listing Issue", label: "Listing Issue" },
    { value: "Service Issue", label: "Service Issue" },
    { value: "Funtionality Issue", label: "Funtionality Issue" },
    { value: "Other", label: "Other" },
  ];
  const { user } = useAuthState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [page, setPage] = useState(0);
  const [mktNameOpt, setMktNameOpt] = useState();
  const [storageColorOption, setStorageColorOption] = useState();
  const [model, setModel] = useState();
  const selectedBrand = useRecoilValue(addListingBrandSelector);
  const [storage, setStorage] = useState();
  const selectedModel = useRecoilValue(addListingModelSelector);
  const [modelInfo, setModelInfo] = useState();
  const [openModelPopup, setOpenModelPopup] = useState(false);
  const [openBrandPopup, setOpenBrandPopup] = useState(false);
  const [make, setMake] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const handleSelectChange = async (name) => {
    if (name === "make") {
      setMake(selectedBrand);
      const models3 = await getModelLists("", "", selectedBrand, "");
      setMktNameOpt(models3?.dataObject[0]?.models);
    } else if (name === "model") {
      setModel(selectedModel);
      let index = mktNameOpt?.findIndex(
        (i) => i.marketingname === selectedModel
      );
      if (mktNameOpt) {
        setStorageColorOption(mktNameOpt[index]);
      }
    } else if (name === "condition") {
      setCondition(e.value);
    }
  };

  useEffect(() => {
    if (selectedBrand) {
      handleSelectChange("make");
    }
    if (selectedModel) {
      handleSelectChange("model");
    }
  }, [selectedBrand, selectedModel]);
  return (
    <>
      <Header4 title="Price Comparison" />
      <div>
        <form
          className="grid grid-cols-1 space-y-4 container my-4"
          onSubmit={handleSubmit}
        >
          {page === 0 && (
            <>
              <div className="space-y-2">
                <SellPhoneHeading1 title="Enter your Phone details" />

                <div
                  className="space-y-nx"
                  onClick={() => {
                    setOpenBrandPopup(true);
                  }}
                >
                  <p className="pt-rx flex space-x-0.5">
                    <CardHeading4 title="Brand" />{" "}
                    <span className="text-red-400 -mt-1">*</span>
                  </p>
                  <Input
                    value={make}
                    disabled
                    placeholder="Please Select Brand "
                    type="text"
                    className="font-Regular  text-jx text-[#2C2F45]"
                  ></Input>
                </div>
              </div>
              {mktNameOpt && mktNameOpt.length > 0 && (
                <div
                  onClick={() => {
                    setOpenModelPopup(true);
                    setModelInfo();
                  }}
                  className="space-y-2"
                >
                  <div className="space-y-nx">
                    <p className="flex space-x-0.5">
                      <CardHeading4 title="Model" />{" "}
                      <span className="text-red-400 -mt-1">*</span>
                    </p>
                    <Input
                      value={model}
                      disabled
                      placeholder="Please Select Model "
                      type="text"
                      className="font-Regular  text-jx text-[#2C2F45]"
                    ></Input>
                  </div>
                </div>
              )}
              {storageColorOption && storageColorOption?.storage && (
                <div className="space-y-2">
                  <div className="space-y-nx">
                    <p className="flex space-x-0.5">
                      <CardHeading4 title="Storage Variant " />{" "}
                      <span className="text-red-400 -mt-1">*</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 ">
                    {storageColorOption &&
                      storageColorOption?.storage &&
                      storageColorOption.storage.map((item, index) => (
                        <div
                          className={`${
                            storage == item
                              ? "bg-[#E8E8E8] font-Roboto-Semibold hover:border-primary text-jx opacity-bg-80 border-2 border-white text-[#2C2F45] opacity-100"
                              : "bg-white opacity-bg-50 opacity-70 border-2 border-[#2C2F45] border-opacity-40 ] "
                          }  active:bg-[#2C2F45] duration-300 p-2 flex items-center font-Regular rounded-[5px]  justify-center`}
                          onClick={() => setStorage(item)}
                          key={index}
                        >
                          <CardHeading4 title={item} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </form>
      </div>
      {storage && (
        <div className="px-4">
          <div className="w-full font-Roboto-Regular space-y-8 py-6">
            <MySelect labelName="Issue Type" options={optionsList} />
          </div>
          <section className=" flex flex-col space-y-4">
            <p className="font-Roboto-Light text-ex border-b-2 pb-1">
              Basic Information
            </p>
            <div className="space-y-1 text-jx font-Roboto-Regular">
              <p className="bg-white px-0.5">
                Name <span className="text-red-500">*</span>
              </p>
              <Input
                type="text"
                inputClass="text-black-ef font-Regular"
                maxLength="25"
                name="username"
                required
                defaultValue={user?.userdetails?.userName || ""}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div className="space-y-1 text-jx font-Roboto-Regular">
              <p className="bg-white px-0.5">
                Mobile No.<span className="text-red-500">*</span>
              </p>
              <Input
                prefix="+91"
                inputClass="font-Regular text-black-ef"
                defaultValue={` |  ${user?.userdetails?.mobileNumber || ""}`}
              />
            </div>
            <div className="space-y-1 text-jx font-Roboto-Regular">
              <p className="bg-white px-0.5">
                Email ID <span className="text-red-500">*</span>
              </p>
              <Input
                type="text"
                name="email"
                inputClass="font-Roboto-Regular text-black-ef"
                defaultValue={user?.userdetails?.email || ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </section>
        </div>
      )}
      {email && (
        <div className="flex px-4 ">
          <div class="flex items-center">
            <input
              id="bordered-checkbox-2"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-5 h-5"
            />
            <label
              for="bordered-checkbox-2"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Schedule a call back
            </label>
          </div>
        </div>
      )}
      {email && <div className="flex justify-center py-8 px-4">
        <div className="bg-primary py-2 px-40 text-white rounded-lg font-Roboto-Semibold">
          Submit
        </div>
      </div>}
      <BrandPopup open={openBrandPopup} setOpen={setOpenBrandPopup} />
      <ModelPopup
        open={openModelPopup}
        setOpen={setOpenModelPopup}
        mktNameOpt={mktNameOpt}
      />
    </>
  );
};

export default ReportIssue;

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
import { getModelLists, reportIssue } from "api-call";
import MySelect from "@/components/Form/Select";
import { useAuthState } from "providers/AuthProvider";
import Cookies from "js-cookie";
import ReportIssuePopup from "@/components/Popup/ReportIssuePopup";
import { useRouter } from "next/router";
import Input2 from "@/components/Form/input2";
import { toast } from "react-toastify";

const ReportIssue = () => {
  const optionsList = [
    { value: "Verification Issue", label: "Verification Issue" },
    { value: "Listing Issue", label: "Listing Issue" },
    { value: "Service Issue", label: "Service Issue" },
    { value: "Funtionality Issue", label: "Funtionality Issue" },
    { value: "Other", label: "Other" },
  ];
  const { user } = useAuthState();
  const [email, setEmail] = useState(user?.userdetails?.email || "");
  const [userName, setUserName] = useState(user?.userdetails?.userName || "");
  const [MobileNumber, setMobileNumber] = useState(
    user?.userdetails?.mobileNumber || ""
  );
  const [page, setPage] = useState(0);
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [callTime, setCallTime] = useState("");
  const [reportData, setReportData] = useState(null);
  const [mktNameOpt, setMktNameOpt] = useState();
  const [storageColorOption, setStorageColorOption] = useState();
  const [model, setModel] = useState();
  const selectedBrand = useRecoilValue(addListingBrandSelector);
  const [storage, setStorage] = useState();
  const selectedModel = useRecoilValue(addListingModelSelector);
  const [modelInfo, setModelInfo] = useState();
  const [openModelPopup, setOpenModelPopup] = useState(false);
  const [check, setCheck] = useState(false);
  const [openBrandPopup, setOpenBrandPopup] = useState(false);
  const [openReportIssuePopup, setOpenReportIssuePopup] = useState(false);
  const [make, setMake] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };
  const router = useRouter();
  const timeSlots = [
    "9:00 AM - 12:00 PM",
    "12:00 PM - 3:00 PM",
    "3:00 PM - 6:00 PM",
    "6:00 PM - 9:00 PM",
  ];
  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmail(email);
      return true;
    } else {
      toast.warning(`Please enter valid email address`, { toastId: "016" });
      return false;
    }
  };
  const handleSubmitIssue = (e) => {
    e.preventDefault();
    console.log(
      "submit",
      userName,
      email,
      MobileNumber,
      issue,
      make,
      model,
      storage,
      description,
      callTime
    );
    if (
      userName !== "" &&
      email !== "" &&
      MobileNumber !== "" &&
      issue !== "" &&
      make !== "" &&
      description !== "" &&
      storage !== ""
    ) {
      if (validateEmail(email)) {
        reportIssue(
          userName,
          email,
          MobileNumber,
          issue,
          make,
          description,
          storage,
          check,
          callTime,
          Cookies.get("sessionId")
        ).then((res) => {
          setReportData(res);
        });
        setOpenReportIssuePopup(true);
      }
    } else {
      toast.warning(`Please enter valid details`, { toastId: "017" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMake("");
      setModel("");
      clearInterval(interval);
    }, 100);
  }, [router.pathname]);

  useEffect(() => {
    if (make) {
      setStorage();
      setStorageColorOption();
      const interval = setInterval(() => {
        setModel("");
        clearInterval(interval);
      }, 100);
    }
  }, [make]);

  const handleSelectChange = async (name) => {
    if (name === "make") {
      setMake(selectedBrand);
      const models3 = await getModelLists(
        Cookies.get("userUniqueId") || 0,
        Cookies.get("sessionId"),
        selectedBrand,
        ""
      );
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
    if (selectedBrand && !openBrandPopup) {
      handleSelectChange("make");
    }
    if (selectedModel && !openModelPopup) {
      handleSelectChange("model");
    }
  }, [openBrandPopup, selectedBrand, openModelPopup, selectedModel]);
  return (
    <>
      <Header4 title="Report An Issue" />
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
            <MySelect
              labelName="Issue Type"
              options={optionsList}
              onChange={(e) => setIssue(e.value)}
            />
          </div>
          <div className="w-full font-Roboto-Regular space-y-8 py-6">
            <Input
              type="text"
              placeholder="Issue Description"
              name="username"
              minLength="30"
              maxLength="500"
              labelClass="bg-[#ffffff]"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            >
              Issue Description
            </Input>
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
              <Input2
                pattern="[0-9]*"
                type="text"
                required
                prefix="+91-"
                inputClass="font-Regular text-black-ef"
                defaultValue={`${user?.userdetails?.mobileNumber || ""}`}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                }}
              />
            </div>
            <div className="space-y-1 text-jx font-Roboto-Regular">
              <p className="bg-white px-0.5">
                Email ID <span className="text-red-500">*</span>
              </p>
              <Input
                pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                type="text"
                required
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
      {make && model && storage && (
        <div className="flex px-4 ">
          <div class="flex items-center">
            <input
              id="bordered-checkbox-2"
              type="checkbox"
              value={check}
              onChange={(e) => {
                setCheck(!check);
              }}
              name="bordered-checkbox"
              class="w-5 h-5 "
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
      {!check ? (
        ""
      ) : (
        <>
          {timeSlots.map((item, index) => {
            return (
              <div className=" px-4 items-center font-Roboto-Semibold">
                {" "}
                <label className="flex">
                  {" "}
                  <input
                    type="radio"
                    className="checked:bg-m-green  border focus:ring-0 "
                    value={item}
                    name="time"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCallTime(e.target.value);
                      }
                    }}
                  />
                  <p className="pl-2">{item}</p>
                </label>
              </div>
            );
          })}
        </>
      )}
      {make && model && storage && (
        <div className="flex justify-center py-8 px-4">
          <div
            className="bg-primary py-2 px-40 text-white rounded-lg font-Roboto-Semibold"
            onClick={handleSubmitIssue}
          >
            Submit
          </div>
        </div>
      )}

      <BrandPopup open={openBrandPopup} setOpen={setOpenBrandPopup} />
      <ReportIssuePopup
        open={openReportIssuePopup}
        setOpen={setOpenReportIssuePopup}
      />
      <ModelPopup
        open={openModelPopup}
        setOpen={setOpenModelPopup}
        mktNameOpt={mktNameOpt}
      />
    </>
  );
};

export default ReportIssue;

import Cookies from "js-cookie";
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import InfoCircle from "@/assets/infocircle2.svg";
import LoginPopup from "../Popup/LoginPopup";
import ThisPhonePopup from "../Popup/ThisPhonePopup";
import WarrantyInfo from "@/components/Popup/WarrantyInfo";
import VerificationInfo from "../Popup/VerificationInfo";
import { numberWithCommas } from "@/utils/util";

function ComparisonTable(data, listingId) {
  // console.log("data prod", data);
  const [productData, setProductData] = useState([]);
  const [thisPhoneListingId, setThisPhoneListingId] = useState("");
  useEffect(() => {
    if (data?.data?.length > 0) {
      const interval = setInterval(() => {
        setProductData(data?.data);
        setThisPhoneListingId(data?.listingId);
        // console.log("productData", thisPhoneListingId);
        clearInterval(interval);
      }, 1000);
    }
  }, []);
  const [performAction2, setperformAction2] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [productLink, setProductLink] = useState("");
  const [thisPhonePopup, setThisPhonePopup] = useState(false);
  const [openWarrantyInfo, setOpenWarrantyInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        openLoginPopup == false &&
        performAction2 == true &&
        Cookies.get("userUniqueId") !== undefined &&
        data?.productLink !== "" &&
        productLink !== ""
      ) {
        window.open(productLink, "_blank");
        clearInterval(interval);
      } else if (
        openLoginPopup == false &&
        performAction2 == true &&
        Cookies.get("userUniqueId") !== undefined &&
        productLink == ""
      ) {
        setThisPhonePopup(true);
        clearInterval(interval);
      }
    }, 1000);
  }, [openLoginPopup]);

  return (
    <>
      <div class="relative overflow-x-scroll pt-3">
        <table class="w-full text-cx text-left text-gray-500 dark:text-gray-400">
          <thead class=" uppercase text-white dark:bg-gray-700 dark:text-gray-400 sticky top-0 font-Roboto-Semibold">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 sticky left-0 top-0 bg-primary border-[1px] border-r-gray"
              >
                Seller
              </th>
              <th
                scope="col"
                class="px-3 py-3 bg-primary border-[1px] border-r-gray"
              >
                Rank
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-primary border-[1px] border-r-gray"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-primary border-[1px] border-r-gray text-center"
              >
                <div
                  className="flex justify-center items-center"
                  onClick={() => setOpenWarrantyInfo(true)}
                >
                  <p className="pr-1">Brand Warranty</p>
                  {/* <BsInfoCircle size={20} classname="pl-1" /> */}
                  <Image src={InfoCircle} width={20} height={20} classname="pl-1" />
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-primary border-[1px] border-r-gray text-center"
              >
                <div
                  className="flex justify-center items-center"
                  onClick={() => setOpenWarrantyInfo(true)}
                >
                  <p className="pr-1">Seller Warranty</p>
                  {/* <BsInfoCircle size={20} classname="pl-1" /> */}
                  <Image src={InfoCircle} width={20} height={20} classname="pl-1" />
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-primary border-[1px] border-r-gray text-center"
              >
                Accessories (Compatible)
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-primary border-[1px] border-r-gray text-center"
              >
                Accessories (Original)
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-primary border-[1px] border-r-gray text-center"
              >
                <div
                  className="flex justify-center items-center"
                  onClick={() => setOpenVerificationInfo(true)}
                >
                  <p className="pr-1">Oru Verified</p>
                  {/* <BsInfoCircle size={20} classname="pl-1" /> */}
                  <Image src={InfoCircle} width={20} height={20} classname="pl-1" />
                </div>
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-primary border-[1px] border-r-gray text-center"
              >
                <div
                  className="flex justify-center items-center"
                >
                  <p className="pr-1">Location</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {productData &&
              productData?.map((item, index) => {
                return (
                  <tr
                    class={`${
                      // item.externalSourceImage == "" ||
                      // item.externalSourceImage ==
                      //   "https://d1tl44nezj10jx.cloudfront.net/devImg/oru/product/mobiledevices/img/txt_phone.png"
                      thisPhoneListingId == item.listingId
                        ? "bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 overflow-x-scroll font-Roboto-Regular text-center"
                        : "bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-x-scroll font-Roboto-Regular text-center"
                      }`}
                  >
                    <th
                      scope="row"
                      class={`${
                        // item.externalSourceImage == "" ||
                        // item.externalSourceImage ==
                        //   "https://d1tl44nezj10jx.cloudfront.net/devImg/oru/product/mobiledevices/img/txt_phone.png"
                        thisPhoneListingId == item.listingId
                          ? "px-2 py-4 font-medium text-gray-400 dark:text-white sticky top-0 left-0 bg-gray-100 drop-shadow-2xl border-[1px]"
                          : "px-2 py-4 font-medium text-gray-400 dark:text-white sticky top-0 left-0 bg-white drop-shadow-2xl border-[1px]"
                        }`}
                    >
                      <div
                        className="flex"
                      >
                        {item?.userName ? (
                          // (item?.externalSourceImage == "" ||
                          //   item?.externalSourceImage ==
                          //     "https://d1tl44nezj10jx.cloudfront.net/devImg/oru/product/mobiledevices/img/oru_logo.png" ||
                          //   item.externalSourceImage ==
                          //     "https://d1tl44nezj10jx.cloudfront.net/devImg/oru/product/mobiledevices/img/txt_phone.png")
                          <div
                            className={`text-ex font-Roboto-Regular ${
                              // item.externalSourceImage != "" &&
                              // item.externalSourceImage !=
                              //   "https://d1tl44nezj10jx.cloudfront.net/devImg/oru/product/mobiledevices/img/txt_phone.png"
                              thisPhoneListingId != item.listingId &&
                              "invert-0 brightness-0"
                              } m-auto object-contain`}
                          >
                            {item?.userName}
                          </div>
                        ) : (
                          <Image
                            className={`${thisPhoneListingId == item.listingId
                              ? "object-contain "
                              : "object-contain brightness-0 invert-0"
                              }`}
                            src={item?.externalSourceImage}
                            height={30}
                            width={70}
                          />
                          // <div></div>
                        )}
                        {/* <FaGreaterThan size={18} className="pt-1.5" /> */}
                      </div>
                      <div
                       onClick={() => {
                        if (Cookies.get("userUniqueId") == undefined) {
                          setOpenLoginPopup(true);
                          setProductLink(item?.productLink);
                          setperformAction2(true);
                        }
                        else if (thisPhoneListingId == item.listingId && item?.Object?.isOtherVendor == "N") {
                          setThisPhonePopup(true);
                        } else if (thisPhoneListingId != item.listingId) {
                          window.open(item?.productLink, "_blank");
                        }
                        else {
                          window.open(item?.productLink, "_blank");
                        }
                      }} 
                      >
                        <p className="text-[#2196f3ff]">View deal &gt;</p>
                      </div>
                    </th>
                    <td class="mx-4 py-4 border-[1px]">{index + 1}</td>
                    <td class="mx-4 py-4 border-[1px] text-yellow-fb">
                      ₹ {numberWithCommas(item?.externalSourcePrice)}
                    </td>
                    <td class="px-6 py-4  border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? item?.Object?.warranty
                        : "None"}
                    </td>
                    <td class="px-6 py-4  border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? "None"
                        : item?.Object?.warranty}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {/* {item?.Object?.isOtherVendor == "N"
                        ? "None"
                        : "Phone Charger, Phone Box"} */}
                      {item?.Object?.isOtherVendor == "Y"
                        ? item?.Object?.charger == "Y"
                          ? item?.Object?.earphone == "Y"
                            ? item?.Object?.originalbox == "Y"
                              ? "Phone Charger, Earphone, Phone Box"
                              : "Phone Charger, Earphone"
                            : item?.Object?.originalbox == "Y"
                              ? "Phone Charger, Phone Box"
                              : "Phone Charger"
                          : item?.Object?.earphone == "Y"
                            ? item?.Object?.originalbox == "Y"
                              ? "Earphone, Phone Box"
                              : "Earphone"
                            : item?.Object?.originalbox == "Y"
                              ? "Phone Box"
                              : "Not Available"
                        : "None"}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? item?.Object?.charger == "Y"
                          ? item?.Object?.earphone == "Y"
                            ? item?.Object?.originalbox == "Y"
                              ? "Charger, Earphone, Original Box"
                              : "Charger, Earphone"
                            : item?.Object?.originalbox == "Y"
                              ? "Charger, Original Box"
                              : "Charger"
                          : item?.Object?.earphone == "Y"
                            ? item?.Object?.originalbox == "Y"
                              ? "Earphone, Original Box"
                              : "Earphone"
                            : item?.Object?.originalbox == "Y"
                              ? "Original Box"
                              : "Not Available"
                        : "None"}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? item?.Object?.verified
                          ? "Verified"
                          : "Not Verified"
                        : "None"}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {item?.Object?.listingLocation}
                    </td>
                  </tr>
                );
              })}
            {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sticky top-0 left-0 bg-white"
              >
                
              </th>
              <td class="px-6 py-4">$1999</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Alwar</td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white left-0 top-0 sticky bg-white"
              >
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">$99</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">Delhi</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <LoginPopup
        open={openLoginPopup}
        setOpen={setOpenLoginPopup}
        fromAddListing
      />
      <ThisPhonePopup open={thisPhonePopup} setOpen={setThisPhonePopup} />
      {openWarrantyInfo && (
        <WarrantyInfo open={openWarrantyInfo} setOpen={setOpenWarrantyInfo} />
      )}
      {openVerificationInfo && (
        <VerificationInfo
          open={openVerificationInfo}
          setOpen={setOpenVerificationInfo}
        />
      )}
    </>
  );
}

export default ComparisonTable;

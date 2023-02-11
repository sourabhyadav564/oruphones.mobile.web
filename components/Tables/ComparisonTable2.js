import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoginPopup from "../Popup/LoginPopup";
import ThisPhonePopup from "../Popup/ThisPhonePopup";

function ComparisonTable2(data, listingId) {
  const [productData, setProductData] = useState([]);
  const [thisPhoneListingId, setThisPhoneListingId] = useState(listingId);
  const [thisPhonePopup, setThisPhonePopup] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [performAction1, setperformAction1] = useState(false);
  const [productLink, setProductLink] = useState("");

  useEffect(() => {
    if (data?.data?.length > 0) {
      const interval = setInterval(() => {
        setProductData(data?.data);
        setThisPhoneListingId(data?.listingId);
        clearInterval(interval);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        openLoginPopup == false &&
        performAction1 == true &&
        Cookies.get("userUniqueId") !== undefined &&
        data?.productLink !== "" &&
        productLink !== ""
      ) {
        window.open(productLink, "_blank");
        clearInterval(interval);
      } else if (
        openLoginPopup == false &&
        performAction1 == true &&
        Cookies.get("userUniqueId") !== undefined
      ) {
        setThisPhonePopup(true);
        clearInterval(interval);
      }
    }, 1000);
  }, [openLoginPopup]);
  console.log("productData", data, thisPhoneListingId);

  return (
    <div className="overflow-x-scroll relative">
      <table className="w-full text-center font-Roboto-Medium text-cx cursor-default relative">
        <tr className="text-white sticky left-0">
          <th className="mx-6 py-3 border bg-primary sticky left-0">
            Compare By
          </th>
          {productData?.map((item, index) => (
            <th
              className="border px-2 py-4 bg-primary"
              onClick={() => {
                if (Cookies.get("userUniqueId") == undefined) {
                  setProductLink(
                    `www.oruphones.com/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`
                  );
                  setOpenLoginPopup(true);
                  setperformAction1(true);
                } else if (
                  thisPhoneListingId == item?.listingId &&
                  item?.isOtherVendor == "N"
                ) {
                  setThisPhonePopup(true);
                } else if (thisPhoneListingId != item?.listingId) {
                  // window.open(item.productLink, "_blank");}
                  window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  );
                } else if (item?.isOtherVendor == "Y" && item?.vendorLink) {
                  window.open(item?.vendorLink, "_blank");
                } else {
                  window.open(
                    `/product/buy-old-refurbished-used-mobiles/${item.make}/${item?.marketingName}/${item?.listingId}?isOtherVendor=${item?.isOtherVendor}`,
                    "_blank"
                  );
                }
              }}
            >
              {item?.listingId == thisPhoneListingId
                ? `This Deal (${item?.marketingName})`
                : item?.marketingName}
            </th>
          ))}
        </tr>
        <tr className=" font-Roboto-Regular text-cx">
          <th className="bg-white border px-6 py-3 sticky left-0 drop-shadow-2xl uppercase">
            Price
          </th>
          {productData?.map((item, index) => (
            // <Link href={item.ven}>
            <th
              className={`${
                thisPhoneListingId == item?.listingId
                  ? "border px-2 py-6 text-yellow-500 font-Roboto-Light bg-gray-100"
                  : "border px-2 py-6 text-yellow-500 font-Roboto-Light"
              }`}
            >
              {" "}
              <span className="px-0.2">₹</span> {item?.listingPrice}
            </th>
            // </Link>
          ))}
        </tr>
        <tr className="  font-Roboto-Regular text-cx sticky">
          <th className=" bg-white px-4 py-2 border sticky left-0 drop-shadow-2xl uppercase">
            Condition
          </th>
          {productData?.map((item, index) => (
            <th
              className={`${
                thisPhoneListingId == item?.listingId
                  ? "border px-4 bg-gray-100 py-4 font-Roboto-Light text-gray"
                  : "border px-4 py-4 font-Roboto-Light text-gray"
              }`}
            >
              {item?.deviceCondition}
            </th>
          ))}
        </tr>
        <tr className=" bg-opacity-10  font-Roboto-Regular text-cx">
          <th className="border px-4 py-2  sticky left-0 bg-white drop-shadow-2xl uppercase">
            Storage
          </th>
          {productData?.map((item, index) => (
            <th className={`${thisPhoneListingId == item?.listingId ? "border bg-gray-100 px-4 py-4 font-Roboto-Light text-gray" : "border px-4 py-4 font-Roboto-Light text-gray"}`}>
              {item?.deviceStorage}
            </th>
          ))}
        </tr>
        <tr className="  font-Roboto-Regular text-cx">
          <th className="sticky border left-0 bg-white px-4 py-2 drop-shadow-2xl uppercase">
            Seller's warranty
          </th>
          {productData?.map((item, index) => (
            <th className={`${thisPhoneListingId == item?.listingId ? "border bg-gray-100 px-4 py-4 font-Roboto-Light text-gray" : "border px-4 py-4 font-Roboto-Light text-gray"}`}>
              {item?.isOtherVendor == "Y" ? item?.warranty : "None"}
            </th>
          ))}
        </tr>
        <tr className="  font-Roboto-Regular text-cx">
          <th className="sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase">
            Brand warranty
          </th>
          {productData?.map((item, index) => (
            <th className={`${thisPhoneListingId == item?.listingId ? "border bg-gray-100 px-4 py-4 font-Roboto-Light text-gray" : "border px-4 py-4 font-Roboto-Light text-gray"}`}>
              {item?.isOtherVendor == "N" ? item?.warranty : "None"}
            </th>
          ))}
        </tr>
        <tr className="  font-Roboto-Regular text-cx">
          <th className=" sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase">
            Accessories (Compatible)
          </th>
          {productData?.map((item, index) => (
            <th className={`${thisPhoneListingId == item?.listingId ? "border bg-gray-100 px-4 py-4 font-Roboto-Light text-gray" : "border px-4 py-4 font-Roboto-Light text-gray"}`}>
              {item?.isOtherVendor == "Y"
                ? item?.charger == "Y"
                  ? item?.earphone == "Y"
                    ? item?.originalbox == "Y"
                      ? "Phone Charger, Earphone, Phone Box"
                      : "Phone Charger, Earphone"
                    : item?.originalbox == "Y"
                    ? "Phone Charger, Phone Box"
                    : "Phone Charger"
                  : item?.earphone == "Y"
                  ? item?.originalbox == "Y"
                    ? "Earphone, Phone Box"
                    : "Earphone"
                  : item?.originalbox == "Y"
                  ? "Phone Box"
                  : "None"
                : "None"}
            </th>
          ))}
        </tr>
        <tr className="  font-Roboto-Regular text-cx">
          <th className="sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase">
            Accessories (Original)
          </th>
          {productData?.map((item, index) => (
            <th className={`${thisPhoneListingId == item?.listingId ? "border bg-gray-100 px-4 py-4 font-Roboto-Light text-gray" : "border px-4 py-4 font-Roboto-Light text-gray"}`}>
              {item?.isOtherVendor == "N"
                ? item?.charger == "Y"
                  ? item?.earphone == "Y"
                    ? item?.originalbox == "Y"
                      ? "Charger, Earphone, Original Box"
                      : "Charger, Earphone"
                    : item?.originalbox == "Y"
                    ? "Charger, Original Box"
                    : "Charger"
                  : item?.earphone == "Y"
                  ? item?.originalbox == "Y"
                    ? "Earphone, Original Box"
                    : "Earphone"
                  : item?.originalbox == "Y"
                  ? "Original Box"
                  : "None"
                : "None"}
            </th>
          ))}
        </tr>
        <tr className=" font-Roboto-Regular text-cx">
          <th className="sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase">
            Location
          </th>
          {productData?.map((item, index) => (
            <th className={`${thisPhoneListingId == item?.listingId ? "border bg-gray-100 px-4 py-4 font-Roboto-Light text-gray" : "border px-4 py-4 font-Roboto-Light text-gray"}`}>
              {item?.listingLocation}
            </th>
          ))}
        </tr>
        <tr className=" font-Roboto-Regular text-cx">
          <th className="sticky left-0 bg-white border px-4 py-2 drop-shadow-2xl uppercase z-10">
            Listed By
          </th>
          {productData?.map((item, index) => (
            <th className={`${thisPhoneListingId == item?.listingId ? "border bg-gray-100 px-4 py-4 font-Roboto-Light text-gray" : "border px-4 py-4 font-Roboto-Light text-gray"}`}>
              {!item?.listedBy ? (
                <Image
                  src={item?.vendorLogo}
                  width={60}
                  height={40}
                  className="object-contain  brightness-50 invert-1 filter"
                />
              ) : (
                item?.listedBy
              )}
            </th>
          ))}
        </tr>
      </table>
      <ThisPhonePopup open={thisPhonePopup} setOpen={setThisPhonePopup} />
      <LoginPopup
        open={openLoginPopup}
        setOpen={setOpenLoginPopup}
        fromAddListing
      />
    </div>
  );
}

export default ComparisonTable2;

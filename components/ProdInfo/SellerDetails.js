import Image from "next/image";
import React, { Fragment } from "react";

function SellerDetails({ data, otherVendorData }) {
  return (
    <Fragment>
      <h2 className="text-gray-20 font-semibold my-3">Seller Details</h2>
      <div className="flex items-center">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="30" viewBox="0 0 27 30">
            <g id="bx-user-pin" transform="translate(-4.5 -3)">
              <path
                id="Path_67"
                data-name="Path 67"
                d="M18,15a2.914,2.914,0,0,0,3-3,3,3,0,0,0-6,0A2.915,2.915,0,0,0,18,15Zm0,1.5c-3.314,0-6,2.418-6,5.4v.579H24V21.9C24,18.918,21.314,16.5,18,16.5Z"
                fill="#c7c7c7"
              />
              <path
                id="Path_68"
                data-name="Path 68"
                d="M28.5,3H7.5a3,3,0,0,0-3,3V25.5a3,3,0,0,0,3,3h6L18,33l4.5-4.5h6a3,3,0,0,0,3-3V6A3,3,0,0,0,28.5,3ZM21,25.5l-3,3-3-3H7.5V6h21l0,19.5Z"
                fill="#c7c7c7"
              />
            </g>
          </svg>
        </span>
        {(data?.isOtherVendor === "Y" || otherVendorData[0]?.isOtherVendor === "Y") && (
          <div className="ml-3">
            <Image alt="" src={data?.vendorLogo || otherVendorData[0]?.vendorLogo || "/" } width={130} height={50} objectFit="contain" />
          </div>
        )}

        {!(data?.isOtherVendor === "Y") && (
          <p className="text-black-7e text-xs flex flex-col ml-3">
            <span>Seller</span>
            <span className="text-gray-70 font-bold text-sm">{data?.listedBy}</span>
            <span>{data?.listingLocation}</span>
          </p>
        )}
      </div>
    </Fragment>
  );
}

export default SellerDetails;

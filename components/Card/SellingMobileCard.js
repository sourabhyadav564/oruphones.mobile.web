import Image from "next/image";
import Link from "next/link";
import { getDefaultImage, numberWithCommas } from "@/utils/util";

import { useState } from "react";

function SellingMobileCard({ data }) {
  const [Imageerror, setImageerror] = useState(false);
  if (data?.make?.toLowerCase().includes("all")) {
    return (
      <Link href={`/product/models`}>
        <a className="w-full h-full rounded-lg p-4 bg-m-white flex justify-center items-center cardShadow1">
          <p className="block text-primary">{"Show All"}</p>
        </a>
      </Link>
    );
  }

  var type = ["old phone", "used", "refurbished"]

  return (
    <div
      onClick={() => window.open(
        `/product/buy-old-refurbished-used-mobiles/${data?.marketingName.split(" ")[0]}/${data.marketingName}?isOtherVendor=${data?.isOtherVendor}`,
        "_blank"
      )
      }
    >
      <a>
        <div className="grid grid-cols-1 rounded-lg py-2 px-3 bg-m-white cardShadow1">
          <div className="grid grid-cols-1">
            <div className="flex items-baseline my-1">
              <Image quality={25} src={Imageerror ? getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : data?.imagePath || getDefaultImage(data?.marketingName) || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
                onError={() => setImageerror(true)} alt={(`buy ${type[Math.floor((Math.random() * type.length))]} ${data?.marketingName} like new `).toLowerCase()} width={150} height={150} objectFit="contain" />
            </div>
            <div className="flex-wrap w-full text-gray-70">
              <h1 className="flex-1 truncate w-full capitalize font-semibold">{data?.marketingName}</h1>
              <div className="justify-self-end">
                <p className="text-xs">Starting from</p>
                <p className="font-bold flex items-center text-black-4e">
                  {data?.startingFrom && <span className="mr-1">&#x20B9;</span>}
                  {numberWithCommas(data?.startingFrom || "") || <span>&nbsp;</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default SellingMobileCard;

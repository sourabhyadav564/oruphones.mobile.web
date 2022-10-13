import Image from "next/image";
import Link from "next/link";
import { numberWithCommas } from "@/utils/util";
// import Logo from "@/assets/mobiru_logo.svg";

function SellingMobileCard({ data }) {
  if (data?.make?.toLowerCase().includes("all")) {
    return (
      <Link href={`/product/models`}>
        <a className="w-full h-full rounded-lg p-4 bg-m-white flex justify-center items-center cardShadow1">
          <p className="block text-primary">{"Show All"}</p>
        </a>
      </Link>
    );
  }

  return (
    <div
      // href={`/product/buy-old-refurbished-used-mobiles/${data.make}/${data.marketingName}`}
      onClick={() => window.open(
        `/product/buy-old-refurbished-used-mobiles/${data.make}/${data.marketingName}?isOtherVendor=${data?.isOtherVendor}`,
        "_blank"
      )
      }
    >
      <a>
        <div className="grid grid-cols-1 rounded-lg py-2 px-3 bg-m-white cardShadow1">
          <div className="grid grid-cols-1">
            <div className="flex items-baseline my-1">
              <Image src={data?.imagePath || "/"} alt={data?.marketingName} width={150} height={150} objectFit="contain" />
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

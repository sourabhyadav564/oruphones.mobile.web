import Image from "next/image";
import Link from "next/link";
import { numberWithCommas } from "@/utils/util";

function ShopByPriceCard({ data }) {
  return (
    <div
      // href={`/product/buy-old-refurbished-used-mobiles/pricerange/${data?.minPrice}/${data?.maxPrice}`}
      onClick={() => window.open(
        `/product/buy-old-refurbished-used-mobiles/pricerange/${data?.minPrice}/${data?.maxPrice}?isOtherVendor=${data?.isOtherVendor}`,
        "_blank"
      )
      }
    >
      <a>
        <div className="grid grid-cols-1 rounded-md py-2 px-3 bg-white cardShadow1">
          <div className="grid grid-cols-1">
            <div className="flex justify-center my-1">
              <Image src={data?.imagePath} alt={data?.marketingName} width={150} height={150} />
            </div>
            <div className="flex-wrap w-full text-gray-70">
              <h1 className="flex-1 truncate w-full capitalize font-semibold">{data?.marketingName}</h1>
              <p className="justify-self-end font-bold flex items-center text-black-4e">
                {data?.listingPrice && <span className="mr-1">&#x20B9;</span>}
                {numberWithCommas(data?.listingPrice || "")}
              </p>
            </div>
            <div className="py-1 font-bold flex items-center justify-center w-full">
              <p className="flex items-center">
                {data?.minPrice && <span className="mr-1">&#x20B9;</span>} {data?.minPrice}
              </p>
              {data?.maxPrice && <p className="w-4 inline-flex justify-center items-center"> - </p>}
              <p className="flex items-center">
                {data?.maxPrice && <span className="mr-1">&#x20B9;</span>} {data?.maxPrice || <span className="ml-1">+</span>}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ShopByPriceCard;

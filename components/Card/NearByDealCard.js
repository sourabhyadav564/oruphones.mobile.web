import Image from "next/image";
import Link from "next/link";
import { numberWithCommas } from "@/utils/util";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";
import AddFav from "../AddFav";
import VerifiedIcon from "../VerifiedIcon";
import sold_out from "@/assets/soldout.png";

function NearByDealCard({ data, setProducts, prodLink }) {
  if (data?.make?.toLowerCase().includes("all")) {
    return (
      <Link href={`/product/buy-old-refurbished-used-mobiles/bestdealnearyou`}>
        <a className="w-full h-full rounded-md p-4 bg-white flex justify-center items-center cardShadow1">
          <p className="block text-primary">{"Show All"}</p>
        </a>
      </Link>
    );
  }

  return (
    <Link
      href={{
        pathname: `/product/buy-old-refurbished-used-mobiles/${data.make}/${data?.marketingName}/${prodLink ? data?.listingId : ""
          }`,
        query: { isOtherVendor: data?.isOtherVendor },
      }}
    >
      <a>
        <div className="grid grid-cols-1 rounded-md py-2 px-3 bg-m-white cardShadow1">
          <div className="grid grid-cols-1 relative">
            <div className="absolute right-0 flex justify-between items-center w-full z-20">
              <span>
              {data?.status === "Sold_Out" ? <Image
                src={sold_out}
                width={"50"}
                height={"20"}
                objectFit="contain"
              /> : (!(data?.isOtherVendor === "Y") && data?.verified) ? (
                <VerifiedIcon width={45} height={22} />
              ) : <svg height={20} />}
              </span>
              {data?.isOtherVendor === "N" && (
                <AddFav data={data} setProducts={setProducts} />
              )}
            </div>
            <div className="flex justify-center p-2">
              <Image
                src={data?.imagePath || Logo}
                alt={data?.marketingName}
                width={150}
                height={150}
                objectFit="contain"
              />
            </div>
            <div className="flex-wrap w-full text-gray-70">
              <h1 className="flex-1 truncate w-full capitalize font-semibold">
                {data?.marketingName}
              </h1>
              <div
                className="flex flex-wrap justify-between my-1"
                style={{ fontSize: 10 }}
              >
                {data?.deviceStorage && (
                  <p className="mr-1">{data?.deviceStorage}</p>
                )}
                <p>
                  <span>Condition : </span>
                  <span>{data?.deviceCondition || "--"}</span>
                </p>
              </div>
              <p className="font-bold flex items-center text-black-4e">
                {data?.listingPrice && <span className="mr-1">&#x20B9;</span>}
                {numberWithCommas(data?.listingPrice || "")}
              </p>
              <div className="justify-self-end flex justify-between pt-1 text-xs capitalize">
                <span>{data?.listingLocation || "India"}</span>
                <span>{data?.listingDate || "Today"}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default NearByDealCard;

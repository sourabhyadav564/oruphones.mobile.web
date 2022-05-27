import Image from "next/image";
import Link from "next/link";
import { numberWithCommas } from "@/utils/util";
import Logo from "@/assets/mobiru_logo.svg";
// import verified from "@/assets/verified.svg";
import AddFav from "../AddFav";
import VerifiedIcon from "../VerifiedIcon";

function OtherListingCard({ data, setProducts, prodLink }) {

  console.log("data from other listings -->", data);
  if (data?.make?.toLowerCase().includes("all")) {
    return (
      <Link href={`#all-models`}>
        <a className="w-full h-full rounded border p-4 bg-white flex justify-center items-center">
          <p className="block text-primary">{"Show All"}</p>
        </a>
      </Link>
    );
  }

  return (
    <Link
      href={{
        pathname: `/product/listings/${data.make}/${data?.marketingName}/${prodLink ? data?.listingId : ""}`,
        query: prodLink && { isOtherVendor: data?.isOtherVendor },
      }}
    >
      <a className="grid grid-cols-1 h-full rounded-lg relative py-2 px-3 bg-m-white cardShadow1">
        <div className="grid grid-cols-1">
          <div className="absolute px-2 flex z-30 items-center top-0 left-0 right-0 pt-1 justify-between w-full">
            {!(data?.isOtherVendor === "Y") && data?.verified && <VerifiedIcon height={20}/> || <svg height={20}/>}
            <span>{!(data?.isOtherVendor === "Y") && <AddFav data={data} setProducts={setProducts}/>}</span>
          </div>
          <div className="flex justify-center my-2 mt-4 mx-2">
            <Image src={data?.imagePath || Logo} alt={data?.marketingName} width={150} height={150} objectFit="contain" />
          </div>
          <div className="flex-wrap w-full text-gray-70">
            <h1 className="flex-1 truncate w-full capitalize font-semibold">{data?.marketingName}</h1>
            <div className="flex flex-wrap justify-between my-1" style={{fontSize:10}}>
              {data?.deviceStorage && <p className="mr-1">{data?.deviceStorage}</p>}
              <p>
                <span>Condition : </span>
                <span>{data?.deviceCondition || "--"}</span>
              </p>
            </div>
            <p className="font-bold flex items-center text-black-4e">
              {data?.listingPrice && <span className="">&#x20B9;</span>}
              {numberWithCommas(data?.listingPrice || "")}
            </p>
            <div className="justify-self-end flex justify-between pt-1 text-xs capitalize">
              <span className="truncate mr-1">{data?.listingLocation}</span>
              <span>{data?.modifiedDate}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default OtherListingCard;

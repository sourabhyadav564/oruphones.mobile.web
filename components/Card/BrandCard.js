import Link from "next/link";
import Image from "next/image";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";
import BottomNav from "../Navigation/BottomNav";

function BrandCard({ data, className, popup }) {
  if (data?.make.toLowerCase().includes("show")) {
    return (
      <>
        {!popup ? (
          <Link href={`/brands`}>
            <a className="rounded-lg cardShadow1 h-full flex justify-center items-center p-2 text-xs  ">
              <p className="block text-primary ">Show All</p>
            </a>
          </Link>
        ) : (
          // <Link href={`/brands`}>
          <a className="rounded-lg cardShadow1 h-full flex justify-center items-center p-2 text-xs">
            <p className="block text-primary">Show All</p>
          </a>
          // </Link>
        )}
      </>
    );
  }
  return (
    <>
      <div>
        {!popup ? (
          <Link
            href={{ pathname: `/product/buy-old-refurbished-used-mobiles/${data?.make?.toLowerCase()}` }}
          >
            <a
              className={`flex justify-center px-4 py-1   font-Roboto-Regular  ${className || "cardShadow1 rounded-md"
                }`}
            >
              <Image
                src={data?.imagePath || Logo}
                alt={data?.make}
                height={40}
                width={40}
                objectFit="contain"
              />
            </a>
          </Link>
        ) : (
          // <Link href={{ pathname: `/product/buy-old-refurbished-used-mobiles/${data?.make?.toLowerCase()}` }}>
          <a
            className={`h-full  flex justify-center p-2 font-Roboto-Regular ${className || "cardShadow1 rounded-md"
              }`}
          >
            <Image
              src={data?.imagePath || Logo}
              alt={data?.make}
              height={50}
              width={50}
              objectFit="contain"
            />
          </a>
          // </Link>
        )}
      </div>
    </>
  );
}

export default BrandCard;

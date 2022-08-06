import Link from "next/link";
import Image from "next/image";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";

function BrandCard({ data, className, popup }) {
  if (data?.make.toLowerCase().includes("show")) {
    return (
      <>
        {!popup ? (
          <Link href={`/brands`}>
            <a className="rounded-lg cardShadow1 h-full flex justify-center items-center p-2 text-xs">
              <p className="block text-primary">Show All</p>
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
      {!popup ? (
        <Link
          href={{ pathname: `/product/listings/${data?.make?.toLowerCase()}` }}
        >
          <a
            className={`h-full  flex justify-center p-2 ${
              className || "cardShadow1 rounded-lg"
            }`}
          >
            <Image
              src={data?.imagePath || Logo}
              alt={data?.make}
              height={150}
              width={150}
              objectFit="contain"
            />
          </a>
        </Link>
      ) : (
        // <Link href={{ pathname: `/product/listings/${data?.make?.toLowerCase()}` }}>
        <a
          className={`h-full  flex justify-center p-2 ${
            className || "cardShadow1 rounded-lg"
          }`}
        >
          <Image
            src={data?.imagePath || Logo}
            alt={data?.make}
            height={150}
            width={150}
            objectFit="contain"
          />
        </a>
        // </Link>
      )}
    </>
  );
}

export default BrandCard;

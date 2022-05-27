import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/mobiru_logo.svg";

function BrandCard({ data, className }) {
  if (data?.make.toLowerCase().includes("show")) {
    return (
      <Link href={`/brands`}>
        <a className="rounded-lg cardShadow1 h-full flex justify-center items-center p-2 text-xs">
          <p className="block text-primary">Show All</p>
        </a>
      </Link>
    );
  }
  return (
    <Link href={{ pathname: `/product/listings/${data?.make?.toLowerCase()}` }}>
      <a className={`h-full  flex justify-center p-2 ${className || "cardShadow1 rounded-lg"}`}>
        <Image src={data?.imagePath || Logo} alt={data?.make} height={150} width={150} objectFit="contain" />
      </a>
    </Link>
  );
}

export default BrandCard;

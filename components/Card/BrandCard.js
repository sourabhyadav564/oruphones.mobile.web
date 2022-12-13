import Link from "next/link";
import Image from "next/image";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";
import BottomNav from "../Navigation/BottomNav";
import { useRecoilState } from "recoil";
import { makeState } from "atoms/globalState";
import { useState } from "react";

function BrandCard({ data, className, popup }) {

  const [make, setMake] = useRecoilState(makeState);
  const [Imageerror, setImageerror] = useState(false);
  
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
                // src={data?.imagePath || Logo}
                src={Imageerror ? Logo : data?.imagePath || Logo}
                onError={() => setImageerror(true)}
                alt={(`buy online refurbished ${data?.make}`).toLowerCase()}
               onClick={()=>setMake(data?.make)}
                height={45}
                width={45}
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
              // src={data?.imagePath || Logo}
              src={Imageerror ? Logo : data?.imagePath || Logo}
              onError={() => setImageerror(true)}
              alt={(`buy online refurbished ${data?.make}`).toLowerCase()}
              height={45}
              width={45}
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

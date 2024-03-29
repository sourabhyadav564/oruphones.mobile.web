import Link from "next/link";
import Image from "next/image";
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
          <a className="rounded-lg cardShadow1 h-full flex justify-center items-center p-2 text-xs">
            <p className="block text-primary">Show All</p>
          </a>
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
                loading="lazy"
                placeholder="blur"
                priority={false}
                unoptimized={false}
                blurDataURL={Imageerror ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : data?.imagePath || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
                src={Imageerror ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : data?.imagePath || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
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
          <a
            className={`h-full  flex justify-center p-2 font-Roboto-Regular ${className || "cardShadow1 rounded-md"
              }`}
          >
            <Image
              src={Imageerror ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg" : data?.imagePath || "https://d1tl44nezj10jx.cloudfront.net/web/assets/oru_phones_logo.svg"}
              onError={() => setImageerror(true)}
              alt={(`buy online refurbished ${data?.make}`).toLowerCase()}
              height={45}
              width={45}
              objectFit="contain"
            />
          </a>
        )}
      </div>
    </>
  );
}

export default BrandCard;

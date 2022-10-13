import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearchDollar } from "react-icons/fa";
import ShopByPopup from "../Popup/ShopByPopup";
import { useRouter } from "next/router";
import LoadingStatePopup from "../Popup/LoadingStatePopup";

const CategoryCards = ({ data, priceRange }) => {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const [openPriceRange, setOpenPriceRange] = useState(false);

  if (priceRange) {
    return (
      <>
        <div className="w-full md:px-4">
          <div
            className="h-[80px] w-[auto]  flex  justify-center items-center px-2 py-2 cardShadow1 rounded-lg bg-m-white"
            onClick={() => setOpenPriceRange(!openPriceRange)}
          >
            <div className="flex flex-col items-center justify-center">
              <FaSearchDollar className="text-2xl text-black" />
            </div>
          </div>
          <p className="font-Regular text-xs mt-2 text-center" color="#707070">
                Shop By <span>Price</span>
          </p>
          <ShopByPopup open={openPriceRange} setOpen={setOpenPriceRange} />
        </div>
        <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      </>
    );
  }
  return (
    data.imagePath && (
      <>
      <Link
        href={{
          pathname:
            data?.urlPath === "Bestselling"
              ? "/product/models"
              : `/shopby/category/${data?.urlPath?.toLowerCase()}`,
        }}
      >

        <div className="w-full text-center leading-tight md:px-4 ">
        <a
          className={` h-[80px] flex  justify-center cardShadow1 rounded-md `}
          onClick={() => setLoadingState(true)}
        >
          <Image
            src={data?.imagePath}
            alt={data?.make}
            height={40}
            width={40}
            objectFit="contain"
          />
        </a>
        <span className="font-Regular text-[12px] "  style={{color:"#707070"}}>
            {data.text}
        </span>
        </div>
      </Link>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      </>
    )
  );
};

export default CategoryCards;

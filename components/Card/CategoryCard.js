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
        <div>
          <div
            className="h-[100px] w-full flex justify-center items-center px-2 py-2 cardShadow1 rounded-lg bg-m-white"
            onClick={() => setOpenPriceRange(!openPriceRange)}
          >
            <div className="flex flex-col items-center justify-center">
              <FaSearchDollar className="text-2xl text-black" />
              <p className="font-semibold text-black text-xs mt-2 text-center">
                Shop By <br />
                <span>Price</span>
              </p>
            </div>
          </div>
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
        <a
          className={`h-[100px] w-full flex flex-col justify-center items-center p-2 cardShadow1 rounded-lg text-center`}
          onClick={() => setLoadingState(true)}
        >
          <Image
            src={data?.imagePath}
            alt={data?.make}
            height={30}
            width={30}
            objectFit="contain"
          />
          <span className="font-semibold text-black text-xs mt-2">
            {data.text}
          </span>
        </a>
      </Link>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      </>
    )
  );
};

export default CategoryCards;

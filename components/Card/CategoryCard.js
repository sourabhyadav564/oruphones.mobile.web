import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearchDollar } from "react-icons/fa";
import ShopByPopup from "../Popup/ShopByPopup";
import WarrantyByPop from "../Popup/WarrantyByPop";
import { useRouter } from "next/router";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { ShopCategoryHeading } from "../elements/Heading/heading";
import price from "../../assets/price.png"
import warranty from "../../assets/warranty.png"

const CategoryCards = ({ data, priceRange, warrantycard }) => {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const [openPriceRange, setOpenPriceRange] = useState(false);
  const [Openwarrantycard, setOpenWarrantycard] = useState(false);

  if (priceRange) {
    return (
      <>
        <div className="w-full md:px-4">
          <div
            className="h-[71px] w-[71px]  flex  justify-center items-center px-2 py-2 cardShadow1 rounded-lg bg-m-white"
            onClick={() => setOpenPriceRange(!openPriceRange)}
          >
            <div className="h-[41px] flex flex-col items-center justify-center">
              {/* <FaSearchDollar className="text-2xl text-black" /> */}
              <Image
                src={price}
                alt="price"

                objectFit="contain"
              />
            </div>
          </div>
          <p className="font-Roboto-Regular font-bold text-jx text-[#707070] pt-1 pr-5 text-center">
            Shop By <span>Price</span>
          </p>
          <ShopByPopup open={openPriceRange} setOpen={setOpenPriceRange} />

        </div>
        <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      </>
    );
  }

  if (warrantycard) {
    return (
      <>
        <div className="w-full md:px-4">
          <div
            className="h-[71px] w-[71px]  flex  justify-center items-center px-2 py-2 cardShadow1 rounded-lg bg-m-white"
            onClick={() => setOpenWarrantycard(!Openwarrantycard)}
          >
            <div className="h-[41px] flex flex-col items-center justify-center">
              {/* <FaSearchDollar className="text-2xl text-black" /> */}
              <Image
                src={warranty}
                alt="warranty"
                objectFit="contain"
              />
            </div>
          </div>
          <p className="font-Roboto-Regular font-bold text-jx text-[#707070] pt-1 pr-5 text-center">
           Phones with Warranty 
          </p>
          <WarrantyByPop data={data} open={Openwarrantycard} setOpen={setOpenWarrantycard} />
        </div>
        <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      </>
    )
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

          onClick={() => setLoadingState(true)}
        >

          <div className="m-auto items-center justify-center text-center leading-tight ">
            <div
              className="h-[71px] w-[71px]  flex  justify-center items-center px-2 py-2 cardShadow1 rounded-lg bg-m-white"
              onClick={() => setOpenPriceRange(!openPriceRange)}
            >
              <div className="h-[41px] flex flex-col items-center justify-center" onClick={() => setLoadingState(true)}>
                {/* <FaSearchDollar className="text-2xl text-black" /> */}
                <Image
                  src={data?.imagePath}
                  alt={data?.make}
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="text-center pt-1 pr-5">
              <ShopCategoryHeading title={data.text} />
            </div>
          </div>

          {/* <div className="h-[71px] w-[71px] px-2 py-2 text-center leading-tight md:px-4">
          
          <div className="h-[41px] flex m-auto justify-center cardShadow1 " onClick={() => setLoadingState(true)}>
          <Image
            src={data?.imagePath}
            alt={data?.make}  
            objectFit="contain"          
          />
          </div>
        
        
        </div> */}
        </Link>
        <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
      </>
    )
  );
};

export default CategoryCards;

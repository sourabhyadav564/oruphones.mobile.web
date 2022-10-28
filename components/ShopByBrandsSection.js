import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import ShopbymodelCard from "./Card/ShopbymodelCard";
import CarouselWithPagination from "@/components/Carousel/CarouselWithPagination";
import BasicCarousel from "./Carousel/BasicCarousel";
import { getMakeModelLists } from "api-call";
import Cookies from "js-cookie";

const ConditionInfo = dynamic(() => import("@/components/Popup/ConditionInfo"));
const VerificationInfo = dynamic(() => import("@/components/Popup/VerificationInfo"));

function ShopByBrandsSection({ bestDealData, setProducts }) {
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
  console.log("bestDealData", bestDealData);
  const [make, setMake] = useState("");
  const [makeIndex, setMakeIndex] = useState(-1);
  const make2 = JSON.parse(localStorage.getItem("make_models"));
  console.log("make", make);

  // make2.map((item, index) => (
  //   item.make.toString().toLowerCase() == bestDealData.toString().toLowerCase() && setMakeIndex(index)
  // ));

  return (
    <section>
      <BasicCarousel
        slidesPerView={3}
        spaceBetween={4}
      >
        {/* {make2.map((item, index) => (
          (item.make.toString().toLowerCase() == bestDealData.toString().toLowerCase() && <SwiperSlide key={item?.make} >
            {item?.models.map((model, index) => (
              <ShopbymodelCard
                data={model}
              />
            ))}
          </SwiperSlide>)
        ))} */}
      </BasicCarousel>
    </section>
  );
}

export default ShopByBrandsSection;

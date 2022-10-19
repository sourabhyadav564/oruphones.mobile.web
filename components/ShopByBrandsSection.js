import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import ShopbymodelCard from "./Card/ShopbymodelCard";
import CarouselWithPagination from "@/components/Carousel/CarouselWithPagination";
import BasicCarousel from "./Carousel/BasicCarousel";

const ConditionInfo = dynamic(() => import("@/components/Popup/ConditionInfo"));
const VerificationInfo = dynamic(() => import("@/components/Popup/VerificationInfo"));

function ShopByBrandsSection({ bestDealData, setProducts }) {
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
  return (
   <section>
      <BasicCarousel
      slidesPerView={3}
      spaceBetween={4}
      >
        {bestDealData?.map((item) => (
          <SwiperSlide key={item?.make} >
            <ShopbymodelCard
              data={item}
            />
          </SwiperSlide>
        ))}
      </BasicCarousel>
    </section>
  );
}

export default ShopByBrandsSection;

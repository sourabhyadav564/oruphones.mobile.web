import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";

import BestDealCard from "@/components/Card/BestDealCard";
import CarouselWithPagination from "@/components/Carousel/CarouselWithPagination";

const ConditionInfo = dynamic(() => import("@/components/Popup/ConditionInfo"));
const VerificationInfo = dynamic(() => import("@/components/Popup/VerificationInfo"));

function BestDealSection({ bestDealData, setProducts }) {
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
  return (
    <section className="-mx-3 -mt-3">
      <CarouselWithPagination>
        {bestDealData?.map((item) => (
          <SwiperSlide key={item?.listingId} style={{ padding: "0px 12px", paddingTop: "12px" }}>
            <BestDealCard
              data={item}
              setProducts={setProducts}
              openConditionInfo={() => setOpenConditionInfo(true)}
              openVerificationInfo={() => setOpenVerificationInfo(true)}
            />
          </SwiperSlide>
        ))}
      </CarouselWithPagination>
      {openConditionInfo && <ConditionInfo open={openConditionInfo} setOpen={setOpenConditionInfo} />}
      {openVerificationInfo && <VerificationInfo open={openVerificationInfo} setOpen={setOpenVerificationInfo} />}
    </section>
  );
}

export default BestDealSection;

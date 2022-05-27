import React from "react";
import { SwiperSlide } from "swiper/react";
import SellingMobileCard from "../Card/SellingMobileCard";
import BasicCarousel from "../Carousel/BasicCarousel";

function TopSellingMobiles({topSellingModels}) {
  topSellingModels = topSellingModels?.sort((list1, list2) => parseInt(list1.displayOrder) - parseInt(list2.displayOrder));
  var homePageTopSellingModels = topSellingModels?.slice(0,8);
  
  
  return (
    <section className=" text-sm text-gray-70">
      <h1 className="mt-3 mb-2 px-3 font-semibold text-base"> Top Selling Mobiles </h1>
      <BasicCarousel slidesPerView={2.1} spaceBetween={8} style={{ padding: "8px 12px" }}>
        {homePageTopSellingModels &&
          homePageTopSellingModels.map((item) => (
            <SwiperSlide key={item.marketingName} >
              <SellingMobileCard data={item} />
            </SwiperSlide>
          ))}
        <SwiperSlide style={{ height: "auto" }}>
          <SellingMobileCard data={{ make: "Show all" }} />
        </SwiperSlide>
      </BasicCarousel>
    </section>
  );
}

export default TopSellingMobiles;

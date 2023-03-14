import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import ShopbymodelCard from "./Card/ShopbymodelCard";
import CarouselWithPagination from "@/components/Carousel/CarouselWithPagination";
import BasicCarousel from "./Carousel/BasicCarousel";
import { getDefaultImage } from "@/utils/util";
const ConditionInfo = dynamic(() => import("@/components/Popup/ConditionInfo"));
const VerificationInfo = dynamic(() => import("@/components/Popup/VerificationInfo"));

function ShopByBrandsSection({ shopbymodeldata, shopbymakedata, setProducts, index, location }) {
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);
  var type = ["old phone", "used", "refurbished"]

  return (
    <section className="m-auto items-center">
      <BasicCarousel
        slidesPerView={3}
        spaceBetween={1}
      >
        {shopbymodeldata?.map((item) => (
          <SwiperSlide key={item?.make}>
            <ShopbymodelCard
              data={item.replace(/"/g, "")}
              src={getDefaultImage(item.replace(/"/g, ""))}
              alt={`buy ${type[Math.floor((Math.random() * type.length))]} ` + item.replace(/"/g, "")}
              location={location}
              make={shopbymakedata}
            />
          </SwiperSlide>
        ))}
      </BasicCarousel>
    </section>
  );
}

export default ShopByBrandsSection;

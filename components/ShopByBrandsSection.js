import { useState } from "react";
import { SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import ShopbymodelCard from "./Card/ShopbymodelCard";
import CarouselWithPagination from "@/components/Carousel/CarouselWithPagination";
import BasicCarousel from "./Carousel/BasicCarousel";
const ConditionInfo = dynamic(() => import("@/components/Popup/ConditionInfo"));
const VerificationInfo = dynamic(() => import("@/components/Popup/VerificationInfo"));

function ShopByBrandsSection({ shopbymodeldata, setProducts, index, location, brandResult }) {
  const [openConditionInfo, setOpenConditionInfo] = useState(false);
  const [openVerificationInfo, setOpenVerificationInfo] = useState(false);

  console.log("shop by brand section2", shopbymodeldata)

  return (
    <section className="m-auto items-center">
      <BasicCarousel
        slidesPerView={3}
        spaceBetween={1}
      >
        {shopbymodeldata[0].models.map((item) => (
          <SwiperSlide key={item?.make}>
            <ShopbymodelCard
              data={item.marketingname}
              src={`https://zenrodeviceimages.s3.us-west-2.amazonaws.com/mobiru/product/mobiledevices/img/newModels/${item?.marketingname?.toString().toLowerCase().replaceAll(" ", "_")}.jpg`}
              // alt={data?.models?.model_name}
              location={location}
              make={shopbymodeldata[0].make}
            />
          </SwiperSlide>
        ))}
      </BasicCarousel>
    </section>
  );
}

export default ShopByBrandsSection;

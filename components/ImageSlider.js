import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import CarouselWithPagination from "./Carousel/CarouselWithPagination";

function ImageSlider({ images, onClick }) {
  console.log("images from slider", images);
  return (
    <CarouselWithPagination onClick={() => (onClick ? onClick() : "")}>
      {images &&
        images?.map((item, index) => (
          <SwiperSlide key={`${item?.panel}-${index}`}>
            <div className={`max-w-sm mx-auto ${images && images?.length > 1 ? "mb-6" : ""}`}>
              <Image alt={item?.panel} src={item?.fullImage || "/"} width="100" height="80" layout="responsive" objectFit="contain" />
            </div>
          </SwiperSlide>
        ))}
    </CarouselWithPagination>
  );
}

export default ImageSlider;

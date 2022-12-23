import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import CarouselWithPagination from "./Carousel/CarouselWithPagination";
import Logo from "@/assets/oru_phones_logo.png";
import { useState } from "react";

function ImageSlider({ images, onClick }) {
  const [Imageerror, setImageerror] = useState(false);
  return (
    <CarouselWithPagination onClick={() => (onClick ? onClick() : "")}>
      {images &&
        images?.map((item, index) => (
          <SwiperSlide key={`${item?.panel}-${index}`}>
            <div className={`max-w-sm mx-auto ${images && images?.length > 1 ? "mb-6" : ""}`}>
              <Image alt={item?.panel} 
              loading="lazy"
              placeholder="blur"
              priority={false}
              unoptimized={false}
              blurDataURL={Imageerror ? Logo : item?.fullImage || Logo}
              // src={item?.fullImage || Logo} 
              src={Imageerror ? Logo : item?.fullImage|| Logo}
              onError={() => setImageerror(true)}
              width="100" height="80" layout="responsive" objectFit="contain" />
            </div>
          </SwiperSlide>
        ))}
    </CarouselWithPagination>
  );
}

export default ImageSlider;

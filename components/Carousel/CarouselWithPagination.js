import { Swiper } from "swiper/react";
import SwiperCore, { Pagination,Navigation } from "swiper";
import "../../node_modules/swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);


function CarouselWithPagination({ children, ...rest }) {
  return (
    <Swiper
      id="main"
      tag="div"
      wrapperTag="ul"
      pagination={{ clickable: true }}
      modules={[Pagination,Navigation]}
      className="mySwiper "
      {...rest}
    >
      {children}
    </Swiper>
  );
}

export default CarouselWithPagination;

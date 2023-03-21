import { Swiper } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay} from "swiper";
import "../../node_modules/swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);


function CarouselWithPagination({ children, ...rest }) {
  return (
    <Swiper
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
      id="main"
      tag="div"
      wrapperTag="ul"
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation,Autoplay]}
      className="mySwiper "
      {...rest}
    >
      {children}
    </Swiper>
  );
}

export default CarouselWithPagination;

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
      // onInit={(swiper) => console.log("Swiper initialized!", swiper)}
      // onSlideChange={(swiper) => {
      //   console.log("Slide index changed to: ", swiper.activeIndex);
      // }}
      // onReachEnd={() => console.log("Swiper end reached")}
      {...rest}
    >
      {children}
    </Swiper>
  );
}

export default CarouselWithPagination;

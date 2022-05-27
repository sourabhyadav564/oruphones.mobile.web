import { Swiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "../../node_modules/swiper/swiper-bundle.css";

SwiperCore.use([Pagination]);

function CarouselWithPagination({ children, ...rest }) {
  return (
    <Swiper
      id="main"
      tag="div"
      wrapperTag="ul"
      pagination={{ clickable: true }}
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

// import Slider from "react-slick";
import styles from "../../styles/fullimageview.module.css";
// import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import CarouselWithPagination from "../Carousel/CarouselWithPagination";
import { SwiperSlide } from "swiper/react";
import { useEffect } from "react";

// const ArrowLeft = ({ className, currentSlide, slideCount, ...rest }) => (
//   <BiChevronLeft {...rest} className={`fullimage_prev prev ${className}`} size={32} />
// );
// const ArrowRight = ({ className, currentSlide, slideCount, ...rest }) => (
//   <BiChevronRight {...rest} className={`fullimage_next  next ${className}`} size={32} />
// );

function FullImageView({ open, close, images }) {
  if (!open) {
    return null;
  }

  if (!Array.isArray(images)) {
    images = [images];
  }
//     useEffect(() => {
//     const onBackButtonEvent = (e) => {
//         e.preventDefault();
//         setOpen(false);
//     }

//     window.history.pushState(null, null, window.location.pathname);
//     window.addEventListener('popstate', onBackButtonEvent);
//     return () => {
//         window.removeEventListener('popstate', onBackButtonEvent);  
//     };
// });

  return (
    <section className={styles.imageview_container}>
      <div className="w-full h-16 flex justify-end p-4 text-white">
        <div className="flex justify-center items-center bg-white bg-opacity-10 rounded-full w-10 h-10" onClick={() => close()}>
          <MdClose className="cursor-pointer" size={25} />
        </div>
      </div>
      {images && (
        <CarouselWithPagination
          pagination={{
            type: "fraction",
          }}
        >
          {images
            .filter((i) => i.fullImage)
            .map((img, index) => (
              <SwiperSlide key={index} className={styles.image_wrapper}>
                <img src={img?.fullImage} alt={index} style={{ maxWidth: "85%", maxHeight: "75vh" }} />
              </SwiperSlide>
            ))}
        </CarouselWithPagination>
      )}
    </section>
  );
}

export default FullImageView;

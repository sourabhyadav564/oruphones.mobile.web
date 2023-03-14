import styles from "../../styles/fullimageview.module.css";
import Close from "@/assets/cross.svg";
import CarouselWithPagination from "../Carousel/CarouselWithPagination";
import { SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import Image from "next/image";

function FullImageView({ open, close, images }) {
  if (!open) {
    return null;
  }

  if (!Array.isArray(images)) {
    images = [images];
  }

  return (
    <section className={styles.imageview_container}>
      <div className="w-full h-16 flex justify-end p-4 text-white">
        <div className="flex justify-center items-center bg-white bg-opacity-10 rounded-full w-10 h-10" onClick={() => close()}>
          
          <Image src={Close} width={25} height={25}  className="cursor-pointer"/>
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

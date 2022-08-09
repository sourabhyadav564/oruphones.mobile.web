import React from "react";
import CategoryCards from "../Card/CategoryCard";
import bestSelling from "../../assets/cards/bestselling.png";
import likeNew from "../../assets/cards/like_new.png";
import verified from "../../assets/cards/verified.png";
import warranty from "../../assets/cards/warranty.png";
import { SwiperSlide } from "swiper/react";
import BrandCard from "../Card/BrandCard";
import BasicCarousel from "../Carousel/BasicCarousel";

const data = [
  {
    id: 1,
    text: "Bestselling Mobiles",
    imagePath: bestSelling,
    urlPath: "Bestselling",
  },
  {
    id: 3,
    text: "Verified Mobiles Only",
    imagePath: verified,
    urlPath: "Verified",
  },
  {
    id: 2,
    text: "Like New Condition",
    imagePath: likeNew,
    urlPath: "Like New",
  },
  {
    id: 4,
    text: "Phones with Warranty",
    imagePath: warranty,
    urlPath: "Warranty",
  },
];

function ShowBy() {
  return (
    // <section className="container top_brand pt-4">
    //   <Title text="Shop By" />
    //   <Carousel {...settings}>
    //     {data &&
    //       data.map((item, index) => <CategoryCards key={index} data={item} />)}
    //     <CategoryCards priceRange />
    //   </Carousel>
    // </section>
    <section className="text-gray-70">
      <h1 className="mt-3 mb-2 px-3 font-semibold text-based"> Shop By </h1>
      <BasicCarousel
        slidesPerView={3.6}
        spaceBetween={8}
        style={{ padding: "8px 12px" }}
      >
        {data &&
          data.map((item) => (
            <SwiperSlide key={item.make}>
              <CategoryCards data={item} />
            </SwiperSlide>
          ))}
        <SwiperSlide style={{ height: "auto" }}>
          <CategoryCards priceRange />
        </SwiperSlide>
      </BasicCarousel>
    </section>
  );
}

export default ShowBy;

import React, { useEffect, useState } from "react";
import CategoryCards from "../Card/CategoryCard";
import bestSelling from "../../assets/cards/bestselling.png";
import likeNew from "../../assets/cards/like_new.png";
import verified from "../../assets/cards/verified.png";
import warranty from "../../assets/cards/warranty.png";
import { SwiperSlide } from "swiper/react";
import BrandCard from "../Card/BrandCard";
import BasicCarousel from "../Carousel/BasicCarousel";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { useRouter } from "next/router";

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

function ShopBy() {

  return (
    // <section className="container top_brand pt-4">
    //   <Title text="Shop By" />
    //   <Carousel {...settings}>
    //     {data &&
    //       data.map((item, index) => <CategoryCards key={index} data={item} />)}
    //     <CategoryCards priceRange />
    //   </Carousel>
    // </section>
    <section className=" text-gray-70">
      <h1 className="mt-3 mb-2 px-3 pt-2.5 font-Regular text-based text-xs"> Shop by Categories </h1>
      <BasicCarousel
        slidesPerView={4}
        spaceBetween={8}
        style={{ padding: "8px 8px" }}
        
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide key={index} >
              <CategoryCards data={item} />
            </SwiperSlide>
          ))}
        <SwiperSlide
          style={{ height: "auto" }}
        >
          <CategoryCards priceRange />
        </SwiperSlide>
      </BasicCarousel>
    </section>
  );
}

export default ShopBy;

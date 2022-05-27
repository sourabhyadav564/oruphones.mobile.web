import { SwiperSlide } from "swiper/react";
import ArticleCard from "../Card/ArticleCard";
import BasicCarousel from "../Carousel/BasicCarousel";
import image from "@/assets/demo_blog.jpg"

const data = [1, 2, 3, 4, 5, 6];

export default function TopArticles() {
  return (
    <section className=" top_articles mb-6">
      <h1 className="mb-2 mt-3 px-3 font-semibold text-base"> Top Articles</h1>
      <BasicCarousel slidesPerView={2.1} spaceBetween={8} style={{ padding: "8px 12px" }}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <ArticleCard
              title="Refurbished iPhone 11 Tips and Tricks for Scoring the Best Deal"
              // src="https://www.mobiruindia.com/blog/wp-content/uploads/2021/03/1.jpg"
              src={image}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide style={{ height: "auto" }}>
          <ArticleCard viewAll />
        </SwiperSlide>
      </BasicCarousel>
    </section>
  );
}

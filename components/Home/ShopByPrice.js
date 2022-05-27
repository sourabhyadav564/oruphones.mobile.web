import { SwiperSlide } from "swiper/react";
import ShopByPriceCard from "../Card/ShopByPriceCard";
import BasicCarousel from "../Carousel/BasicCarousel";

function ShopByPrice({ fetchShopByPrice }) {
  console.log("fetchShopByPrice ", fetchShopByPrice);
  return (
    <section className=" text-sm text-gray-70">
      <h1 className="mt-3 mb-2 px-3 font-semibold text-base"> Shop By Price </h1>
      <BasicCarousel slidesPerView={2.1} spaceBetween={8} style={{ padding: "8px 12px" }}>
        {fetchShopByPrice &&
          fetchShopByPrice.map((item) => (
            <SwiperSlide key={item.minPrice}>
              <ShopByPriceCard data={item} />
            </SwiperSlide>
          ))}
      </BasicCarousel>
    </section>
  );
}

export default ShopByPrice;

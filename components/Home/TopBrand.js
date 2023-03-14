import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import BrandCard from "../Card/BrandCard";
import BasicCarousel from "../Carousel/BasicCarousel";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { Heading } from "@/components/elements/Heading/heading"

function TopBrand({ brandsList }) {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  brandsList = brandsList?.sort(
    (list1, list2) => list2.isPopular - list1.isPopular
  );
  brandsList = brandsList?.sort(
    (list1, list2) =>
      parseInt(list1.displayOrder) - parseInt(list2.displayOrder)
  );
  var homePagebrandsList = brandsList?.slice(0, 8);

  return (
    <section>
      <Heading title="Shop by Brands" />
      <BasicCarousel
        slidesPerView={4.4}
        spaceBetween={8}
        style={{ padding: "8px" }}
      >
        {homePagebrandsList &&
          homePagebrandsList.map((item) => (
            <SwiperSlide key={item.make} onClick={() => setLoadingState(true)} >
              <BrandCard data={item} />
            </SwiperSlide>
          ))}
        <SwiperSlide
          style={{ height: "auto" }}
          onClick={() => setLoadingState(true)}
        >
          <BrandCard data={{ make: "Show all" }} />
        </SwiperSlide>
      </BasicCarousel>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </section>
  );
}

export default TopBrand;

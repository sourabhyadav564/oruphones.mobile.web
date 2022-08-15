import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import BrandCard from "../Card/BrandCard";
import BasicCarousel from "../Carousel/BasicCarousel";
import LoadingStatePopup from "../Popup/LoadingStatePopup";

function TopBrand({ brandsList }) {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);
  console.log("loading", loadingState);

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
    <section className="text-gray-70">
      <h1 className="mt-3 mb-2 px-3 font-semibold text-based">
        {" "}
        Buy Top Brands{" "}
      </h1>
      <BasicCarousel
        slidesPerView={4.1}
        spaceBetween={8}
        style={{ padding: "8px 12px" }}
      >
        {homePagebrandsList &&
          homePagebrandsList.map((item) => (
            <SwiperSlide key={item.make} onClick={() => setLoadingState(true)}>
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

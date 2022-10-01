import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import CarouselWithPagination from "@/components/Carousel/CarouselWithPagination";
import buyStep from "@/assets/how_to_buy.png";
import sellStep from "@/assets/how_to_sell.png";
import new_buy_sell from "@/assets/new_buy_sell.png";
import articleImage from "@/assets/banner_article_image.png";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingStatePopup from "../Popup/LoadingStatePopup";

const slides = [
  // { name: "GIF", src: bannerssss},
  // { name: "GIF", src: "/GIF_Banner.gif" },
  { name: "GIF", src: new_buy_sell },
  { name: "how_to_sell", link: "#how_to_sell", src: sellStep },
  { name: "how_to_buy", link: "#how_to_buy", src: buyStep },
  {
    name: "article_image",
    link: "https://www.oruphones.com/blog",
    src: articleImage,
  },
];

const TopCarousel = () => {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);
  return (
    // <section>
    //   <CarouselWithPagination slidesPerView={1.1}>
    //     {slides.map((item) => (
    //       <SwiperSlide key={item.name}>
    //         {item.link ? (
    //           <Link href={item.link}>
    //             <a className="flex justify-center">
    //               <Image src={item.src} alt={item.name} width={617} height={309} />
    //             </a>
    //           </Link>
    //         ) : (
    //           <div className="flex justify-center relative">
    //             <div style={{ padding: "2vh 1.5vh 1vh 1.5vh" }}>
    //               {/* <img src={item.src} alt={item.name} className="bannerShadow rounded-lg" /> */}
    //               <video loop autoPlay muted className="rounded-lg">
    //                 <source src={item.src} type="video/mp4" />
    //               </video>
    //             </div>
    //             <div className="absolute left-0 right-0 bottom-4 flex justify-center" style={{ fontSize: 12 }}>
    //               <Link href="/product/buy-old-refurbished-used-mobiles/bestdealnearyou">
    //                 <a className="rounded bg-white px-3 py-1 mr-8 font-bold">Buy Phone</a>
    //               </Link>
    //               <Link href="/sell-old-refurbished-used-mobiles/add">
    //                 <a className="rounded bg-white px-3 py-1 ml-8 font-bold">Sell Phone</a>
    //               </Link>
    //             </div>
    //           </div>
    //         )}
    //       </SwiperSlide>
    //     ))}
    //   </CarouselWithPagination>
    // </section>
    <section>
      <CarouselWithPagination slidesPerView={1}>
        {slides.map((item) => (
          <SwiperSlide key={item.name}>
            {item.link ? (
              <Link href={item.link}>
                <a className="flex justify-center">
                  {item.name != "article_image" ? (
                    <div style={{ padding: "2vh 1.5vh 1vh 1.5vh" }}>
                      <Image
                        src={item.src}
                        alt={item.name}
                        className="rounded-xl"
                      // width={617}
                      // height={309}
                      /></div>
                  ) : (
                    <Link href={item.link}>
                      <div style={{ padding: "2vh 1.5vh 1vh 1.5vh" }}>
                        <img
                          src={articleImage.src}
                          alt={item.name}
                          className="rounded-xl"
                        />
                      </div>
                    </Link>
                  )}
                </a>
              </Link>
            ) : (
              <div className="flex justify-center relative">
                <div style={{ padding: "2vh 1.5vh 1vh 1.5vh" }}>
                  <Image
                    src={item.src}
                    alt={item.name}
                    className="bannerShadow rounded-lg"
                  />
                </div>
                <div
                  className="absolute left-0 right-0 bottom-4 flex justify-center"
                  style={{ fontSize: 10 }}
                >
                  <Link href="/sell-old-refurbished-used-mobiles/add">
                    <a className="rounded-lg bg-yellow-300 px-5 py-2.5 mr-8 font-bold text-[12px]">
                      Sell Phone
                    </a>
                  </Link>
                  <Link href="/product/buy-old-refurbished-used-mobiles/bestdealnearyou">
                    <a
                      className="rounded-lg bg-gray-200 px-5 py-2.5 ml-8 font-bold text-[12px]"
                      onClick={() => setLoadingState(true)}
                    >
                      Buy Phone
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </CarouselWithPagination>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </section>
  );
};

export default TopCarousel;

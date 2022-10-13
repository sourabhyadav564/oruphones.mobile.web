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
          <div key={item.name}>
            {item.link ?
              (
                <div></div>
              ) :
              (
                <div className="flex justify-center relative">
                  <div style={{ padding: "1.5vh 1vh ", margin: "2px 0px 40px 0px" }}>
                    <Image
                      src={item.src}
                      alt={item.name}
                      className="bannerShadow rounded-lg "
                    />
                  </div>
                  <div
                    className="w-full absolute left-0 right-0 md:bottom-16 bottom-0  px-5 flex m-auto justify-center grid grid-cols-2 gap-2 "
                    style={{ fontSize: 10 }}
                  >
                    <div className="w-full flex rounded-md m-auto justify-center" style={{ backgroundColor: "#141929" }}>
                      <Link href="/sell-old-refurbished-used-mobiles/add">
                        <div className="p-4 grid grid-rows-2 h-28">
                          <p className="w-full text-white text-[14px] font-Semibold leading-tight">Sell your phone in few steps</p>
                          <a className="grid  rounded-md border border-none text-center font-Semibold text-[14px] py-2 self-center" style={{ backgroundColor: "#F9C414" }}>
                            <span> Sell Now + </span>
                          </a>
                        </div>
                      </Link>
                    </div>

                    <div className="w-full flex rounded-md shadow-sm shadow-gray-300 my-0.5" style={{ backgroundColor: '#FFFFFF' }}>
                      <Link href="/product/buy-old-refurbished-used-mobiles/bestdealnearyou">
                        <div className="p-4 grid grid-rows-2 h-28 m-auto justify-center">
                          <p className="w-full text-black text-[14px] font-Medium leading-tight">Buy your dream phone in few steps </p>
                          <a
                            className="grid rounded-md text-center font-Semibold text-[14px] py-2 self-center "
                            onClick={() => setLoadingState(true)}
                          >
                            <span className="grid  rounded-md  font-Regular border text-center font-Semibold text-[14px] py-2  self-center" style={{ borderColor: "#11121B" }}> Buy now &gt; </span>
                          </a>
                        </div>
                      </Link>

                    </div>
                  </div>
                </div>
              )}
          </div>
        ))}
      </CarouselWithPagination>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </section>
  );
};

export default TopCarousel;

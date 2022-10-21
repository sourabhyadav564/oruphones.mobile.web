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
import {BannerSellHeading,BannerBuyHeading} from "../elements/Heading/heading";

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
                  <div style={{ margin: "4px 0px 28px 0px" }} className="">
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={"395px"}
                      height={'189px'}
                      className="bannerShadow"
                    />
                  </div>
                  <div
                    className="w-full h-[91px] absolute left-0 right-0 md:bottom-16 bottom-0  px-5  m-auto justify-center grid grid-cols-2 gap-2 "
                    style={{ fontSize: 10 }}
                  >
                    <div className="w-full  flex rounded-md m-auto justify-center bg-gradient-to-r from-[#141929] via-[#313648] to-[#43495C]" >
                      <Link href="/sell-old-refurbished-used-mobiles/add">
                        <div className="px-4 py-2 grid grid-rows-2 h-[91px]">
                          <p className="w-full text-white  leading-tight">
                             <BannerSellHeading title="Sell your phone in few steps"/>
                             
                            </p>
                          <a className="grid h-[27px] py-1 rounded-md border border-none text-center self-center bg-gradient-to-r from-[#F9C414] to-[#FFD95B]">
                            {/* <span> Sell Now + </span> */}
                            <BannerSellHeading title="Sell Now + "/>
                          </a>
                        </div>
                      </Link>
                    </div>

                    <div className="w-full flex rounded-md shadow-sm shadow-gray-300 my-0.5" style={{ backgroundColor: '#FFFFFF' }}>
                      <Link href="/product/buy-old-refurbished-used-mobiles/bestdealnearyou">
                        <div className="p-4 grid grid-rows-2 h-[91px] m-auto justify-center py-2">
                          <p className="w-full text-black text-[14px] font-Medium leading-tight">
                          <BannerSellHeading title=" Buy your dream phone in few steps "/>
                            {/* Buy your dream phone in few steps  */}
                            </p>
                          <a
                            className="grid rounded-md text-center py-1 self-center "
                            onClick={() => setLoadingState(true)}
                          >
                            <span className="grid h-[27px] rounded-md  font-Regular border text-center py-1  self-center" style={{ borderColor: "#11121B" }}> 
                            <BannerBuyHeading title="Buy Now &gt;"/>
                             </span>
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

import Image from "next/image";
import CarouselWithPagination from "@/components/Carousel/CarouselWithPagination";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import {
  BannerSellHeading,
  BannerBuyHeading,
} from "../elements/Heading/heading";
import { SwiperSlide } from "swiper/react";
import LoginPopup from "../Popup/LoginPopup";
import Cookies from "js-cookie";

const slides = [
  {
    name: "GIF",
    link: "#jaja",
    src: "https://d1tl44nezj10jx.cloudfront.net/web/assets/new_buy_sell.svg",
    id: 1,
  },
  {
    name: "article_image",
    link: "https://www.oruphones.com/blog",
    src: "https://d1tl44nezj10jx.cloudfront.net/web/assets/blog_banner.webp",
    id: 2,
  },
  {
    name: "prc_comp_bnr",
    link: "https://www.oruphones.com/services/price-comparison",
    src: "https://d1tl44nezj10jx.cloudfront.net/web/assets/prc_comp_bnr.webp",
    id: 3,
  },
];

const TopCarousel = () => {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [performAction, setPerformAction] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const handleClick = () => {
    if (Cookies.get("userUniqueId") == undefined) {
      setOpenLoginPopup(true);
      setPerformAction(true);
    } else {
      router.push("/services/price-comparison");
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        openLoginPopup == false &&
        performAction == true &&
        Cookies.get("userUniqueId") != undefined
      ) {
        clearInterval(interval);
        router.push("/services/price-comparison");
      }
    }, 1000);
  }, [openLoginPopup]);
  return (
    // <section>
    //   <CarouselWithPagination slidesPerView={1}>
    //     {slides.map((item) => (
    //       <div key={item.name}>
    //         {item.link ?
    //           (
    //             <div></div>
    //           ) :
    //           (
    //             <div className="flex justify-center relative">
    //               <div style={{ margin: "4px 0px 28px 0px" }} className="">
    //                 <Image
    //                   src={item.src}
    //                   alt={item.name}
    //                   width={"420px"}
    //                   height={'179px'}
    //                   className="bannerShadow" data-aos="fade-down"
    //                 />
    //               </div>
    //               <div
    //                 className="w-full h-[91px] mb-1 absolute left-0 right-0 md:bottom-16 bottom-0  px-5   justify-center grid grid-cols-2 gap-2 "
    //                 style={{ fontSize: 10 }}
    //               >
    //                 <div className="w-full flex rounded-[5px] m-auto justify-center bg-gradient-to-r from-[#141929] via-[#313648] to-[#43495C]" data-aos="zoom-out-up">
    //                   <Link href="/sell-old-refurbished-used-mobiles/add">
    //                     <div className="px-4 py-2  rounded-[5px] grid grid-rows-2 h-[91px]" >
    //                       <p className="w-full text-white  leading-tight">
    //                         <BannerSellHeading title="Sell your phone in few steps" />
    //                       </p>
    //                       <a className="grid h-[27px] py-1 rounded-[5px] border border-none text-center self-center bg-gradient-to-r from-[#F9C414] to-[#FFD95B]" onClick={() => setLoadingState(true)}>

    //                         <BannerSellHeading title="Sell Now +" />
    //                       </a>
    //                     </div>
    //                   </Link>
    //                 </div>

    //                 <div className="w-full flex rounded-[5px] shadow-sm shadow-gray-300 my-0.5 bg-gradient-to-r from-[#cbcfdc] via-[#e2e3ea] to-[#fff]" data-aos="zoom-out-up">
    //                   <Link href="/product/buy-old-refurbished-used-mobiles/bestdealnearyou">
    //                     <div className="p-4 grid grid-rows-2 h-[91px] m-auto  justify-center py-2 ">
    //                       <p className="w-full text-black text-ex font-Medium leading-tight">
    //                         <BannerSellHeading title=" Buy your dream phone in few steps " />
    //                       </p>
    //                       <a
    //                         className="grid rounded-[5px] text-center py-1 self-center "
    //                         onClick={() => setLoadingState(true)}
    //                       >
    //                         <span className="grid h-[27px] rounded-md bg-primary  text-white   border border-none pb-6 text-center py-1 self-center">
    //                           <BannerBuyHeading title="Buy Now &gt;" />
    //                         </span>
    //                       </a>
    //                     </div>
    //                   </Link>

    //                 </div>
    //               </div>
    //             </div>
    //           )}
    //       </div>
    //     ))}
    //   </CarouselWithPagination>
    //   <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    // </section>

    <section>
      <CarouselWithPagination
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((item) => (
          <SwiperSlide key={item.name}>
            {item.link && item.id == 1 ? (
              <div className="flex justify-center relative mb-3">
                <div style={{ margin: "4px 0px 28px 0px" }} className="">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={"420px"}
                    height={"179px"}
                    className="bannerShadow"
                    data-aos="fade-down"
                  />
                </div>
                <div
                  className="w-full h-[91px] mb-1 absolute left-0 right-0 md:bottom-16 bottom-0  px-5   justify-center grid grid-cols-2 gap-2 "
                  style={{ fontSize: 10 }}
                >
                  <div
                    className="w-full flex rounded-[5px] m-auto justify-center bg-gradient-to-r from-[#141929] via-[#313648] to-[#43495C]"
                    data-aos="zoom-out-up"
                  >
                    <Link href="/sell-old-refurbished-used-mobiles/add">
                      <div className="px-4 py-2  rounded-[5px] grid grid-rows-2 h-[91px]">
                        <p className="w-full text-white  leading-tight">
                          <BannerSellHeading title="Sell your phone in few steps" />
                        </p>
                        <a
                          className="grid h-[27px] py-1 rounded-[5px] border border-none text-center self-center bg-gradient-to-r from-[#F9C414] to-[#FFD95B]"
                          onClick={() => setLoadingState(true)}
                        >
                          <BannerSellHeading title="Sell Now +" />
                        </a>
                      </div>
                    </Link>
                  </div>

                  <div
                    className="w-full flex rounded-[5px] shadow-sm shadow-gray-300 my-0.5 bg-gradient-to-r from-[#cbcfdc] via-[#e2e3ea] to-[#fff]"
                    data-aos="zoom-out-up"
                  >
                    <Link href="/product/buy-old-refurbished-used-mobiles/bestdealnearyou">
                      <div className="p-4 grid grid-rows-2 h-[91px] m-auto  justify-center py-2 ">
                        <p className="w-full text-black text-ex font-Medium leading-tight">
                          <BannerSellHeading title=" Buy your dream phone in few steps " />
                        </p>
                        <a
                          className="grid rounded-[5px] text-center py-1 self-center "
                          onClick={() => setLoadingState(true)}
                        >
                          <span className="grid h-[27px] rounded-md bg-primary  text-white   border border-none pb-6 text-center py-1 self-center">
                            <BannerBuyHeading title="Buy Now &gt;" />
                          </span>
                        </a>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              // <Link href={item.link}>
              <a className="flex justify-center py-2 relative mix-blend-overlay">
                <img
                  src={item.src}
                  alt={item.name}
                  width={617}
                  height={309}
                  className=""
                ></img>
                <div className="banner_gradient"></div>
                {item.id == 2 && (
                  <div
                    className="w-full absolute left-0 right-0 md:bottom-16 -bottom-2 px-5 flex items-center justify-center"
                    style={{ fontSize: 10 }}
                  >
                    <div
                      className="w-full flex rounded-[5px] h-12 justify-center"
                      data-aos="zoom-out-up"
                    >
                      <Link href={"https://www.oruphones.com/blog"}>
                        <div className="px-4 py-2 rounded-[5px] ">
                          <a
                            className="flex h-7 text-ex font-Roboto-Semibold justify-center py-5 items-center px-12 rounded-[5px] bg-gradient-to-t from-[#d3a97d] to-[#ffffff]"
                            onClick={() => setLoadingState(true)}
                          >
                            {item.id == 2 && <p>VISIT</p>}
                          </a>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
                {item.id == 3 && (
                  <div
                    className="w-full absolute left-0 right-0 md:bottom-16 -bottom-2 px-5 flex items-center justify-center"
                    style={{ fontSize: 10 }}
                  >
                    <div
                      className="w-full flex rounded-[5px] h-12 justify-center "
                      data-aos="zoom-out-up"
                    >
                      <div>
                        <div className="px-4 py-2 rounded-[5px] ">
                          <a
                            className="flex h-7 text-ex font-Roboto-Semibold justify-center py-5 items-center px-12 rounded-[5px] bg-gradient-to-b from-[#FFDe59] to-[#FFDE59]"
                            onClick={() => handleClick()}
                          >
                            {item.id == 3 && <p>COMPARE PRICE</p>}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </a>
              // </Link>
            )}
          </SwiperSlide>
        ))}
      </CarouselWithPagination>
      <LoginPopup open={openLoginPopup} setOpen={setOpenLoginPopup} />
    </section>
  );
};

export default TopCarousel;

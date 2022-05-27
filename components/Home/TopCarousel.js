import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import CarouselWithPagination from "@/components/Carousel/CarouselWithPagination";
import buyStep from "@/assets/how_to_buy.png";
import sellStep from "@/assets/how_to_sell.png";
import Link from "next/link";

const slides = [
  // { name: "GIF", src: bannerssss},
  { name: "GIF", src: "/GIF_Banner.gif" },
  { name: "how_to_sell", link: "#how_to_sell", src: sellStep },
  { name: "how_to_buy", link: "#how_to_buy", src: buyStep },
];

const TopCarousel = () => {
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
    //               <Link href="/product/listings/bestdealnearyou">
    //                 <a className="rounded bg-white px-3 py-1 mr-8 font-bold">Buy Phone</a>
    //               </Link>
    //               <Link href="/sell/add">
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
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={617}
                    height={309}
                  />
                </a>
              </Link>
            ) : (
              <div className="flex justify-center relative">
                <div style={{ padding: "2vh 1.5vh 1vh 1.5vh" }}>
                  <img
                    src={item.src}
                    alt={item.name}
                    className="bannerShadow rounded-lg"
                  />
                </div>
                <div
                  className="absolute left-0 right-0 bottom-2 flex justify-center"
                  style={{ fontSize: 10 }}
                >
                  <Link href="/product/listings/bestdealnearyou">
                    <a className="rounded-xl bg-white px-3 py-2 mr-8 font-bold text-[11px]">
                      Buy Phone
                    </a>
                  </Link>
                  <Link href="/sell/add">
                    <a className="rounded-xl bg-white px-3 py-2 ml-8 font-bold text-[11px]">
                      Sell Phone
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </CarouselWithPagination>
    </section>
  );
};

export default TopCarousel;

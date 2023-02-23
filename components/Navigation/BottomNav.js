import { logEventInfo } from "api-call";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import Services from "../../assets/bottom_icon/Outline.png";
import Home from "../../assets/bottom_icon/Path 66.png";
import MyListings from "../../assets/bottom_icon/to-do-list.png";
import Profile from "../../assets/bottom_icon/user.png";



function BottomNav() {
  const router = useRouter();

  const isActive = (path) => {
    return router && router.pathname === path;
  };

  const logEvent = async () => {
    await logEventInfo("HOME_SELLNOW_SELECTED");
  };

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  return (
    <>
      <div className="pt-24 bg-primary-dark">
        <div
          className="fixed z-50 bottom-0  bg-transparent w-full topShadow text-gray"
          style={{ fontSize: 10 }}
        >
          <div className="container flex justify-between items-end bg-primary-dark pb-3 pt-4 px-6 uppercase rounded-t-xl" >
            <Link href="/" onClick={() => setLoadingState(true)}>
              <a
                aria-current="page"
                className={`flex flex-col items-center   ${isActive("/") ? "text-white font-Roboto-Semibold" : ""
                  } `}
              // onClick={() => setLoadingState(true)}
              >
                <Image src={Home} width={isActive("/") ? 22 : 20} height={isActive("/") ? 22 : 20} alt="ORU home" />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 27 27"
                >
                  <g transform="translate(-28 -782)">
                    <path
                      id="home"
                      d="M18,4.5l11.811,9.45A4.5,4.5,0,0,1,31.5,17.462V28.5a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3V16.741A3,3,0,0,1,5.625,14.4Z"
                      transform="translate(23.5 777.5)"
                      fill={`${isActive("/") ? "transparent" : "transparent"} `}
                    />
                    <path
                      id="home-2"
                      data-name="home"
                      d="M18,8.341l-10.5,8.4V28.5H15v-6h6v6h7.5V17.463a1.5,1.5,0,0,0-.563-1.171ZM18,4.5l11.811,9.45A4.5,4.5,0,0,1,31.5,17.462V28.5a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3V16.741A3,3,0,0,1,5.625,14.4Z"
                      transform="translate(23.5 777.5)"
                      fill={`${isActive("/") ? "#ffffff" : "rgba(172, 172, 172)"
                        } `}
                    />
                  </g>
                </svg> */}
                <span className="mt-1">Home</span>
              </a>
            </Link>
            <Link href="/user/listings" onClick={() => setLoadingState(true)}>
              <a
                className={`flex flex-col items-center ${isActive("/user/listings") ? "text-white font-Roboto-Semibold" : ""
                  } `}

              // onClick={() => setLoadingState(true)}
              >
                <Image src={MyListings} width={isActive("/user/listings") ? 22 : 20} height={isActive("/user/listings") ? 22 : 20} alt="ORU mylistings" />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 27 27"
                >
                  <path
                    id="tag"
                    d="M7.471,22.331l6.2,6.2L28.528,13.67v-6.2h-6.2L7.47,22.331ZM20.229,5.37a2.973,2.973,0,0,1,2.1-.87h6.2A2.971,2.971,0,0,1,31.5,7.471v6.2a2.976,2.976,0,0,1-.87,2.1L15.771,30.63a2.972,2.972,0,0,1-4.2,0l-6.2-6.2a2.972,2.972,0,0,1,0-4.2ZM24,13.5A1.5,1.5,0,1,0,22.5,12,1.5,1.5,0,0,0,24,13.5Z"
                    transform="translate(-4.5 -4.5)"
                    fill="currentColor"
                  />
                </svg> */}

                <span className="mt-1">My Listings</span>
              </a>
            </Link>
            <Link href="/sell-old-refurbished-used-mobiles/add" onClick={() => setLoadingState(true)}>
              <div className="flex flex-col items-center" onClick={logEvent}>
                <a
                  className="relative text-white inline-flex justify-center mb-1.5 "
                  onClick={() => setLoadingState(true)}
                >
                  <div
                    className="absolute bottom-0 p-4 rounded-full bg-[#f9c414] border-4 border-white hover:scale-125 duration-300"
                  // style={{ boxShadow: "0 -5px 20px rgba(16, 203, 165, 0.3)" }}
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="primary"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className=""
                    >
                      <path
                        fillRule="evenodd"
                        d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                      />
                    </svg>
                  </div>
                </a>
                <span className="mt-1">Sell Now </span>
              </div>
            </Link>
            <Link href="/services" onClick={() => setLoadingState(true)}>
              <a
                className={`flex flex-col items-center ${isActive("/services") ? "text-white font-Roboto-Semibold" : " "
                  }`}
              // onClick={() => setLoadingState(true)}
              >
                <div className="absolute ml-8 bg-red text-right rounded-md px-0.5 text-kx text-white">
                  NEW
                </div>
                <Image src={Services} width={isActive("/services") ? 22 : 20} height={isActive("/services") ? 22 : 20} alt="ORU services" />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 31.5 28"
                >
                  <path
                    id="service-desk"
                    d="M31.5,31.956v-2.8c-.01-8.729-5.386-16-12.375-16.73V9.556H22.5v-2.8h-9v2.8h3.375v2.87c-6.989.734-12.365,8-12.375,16.73v2.8H2.25v2.8h31.5v-2.8ZM18,15.156c5.343.009,9.947,4.687,11.023,11.2H6.977c1.076-6.513,5.68-11.191,11.023-11.2Zm-11.25,14h22.5v2.8H6.75Z"
                    transform="translate(-2.25 -6.756)"
                    fill="currentColor"
                  />
                </svg> */}
                <span className="mt-1 font-Roboto-Regular">SERVICES</span>
              </a>
            </Link>
            <Link href="/user/profile" onClick={() => setLoadingState(true)}
            >
              <a
                className={`flex flex-col items-center ${isActive("/user/profile") ? "text-white font-Roboto-Semibold" : " "
                  }`}
              // onClick={() => setLoadingState(true)}
              >
                <Image src={Profile} width={isActive("/user/profile") ? 22 : 20} height={isActive("/user/profile") ? 22 : 20} alt="ORU user profile" />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 27 27"
                >
                  <g id="bx-user" transform="translate(-4.5 -3)">
                    <path
                      id="Path_4"
                      data-name="Path 4"
                      d="M22.5,10.5A4.5,4.5,0,1,1,18,6,4.5,4.5,0,0,1,22.5,10.5Z"
                      fill="none"
                    />
                    <path
                      id="Path_5"
                      data-name="Path 5"
                      d="M18,3a7.5,7.5,0,1,0,7.5,7.5A7.509,7.509,0,0,0,18,3Zm0,12a4.5,4.5,0,1,1,4.5-4.5A4.505,4.505,0,0,1,18,15ZM31.5,31.5V30A10.514,10.514,0,0,0,21,19.5H15A10.513,10.513,0,0,0,4.5,30v1.5h3V30A7.508,7.508,0,0,1,15,22.5h6A7.508,7.508,0,0,1,28.5,30v1.5Z"
                      fill="currentColor"
                    />
                  </g>
                </svg> */}
                <span className="mt-1">Account</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </>
  );
}

export default BottomNav;

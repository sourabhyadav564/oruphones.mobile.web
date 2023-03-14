import { logEventInfo } from "api-call";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingStatePopup from "../Popup/LoadingStatePopup";




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
              >
                <Image src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/bottom_icon/Path66.svg"} width={isActive("/") ? 22 : 20} height={isActive("/") ? 22 : 20} alt="ORU home" />
                <span className="mt-1">Home</span>
              </a>
            </Link>
            <Link href="/user/listings" onClick={() => setLoadingState(true)}>
              <a
                className={`flex flex-col items-center ${isActive("/user/listings") ? "text-white font-Roboto-Semibold" : ""
                  } `}
              >
                <Image src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/bottom_icon/to-do-list.svg"} width={isActive("/user/listings") ? 22 : 20} height={isActive("/user/listings") ? 22 : 20} alt="ORU mylistings" />

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
              >
                <div className="absolute ml-8 bg-red text-right rounded-md px-0.5 text-kx text-white">
                  NEW
                </div>
                <Image src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/bottom_icon/Outline.svg"} width={isActive("/services") ? 22 : 20} height={isActive("/services") ? 22 : 20} alt="ORU services" />
                <span className="mt-1 font-Roboto-Regular">SERVICES</span>
              </a>
            </Link>
            <Link href="/user/profile" onClick={() => setLoadingState(true)}
            >
              <a
                className={`flex flex-col items-center ${isActive("/user/profile") ? "text-white font-Roboto-Semibold" : " "
                  }`}
              >
                <Image src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/bottom_icon/user.svg"} width={isActive("/user/profile") ? 22 : 20} height={isActive("/user/profile") ? 22 : 20} alt="ORU user profile" />
               
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

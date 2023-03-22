import Image from "next/image";
import Link from "next/link";
import LocationPopup from "../Popup/LocationPopup";
import { useEffect, useState } from "react";
import { useAuthState } from "providers/AuthProvider";
import Sidebar from "../Popup/Sidebar";
import { useRouter } from "next/router";
import LocationPicker from "../Popup/LocationPicker";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { getAllNotificationByUserd, getSessionId } from "api-call";
import Cookies from "js-cookie";

function GlobalHeader() {
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { selectedSearchCity, authenticated } = useAuthState();
  const router = useRouter();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(-1);
  const [loadingState, setLoadingState] = useState(false);
  const currentTime = new Date().getTime();
  let BetweenTime = currentTime - Cookies.get("CloseClick");

  useEffect(async () => {
    if (unreadNotificationsCount == -1 && Cookies.get("userUniqueId"))
      await getAllNotificationByUserd(
        Cookies.get("userUniqueId"),
        Cookies.get("sessionId")
      ).then((response) => {
        setUnreadNotificationsCount(response?.dataObject?.unReadCount);
      });
  });

  useEffect(() => {
    if (Cookies.get("sessionId") == undefined) {
      getSessionId(Cookies.get("sessionId")).then((response) => {
        Cookies.set("sessionId", response?.dataObject?.sessionId);
        localStorage.setItem("sessionId", response?.dataObject?.sessionId);
      });
    }
  }, []);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  useEffect(() => {
    BetweenTime = currentTime - Cookies.get("CloseClick");
  }, []);

  return (
    <header className=" bg-primary text-white  flex justify-between items-center sticky top-0 z-50">
      {(router.pathname === "/" ||
        router.pathname ===
          "/product/buy-old-refurbished-used-mobiles/[makeName]" ||
        router.pathname ===
          "/product/buy-old-refurbished-used-mobiles/[makeName]/[modelName]" ||
        router.pathname ===
          "/product/buy-old-refurbished-used-mobiles/pricerange/[min]/[max]" ||
        router.pathname === "/brands" ||
        router.pathname.includes("shopby") ||
        router.pathname ===
          "/product/buy-old-refurbished-used-mobiles/bestdealnearyou" ||
        router.pathname ===
          "/product/buy-old-refurbished-used-mobiles/searchBar" ||
        router.pathname === "/product/models") && (
        <div className="w-full flex flex-1 justify-between px-4 py-2.5">
          <div className="w-44 space-x-6 flex items-center">
            <Image
              onClick={() => setOpenSidebar(true)}
              src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/menu-icon.svg"}
              width={26}
              height={19}
              className="cursor-pointer"
              priority
              alt="ORU Refurbished Phone"
            />
            <Link href="/">
              <a className="flex items-center">
                <Image
                  src={
                    "https://d1tl44nezj10jx.cloudfront.net/web/assets/logo_white.svg"
                  }
                  width={73}
                  height={33}
                  priority
                  objectFit="contain"
                  alt="ORU image"
                />
              </a>
            </Link>
          </div>
          <div className="w-full flex justify-end items-center ">
            <div
              className="flex  items-center  cursor-pointer space-x-1"
              onClick={() => setOpenLocationPopup(true)}
            >
              <span className="truncate underline font-extrathin text-jx">
                {selectedSearchCity}
              </span>
              <img
                src={
                  "https://d1tl44nezj10jx.cloudfront.net/web/assets/map-marker.svg"
                }
                width={12}
                height={12}
                alt="ORU location"
              />
            </div>
            <div>
              {(router.pathname === "/" ||
                router.pathname ===
                  "/product/buy-old-refurbished-used-mobiles/[makeName]" ||
                router.pathname ===
                  "/product/buy-old-refurbished-used-mobiles/[makeName]/[modelName]" ||
                router.pathname ===
                  "/product/buy-old-refurbished-used-mobiles/pricerange/[min]/[max]" ||
                router.pathname === "/brands" ||
                router.pathname.includes("shopby") ||
                router.pathname ===
                  "/product/buy-old-refurbished-used-mobiles/searchBar" ||
                router.pathname ===
                  "/product/buy-old-refurbished-used-mobiles/bestdealnearyou" ||
                router.pathname === "/product/models") && (
                <Link href="/user/notification">
                  <div>
                    <a
                      className="flex ml-4"
                      onClick={() => setLoadingState(true)}
                    >
                      <Image
                        src={
                          "https://d1tl44nezj10jx.cloudfront.net/web/assets/bell-dot.svg"
                        }
                        width={18}
                        height={18}
                        priority
                        objectFit="contain"
                        alt="ORU notification icon"
                      />
                    </a>
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute top-3 bg-yellow-fb w-6 text-lx right-1 text-primary font-Roboto-Bold rounded-full flex items-center justify-center">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      <LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
      {(BetweenTime > 14400000 || !Cookies.get("CloseClick")) && (
        <LocationPicker
          openLocationPopup={() => {
            setOpenLocationPopup(true);
          }}
        />
      )}
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </header>
  );
}

export default GlobalHeader;

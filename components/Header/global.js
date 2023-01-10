import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo_white.svg";
import menu from "@/assets/menu-icon.svg";
import bellDot from "@/assets/bell-dot.svg";
import dropdown from "@/assets/drop-down.svg";
import location from "@/assets/map-marker.svg";
import LocationPopup from "../Popup/LocationPopup";
import { useEffect, useState } from "react";
import { useAuthState } from "providers/AuthProvider";
import Sidebar from "../Popup/Sidebar";
import { useRouter } from "next/router";
import LocationPicker from "../Popup/LocationPicker";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { getAllNotificationByUserd } from "api-call";
import Cookies from "js-cookie";

function GlobalHeader() {
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const [notification, setNotifications] = useState();
  const [openSidebar, setOpenSidebar] = useState(false);
  const { selectedSearchCity, authenticated } = useAuthState();
  const router = useRouter();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState("O");
  const [loadingState, setLoadingState] = useState(false);

  useEffect(async () => {
    if (unreadNotificationsCount == "O")
      await getAllNotificationByUserd(Cookies.get("userUniqueId")).then(
        (response) => {
          setNotifications(response?.dataObject?.notifications);
          setUnreadNotificationsCount(response?.dataObject?.unReadCount);
        }
      );
  });

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

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
              src={menu}
              width={26}
              height={19}
              className="cursor-pointer"
              priority
              alt="ORU Refurbished Phone"
            />
            <Link href="/">
              <a
                className="flex items-center"
                // onClick={() => setLoadingState(true)}
              >
                <Image
                  src={logo}
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
                src={location.src}
                width={12}
                height={12}
                alt="ORU location"
              />
              {/* <img src={dropdown.src} width={12} height={12} /> */}
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
                  <a
                    className="flex ml-4"
                    onClick={() => setLoadingState(true)}
                  >
                    <Image
                      src={bellDot}
                      width={18}
                      height={18}
                      priority
                      objectFit="contain"
                      alt="ORU notification icon"
                    />
                  </a>
                </Link>
              )}
              {
                <span className="absolute top-3 bg-yellow-fb w-6 text-lx right-1 text-primary font-Roboto-Bold rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              }
            </div>
          </div>
        </div>
      )}
      <LocationPopup open={openLocationPopup} setOpen={setOpenLocationPopup} />
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
      <LocationPicker openLocationPopup={() => setOpenLocationPopup(true)} />
      <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
    </header>
  );
}

export default GlobalHeader;

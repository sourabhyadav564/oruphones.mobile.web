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

function GlobalHeader() {
  const [openLocationPopup, setOpenLocationPopup] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { selectedSearchCity, authenticated } = useAuthState();
  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  return (
    <header className=" bg-primary text-white  flex justify-between items-center sticky top-0 z-50">
      {(router.pathname === "/" ||
        router.pathname === "/product/buy-old-refurbished-used-mobiles/[makeName]" ||
        router.pathname === "/product/buy-old-refurbished-used-mobiles/[makeName]/[modelName]" ||
        router.pathname === "/product/buy-old-refurbished-used-mobiles/pricerange/[min]/[max]" ||
        router.pathname.includes("shopby") ||
        router.pathname === "/product/buy-old-refurbished-used-mobiles/bestdealnearyou" ||
        router.pathname === "/product/models") && (
          <div className="flex flex-1 justify-between px-4 py-2 ">
            <div className="w-44 space-x-6 flex items-center">
              <Image
                onClick={() => setOpenSidebar(true)}
                src={menu}
                width={26}
                height={19}
                className="cursor-pointer"
                priority
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
                  />
                </a>
              </Link>

            </div>
            <div className="flex items-center cursor-pointer flex-shrink-0">
              <div
                className="flex justify-end items-center w-[100px] cursor-pointer space-x-1"
                onClick={() => setOpenLocationPopup(true)}
              >
                <span className="truncate underline font-extrathin text-[12px]" >{selectedSearchCity}</span>
                <img src={location.src} width={12} height={12} />
                {/* <img src={dropdown.src} width={12} height={12} /> */}
              </div>
              {router.pathname === "/" && authenticated && (
                <Link href="/user/notification">
                  <a
                    className="flex-shrink-0 ml-4 flex items-center"
                    onClick={() => setLoadingState(true)}
                  >
                    <Image
                      src={bellDot}
                      width={18}
                      height={18}
                      priority
                      objectFit="contain"
                    />
                  </a>
                </Link>
              )}
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

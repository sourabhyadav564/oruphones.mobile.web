import { Fragment, useState } from "react";
import { useAuthState, useAuthDispatch } from "providers/AuthProvider";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import Close from "@/assets/close.svg";
import Cookies from "js-cookie";
import Image from "next/image";



function Header1() {
  const { selectedSearchCity, user } = useAuthState();
  const dispatch = useAuthDispatch();
  const [buttonRef, setButtonRef] = useState(false);

  const [userName, setUserName] = useState("Guest");
  const [AppSrcIs, setAppSrcIs] = useState();
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    Cookies.set("DownloadBtnRef", true);
  };

  useEffect(() => {
    if (Cookies.get("DownloadBtnRef") === "true") {
      setShow(false);
    }

    if (user != null) {
      const searchLoc = user?.address?.filter((items) => {
        return items.addressType === "SearchLocation";
      });
      setUserName(user.userdetails.userName === null ? "User" : user?.userdetails?.userName);
      if (searchLoc && searchLoc.length > 0) {
        dispatch("ADDCITY", searchLoc[0]?.city);
      }
    } else {
      setUserName("Guest");
    }
  }, [user]);


  useEffect(() => {
    if (navigator.platform === 'iPhone') {
      setAppSrcIs("https://apps.apple.com/dk/app/oruphones/id1629378420");
    } else {
      setAppSrcIs("https://play.google.com/store/apps/details?id=com.oruphones.oru");
    }
  })

  return (
    <>

      <div className="justify-between items-center w-full py-1  px-2 text-sm font-medium bg-primary text-white sticky top-12 z-50 rounded-b-xl" data-aos="fade-down">
        {show ?
          <div className="relative flex   bg-yellow-400 w-full  text-white py-1 my-1  rounded-sm  items-center  px-3" >
            <a href={AppSrcIs} className="text-mx  text-primary font-Roboto-semibold flex-1 opacity-70 ">Download ORUphones App for better experience</a>
            <p onClick={handleClose} className="text-mx pt-1.5">
              <Image src={Close} width={20} height={20} className=" opacity-50"/>
              </p>
          </div> : <div></div>
        }
        <SearchBar />
      </div>
    </>
  );
}

export default Header1;
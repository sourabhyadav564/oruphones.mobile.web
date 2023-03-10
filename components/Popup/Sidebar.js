import ChevronLeft from "@/assets/chevronleft.svg"
import ArrowLeft from "@/assets/leftarrow.svg"
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Logout from "@/assets/logout.svg";
import OutLineInfoCircle from "@/assets/alert1.svg";
import QuestionCircle from "@/assets/question.svg";
import LoginIcon from "@/assets/login.svg";


import Link from "next/link";
import { useAuthState, useAuthDispatch } from "providers/AuthProvider";
import router from "next/router";
import HeartBlack from "@/assets/heart_black.svg";
import SellNowIconPopup from "@/components/Popup/SellNowIconPopup";
import BuyNowIconPopup from "./BuyNowIconPopup";
import OruGuidePopup from "./OruGuidePopup";

function Sidebar({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const { authenticated, user } = useAuthState();
  const dispatch = useAuthDispatch();
  const [userName, setUserName] = useState("Guest");
  const [opensellnowpopup, setOpensellnowpopup] = useState(false);
  const [openbuynowpopup, setOpenbuynowpopup] = useState(false);
  const [openOruGuidePopup, setOpenOruGuidePopup] = useState(false);

  // useEffect(() => {
  //   if (open) {
  //     const onBackButtonEvent = (e) => {
  //       e.preventDefault();
  //       setOpen(false);
  //     }

  //     window.history.pushState(null, null, window.location.pathname);
  //     window.addEventListener('popstate', onBackButtonEvent);
  //     return () => {
  //       window.removeEventListener('popstate', onBackButtonEvent);
  //     };
  // } else {
  //   const onBackButtonEvent = (e) => {
  //     e.preventDefault();
  //     window.history.back();
  //   }
  //   window.history.pushState(null, null, window.location.pathname);
  //   window.addEventListener('popstate', onBackButtonEvent);
  //   return () => {
  //     window.removeEventListener('popstate', onBackButtonEvent);
  //   };
  //   }
  // }, [open]);

  useEffect(() => {
    if (authenticated && user != null) {
      setUserName(user.userdetails.userName || "User");
    } else {
      setUserName("Guest");
    }
  }, [user]);

  function handleClick() {
    setOpen(false);
    if (authenticated && user != null) {
      router.push("/user/profile");
    } else {
      router.push("/login");
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 top-0 left-0 w-10/12 h-full max-w-xs"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="-translate-x-10"
          enterTo="translate-x-0"
          leave="ease-in duration-100"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-10"
        >
          <div className="flex flex-col w-full h-full max-h-screen bg-white overflow-hidden shadow-xl transform transition-all">
              <div className="p-4  bg-green-light text-white rounded-b-2xl">
              {/* <FiChevronLeft
                className="ml-auto text-lg item-center "
                onClick={() => setOpen(false)}
              /> */}
              <div className="flex justify-end">
              <Image src={ArrowLeft} width={15} height={15} className="ml-auto text-lg item-center flex " onClick={() => setOpen(false)}/>
              </div>
              <div
                className="flex items-center px-4 py-2"
                onClick={handleClick}
              >
                <div className="border-2 border-white mr-3 rounded-full p-1">
                  <div
                    className={`w-4 h-4 p-3 rounded-full  relative  ${
                      user?.userdetails?.profilePicPath ? "bg-white" : ""
                    }`}
                  >
                    <Image
                      src={user?.userdetails?.profilePicPath || "https://d1tl44nezj10jx.cloudfront.net/web/assets/icons/avatar.svg"}
                      objectFit="contain"
                      alt="ORU user"
                      layout="fill"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-Roboto-Semibold text-dx">{userName}</h2>
                  {user?.userdetails?.createdDate && (
                    <p className="text-bx font-Roboto-Light text-gray-300">
                      Joined On {user?.userdetails?.createdDate}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <ul className="mt-6 mb-4 text-black-4e flex flex-col flex-1 pr-5 font-Roboto-Regular text-mx">
              <ListItem
                href={authenticated ? "/user/favourites" : "/login"}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <div className="w-full flex gap-2 border-b pb-3">
                  {/* <MdOutlineFavoriteBorder size={20} className="self-center" /> */}
                  <Image src={HeartBlack} width={20} height={20}  className="self-center"/>
                  <p className="self-center flex-1 font-Roboto-Regular">
                    {" "}
                    My Favorites
                  </p>
                  {/* <FiChevronLeft className="rotate-180 -mr-2 self-center" /> */}
                  <span className="-mr-2">
                  <Image src={ChevronLeft} width={15} height={15} className="rotate-180  self-center"  />
                  </span>
                  <hr />
                </div>
              </ListItem>

              <ListItem
                href="/about-us"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <div className="w-full flex gap-2 border-b pb-3">
                  {/* <AiOutlineInfoCircle size={20} className="self-center" /> */}
                  <Image src={OutLineInfoCircle} width={20} height={20} className="self-center"/>
                  <p className="self-center flex-1 font-Roboto-Regular">
                    {" "}
                    About us
                  </p>
                  {/* <FiChevronLeft className="rotate-180 self-center" /> */}
                  <Image src={ChevronLeft} width={15} height={15} className="rotate-180  self-center"  />
                </div>
              </ListItem>
              <ListItem
                href="/faq"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <div className="w-full flex gap-2 border-b pb-3">
                  {/* <AiOutlineQuestionCircle size={20} className="self-center" /> */}
                  <Image src={QuestionCircle} width={20} height={20} className="self-center"/>
                  <p className="self-center flex-1  font-Roboto-Regular">
                    {" "}
                    FAQs
                  </p>
                  {/* <FiChevronLeft className="rotate-180 self-center" /> */}
                  <Image src={ChevronLeft} width={15} height={15} className="rotate-180 self-center"  />
                </div>
              </ListItem>
              <div className="mt-auto border-t ml-2 ">
                {authenticated ? (
                  <>
                    <ListItem
                      href=""
                      onClick={() => {
                        setOpensellnowpopup(true);
                      }}
                    >
                      {/* <div className="w-full flex gap-2 border-b pb-3"> */}
                        {/* <AiOutlineInfoCircle size={20} className="self-center" /> */}
                        {/* <p className="self-center flex-1 font-Roboto-Regular">
                          How to sell
                        </p> */}
                        {/* <FiChevronLeft className="rotate-180 self-center" /> */}
                      {/* </div> */}
                    </ListItem>
                    <div className="flex justify-between">
                      <ListItem
                        href=""
                        onClick={() => {
                          setOpensellnowpopup(true);
                        }}
                      >
                        <div className="w-full flex gap-2 pb-3 flex-col">
                          <Image
                            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell.svg"}
                            alt="Sell"
                            width={20}
                            height={50}
                            className="self-center"
                           />
                          {/* <AiOutlineInfoCircle size={20} className="self-center" /> */}
                          <p className="self-center flex-1 font-Roboto-Semibold">
                            How to sell
                          </p>
                          {/* <FiChevronLeft className="rotate-180 self-center" /> */}
                        </div>
                      </ListItem>
                      <ListItem
                        href=""
                        onClick={() => {
                          setOpenbuynowpopup(true);
                        }}
                      >
                        <div className="w-full flex gap-2 pb-3 flex-col">
                          <Image
                          src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy.svg"}
                          alt="Buy"
                          width={20}
                          height={50}
                          />
                          {/* <AiOutlineInfoCircle size={20} className="self-center" /> */}
                          <p className="self-center flex-1 font-Roboto-Semibold">
                            How to buy
                          </p>
                          {/* <FiChevronLeft className="rotate-180 self-center" /> */}
                        </div>
                      </ListItem>
                      <ListItem
                        href=""
                        onClick={() => {
                          setOpenOruGuidePopup(true);
                        }}
                      >
                        <div className="w-full flex gap-2 pb-3 flex-col">
                          <Image
                          src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/Book.svg"}
                          alt="OruGuide"
                          width={22}
                          height={52}
                          />
                          {/* <AiOutlineInfoCircle size={20} className="self-center" /> */}
                          <p className="self-center flex-1 font-Roboto-Semibold">
                            Oru Guide
                          </p>
                          {/* <FiChevronLeft className="rotate-180 self-center" /> */}
                        </div>
                      </ListItem>
                    </div>
                    <ListItem
                      href="/login"
                      onClick={() => {
                        dispatch("LOGOUT");
                        setOpen(false);
                      }}
                    >
                      <div className="flex gap-2 -pl-4 pt-2 font-Roboto-Regular">
                        {/* <AiOutlineLogout size={20} className="self-center" />{" "} */}
                        <Image src={Logout} width={20} height={20} className="self-center"/> {" "}
                        <p>Logout</p>
                      </div>
                    </ListItem>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <ListItem
                        href=""
                        onClick={() => {
                          setOpensellnowpopup(true);
                        }}
                      >
                        <div className="w-full flex gap-2 pb-3 flex-col">
                          <Image
                            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell.svg"}
                            alt="Sell"
                            width={20}
                            height={50}
                            className="self-center"
                           />
                          {/* <AiOutlineInfoCircle size={20} className="self-center" /> */}
                          <p className="self-center flex-1 font-Roboto-Semibold">
                            How to sell
                          </p>
                          {/* <FiChevronLeft className="rotate-180 self-center" /> */}
                        </div>
                      </ListItem>
                      <ListItem
                        href=""
                        onClick={() => {
                          setOpenbuynowpopup(true);
                        }}
                      >
                        <div className="w-full flex gap-2 pb-3 flex-col">
                          <Image
                          src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy.svg"}
                          alt="Buy"
                          width={20}
                          height={50}
                          />
                          {/* <AiOutlineInfoCircle size={20} className="self-center" /> */}
                          <p className="self-center flex-1 font-Roboto-Semibold">
                            How to buy
                          </p>
                          {/* <FiChevronLeft className="rotate-180 self-center" /> */}
                        </div>
                      </ListItem>
                      <ListItem
                        href=""
                        onClick={() => {
                          setOpenOruGuidePopup(true);
                        }}
                      >
                        <div className="w-full flex gap-2 pb-3 flex-col">
                          <Image
                          src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/Book.svg"}
                          alt="OruGuide"
                          width={22}
                          height={52}
                          />
                          {/* <AiOutlineInfoCircle size={20} className="self-center" /> */}
                          <p className="self-center flex-1 font-Roboto-Semibold">
                            Oru Guide
                          </p>
                          {/* <FiChevronLeft className="rotate-180 self-center" /> */}
                        </div>
                      </ListItem>
                    </div>
                    <ListItem href="/login">
                      <div className="flex gap-2 -pl-4 pt-2 font-Roboto-Regular">
                        {/* <AiOutlineLogin size={20} />  */}
                        <Image src={LoginIcon} width={15} height={15}/>
                         <p>Sign In</p>
                      </div>
                    </ListItem>
                  </>
                )}
              </div>
            </ul>
          </div>
        </Transition.Child>
        <SellNowIconPopup
          open={opensellnowpopup}
          setOpen={setOpensellnowpopup}
        />
        <BuyNowIconPopup open={openbuynowpopup} setOpen={setOpenbuynowpopup} />
        <OruGuidePopup open={openOruGuidePopup} setOpen={setOpenOruGuidePopup} />
      </Dialog>
    </Transition.Root>
  );
}

export default Sidebar;

const ListItem = ({ children, href, onClick }) => (
  <li className="last:mt-auto " onClick={onClick}>
    <Link href={href}>
      <a className="pl-4 mb-2 py-2 hover:bg-gray-ef border-l-2 border-transparent hover:border-primary flex items-center space-x-2 ">
        {children}
      </a>
    </Link>
  </li>
);

import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";
import { Header4Heading } from "../elements/Heading/heading";

// import {
//   otherVendorDataState
// } from "../../atoms/globalState";
// import { useResetRecoilState, useRecoilState } from "recoil";

function Header4({ title, className, children, setOpen }) {
  const router = useRouter();
  // const resetState = useResetRecoilState(otherVendorDataState);
  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  return (
    <header className={`flex p-4 py-[14px] bg-[#2C2F45]   rounded-b-xl text-white items-center text-lg relative ${className || " text-white"}`}>
      {setOpen ? (
        <BsArrowLeft onClick={() => setOpen(false)} className="cursor-pointer" fontSize="14" />
      ) : (
        // router.pathname !== "/" && <FiChevronLeft onClick={() => {router.back(); setProductsData([]);}} className="cursor-pointer" fontSize="22" />
        router.pathname !== "/" && <BsArrowLeft onClick={() => { router.back() }} className="cursor-pointer" fontSize="22" />
      )}
      <span className="m-auto justify-center">
        {title && <Header4Heading title={title} />}
        {/*  <span className="   m-auto justify-center font-Regular text-dx"> {title}</span> */}
        {children}
      </span>
    </header>
  );
}

export default Header4;

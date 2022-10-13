import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";

// import {
//   otherVendorDataState
// } from "../../atoms/globalState";
// import { useResetRecoilState, useRecoilState } from "recoil";

function Header4({ title, className, children, setOpen }) {
  const router = useRouter();
  // const resetState = useResetRecoilState(otherVendorDataState);
  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  return (
    <header className={`flex p-4 py-3 bg-[#2C2F45] rounded-b-xl text-white items-center text-lg relative ${className || " text-white"}`}>
      {setOpen ? (
        <BsArrowLeft onClick={() => setOpen(false)} className="cursor-pointer" fontSize="14" />
      ) : (
        // router.pathname !== "/" && <FiChevronLeft onClick={() => {router.back(); setProductsData([]);}} className="cursor-pointer" fontSize="22" />
        router.pathname !== "/" && <BsArrowLeft onClick={() => { router.back() }} className="cursor-pointer" fontSize="22" />
      )}
      {title && <span className="   m-auto justify-center font-Regular text-[15px]"> {title}</span>}
      {children}
    </header>
  );
}

export default Header4;

import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";

// import {
//   otherVendorDataState
// } from "../../atoms/globalState";
// import { useResetRecoilState, useRecoilState } from "recoil";

function Header2({ title, className, children, setOpen }) {
  const router = useRouter();
  // const resetState = useResetRecoilState(otherVendorDataState);
  // const [product, setProductsData] = useRecoilState(otherVendorDataState);
  
  return (
    <header className={`flex p-4 justify-between items-center text-lg relative ${className || "bg-gray-ef text-black-4e"}`}>
      {setOpen ? (
        <FiChevronLeft onClick={() => setOpen(false)} className="cursor-pointer" fontSize="22" />
      ) : (
        // router.pathname !== "/" && <FiChevronLeft onClick={() => {router.back(); setProductsData([]);}} className="cursor-pointer" fontSize="22" />
        router.pathname !== "/" && <FiChevronLeft onClick={() => {router.back()}} className="cursor-pointer" fontSize="22" />
      )}
      {title && <span className="absolute text-center left-10 right-10 font-semibold"> {title} </span>}
      {children}
    </header>
  );
}

export default Header2;

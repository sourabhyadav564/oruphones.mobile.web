import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";

// import {
//   otherVendorDataState
// } from "../../atoms/globalState";
// import { useResetRecoilState, useRecoilState } from "recoil";

function Header2({ title, className, children, setOpen }) {
  const router = useRouter();
  // const resetState = useResetRecoilState(otherVendorDataState);
  // const [product, setProductsData] = useRecoilState(otherVendorDataState);

  return (
    <header className={`flex p-4 h-[45px] bg-[#2C2F45] rounded-b-[10px] text-white items-center  font-Roboto-Regular text-[15px] relative ${className || " text-white"}`}>
      {setOpen ? (
        <BsArrowLeft onClick={() => setOpen(false)} className="cursor-pointer" fontSize="15" />
      ) : (
        // router.pathname !== "/" && <FiChevronLeft onClick={() => {router.back(); setProductsData([]);}} className="cursor-pointer" fontSize="22" />
        router.pathname !== "/"
        && <BsArrowLeft
          onClick={() => {
            window.close()
            // router.back()
          }}
          className="cursor-pointer" fontSize="20" />
      )}
      {title && <span className="absolute pl-2  left-10 right-10 font-Roboto-Regular text-[15px] "> {title}</span>}
      {children}
    </header>
  );
}

export default Header2;

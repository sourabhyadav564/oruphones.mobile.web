import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";

// import {
//   otherVendorDataState
// } from "../../atoms/globalState";
// import { useResetRecoilState, useRecoilState } from "recoil";

function Header5({ title, className, children, setOpen }) {
    const router = useRouter();
    // const resetState = useResetRecoilState(otherVendorDataState);
    // const [product, setProductsData] = useRecoilState(otherVendorDataState);

    return (

        <header className={`w-full z-50 flex p-4 h-[45px] bg-[#2C2F45] rounded-b-[10px] absolute text-white items-center  font-Roboto-Regular text-dx  ${className || " text-white"}`}>
            {setOpen ? (
                <BsArrowLeft onClick={() => setOpen(false)} className="cursor-pointer" fontSize="15" />
            ) : (
                // router.pathname !== "/" && <FiChevronLeft onClick={() => {router.back(); setProductsData([]);}} className="cursor-pointer" fontSize="22" />
                router.pathname !== "/"
                && <BsArrowLeft
                    onClick={() => {
                        // window.close()
                        router.back()
                    }}
                    className="cursor-pointer" fontSize="20" />
            )}
            {title && <span className="absolute pl-2  left-10 right-10 font-Roboto-Regular text-dx "> {title}</span>}
            {children}
        </header>
    );
}

export default Header5;

import { useRouter } from "next/router";
import LeftArrow from "@/assets/left.svg";
import Image from "next/image";

// import {
//   otherVendorDataState
// } from "../../atoms/globalState";
// import { useResetRecoilState, useRecoilState } from "recoil";

function Header5({ title, className, children, setOpen }) {
    const router = useRouter();
    // const resetState = useResetRecoilState(otherVendorDataState);
    // const [product, setProductsData] = useRecoilState(otherVendorDataState);

    return (

        <header className={`w-full items-center z-50 flex p-4 h-[45px] bg-[#2C2F45] rounded-b-[10px] relative text-white items-center  font-Roboto-Regular text-dx  ${className || " text-white"}`}>
            {setOpen ? (
                <Image src={LeftArrow} width={15} height={15} onClick={() => setOpen(false)} className="cursor-pointer"/>
                // <BsArrowLeft onClick={() => setOpen(false)} className="cursor-pointer" fontSize="15" />
            ) : (
                // router.pathname !== "/" && <FiChevronLeft onClick={() => {router.back(); setProductsData([]);}} className="cursor-pointer" fontSize="22" />
                router.pathname !== "/"
                && 
                // <BsArrowLeft
                    // onClick={() => {
                    //     // window.close()
                    //     router.back()
                    // }}
                    // className="cursor-pointer" fontSize="20" />
                    <Image  src={LeftArrow} width={20} height={20}  onClick={() => {
                        // window.close()
                        router.back()
                    }} className="cursor-pointer"/>
            )}
            {title && <h1 className="absolute pl-2  left-10 right-10 font-Roboto-Regular text-dx "> {title}</h1>}
            {children}
        </header>
    );
}

export default Header5;

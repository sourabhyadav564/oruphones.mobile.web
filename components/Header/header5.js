import { useRouter } from "next/router";
import LeftArrow from "@/assets/left.svg";
import Image from "next/image";


function Header5({ title, className, children, setOpen }) {
    const router = useRouter();

    return (

        <header className={`w-full items-center z-50 flex p-4 h-[45px] bg-[#2C2F45] rounded-b-[10px] relative text-white font-Roboto-Regular text-dx  ${className || " text-white"}`}>
            {setOpen ? (
                <Image src={LeftArrow} width={15} height={15} onClick={() => setOpen(false)} className="cursor-pointer"/>
            ) : (
                router.pathname !== "/"
                &&
                    <Image  src={LeftArrow} width={20} height={20}  onClick={() => {
                        router.back()
                    }} className="cursor-pointer"/>
            )}
            {title && <h1 className="absolute pl-2  left-10 right-10 font-Roboto-Regular text-dx "> {title}</h1>}
            {children}
        </header>
    );
}

export default Header5;

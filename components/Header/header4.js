import { useRouter } from "next/router";
import LeftArrow from "@/assets/leftarrow.svg";
import { Header4Heading } from "../elements/Heading/heading";
import Image from "next/image";


function Header4({ title, className, children, setOpen }) {
  const router = useRouter();

  return (
    <header className={`flex p-4 py-[14px] bg-[#2C2F45]   rounded-b-xl text-white items-center text-lg relative ${className || " text-white"}`}>
      {setOpen ? (
        <Image src={LeftArrow} width={14} height={14} onClick={() => setOpen(false)} className="cursor-pointer"/>
      ) : (
        router.pathname !== "/" && 
        <Image src={LeftArrow} width={22} height={22}  onClick={() => { router.back() }} className="cursor-pointer"/>
      )}
      <span className="m-auto justify-center">
        {title && <Header4Heading title={title} />}
        {children}
      </span>
    </header>
  );
}

export default Header4;

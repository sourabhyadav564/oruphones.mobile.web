import { useRouter } from "next/router";
import ArrowLeft from "@/assets/leftarrow.svg"
import Image from "next/image";


function Header2({ title, className, children, setOpen }) {
  const router = useRouter();

  return (
    <header className={`flex p-4 h-[45px] bg-[#2C2F45] rounded-b-[10px] text-white items-center  font-Roboto-Regular text-dx relative ${className || " text-white"}`}>
      {setOpen ? (
        <Image src={ArrowLeft} width={22} height={22} onClick={() => setOpen(false)} className="cursor-pointer" />
      ) : (
        router.pathname !== "/" &&
          <Image src={ArrowLeft} width={22} height={22}  onClick={() => {
            window.close()
          }} className="cursor-pointer" />
      )}
      {title && <span className="absolute pl-2  left-10 right-10 font-Roboto-Regular text-dx "> {title}</span>}
      {children}
    </header>
  );
}

export default Header2;

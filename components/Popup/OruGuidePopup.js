import Modal1 from "./Modal1";
import Image from "next/image";
import One from "@/assets/Oru_Guide/1.png";
import Two from "@/assets/Oru_Guide/2.png";
import Three from "@/assets/Oru_Guide/1.png";
import Four from "@/assets/Oru_Guide/4.png";
import Five from "@/assets/Oru_Guide/5.png";
import Six from "@/assets/Oru_Guide/6.png";
import Seven from "@/assets/Oru_Guide/7.png";
import Eight from "@/assets/Oru_Guide/8.png";
import Nine from "@/assets/Oru_Guide/9.png";
import Ten from "@/assets/Oru_Guide/10.png";
import Eleven from "@/assets/Oru_Guide/11.png";
import Twelve from "@/assets/Oru_Guide/12.png";
import Thirteen from "@/assets/Oru_Guide/13.png";
import Fourteen from "@/assets/Oru_Guide/14.png";

function OruGuidePopup({ open, setOpen }) {
  return (
    <>
      <Modal1 open={open} setOpen={setOpen}>
        <div className="text-px font-Roboto-Semibold flex items-center justify-center py-4">
          <p>ORU Guide</p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <Image src={One} height={200} width={120} alt="sell_now_icon" />
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            Browse in Shop By Brand<br></br> for specific brand
          </p>
        </div>
      </Modal1>
    </>
  );
}
export default OruGuidePopup;

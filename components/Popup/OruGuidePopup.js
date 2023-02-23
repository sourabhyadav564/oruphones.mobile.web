import Modal1 from "./Modal1";
import Image from "next/image";
// import One from "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/1.png";
// import Two from "https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/2.png";
// import Three from "@/assets/Oru_Guide/1.png";
// import Four from "@/assets/Oru_Guide/4.png";
// import Five from "@/assets/Oru_Guide/5.png";
// import Six from "@/assets/Oru_Guide/6.png";
// import Seven from "@/assets/Oru_Guide/7.png";
// import Eight from "@/assets/Oru_Guide/8.png";
// import Nine from "@/assets/Oru_Guide/9.png";
// import Ten from "@/assets/Oru_Guide/10.png";
// import Eleven from "@/assets/Oru_Guide/11.png";
// import Twelve from "@/assets/Oru_Guide/12.png";
// import Thirteen from "@/assets/Oru_Guide/13.png";
// import Fourteen from "@/assets/Oru_Guide/14.png";
import QRCode from "react-qr-code";
import { useState } from "react";

function OruGuidePopup({ open, setOpen }) {
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );
  const [qrValue2, setQrValue2] = useState(
    "https://play.google.com/store/apps/details?id=com.oruphones.oru"
  );
  return (
    <>
      <Modal1 open={open} setOpen={setOpen}>
        <div className="text-px font-Roboto-Semibold flex items-center justify-center py-4">
          <p>ORU Guide</p>
        </div>
        <div className="flex space-x-6 py-5 justify-center items-center px-7">
              <div className="flex flex-col justify-center items-center space-y-3">
                <QRCode value={qrValue1 || ""} size={120} level={"H"} />
                <a href={qrValue1}>
                  <p className="w-32 h-10 bg-appStore bg-no-repeat bg-contain" />
                </a>
              </div>
              <div className="flex flex-col justify-center items-center space-y-3">
                <QRCode value={qrValue2 || ""} size={120} level={"H"} />
                <a href={qrValue2}>
                  <p className="w-32 h-10 bg-playStore bg-no-repeat bg-contain" />
                </a>
              </div>
            </div>
              <div className="text-px text-center font-Roboto-Semibold flex items-center justify-center px-14">
                <p>Download our App using <br></br> these QR Codes</p>
            </div>
        <div className="px-14 font-Roboto-Semibold text-px py-4">
          <p>1. Device Health Check</p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/1.png"} height={200} width={100} alt="sell_now_icon" />
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            ORUphones provides<br></br> best in industry<br></br> device health check.
          </p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            Wait till you see <br></br> this window.
          </p>
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/2.png"} height={200} width={120} alt="sell_now_icon" />
        </div>
         <div className="px-14 font-Roboto-Semibold text-px py-4">
          <p>2. Battery Health</p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/3.png"} height={200} width={110} alt="sell_now_icon" />
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            You can check your<br></br> Device Battery Health in <br></br> just one click.
          </p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            Wait for 2-3 min<br></br> to complete the process.
          </p>
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/4.png"} height={200} width={110} alt="sell_now_icon" />
        </div>
         <div className="px-14 font-Roboto-Semibold text-px py-4">
          <p>3. Price Comparison</p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/3.png"} height={200} width={110} alt="sell_now_icon" />
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            Compare price of your<br></br>device with other<br></br> vendors.
          </p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
           Fill all the Specification<br></br> of your device<br></br> to get accurate <br></br>price.
          </p>
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/5.png"} height={200} width={110} alt="sell_now_icon" />
        </div>
         <div className="px-14 font-Roboto-Semibold text-px py-4">
          <p>4. Device Details</p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/3.png"} height={200} width={110} alt="sell_now_icon" />
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            We also provide<br></br> your device details<br></br> in just one click.
          </p>
        </div>
        <div className="px-14 font-Roboto-Semibold py-4 text-center">
          <p>We want our users to do less work so we provide your device details like CPU, Hardware, Battery and many more in just one click</p>
        </div>
        <div className="px-14 flex justify-between pt-6">
          <div className="pt-16 z-50">
            <Image
              src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/6.png"}
              height={150}
              width={90}
              className=""
              alt="sell_now_icon"
            />
          </div>
          <div className="-ml-6 z-20">
            <Image
              src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/7.png"}
              height={220}
              width={130}
              className=""
              alt="sell_now_icon"
            />
          </div>
          <div className="pt-10 -ml-10 z-30">
            <Image
              src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/8.png"}
              height={180}
              width={100}
              className=""
              alt="sell_now_icon"
            />
          </div>
          <div className="-ml-12 pt-3">
            <Image
              src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/9.png"}
              height={210}
              width={120}
              className=""
              alt="sell_now_icon"
            />
          </div>
        </div>
         <div className="px-14 font-Roboto-Semibold text-px py-4">
          <p>5. Notification</p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/10.png"} height={200} width={110} alt="sell_now_icon" />
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            You will receive <br></br> notification for<br></br>verification of your device<br></br> so you don't <br></br>have to check often. 
          </p>
        </div>
         <div className="px-14 font-Roboto-Semibold text-px py-4">
          <p>6. Profile </p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/11.png"} height={200} width={110} alt="sell_now_icon" />
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            You can always edit <br></br> your personal details <br></br> in profile section.
          </p>
        </div>
         <div className="px-14 font-Roboto-Semibold text-px py-4">
          <p>7. Your Listings</p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/12.png"} height={200} width={110} alt="sell_now_icon" />
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            Once you list your<br></br> device on ORUphones<br></br> you can check your<br></br> listings in <br></br>my listing section.
          </p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
            You can also view<br></br> your favorite deals.
          </p>
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/13.png"} height={200} width={110} alt="sell_now_icon" />
        </div>
         <div className="px-14 font-Roboto-Semibold text-px py-4">
          <p>8. More Services</p>
        </div>
        <div className="px-14 flex justify-between pt-2">
          <Image src={"https://d1tl44nezj10jx.cloudfront.net/assets/Oru_Guide/14.png"} height={200} width={110} alt="sell_now_icon" />
          <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
           Our team is working <br></br> on more services <br></br> for our users.
          </p>
        </div>
        <div className="px-14 flex justify-between text-center pb-4 pt-6">
            <p className="text-ex text-primary font-Roboto-normal">
                *ORUphones never take any personal information from our users.
                Your privacy is our priority.
            </p>
           </div>
      </Modal1>
    </>
  );
}
export default OruGuidePopup;

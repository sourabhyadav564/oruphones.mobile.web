import Modal1 from "./Modal1";
import Image from "next/image";
import One from "@/assets/sell_icons/1.png";
import Two from "@/assets/sell_icons/2.png";
import Three from "@/assets/sell_icons/3.png";
import Four from "@/assets/sell_icons/4.png";
import Five from "@/assets/sell_icons/5.png";
import Six from "@/assets/sell_icons/6.png";
import Seven from "@/assets/sell_icons/7.png";
import Eight from "@/assets/sell_icons/8.png";
import Nine from "@/assets/sell_icons/9.png";
import Ten from "@/assets/sell_icons/10.png";
import QRCode from "react-qr-code";
import { useState } from "react";

function SellNowIconPopup({ open, setOpen}) {
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
                <p>Steps On How to Sell Your Phone</p>
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
                <p>Download our App these <br></br> these QR Codes</p>
            </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={One}
            height={200}
            width={120}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
                Click on Sell Now Button
            </p>
           </div>
           <div className="px-14 flex justify-between pb-2">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
                Click on this button to sell other phone than above
            </p>
            <Image 
            src={Two}
            height={400}
            width={230}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={Three}
            height={300}
            width={180}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
                After filling all the fields above, click next
            </p>
           </div>
           <div className="px-14 flex justify-between">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Select Accessories and Mobile Age, click Next
            </p>
            <Image 
            src={Four}
            height={450}
            width={270}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={Five}
            height={400}
            width={250}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Select working condition of mobile, click Next
            </p>
           </div>
           <div className="px-14 flex justify-between">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Add pictures of mobile, click Next
            </p>
            <Image 
            src={Six}
            height={350}
            width={210}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={Seven}
            height={350}
            width={210}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Add location,and click Next
            </p>
           </div>
           <div className="px-14 flex justify-between pb-2">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Add price, and click on Take me to Verification. 
            </p>
            <Image 
            src={Ten}
            height={400}
            width={240}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pb-2">
            <Image 
            src={Eight}
            height={350}
            width={210}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Wait till diagnostic test is completed
            </p>
           </div>
           <div className="px-14 flex justify-between pb-4">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Click on complete listing
            </p>
            <Image 
            src={Nine}
            height={300}
            width={180}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between text-center pb-4">
            <p className="text-px text-primary font-Roboto-Bold">
                Congrats Your Mobile is Listed on ORUphones.<br></br>Welcome from Team ORUphones..
            </p>
           </div>
        </Modal1>
        </>
    );
    };
    export default SellNowIconPopup;

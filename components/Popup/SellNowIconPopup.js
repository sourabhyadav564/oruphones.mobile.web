import Modal1 from "./Modal1";
import Image from "next/image";
// import One from "https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/1.png";
// import Two from "@/assets/sell_icons/2.png";
// import Three from "@/assets/sell_icons/3.png";
// import Four from "@/assets/sell_icons/4.png";
// import Five from "@/assets/sell_icons/5.png";
// import Six from "@/assets/sell_icons/6.png";
// import Seven from "@/assets/sell_icons/7.png";
// import Eight from "@/assets/sell_icons/8.png";
// import Nine from "@/assets/sell_icons/9.png";
// import Ten from "@/assets/sell_icons/10.png";
import QRCode from "react-qr-code";
import { useState } from "react";

function SellNowIconPopup({ open, setOpen }) {
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
               <p>Steps on how to sell your phone</p>
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
                <p>Download our App using <br></br> these QR codes</p>
            </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/1.png"}
            height={200}
            width={120}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
                Click on Sell Now button
            </p>
           </div>
           <div className="px-14 flex justify-between pb-2">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
                Click on this button to sell other phone than above
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/2.png"}
            height={400}
            width={230}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/3.png"}
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
               Select accessories and mobile age, click next
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/4.png"}
            height={450}
            width={270}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/5.png"}
            height={400}
            width={250}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Select working condition of mobile, click next
            </p>
           </div>
           <div className="px-14 flex justify-between">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Add pictures of mobile, click Next
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/6.png"}
            height={350}
            width={210}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/7.png"}
            height={350}
            width={210}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Add location,and click next
            </p>
           </div>
           <div className="px-14 flex justify-between pb-2">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Add price, and click on take me to verification. 
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/10.png"}
            height={400}
            width={240}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pb-2">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/8.png"}
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
            src={"https://d1tl44nezj10jx.cloudfront.net/assets/sell_icons/9.png"}
            height={300}
            width={180}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between text-center pb-4">
            <p className="text-px text-primary font-Roboto-Bold">
                Congrats your mobile is listed on ORUphones.<br></br>Welcome from team ORUphones.
            </p>
           </div>
        </Modal1>
        </>
    );
    };
    export default SellNowIconPopup;

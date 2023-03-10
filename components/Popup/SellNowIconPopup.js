import Modal1 from "./Modal1";
import Image from "next/image";
import AppleStore from "@/assets/apple_store.svg";
import PlayStore from "@/assets/playstore.svg";
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
               <Image src={AppleStore} width={96} height={96} alt=""/>
                  <a href={qrValue1}>
                     <p className="w-32 h-10 bg-appStore bg-no-repeat bg-contain" />
                  </a>
               </div>
               <div className="flex flex-col justify-center items-center space-y-3">
               <Image src={PlayStore} width={96} height={96} alt=""/>
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
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/1.webp"}
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
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/2.webp"}
            height={400}
            width={230}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/3.webp"}
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
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/4.webp"}
            height={450}
            width={270}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/5.webp"}
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
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/6.webp"}
            height={350}
            width={210}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/7.webp"}
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
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/10.webp"}
            height={400}
            width={240}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pb-2">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/8.webp"}
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
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/sell_icons/9.webp"}
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

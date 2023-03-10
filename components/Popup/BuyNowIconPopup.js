import Modal1 from "./Modal1";
import Image from "next/image";
import { useState } from "react";
import AppleStore from "@/assets/apple_store.svg";
import PlayStore from "@/assets/playstore.svg";

function BuyNowIconPopup({ open, setOpen}) {
  const [qrValue2, setQrValue2] = useState(
    "https://play.google.com/store/apps/details?id=com.oruphones.oru"
  );
  const [qrValue1, setQrValue1] = useState(
    "https://apps.apple.com/in/app/oruphones/id1629378420"
  );
    return (
        <>
        <Modal1 open={open} setOpen={setOpen}>
            <div className="text-px font-Roboto-Semibold flex items-center justify-center py-4">
                <p>Steps On How to Buy Phone</p>
            </div>
            <div className="flex space-x-6 py-5 justify-center items-center px-7">
              <div className="flex flex-col justify-center items-center space-y-3">
              <Image src={AppleStore} width={96} height={96} alt=""/>
                {/* <QRCode value={qrValue1 || ""} size={120} level={"H"} /> */}
                <a href={qrValue1}>
                  <p className="w-32 h-10 bg-appStore bg-no-repeat bg-contain" />
                </a>
              </div>
              <div className="flex flex-col justify-center items-center space-y-3">
              <Image src={PlayStore } width={96} height={96} alt=""/>
                {/* <QRCode value={qrValue2 || ""} size={120} level={"H"} /> */}
                <a href={qrValue2}>
                  <p className="w-32 h-10 bg-playStore bg-no-repeat bg-contain" />
                </a>
              </div>
            </div>
            <div className="text-px text-center font-Roboto-Semibold flex items-center justify-center px-14">
                <p>Download our App using <br></br> these QR codes</p>
            </div>
           <div className="px-14 flex justify-between pt-2">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/1.webp"}
            height={200}
            width={120}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
                Browse in shop by brand<br></br> for specific brand
            </p>
           </div>
           <div className="px-14 flex justify-between pb-2 pt-2">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
                You can buy through search, Buy now and scroll for best deals.
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/2.webp"}
            height={450}
            width={280}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pt-8">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/3.webp"}
            height={450}
            width={280}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
              Select your location from top bar. You can select from this popup.
            </p>
           </div>
           <div className="px-14 flex justify-between pt-6">
            <p className="items-center text-center flex pb-12 font-Roboto-Semibold">
              Click on the filter icon <br></br>to add specific filters.
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/4.webp"}
            height={200}
            width={120}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pt-8">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/5.webp"}
            height={480}
            width={290}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
              Choose Brand name, Storage, Ram, Condition and warranty.
            </p>
           </div>
           <div className="px-14 flex justify-between pt-6">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Now open desired deal from all the available products.
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/6.webp"}
            height={430}
            width={250}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pt-4">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/7.webp"}
            height={280}
            width={160}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Scroll down to view device details.
            </p>
           </div>
           <div className="px-14 flex justify-between pb-2 pt-2">
            <p className="items-center text-center flex pt-10 font-Roboto-Semibold">
              Click on Contact Seller to request verification.
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/9.webp"}
            height={400}
            width={240}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pb-2 pt-6">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/8.webp"}
            height={350}
            width={210}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
              You can also view other deals of same model.
            </p>
           </div>
           <div className="px-14 flex justify-between pb-4 pt-6">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
              Go to home<br></br> and click on three lines <br></br> on top left corner and click on verification for buyer tile.
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/10.webp"}
            height={460}
            width={270}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pb-4 pt-6">
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/12.webp"}
            height={300}
            width={180}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pt-8 font-Roboto-Semibold">
              Enter your mobile number to get start<br></br> verification in seller's device.
            </p>
           </div>
           <div className="px-14 flex justify-between pb-4 pt-6">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
              Wait for diagnostic<br></br> check. Once it <br></br>completes you can contact the seller.
            </p>
            <Image 
            src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/buy_icons/13.webp"}
            height={300}
            width={180}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between text-center pb-4 pt-6">
            <p className="text-px text-primary font-Roboto-Bold">
                We wish you a happy shopping.
            </p>
           </div>
        </Modal1>
        </>
    );
    };
    export default BuyNowIconPopup;

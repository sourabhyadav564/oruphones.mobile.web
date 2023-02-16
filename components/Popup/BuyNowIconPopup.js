import Modal1 from "./Modal1";
import Image from "next/image";
import One from "@/assets/buy_icons/1.png";
import Two from "@/assets/buy_icons/2.png";
import Three from "@/assets/buy_icons/3.png";
import Four from "@/assets/buy_icons/4.png";
import Five from "@/assets/buy_icons/5.png";
import Six from "@/assets/buy_icons/6.png";
import Seven from "@/assets/buy_icons/7.png";
import Eight from "@/assets/buy_icons/8.png";
import Nine from "@/assets/buy_icons/9.png";
import Ten from "@/assets/buy_icons/10.png";
import Eleven from "@/assets/buy_icons/13.png"
import Twelve from "@/assets/buy_icons/12.png"

function BuyNowIconPopup({ open, setOpen}) {
    return (
        <>
        <Modal1 open={open} setOpen={setOpen}>
            <div className="text-px font-Roboto-Semibold flex items-center justify-center py-4">
                <p>Steps On How to Sell Your Phone</p>
            </div>
           <div className="px-14 flex justify-between pt-2">
            <Image 
            src={One}
            height={200}
            width={120}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-8 font-Roboto-Semibold">
                Browse in Shop By Brand<br></br> for specific brand
            </p>
           </div>
           <div className="px-14 flex justify-between pb-2 pt-2">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
                You can buy through search, Buy now and scroll for best deals.
            </p>
            <Image 
            src={Two}
            height={450}
            width={280}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pt-8">
            <Image 
            src={Three}
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
            src={Four}
            height={200}
            width={120}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pt-8">
            <Image 
            src={Five}
            height={480}
            width={290}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
              Choose Brand Name, Storage, Ram, Condition and warranty.
            </p>
           </div>
           <div className="px-14 flex justify-between pt-6">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Now open desired deal from all the available products.
            </p>
            <Image 
            src={Six}
            height={430}
            width={250}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pt-4">
            <Image 
            src={Seven}
            height={280}
            width={160}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
               Scroll down to view Device details.
            </p>
           </div>
           <div className="px-14 flex justify-between pb-2 pt-2">
            <p className="items-center text-center flex pt-10 font-Roboto-Semibold">
              Click on Contact Seller to request verification.
            </p>
            <Image 
            src={Nine}
            height={400}
            width={240}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pb-2 pt-6">
            <Image 
            src={Eight}
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
              Go to Home<br></br> and Click on Three lines <br></br> on top left corner and click on verification for buyer tile.
            </p>
            <Image 
            src={Ten}
            height={460}
            width={270}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between pb-4 pt-6">
            <Image 
            src={Twelve}
            height={300}
            width={180}
            alt="sell_now_icon"
            />
            <p className="items-center text-center flex pt-8 font-Roboto-Semibold">
              Enter your Mobile Number to get start<br></br> verification in seller's device.
            </p>
           </div>
           <div className="px-14 flex justify-between pb-4 pt-6">
            <p className="items-center text-center flex pb-6 font-Roboto-Semibold">
              Wait for Diagnostic<br></br> check. Once it <br></br>completes you can contact the seller.
            </p>
            <Image 
            src={Eleven}
            height={300}
            width={180}
            alt="sell_now_icon"
            />
           </div>
           <div className="px-14 flex justify-between text-center pb-4 pt-6">
            <p className="text-px text-primary font-Roboto-Bold">
                We wish you a happy ORUing with us.
            </p>
           </div>
        </Modal1>
        </>
    );
    };
    export default BuyNowIconPopup;

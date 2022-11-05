import Header5 from "@/components/Header/header5";
import { Fragment, useEffect, useState } from "react";
import parse from "html-react-parser";
import Footer from "@/components/Footer";
import { infoTemplates } from "api-call";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import fetchStaticHTML from "api-call/fetchStaticHtml";
import Head from "next/head";
import { metaTags } from "@/utils/constant";

// function Aboutus({ htmlText, error }) {
//   if (error) {
//     return <Error statusCode={404} />;
//   }
function Aboutus() {

  // const [htmlText1, setHtmlText1] = useState("");

  // useEffect(() => {
  //   callStaticPages();
  // }, []);

  // async function callStaticPages() {
  //   // let staticDataPath;
  //   // try {
  //   //   const response = await infoTemplates();
  //   //   staticDataPath = response?.dataObject;
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }

  //   var htmlText;
  //   try {
  //     // const { serverUrl, templateUrls } = staticDataPath;
  //     // const res = await fetchStaticHTML("/about_us.html");
  //     const res = await fetchStaticHTML("/new_about_us.html");
  //     // const res = await fetchStaticHTML(serverUrl + templateUrls.VERIFICATION);
  //     const html = res.data;
  //     const doc = nodeParser(html);
  //     const body = doc.querySelector("body");
  //     htmlText = body.innerHTML;
  //     setHtmlText1(htmlText);
  //   } catch (err) {
  //     console.log("getVerificationConent error", err);
  //   }
  // }

  return (
    <>
      <Head>
        <title>{metaTags.ABOUT_US.title}</title>
        <meta name="description" content={metaTags.ABOUT_US.description} />
        <meta property="og:title" content={metaTags.ABOUT_US.title} />
        <meta
          property="og:description"
          content={metaTags.ABOUT_US.description}
        />
      </Head>
      <Fragment>
        <Header5 title={"About Us"} />
        {/* <main className="px-4 my-4 font-open-sans">{parse(htmlText1)}</main> */}
        <main>
          <div className="content mt-8">
            <p className="font-Roboto-Medium mt-6 text-gx ">
              ORUphones is India’s first ever online marketplace exclusively built for buying and selling Certified Old, Refurbished & Used phones.
              Our vision is to be a trusted marketplace for every user to buy and sell old phones confidently, easily, and for the best price possible.
              We strive to achieve this with a strong base of technology and a dedicated team of professionals who are well-seasoned and understand the needs of the market.
            </p>
            <h1 className="font-Roboto-Semibold">WHY ORUphones?</h1>
            <div>
              <h2 className="font-Roboto-Semibold text-tx"> 01. Best Prices</h2>
              <p className="font-Roboto-Light text-gx">The prices of used phones hike as they reach the end-user through multiple people. A few online shops and stores justify these highly inflated prices by tagging the phones as refurbished. But most of these phones are NOT refurbished, but devices with updates installed and screen-guards changed. So, many sellers and users are not likely to get the best deals.
                At ORUphones you can buy and sell certified used phones for free. No commission is involved, no fees and no hidden charges, as transactions take place directly between the seller and buyer. ORUphones’ AI-driven pricing engine curates and presents the most profitable deals to both buyers and sellers
              </p>
            </div>
            <div>
              <h2 className="font-Roboto-Semibold text-tx"> 02. Safe & Secure</h2>
              <p className="font-Roboto-Light text-gx">Fake or counterfeit smartphones are common in the used & second-hand phone markets in India. Online markets have a higher risk as you cannot personally check out the condition of the device. Phones that look brand new in pictures might be functioning with an outdated processor; or with cheaper components in place of the original parts. It takes extreme precautions and precise observation to spot these fake devices from real ones.
                We at ORUphones provide advanced technological tools to ensure that the device is branded & genuine. This eliminates any possibility of fraud and fake deals at ORUphones, unlike in other marketplaces. In addition, our Services like Data Wipe and Data Backup/restore helps with data privacy and minimise any risk of personal information and data leak.
              </p>
            </div>
            <div>
              <h2 className="font-Roboto-Semibold text-tx"> 03. Convenient</h2>
              <p className="font-Roboto-Light text-gx">ORUphones is a website that makes selling and buying old phones easier. With the provision of the
                Best Deals section and added free services, ORUphones does all the tedious work and puts forth verified and authentic deals for buyers and sellers so that you can proceed to sell or purchase with assurance and ease.
              </p>
            </div>
            <div className="my-2">
              <p className="font-Roboto-Medium text-gx">That apart, our proprietary algorithm curates <br />
                <span className="underline"> Best Deal for Buyers: </span>Save up to 30% on curated offers that provide the best quality-price ratio.<br />
                <span className="underline">Best Deal for Sellers: </span> Get the maximum cash for your old Phone with our "Recommended price" algorithm</p>
            </div>
          </div>
          {/* <div className="content mt-8">
            <div id="why_xyz" className="">
              <h1 className="font-Roboto-Semibold text-primary text-gx">Why should I use ORUphones?</h1>
              <h2 className="font-Roboto-Semibold text-primary text-gx">Buy & Sell Your Phone at ORUphones </h2>
              <p className="font-Roboto-Regular text-primary text-jx">
                ORUphones is India&apos;s first and unique online marketplace where
                you can buy and sell old phones, refurbished phones and used mobile
                phones for the best deal. Our vision is to be a trusted marketplace
                for every user to buy and sell old phones confidently, easily, and
                for the best price possible. We strive to achieve this with a strong
                base of technology and a dedicated team of professionals who are
                well-seasoned and understand the needs of the market.
              </p>
              <p className="font-Roboto-Regular text-primary text-jx">
                If you want to buy second-hand mobile online, check out our best
                deal section- Our A.I-based algorithm curates and presents the best
                deals based on 40+ attributes in real-time. You don&apos;t have to
                put any effort into browsing multiple listings and websites in order
                to find the best deal.
              </p>
              <p className="font-Roboto-Regular text-primary text-jx">
                And if you are selling your old phone, we would guide you to get the
                maximum cash for your old Phone with our &quot;Recommended
                price&quot; algorithm.&nbsp;This algorithm checks more than 30+
                attributes in real-time, and provides a suitable price range based
                on the phone model, condition of the phone, and referenced from the
                general market rate to help you get maximum cash for your old phone.
              </p>
    
              <h2  className="font-Roboto-Semibold text-primary text-gx">Why should you buy used phones on ORUphones? </h2>
              <p className="font-Roboto-Regular text-primary text-jx">
                1. Save more and buy from direct sellers:&nbsp;Did you know that 90%
                of the devices sold as refurbished phones on other websites do not
                undergo any refurbishment process? This means you are paying a hefty
                charge for a used phone that you could have bought for a nominal
                price directly from the seller. We help customers who are looking
                for a sweet deal in the used phone market by connecting you directly
                with genuine sellers so that you don&apos;t pay a heavy fee of
                commissions or the middleman charges.&nbsp;
              </p>
              <p className="font-Roboto-Regular text-primary text-jx">
                2. Verified sellers/devices:&nbsp;ORUphones provide an option to
                verify every seller/device before displaying them on a reselling
                platform. Unlike Quikr or OLX, we ensure that all the verified
                devices you buy are in working condition.
              </p>
              <p className="font-Roboto-Regular text-primary text-jx">
                3. Best Deal:&nbsp;ORUphones uses an AI-based recommendation engine
                to find the best deal on a particular device model from thousands of
                deals.
              </p>
              <h2 className="font-Roboto-Semibold text-primary text-gx"> Why should you sell your old mobile on ORUphones? </h2>
              <p className="font-Roboto-Regular text-primary text-jx">
                1. Correct resale value estimation:&nbsp;ORUphones uses an
                AI-integrated Recommendation Engine that helps us to provide you
                with an accurate &amp; best estimate for the resale value of your
                old mobile. We discover and recommend a suitable range of resale
                value when you list your device with us.
              </p>
              <p className="font-Roboto-Regular text-primary text-jx">
                2. Better deals for verified sellers:&nbsp;Our buyers appreciate and
                prefer verified sellers to purchase old mobile phones. If you want a
                premium price for your old device, register with us for the mobile
                and your seller profile verification. We will offer additional deals
                to our verified sellers.
              </p>
              <p className="font-Roboto-Regular text-primary text-jx">
                3. Easy transaction:&nbsp;Sellers don&apos;t have to interact with
                any third person to complete a deal. You can transact directly with
                the buyer. We ensure hassle-free transactions by sharing your device
                condition with the buyer prior to them connecting with you.
              </p>
            </div>
            <div id="how_to_sell">
              <h2  className="font-Roboto-Semibold text-primary text-gx">How to Sell Used Phone with ORUphones?</h2>
              <p className="font-Roboto-Regular text-primary text-jx">
                You can sell used phones online through ORUphones in 3 easy steps.
              </p>
              <h3  className="font-Roboto-Semibold text-primary text-mx">Step 1: Add your Device </h3>
              <p className="font-Roboto-Regular text-primary text-jx">
                Click on the &quot;Sell Now&quot; button available at the top right
                corner of the ORUphones homepage, select your location, enter the
                mobile details on the listing page, and enter your expected price
                for the device.
              </p>
              <h3  className="font-Roboto-Semibold text-primary text-mx">Step 2: Device Verification</h3>
              <p className="font-Roboto-Regular text-primary text-jx">
                After listing your device, we recommend you verify your device to
                sell it quickly. To verify your device, download the ORUphones app
                on the device you want to sell. Follow the simple instructions in
                the app &amp; perform diagnostics to complete the verification
                process. After verification, a &ldquo;verified&rdquo; badge will be
                displayed along with your listing.
              </p>
              <h3  className="font-Roboto-Semibold text-primary text-mx">Step 3: Get Cash</h3>
              <p className="font-Roboto-Regular text-primary text-jx">
                You will start receiving offers for your listing. If the offer is
                right, you can arrange a meet-up with the buyer at a secure
                location. The buyer will go through a buyer verification process on
                the ORUphones app &amp; if satisfied you can conclude the deal and
                get instant payment from the buyer directly.
              </p>
              directly.
            </div>
            <div id="how_to_buy">
              <h2  className="font-Roboto-Semibold text-primary text-gx">How to Buy ORUphones Verified Used Phones?</h2>
              <p className="font-Roboto-Regular text-primary text-jx">
                Buying an old device over ORUphones is as easy as selling. We follow
                a secure procedure when you buy used phones through us. The simple
                steps for buying a device are as below -
              </p>
              <h3  className="font-Roboto-Semibold text-primary text-mx">Step 1: Select Device</h3>
              <p className="font-Roboto-Regular text-primary text-jx">
                Looking to buy a specific used phone model? Simply select the model
                of your choice from the wide range of categories at ORUphones or
                look up the model using the search option. We display the best deals
                available for the model as well as other listings. Click on the deal
                to view detailed information about the device.
              </p>
              <h3  className="font-Roboto-Semibold text-primary text-mx">Step 2: Contact Seller</h3>
              <p className="font-Roboto-Regular text-primary text-jx">
                On the product details page, click on the &ldquo;contact
                seller&rdquo; button, to reveal the seller&apos;s contact
                information. You can contact the seller &amp; set up a meeting at a
                secure place which is convenient for you as well as the seller.
              </p>
              <h3  className="font-Roboto-Semibold text-primary text-mx">Step 3: Verify your Purchase</h3>
              <p className="font-Roboto-Regular text-primary text-jx">
                Once you meet the seller go to the buyer verification link on the
                ORUphones app installed on your device. You will see the
                seller&apos;s device details along with the Device Verification
                Report. Once all the details have been verified, click on the
                &ldquo;Verify this device&rdquo; button. You will be asked to enter
                your registered mobile number. Click on &ldquo;Verify&rdquo; after
                inputting your number and you should see a dialogue which will show
                if the verification was successful or failed. A successful
                verification means the seller&apos;s device is safe to purchase. In
                case of a failure in verification, we advise not to proceed as one
                or more details of the customer device are not matching with the
                original listing.
              </p>
            </div>
            <div>
              <h2  className="font-Roboto-Semibold text-primary text-gx">Popular Brands Listed on ORUphones</h2>
              <p className="font-Roboto-Regular text-primary text-jx">
                ORUphoness mobile listing contains all the top brands in India. If
                you want to buy or sell your device through us, you first select the
                brand or list your product under a certain brand, respectively, to
                proceed.
              </p>
              <p className="font-Roboto-Regular text-primary text-jx">
                Mobile brands available on our homepage are Apple iPhone, Samsung
                Galaxy, Xiaomi, MI, Lenovo, Google Pixel, OnePlus, OPPO, and VIVO.
                Select a brand and strike the best deals with us every time.
              </p>
            </div>
          </div> */}
        </main>
        <Footer />
      </Fragment>
    </>
  );
}

export default Aboutus;

//export const getStatic = async () => {

// export async function getServerSideProps() {
//   let staticDataPath;
//   try {
//     const res = await infoTemplates();
//     staticDataPath = res?.dataObject;
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {
//         error: true,
//       },
//     };
//   }

//   var htmlText;
//   try {
//     const {serverUrl,templateUrls} = staticDataPath;
//     const res = await fetchStaticHTML(serverUrl+templateUrls.ABOUT_US);
//     const html = res.data;
//     const doc = nodeParser(html);
//     const body = doc.querySelector("body");
//     htmlText = body.innerHTML;
//   } catch (err) {
//     console.log("getAboutUsContent error", err);
//     return {
//       props: {
//         error: true,
//       },
//     };
//   }

//   return {
//     props: {
//       htmlText: htmlText,
//     },
//     // revalidate: 60*60*24, // In seconds
//   };
// }

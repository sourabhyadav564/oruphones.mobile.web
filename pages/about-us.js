import Header5 from "@/components/Header/header5";
import { Fragment, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Head from "next/head";
import { metaTags } from "@/utils/constant";

function Aboutus() {
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
        <main>
          <div className="content mt-8">
            <p className="font-Roboto-Medium mt-6 text-gx ">
              ORUphones is India’s first ever online marketplace exclusively built for buying and selling Certified Old, Refurbished & Used phones.
              Our vision is to be a trusted marketplace for every user to buy and sell old phones confidently, easily, and for the best price possible.
              We strive to achieve this with a strong base of technology and a dedicated team of professionals who are well-seasoned and understand the needs of the market.
            </p>
            <p className="text-gx font-Roboto-Semibold">WHY ORUphones?</p>
            <div>
              <h2 className="font-Roboto-Semibold text-tx"> 01. Best Prices</h2>
              <p className="font-Roboto-Light text-gx">The prices of used phones hike as they reach the end-user through multiple people. A few online shops and stores justify these highly inflated prices by tagging the phones as refurbished. But most of these phones are NOT refurbished, but devices with updates installed and screen-guards changed. So, many sellers and users are not likely to get the best deals.
                At ORUphones you can buy and sell certified used phones for free. No commission is involved, no fees and no hidden charges, as transactions take place directly between the seller and buyer. ORUphones’ AI-driven pricing engine curates and presents the most profitable deals to both buyers and sellers
              </p>
            </div>
            <div>
              <p className="font-Roboto-Semibold text-tx"> 02. Safe & Secure</p>
              <p className="font-Roboto-Light text-gx">Fake or counterfeit smartphones are common in the used & second-hand phone markets in India. Online markets have a higher risk as you cannot personally check out the condition of the device. Phones that look brand new in pictures might be functioning with an outdated processor; or with cheaper components in place of the original parts. It takes extreme precautions and precise observation to spot these fake devices from real ones.
                We at ORUphones provide advanced technological tools to ensure that the device is branded & genuine. This eliminates any possibility of fraud and fake deals at ORUphones, unlike in other marketplaces. In addition, our Services like Data Wipe and Data Backup/restore helps with data privacy and minimise any risk of personal information and data leak.
              </p>
            </div>
            <div>
              <p className="font-Roboto-Semibold text-tx"> 03. Convenient</p>
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
        </main>
        <Footer />
      </Fragment>
    </>
  );
}

export default Aboutus;
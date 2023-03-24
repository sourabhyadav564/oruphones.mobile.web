import Header5 from "@/components/Header/header5";
import { Fragment, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Head from "next/head";
import { metaTags } from "@/utils/constant";
import TeamCard from "@/components/Card/TeamCard";
import Image from "next/image";

function Aboutus() {
  const data = [
    {
      imgsrc: "https://d1tl44nezj10jx.cloudfront.net/team/kido.webp",
      name: "Takashi Kido",
      position: "Chairman",
      description:
        "Born in Fukui Japan, Takashi Kido is a high skilled leader with more than 15 years of CEO experiences at DoubleClick Japan and Asurion Japan . He has various complex business development experiences at i2 technologies, SAS and Asurion Japan which he also co-founded.",
    },
    {
      imgsrc: "https://d1tl44nezj10jx.cloudfront.net/team/anish.webp",
      name: "Anish Agrwal",
      position: "Co-Founder & CEO",
      description:
        "More than 15 years of experience with MNOs, mobile insurance players & 3PLs managing and improving their operations for reverse supply chain of devices.",
      qualification: "B.Tech - IIT(BHU) Varanasi",
    },
    {
      imgsrc: "https://d1tl44nezj10jx.cloudfront.net/team/manuj.webp",
      name: "Manuj Purwar",
      position: "Co-Founder & COO",
      description:
        "13 years of experience across technology, strategy consulting and supply chain management. Responsible for setting up and scaling up operations for UP Medical Supplies Corporation",
      twittersrc: "",
      qualification:
        "B.Tech – IIT (BHU) Varanasi ,MBA - IIM Ahmedabad, M.Sc in Management – HEC, Paris,",
    },
    {
      imgsrc: "https://d1tl44nezj10jx.cloudfront.net/team/nishant.webp",
      name: "Nishant Sharma",
      position: "Project Lead",
      description:
        "More than 4 years of experience in IT industry with expertise in Project Management, Business Analysis, and Software Development Life Cycle.",
      linkedInsrc:
        "https://www.linkedin.com/in/projectnishant?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAACfYtT8BehCBqWLWEfTvSd67XCVzy2qcncM&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BJr%2BY%2BR7OS2OU3XeXSHQcWg%3D%3D",
      qualification: "B.Tech - RTU(Rajasthan)",
    },
  ];
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
          <section className=" px-4 mx-2 ">
            <div className="pt-2">
              <h1 className="text-4xl font-Roboto-Bold text-primary pt-2">
                {" "}
                ORUphones{" "}
              </h1>
              <span className="text-sm font-Roboto-Medium text-primary">
                C2C online marketplace for Old, Refurbished & Used phones
              </span>
            </div>
          </section>
          <div className="content mt-6">
            <span className="font-Roboto-Bold text-m-green underline mt-6 text-xl2FontSize ">
              ORUphones
            </span>
            <span className="font-Roboto-light mt-6 text-xlFontSize ">
              {" "}
              - A tech start-up, India's first-ever online C2C marketplace
              dedicated to buying and selling Old, Refurbished & Used phones. In
              2020, only 20 million units of used smartphones were traded while
              there were more than 100 million smartphones just left idle at
              home, sitting in drawers. The cumulative second-hand market will
              reach 245 million units by 2025 of which only about 20% units will
              be traded despite the strong demand for used smartphones in India.
              We aim to bring those unused second-hand smartphones to the market
              so that “Smartphone owners (sellers)” reap profits by selling
              their unused assets and buyers can afford their desired
              smartphones. This is achievable with our strong technology stack
              and a dedicated team of professionals.
            </span>
          </div>
          <div className="container text-center ">
            <p className="text-[36px] font-Roboto-Bold text-primary opacity-0.6">
              ORU Team
            </p>
            <div className=" lg:grid-cols-4 md:grid-cols-3 grid-cols-2 my-1 justify-center">
              {data.map((items, index) => (
                <div key={index}>
                  <TeamCard
                    imgsrc={items.imgsrc}
                    name={items.name}
                    position={items.position}
                    qualification={items.qualification}
                    description={items.description}
                    linkedInsrc={items.linkedInsrc}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="container mt-4">
            <p className="font-Roboto-Bold text-px text-primary underline px-2">
              ORU Vision
            </p>
            <p className="font-Roboto-Medium mt-2 text-gx px-2">
              Our vision is to be a trusted, global marketplace for any user to
              buy and sell their phone with confidence, ease, and for the best
              price possible. <br></br>This is achievable with a strong technology stack
              and a dedicated team of professionals who are seasoned and
              understand the needs of the global market.
            </p>
          </div>
          <div className="content mt-2">
            <p className="font-Roboto-Medium mt-4 text-gx ">
              ORUphones is India’s first ever online marketplace exclusively
              built for buying and selling Certified Old, Refurbished & Used
              phones. Our vision is to be a trusted marketplace for every user
              to buy and sell old phones confidently, easily, and for the best
              price possible. We strive to achieve this with a strong base of
              technology and a dedicated team of professionals who are
              well-seasoned and understand the needs of the market.
            </p>
            <p className="text-gx font-Roboto-Semibold">WHY ORUphones?</p>
            <div>
              <h2 className="font-Roboto-Semibold text-tx"> 01. Best Prices</h2>
              <p className="font-Roboto-Light text-gx">
                The prices of used phones hike as they reach the end-user
                through multiple people. A few online shops and stores justify
                these highly inflated prices by tagging the phones as
                refurbished. But most of these phones are NOT refurbished, but
                devices with updates installed and screen-guards changed. So,
                many sellers and users are not likely to get the best deals. At
                ORUphones you can buy and sell certified used phones for free.
                No commission is involved, no fees and no hidden charges, as
                transactions take place directly between the seller and buyer.
                ORUphones’ AI-driven pricing engine curates and presents the
                most profitable deals to both buyers and sellers
              </p>
            </div>
            <div>
              <p className="font-Roboto-Semibold text-tx"> 02. Safe & Secure</p>
              <p className="font-Roboto-Light text-gx">
                Fake or counterfeit smartphones are common in the used &
                second-hand phone markets in India. Online markets have a higher
                risk as you cannot personally check out the condition of the
                device. Phones that look brand new in pictures might be
                functioning with an outdated processor; or with cheaper
                components in place of the original parts. It takes extreme
                precautions and precise observation to spot these fake devices
                from real ones. We at ORUphones provide advanced technological
                tools to ensure that the device is branded & genuine. This
                eliminates any possibility of fraud and fake deals at ORUphones,
                unlike in other marketplaces. In addition, our Services like
                Data Wipe and Data Backup/restore helps with data privacy and
                minimise any risk of personal information and data leak.
              </p>
            </div>
            <div>
              <p className="font-Roboto-Semibold text-tx"> 03. Convenient</p>
              <p className="font-Roboto-Light text-gx">
                ORUphones is a website that makes selling and buying old phones
                easier. With the provision of the Best Deals section and added
                free services, ORUphones does all the tedious work and puts
                forth verified and authentic deals for buyers and sellers so
                that you can proceed to sell or purchase with assurance and
                ease.
              </p>
            </div>
            <div className="my-2">
              <p className="font-Roboto-light text-gx">
                That apart, our proprietary algorithm curates <br />
                <span className="underline"> Best Deal for Buyers: </span>Save
                up to 30% on curated offers that provide the best quality-price
                ratio.
                <br />
                <span className="underline">Best Deal for Sellers: </span> Get
                the maximum cash for your old Phone with our "Recommended price"
                algorithm
              </p>
            </div>
          </div>
          <div className="container mt-2">
            <p className="font-Roboto-Bold text-px text-primary pt-2 underline mb-3 px-2">
              ORU Office
            </p>
            <img
              className="px-2"
              src={
                "https://d1tl44nezj10jx.cloudfront.net/web/assets/logo_square.svg"
              }
            ></img>
            <p className="font-Roboto-Medium mt-2 text-gx px-2 pb-4">
              Registered Office: Mobilicis India Private Limited, A-66, Scheme
              No. 10, Near Jain Temple, Alwar - 301001, Rajasthan, India,
              Support-9660398594 | CIN: U72900RJ2022PTC079442 . Date of
              incorporation: 02-FEB-2022. Person who may be contacted in case of
              any compliance related queries or grievances : <br></br>
              <b>Manuj purwar</b>
              <br></br>{" "}
              <a
                href="mailto:manuj.purwar@oruphones.com"
                className="text-blue-800"
              >
                manuj.purwar@oruphones.com
              </a>
              <br></br> <b>Anish agarwal</b>
              <br></br>
              <a
                href="mailto:agarwal.anish@oruphones.com"
                className="text-blue-800"
              >
                agarwal.anish@oruphones.com
              </a>
              <br></br> All product names, logos, and brands are property of
              their respective owners. All company, product and service names
              used in this website are for identification purposes only. Use of
              these names, logos, and brands does not imply endorsement.
            </p>
          </div>
        </main>
        <Footer />
      </Fragment>
    </>
  );
}

export default Aboutus;

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

// function Termscondition({ htmlText, error }) {
//   if (error) {
//     return <Error statusCode={404} />;
//   }
function Termscondition() {
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
  //     // const res = await fetchStaticHTML("/terms_conditions.html");
  //     const res = await fetchStaticHTML("/new_terms_conditions.html");
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
        <title>{metaTags.TERMS_CONDITIONS.title}</title>
        <meta
          name="description"
          content={metaTags.TERMS_CONDITIONS.description}
        />
        <meta property="og:title" content={metaTags.TERMS_CONDITIONS.title} />
        <meta
          property="og:description"
          content={metaTags.TERMS_CONDITIONS.description}
        />
      </Head>
      <Fragment>
        <Header5 title={"Terms of service"} />
        <main className="px-4 my-8  pt-24 font-open-sans">
          <section class="condition ">
            <h1 className="font-Roboto-Semibold text-tx">Device condition</h1>
            <h2 className="font-Roboto-Semibold text-gx">Like new:</h2>
            <p className="font-Roboto-Regular text-gx">
              (Like brand-new condition. Suitable for gifting. Also referred to as "Open Box" or "Unboxed" by others)
            </p>
            <p>The device you get in this category should be equivalent to a brand-new handset. The mobile must be in “as
              good as new” condition and should have excellent performance. The software, the specifications, and the
              physical appearance are no less than a new device.</p>
            <div class="img_contianer">
              <img src="/Like New.png" />
            </div>
            <p>What should you expect from a &ldquo;Like New&rdquo;
              condition device:</p>
            <ol>
              <li className=" ">
                <p>Turns on perfectly and all the features work 100%</p>
              </li>
              <li className=" ">
                <p>Battery health is at least 80%</p>
              </li>
              <li className=" ">
                <p>No scratches, no cracks and no dents on the screen and the back</p>
              </li>
              <li className=" ">
                <p>Display in perfect condition (without any discolouration, dead pixels or touch problems)</p>
              </li>
              <li className=" ">
                <p>Housing without any scratches, cracks or dents</p>
              </li>
              <li className=" ">
                <p>&nbsp;The device is completely unlocked (not jailbroken or rooted)</p>
              </li>
              <li className=" ">
                <p>&nbsp;Most likely it comes with a brand warranty or sellers&rsquo; warranty&nbsp;</p>
              </li>
              <li className=" ">
                <p>&nbsp;You might get original accessories with this device (Box, charger etc.)</p>
              </li>
            </ol>
            <p>We recommend the buyers verify the device using
              ORUphones app before making their purchase. You can either raise a &ldquo;verification request&rdquo; to
              the seller or verify the device by yourself at the time of purchase.&nbsp;</p>

            <h2>Excellent :</h2>
            <p className=" ">(Still suitable for gifting)</p>
            <p>
              The device you get in this category should be in excellent condition. No hardware and software damage is
              expected, and the phone provides very good performance. This mobile will carry out all the tasks efficiently
              and without any lag. The mobile justifies its value in various aspects of day-to-day tasks.
            </p>
            <div class="img_contianer">
              <img src="/Excellent.png" />
            </div>
            <p>What should you expect from an &ldquo;Excellent&rdquo; condition device:</p>
            <ol>
              <li className=" ">
                <p>Turns on perfectly and all the features work 100%</p>
              </li>
              <li className=" ">
                <p>Battery health is at least 80%</p>
              </li>
              <li className=" ">
                <p>No cracks and no dents on the screen and the back</p>
              </li>
              <li className=" ">
                <p>It May have minor scratches on the screen or the back; only visible if you hold the product closer
                  than arm&apos;s length</p>
              </li>
              <li className=" ">
                <p>Display in perfect condition (without any discolouration, dead pixels or touch problems)</p>
              </li>
              <li className=" ">
                <p>The housing may have scratches, but no cracks or dents</p>
              </li>
              <li className=" ">
                <p>The device is completely unlocked (not jailbroken or rooted)</p>
              </li>
            </ol>
            <p>We recommend the buyers verify the device using ORUphones app before making their purchase. You can either
              raise a &ldquo;verification request&rdquo; to the seller or verify the device by yourself at the time of
              purchase.&nbsp;</p>

            <h2>Good:</h2>
            <p className=" ">(Moderately used device in a 100% working condition)</p>
            <p>The device you get in this category should be in a reasonable condition. These are moderately used devices
              and are fully functional. The mobile has undergone slight wear and tear on its software and hardware;
              handling workloads and functioning adequately well in a broader aspect. </p>
            <div class="img_contianer">
              <img src="/Good.png" />
            </div>

            <p>What should you expect from a &ldquo;Good&rdquo; condition device:</p>
            <ol>
              <li className=" ">
                <p>Turns on perfectly and all the features work 100%</p>
              </li>
              <li className=" ">
                <p>Battery health is at least 80%</p>
              </li>
              <li className=" ">
                <p>No cracks on the screen and back</p>
              </li>
              <li className=" ">
                <p>It May have scratches on the screen or the back; visible even if you hold the product at arm&apos;s
                  length</p>
              </li>
              <li className=" ">
                <p>Display in good condition (may have a light discolouration, but no dead pixels or touch problems)</p>
              </li>
              <li className=" ">
                <p>Housing can have scratches, but cannot be bent or cracked</p>
              </li>
              <li className=" ">
                <p>The device is completely unlocked (not jailbroken or rooted)</p>
              </li>
            </ol>
            <p>We recommend the buyers verify the device using ORUphones app before making their purchase. You can either
              raise a &ldquo;verification request&rdquo; to the seller or verify the device by yourself at the time of
              purchase</p>

            <h2>Fair:</h2>
            <p className=" ">(Heavily used device. 100% working condition)</p>
            <p>The device you get in this category has been heavily used. Still, the device should be 100% functional.</p>
            <div class="img_contianer">
              <img src="/Fair.png" />
            </div>

            <p>What should you expect from a &ldquo;Fair&rdquo; condition device:</p>
            <ol>
              <li className=" ">
                <p>The device must have all of its components (no missing parts)</p>
              </li>
              <li className=" ">
                <p>The device may have minor software problems</p>
              </li>
              <li className=" ">
                <p>Battery health might be less than 80%</p>
              </li>
              <li className=" ">
                <p>The screen and/or back might have any scratches, dents but NO cracks</p>
              </li>
              <li className=" ">
                <p>The display may have discolouration but is fully functional</p>
              </li>
              <li className=" ">
                <p>Housing can have scratches and minor dents, but cannot be bent or cracked</p>
              </li>
              <li className=" ">
                <p>The device is completely unlocked (not jailbroken or rooted)</p>
              </li>
            </ol>
            <p>We recommend the buyers verify the device using ORUphones app before making their purchase. You can either
              raise a &ldquo;verification request&rdquo; to the seller or verify the device by yourself at the time of
              purchase</p>

            <h2>Needs Repair:</h2>
            <p className=" ">(As the name suggests, these devices can be fully functional after some repair work.
              This could be a good bargain where you can get a device at a dirt cheap price and repair it, to turn this
              into a fully functional excellent condition smartphone.)</p>
            <p>Devices in this category have been heavily used and may have missing parts, cracked screen/back or
              software/hardware problems including Power-on issues.</p>
            <div class="img_contianer">
              <img src="/Fair.png" />
            </div>

            <p>What should you expect from a
              &ldquo;Needs&nbsp;Repair&rdquo; condition device:</p>
            <ol>
              <li className=" ">
                <p>The device may have missing parts</p>
              </li>
              <li className=" ">
                <p>May not power on</p>
              </li>
              <li className=" ">
                <p>It May have software problems</p>
              </li>
              <li className=" ">
                <p>Battery health might be less than 80%</p>
              </li>
              <li className=" ">
                <p>One or more features might not be working properly, such as cameras, connectivity, speakers and
                  others</p>
              </li>
              <li className=" ">
                <p>Screen and/or back might have any type of scratches, dents or cracks</p>
              </li>
              <li className=" ">
                <p>The display can be faulty (may have discolouration, dead pixels or not be functional)</p>
              </li>
              <li className=" ">
                <p>Housing can have scratches and dents or can be cracked</p>
              </li>
            </ol>

          </section>
        </main>
        <Footer />
      </Fragment>
    </>
  );
}

export default Termscondition;

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
//     const { serverUrl, templateUrls } = staticDataPath;
//     const res = await fetchStaticHTML(serverUrl + templateUrls.TERMS_CONDITIONS);
//     const html = res.data;
//     const doc = nodeParser(html);
//     const body = doc.querySelector("body");
//     htmlText = body.innerHTML;
//   } catch (err) {
//     console.log("getTC error", err);
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

import Header2 from "@/components/Header/header2";
import { Fragment, useEffect, useState } from "react";
import parse from "html-react-parser";
import Footer from "@/components/Footer";
import { infoTemplates } from "api-call";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import fetchStaticHTML from "api-call/fetchStaticHtml";
import faqImg from "@/assets/FAQs.png";
import Image from "next/image";
import Head from "next/head";
import { metaTags } from "@/utils/constant";

// function Faq({ htmlText, error }) {
//   if (error) {
//     return <Error statusCode={404} />;
//   }
function Faq() {
  const [htmlText1, setHtmlText1] = useState("");

  useEffect(() => {
    callStaticPages();
  }, []);

  async function callStaticPages() {
    // let staticDataPath;
    // try {
    //   const response = await infoTemplates();
    //   staticDataPath = response?.dataObject;
    // } catch (error) {
    //   console.log(error);
    // }

    var htmlText;
    try {
      // const { serverUrl, templateUrls } = staticDataPath;
      // const res = await fetchStaticHTML("/faq.html");
      const res = await fetchStaticHTML("/new_faq.html");
      // const res = await fetchStaticHTML(serverUrl + templateUrls.VERIFICATION);
      const html = res.data;
      const doc = nodeParser(html);
      const body = doc.querySelector("body");
      htmlText = body.innerHTML;
      setHtmlText1(htmlText);
    } catch (err) {
      console.log("getVerificationConent error", err);
    }
  }

  return (
    <>
      <Head>
        <title>{metaTags.FAQ.title}</title>
        <meta name="description" content={metaTags.FAQ.description} />
        <meta property="og:title" content={metaTags.FAQ.title} />
        <meta property="og:description" content={metaTags.FAQ.description} />
      </Head>
      <Fragment>
        <Header2 title={"FAQ"} />

        <main className="px-4 my-4 font-open-sans">
          <div className="flex justify-center my-6">
            <Image src={faqImg} width={230} height={163} objectFit="contain" />
          </div>
          {parse(htmlText1)}
        </main>
        <Footer />
      </Fragment>
    </>
  );
}

export default Faq;

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
//     const res = await fetchStaticHTML(serverUrl+templateUrls.FAQ);
//     const html = res.data;
//     const doc = nodeParser(html);
//     const body = doc.querySelector("body");
//     htmlText = body.innerHTML;
//   } catch (err) {
//     console.log("getFQA error", err);
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

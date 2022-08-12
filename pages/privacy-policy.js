import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import { infoTemplates } from "api-call";
import fetchStaticHTML from "api-call/fetchStaticHtml";
import Header2 from "@/components/Header/header2";
import { Fragment, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Head from "next/head";
import { metaTags } from "@/utils/constant";

// function PrivacyPolicy({ htmlText, error }) {
//   if (error) {
//     return <Error statusCode={404} />;
//   }
function PrivacyPolicy() {
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
      // const res = await fetchStaticHTML("/privacy_policy.html");
      const res = await fetchStaticHTML("/new_privacy_policy.html");
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
        <title>{metaTags.PRIVACY.title}</title>
        <meta name="description" content={metaTags.PRIVACY.description} />
        <meta property="og:title" content={metaTags.PRIVACY.title} />
        <meta
          property="og:description"
          content={metaTags.PRIVACY.description}
        />
      </Head>
      <Fragment>
        <Header2 title={"Privacy Policy"} />
        <main className="my-8">{parse(htmlText1)}</main>
        <Footer />
      </Fragment>
    </>
  );
}

export default PrivacyPolicy;

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
//     const res = await fetchStaticHTML(serverUrl + templateUrls.PRIVATE_POLICY);
//     const html = res?.data || "";
//     const doc = nodeParser(html);
//     const body = doc.querySelector("body");
//     htmlText = body?.innerHTML || "";
//   } catch (err) {
//     console.log("PRIVATE_POLICY error", err);
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

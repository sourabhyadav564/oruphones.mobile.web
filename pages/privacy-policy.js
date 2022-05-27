import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import { infoTemplates } from "api-call";
import fetchStaticHTML from "api-call/fetchStaticHtml";
import Header2 from "@/components/Header/header2";
import { Fragment } from "react";
import Footer from "@/components/Footer";

function PrivacyPolicy({ htmlText, error }) {
  if (error) {
    return <Error statusCode={404} />;
  }
  return (
    <Fragment>
      <Header2 title={"Privacy Policy"} />
      <main className="my-8">{parse(htmlText)}</main>
      <Footer />
    </Fragment>
  );
}

export default PrivacyPolicy;

export async function getServerSideProps() {
  let staticDataPath;
  try {
    const res = await infoTemplates();
    staticDataPath = res?.dataObject;
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: true,
      },
    };
  }

  var htmlText;
  try {
    const { serverUrl, templateUrls } = staticDataPath;
    const res = await fetchStaticHTML(serverUrl + templateUrls.PRIVATE_POLICY);
    const html = res?.data || "";
    const doc = nodeParser(html);
    const body = doc.querySelector("body");
    htmlText = body?.innerHTML || "";
  } catch (err) {
    console.log("PRIVATE_POLICY error", err);
    return {
      props: {
        error: true,
      },
    };
  }

  return {
    props: {
      htmlText: htmlText,
    },
    // revalidate: 60*60*24, // In seconds
  };
}

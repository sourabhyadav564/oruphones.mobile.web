import Header2 from "@/components/Header/header2";
import { Fragment } from "react";
import parse from "html-react-parser";
import Footer from "@/components/Footer";
import { infoTemplates } from "api-call";
import { parse as nodeParser } from "node-html-parser";
import Error from "next/error";
import fetchStaticHTML from "api-call/fetchStaticHtml";

function Aboutus({ htmlText, error }) {
  if (error) {
    return <Error statusCode={404} />;
  }
  return (
    <Fragment>
      <Header2 title={"About Us"} />
      <main className="px-4 my-4 font-open-sans">{parse(htmlText)}</main>
      <Footer />
    </Fragment>
  );
}

export default Aboutus;

//export const getStatic = async () => {

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
    const {serverUrl,templateUrls} = staticDataPath;
    const res = await fetchStaticHTML(serverUrl+templateUrls.ABOUT_US);
    const html = res.data;
    const doc = nodeParser(html);
    const body = doc.querySelector("body");
    htmlText = body.innerHTML;
  } catch (err) {
    console.log("getAboutUsConent error", err);
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

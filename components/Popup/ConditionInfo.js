import fetchStaticHTML from "api-call/fetchStaticHtml";
import { useEffect, useState } from "react";
import Modal from "./Modal1";
import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";

function ConditionInfo({ open, setOpen }) {
  const [htmlText1, setHtmlText1] = useState("");

  useEffect(() => {
    callStaticPages();
  }, []);

  async function callStaticPages() {
    // /console.log("-->");
    // let staticDataPath;
    // try {
    //   const response = await infoTemplates();
    //   console.log("--> res ", response);
    //   staticDataPath = response?.dataObject;
    //   console.log("--> staticDataPath ", staticDataPath);
    // } catch (error) {
    //   console.log(error);
    // }

    var htmlText;
    try {
      // const { serverUrl, templateUrls } = staticDataPath;
      const res = await fetchStaticHTML("/condition.html");
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
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white p-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 sm:mt-0 sm:ml-4">
            {/* <Dialog.Title as="h3" className="text-lg leading-6 font-semibold text-gray-900">
              Benefits Of Verification
            </Dialog.Title> */}
            <div className="mt-2 text-sm text-gray-500">{parse(htmlText1)}</div>
          </div>
        </div>
      </div>
      {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div> */}
    </Modal>
  );
}

export default ConditionInfo;

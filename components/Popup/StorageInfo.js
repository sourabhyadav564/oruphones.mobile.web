import fetchStaticHTML from "api-call/fetchStaticHtml";
import { useEffect, useState } from "react";
import Modal from "./Modal1";
import parse from "html-react-parser";
import { parse as nodeParser } from "node-html-parser";

function StorageInfo({ open, setOpen, brand }) {
  const [htmlText1, setHtmlText1] = useState("");
  useEffect(() => {
    callStaticPages();
  }, []);

  async function callStaticPages() {
    var htmlText;
    try {
      const res = await fetchStaticHTML(
        `${brand.toLowerCase() === "apple"
          ? "/apple_storage_check.html"
          : "/android_storage_check.html"
        }`
      );
      const html = res.data;
      const doc = nodeParser(html);
      const body = doc.querySelector("body");
      htmlText = body.innerHTML;
      setHtmlText1(htmlText);
    } catch (err) {
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white p-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <div className="mt-2">
              <p className="text-sm text-gray-500">{parse(htmlText1)}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default StorageInfo;

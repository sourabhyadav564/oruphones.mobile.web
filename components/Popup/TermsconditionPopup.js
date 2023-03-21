import Header2 from "@/components/Header/header2";
import { Fragment, useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import Footer from "@/components/Footer";
import { infoTemplates } from "api-call";
import { parse as nodeParser } from "node-html-parser";
import fetchStaticHTML from "api-call/fetchStaticHtml";
import { Dialog, Transition } from "@headlessui/react";
import Cookies from "js-cookie";

function TermsconditionPopup({ open, setOpen }) {
  const [htmlContent, setHtmlContent] = useState("<span></span>");
  useEffect(() => {
    const apiCall = async () => {
      const { htmlText } = await callFetchStaticHTML();
      setHtmlContent(htmlText);
    };
    apiCall();
  }, []);
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment} initialFocus={cancelButtonRef}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="min-h-screen">
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white">
              <Header2 title={"Terms & Conditions"} setOpen={setOpen} />
              <main className="font-open-sans">
                <div className="flex justify-center"></div>
                {parse(htmlContent)}
              </main>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default TermsconditionPopup;

async function callFetchStaticHTML() {
  let staticDataPath;
  var htmlText;
  try {
    const res = await infoTemplates(Cookies.get("sessionId"));
    staticDataPath = res?.dataObject;
  } catch (error) {
    return {
      htmlText: "<p></p>",
    };
  }

  try {
    const { serverUrl, templateUrls } = staticDataPath;
    const res = await fetchStaticHTML("/new_terms_conditions.html");
    const html = res.data;
    const doc = nodeParser(html);
    const body = doc.querySelector("body");
    htmlText = body.innerHTML;
  } catch (err) {
    return {
      htmlText: "<p></p>",
    };
  }

  return {
    htmlText: htmlText,
  };
}

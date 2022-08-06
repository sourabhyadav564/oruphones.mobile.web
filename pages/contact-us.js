import Footer from "@/components/Footer";
import Input from "@/components/Form/Input";
import TextArea from "@/components/Form/TextArea";
import Header2 from "@/components/Header/header2";
import { metaTags } from "@/utils/constant";
import { contactUs } from "api-call";
import Head from "next/head";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

function ContactUS() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [message, setMessage] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    let payload = {
      name,
      email,
      mobile,
      message,
    };
    if (
      name != "" &&
      name != undefined &&
      email != "" &&
      email != undefined &&
      message != "" &&
      message != undefined &&
      mobile != "" &&
      mobile != undefined
    ) {
      contactUs(payload).then((response) => {
        toast.info(response?.reason, {
          position: toast.POSITION.TOP_CENTER,
        });
        window.location.reload();
      });
    } else {
      console.log("error");
      if (name == undefined) {
        setName("");
      }
      if (email == undefined) {
        setEmail("");
      }
      if (message == undefined) {
        setMessage("");
      }
      if (mobile == undefined) {
        setMobile("");
      }
    }
  }
  return (
    <>
      <Head>
        <title>{metaTags.CONTACT_US.title}</title>
        <meta name="description" content={metaTags.CONTACT_US.description} />
        <meta property="og:title" content={metaTags.CONTACT_US.title} />
        <meta
          property="og:description"
          content={metaTags.CONTACT_US.description}
        />
      </Head>
      <Fragment>
        <Header2 title={"Contact us"} />
        <main className="p-4">
          <section className="my-6 space-y-3">
            <div className="flex flex-col">
              <Input
                className={"mb-6"}
                type="text"
                onChange={(e) => setName(e.target.value)}
              >
                {" "}
                Name{" "}
              </Input>
              {name == "" && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red -mt-3">
                  Please select this field
                </p>
              )}
            </div>
            <div>
              <Input
                className={"mb-6"}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              >
                {" "}
                Email ID{" "}
              </Input>
              {email == "" && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red -mt-3">
                  Please select this field
                </p>
              )}
            </div>
            <div>
              <Input
                className={"mb-6"}
                type="number"
                onChange={(e) => setMobile(e.target.value)}
              >
                {" "}
                Mobile No{" "}
              </Input>
              {mobile == "" && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red -mt-3">
                  Please select this field
                </p>
              )}
            </div>
            <div>
              <TextArea
                type="text"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
              >
                Message
              </TextArea>
              {message == "" && (
                <p className="text-sm whitespace-nowrap cursor-pointer text-red mt-2">
                  Please select this field
                </p>
              )}
            </div>
            <button
              className="block bg-primary my-6 w-52 px-4 py-2 rounded text-white mx-auto"
              onClick={handleSubmit}
            >
              {" "}
              Submit{" "}
            </button>
          </section>
          <h2 className="text-black font-bold my-2">Connect with us</h2>
          <section>
            {/* <div>
            <span className="text-black font-semibold">Give us a call</span>
            <p className="text-black-20 mb-4"> +91 999 123 1234 </p>
          </div> */}
            <div>
              <span className="text-black font-semibold">Send us an email</span>
              <p className="text-black-20 mb-4">contact@oruphones.com</p>
            </div>
          </section>
        </main>
        <Footer />
      </Fragment>
    </>
  );
}

export default ContactUS;

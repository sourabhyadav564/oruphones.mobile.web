import Footer from "@/components/Footer";
import Input from "@/components/Form/Input";
import TextArea from "@/components/Form/TextArea";
import Header2 from "@/components/Header/header2";
import { Fragment } from "react";

function ContactUS() {
  return (
    <Fragment>
      <Header2 title={"Contact us"} />
      <main className="p-4">
        <section className="my-6">
          <Input className={"mb-6"}> Name </Input>
          <Input className={"mb-6"}> Email ID </Input>
          <Input className={"mb-6"}> Mobile No </Input>
          <TextArea type="text" name="message">
            Message
          </TextArea>
          <button className="block bg-primary my-6 w-52 px-4 py-2 rounded text-white mx-auto"> Submit </button>
        </section>
        <h2 className="text-black font-bold my-2">Connect with us</h2>
        <section>
          <div>
            <span className="text-black font-semibold">Give us a call</span>
            <p className="text-black-20 mb-4"> +91 999 123 1234 </p>
          </div>
          <div>
            <span className="text-black font-semibold">Send us an email</span>
            <p className="text-black-20 mb-4">contact@oruphones.com</p>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default ContactUS;

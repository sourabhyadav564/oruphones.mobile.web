import Image from "next/image";
import service_img from "@/assets/service_img.png";
import { Fragment, useState } from "react";
import { servicesData } from "@/utils/constant";
import Footer from "@/components/Footer";
import VerifyFlowPopup from "@/components/Popup/VerifyFlowPopup";
import BottomNav from "@/components/Navigation/BottomNav";

function Services() {
  const [openApp, setOpenApp] = useState(false);
  return (
    <Fragment>
      <div className="p-4 text-lg bg-primary text-white text-center rounded-b-2xl">
        <div className="w-52 my-4 mx-auto ">
          <Image src={service_img} width={"208px"} height={"100%"} objectFit="contain" layout="responsive" />
        </div>
        <h1>Services</h1>
      </div>
      <main className="px-3 my-4 grid">
        {servicesData.map((item, index) => (
          <div key={index} className="border py-2 px-4 pl-0 flex items-center rounded shadow mb-3" onClick={() => setOpenApp(true)}>
            <div className="p-4">
              <Image src={item?.imgSrc || "/"} width={"48"} height={"30"} objectFit="contain" />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-20">{item.title}</h2>
              <p className="text-sm text-gray-70">{item.description}</p>
            </div>
          </div>
        ))}
      </main>
      <Footer />
      <BottomNav />
      <VerifyFlowPopup open={openApp} setOpen={setOpenApp} />
    </Fragment>
  );
}

export default Services;

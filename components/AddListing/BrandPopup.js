
import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import Modal1 from "../Popup/Modal1";
import { fetchBrands } from "api-call";
import BrandCard from "../Card/BrandCard";

import { addListingBrandState } from "../../atoms/globalState";
import { useRecoilState } from "recoil";

function BrandPopup({ open, setOpen }) {
  const [brands, setBrands] = useState([]);
  const [brandState, setBrandState] = useRecoilState(addListingBrandState);


  useEffect(() => {
    if (JSON.parse(localStorage.getItem("brands"))?.length > 0) {
      setBrands(JSON.parse(localStorage.getItem("brands")));
    } else {
      const callApi = () => {
        if (!open) return null;
        fetchBrands().then(
          (response) => {
            setBrands(response.dataObject);
            localStorage.setItem("brands", JSON.stringify(response.dataObject));
          },
          (err) => console.error(err)
        );
      };
      callApi();
    }
  }, [open]);

  brands.sort((list2, list1) => list2.displayOrder - list1.displayOrder);

  return (
    <Modal1 open={open} setOpen={setOpen}>
      <div className="bg-white">
        <div className="text-left sm:mt-0 sm:ml-4 sm:text-left text-black-4e">
          <Dialog.Title
            as="h1"
            className="text-lg leading-6 font-Roboto-Semibold px-4 py-6"
          >
            Select Brand
          </Dialog.Title>
          <main className="text-sm grid grid-cols-3 sm:grid-cols-5">
            {brands &&
              brands.map((item, index) => (
                <div
                  key={index}
                  className="bg-green-700 border-2 border-gray-100"
                  onClick={() => {
                    setBrandState(item?.make);
                    setOpen(false);
                  }}
                >
                  <BrandCard
                    data={item}
                    className="rounded-none border-0 bg-white"
                    popup={true}
                  />
                </div>
              ))}
          </main>
        </div>
      </div>
    </Modal1>
  );
}

export default BrandPopup;

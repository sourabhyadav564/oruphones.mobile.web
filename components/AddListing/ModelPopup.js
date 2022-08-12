import { Dialog } from "@headlessui/react";
import Modal1 from "../Popup/Modal1";
import { BiSearch } from "react-icons/bi";

import { addListingModelState } from "../../atoms/globalState";
import { useRecoilState } from "recoil";
import React, { useEffect } from "react";

function ModelPopup({ open, setOpen, mktNameOpt }) {
  const [modelState, setModelState] = useRecoilState(addListingModelState);
  const [models, setModels] = React.useState([]);

  useEffect(() => {
    setModels(mktNameOpt);
  }, [mktNameOpt]);

  const getResults = (query) => {
    let data = mktNameOpt.filter((item) => {
      return item.marketingname.toLowerCase().includes(query.toLowerCase());
    });
    setModels(data);
  };

  return (
    <Modal1 open={open} setOpen={setOpen}>
      <div className="bg-white h-screen">
        <div className="text-left sm:mt-0 sm:ml-4 sm:text-left text-black-4e mx-2">
          <Dialog.Title
            as="h1"
            className="text-lg leading-6 font-semibold px-4 py-6 -mx-2"
          >
            Select Model
          </Dialog.Title>
          <div className="border-2 border-gray-200 w-full p-2 flex items-center justify-start space-x-2 rounded-md">
            <BiSearch className="text-2xl" />
            <input
              type="text"
              placeholder="Search model here..."
              className="flex-1 text-sm"
              onChange={(e) => {
                getResults(e.target.value);
              }}
            />
          </div>
          <main className="text-sm -mx-2">
            {models &&
              models.map((item, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gray-200 active:bg-gray-300 duration-300"
                  onClick={() => {
                    setModelState(item.marketingname);
                    setOpen(false);
                  }}
                >
                  <p>{item.marketingname}</p>
                </div>
              ))}
          </main>
        </div>
      </div>
    </Modal1>
  );
}

export default ModelPopup;

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseCircle from "@/assets/close1.svg";
import Image from "next/image";

function Modal1({ open, setOpen, children }) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment} initialFocus={cancelButtonRef}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
            <div className="flex flex-col items-center">
              <div ref={cancelButtonRef} className="text-white text-4xl z-50 mb-3 cursor-pointer">
                {/* <IoCloseCircleOutline onClick={() => setOpen(false)} /> */}
                <Image src={CloseCircle} width={36} height={36} onClick={() => setOpen(false)}/>
              </div>
              <div
                style={{ maxHeight: "280vh" }}
                className="inline-block align-bottom bg-white rounded-t-2xl overflow-hidden overflow-y-auto cardShadow1 transform transition-all w-screen max-w-md"
              >
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal1;

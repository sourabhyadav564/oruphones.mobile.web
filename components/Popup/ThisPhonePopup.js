import Modal2 from './Modal2'
import { FiAlertOctagon } from "react-icons/fi";
import { useEffect } from 'react';

function ThisPhonePopup({open,setOpen}) {
  //   useEffect(() => {
//     const onBackButtonEvent = (e) => {
//         e.preventDefault();
//         setOpen(false);
//     }

//     window.history.pushState(null, null, window.location.pathname);
//     window.addEventListener('popstate', onBackButtonEvent);
//     return () => {
//         window.removeEventListener('popstate', onBackButtonEvent);  
//     };
// });
    
    return(
    <>
    <Modal2 open={open} setOpen={setOpen} title={"This device is unverified"}>
     <div className="flex flex-col items-center max-w-2xl px-6 text-base text-black-4e py-8  ">
      
        <FiAlertOctagon size={44} color="#f7e17d" />
        {/* <p className="font-Roboto-Bold text-xl mt-1"></p> */}
        <div className="text-md my-2 text-center font-Roboto-Regular">
          <p>
            You are currently viewing the same listing. 
          </p>
        </div>
        <div className="mb-2 mt-4  flex items-center ">
          <button
            className=" border border-primary font-Roboto-Semibold text-regularFontSize uppercase px-12 py-2 rounded bg-primary-light text-white "
            onClick={() => {
            //   setShowNumber(true);
              setOpen(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
      {/* <RequestVerificationSuccessPopup open={openRequestVerificationSuccessPopup} data={resData} setOpen={setRequestVerificationSuccessPopup}/> */}
    </Modal2>
    </>
);
};
export default ThisPhonePopup;
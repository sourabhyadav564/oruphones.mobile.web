import { useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Modal2 from "./Modal2";

function DeleteAccPopup({ open, setOpen, setDelete }) {

    const handleSubmit = () => {
        setOpen(false);
        setDelete(true);
    }
    useEffect(() => {
        if (open) {
            const onBackButtonEvent = (e) => {
                e.preventDefault();
                setOpen(false);
            }

            window.history.pushState(null, null, window.location.pathname);
            window.addEventListener('popstate', onBackButtonEvent);
            return () => {
                window.removeEventListener('popstate', onBackButtonEvent);
            };
        } else {
            const onBackButtonEvent = (e) => {
                e.preventDefault();
                window.history.back();
            }
            window.history.pushState(null, null, window.location.pathname);
            window.addEventListener('popstate', onBackButtonEvent);
            return () => {
                window.removeEventListener('popstate', onBackButtonEvent);
            };
        }
    }, [open]);
    const handleCancel = () => {
        setOpen(false);
        setDelete(false);
    }
    return (
        <Modal2 open={open} setOpen={setOpen}>
            <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e">
                <RiErrorWarningLine
                    size={52}
                    color="#FFC107"
                />
                <h1 className="font-Roboto-Bold mb-2 mt-3">Do you really want to delete your Account? </h1>
                <div className="mb-2 mt-4 font-Roboto-Regular">
                    <span
                        onClick={handleCancel}
                    >
                        <span className="border border-primary w-32 px-4 mx-1 py-2  rounded text-primary"> Cancel </span>
                    </span>
                    <a
                        onClick={handleSubmit}
                    >
                        <span className="border border-primary w-24 px-4 mx-3 py-2 rounded bg-primary text-white"> Yes, I Want </span>
                    </a>
                </div>
            </div>
        </Modal2>
    );
}

export default DeleteAccPopup;

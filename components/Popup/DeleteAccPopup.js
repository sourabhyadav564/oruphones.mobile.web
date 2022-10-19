import { RiErrorWarningLine } from "react-icons/ri";
import Modal2 from "./Modal2";

function DeleteAccPopup({ open, setOpen, setDelete }) {

    const handleSubmit = () => {
        setOpen(false);
        setDelete(true);
    }

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
                <h1 className="font-bold mb-2 mt-3">Do you really want to delete your Account? </h1>
                <div className="mb-2 mt-4">
                    <span
                        onClick={handleCancel}
                    >
                        <span className="border border-primary w-32 px-1 mx-1 py-2 rounded text-primary"> CANCEL </span>
                    </span>
                    <a
                        onClick={handleSubmit}
                    >
                        <span className="border border-primary w-24 px-3 mx-3 py-2 rounded bg-primary text-white"> YES, I WANT </span>
                    </a>
                </div>
            </div>
        </Modal2>
    );
}

export default DeleteAccPopup;

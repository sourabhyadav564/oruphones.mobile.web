import ErrorWarningAlert from "@/assets/alert.svg";
import Modal2 from "./Modal2";
import Image from "next/image";

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
                <Image src={ErrorWarningAlert} width={52} height={52}/>
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

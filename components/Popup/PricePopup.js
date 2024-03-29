
import ErrorwarningAlert from "@/assets/alert.svg";
import Modal2 from "./Modal2";
import Image from "next/image";

function PricePopup({ open, setOpen, price, leastPrice, maxPrice, setSubmitting }) {
    const handleSubmit = () => {
        setOpen(false);
        setSubmitting(true);
    }

    const handleChange = () => {
        setOpen(false);
        setSubmitting(false);
    }

    const priceDiff = price < leastPrice ? "Low" : price > maxPrice && "High";
    return (
        <Modal2 open={open} setOpen={setOpen}>
            <div className="flex flex-col items-center max-w-sm px-6 text-base text-black-4e">
                {/* <RiErrorWarningLine
                    size={52}
                    color="#FFC107"
                /> */}
                <Image src={ErrorwarningAlert} width={52} height={52}/>
                <p className="text-dx font-Roboto-Bold mb-2 mt-3">Your sell price is too {priceDiff} </p>
                <p className="text-xs my-2 font-Roboto-Regular text-center">
                    Our {priceDiff}est recommended price for your listing is ₹{priceDiff == "Low" ? leastPrice : maxPrice}. Do you want to submit the listing at such a {priceDiff} price of ₹{price}?
                </p>
                <div className="mb-2 mt-4 font-Roboto-Medium">
                    <span
                        onClick={handleChange}
                    >
                        <span className="border border-primary w-32 px-1 mx-1 py-2 rounded text-primary"> CHANGE PRICE </span>
                    </span>
                    <a
                        onClick={handleSubmit}
                    >
                        <span className="border border-primary w-24 px-3 mx-3 py-2 rounded bg-primary text-white"> SUBMIT </span>
                    </a>
                </div>
            </div>
        </Modal2>
    );
}

export default PricePopup;

import Modal3 from "./Modal3";
import Link from "next/link";

function ShopByPopup({ open, setOpen }) {

  const priceRangeData = [
    {
      id: 1,
      text: "₹10K",
      min: "0",
      max: "10000",
      alpha: "under_ten",
      bracket: "Under",
      type: "Price",
    },
    {
      id: 2,
      text: "₹30K",
      min: "10000",
      max: "30000",
      alpha: "under_thirty",
      bracket: "Under",
      type: "Price",
    },
    {
      id: 3,
      text: "₹50K",
      min: "30000",
      max: "50000",
      alpha: "under_fifty",
      bracket: "Under",
      type: "Price",
    },
    {
      id: 4,
      text: "₹50K+",
      min: "50000",
      max: "200000",
      alpha: "above_fifty",
      bracket: "Above",
      type: "Price",
    },
  ];

  return (
    <>
      <Modal3 open={open} setOpen={setOpen}>
        <div className="h-full px-5 py-2 cardShadow1 rounded-lg  grid grid-cols-2 gap-5">
          {priceRangeData.map((item, index) => (
            <Link
              href={`/shopby/pricerange/${item.min}/${item.max}`}
              key={index}
            >
              <p
                className="bg-gray-200 flex flex-col items-center justify font-Roboto-Semibold center px-5 py-2 rounded-md hover:cursor-pointer hover:bg-gray-300 active:bg-gray-400 duration-300"
              >
                {item.bracket}{" "}
                <span className="font-Roboto-Semibold">{item.text}</span>
              </p>
            </Link>
          ))}
        </div>
      </Modal3>
    </>
  );
}

export default ShopByPopup;

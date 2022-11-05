import Image from "next/image";
import box from "@/assets/box.png";
import ram from "@/assets/ram.png";
import color from "@/assets/color.png";
import storage from "@/assets/storage.png";
import calendar1 from "@/assets/calendar-1.png";
import calendar2 from "@/assets/calendar-2.png";
import calendar3 from "@/assets/calendar-3.png";
import { BsInfoCircle } from "react-icons/bs";

function IconLabelValue({
  label,
  value,
  showInfoPopup,
  textAsLink,
  showRequestVerificarionSuccessPopup,
}) {
  if (label) {
    return (
      <div className="flex items-start space-x-3 justify-center min-h-14">
        <div>
          {label.toUpperCase().includes("RAM") ? (
            <Image src={ram} width="30" height="30" objectFit="contain" />
          ) : label.toUpperCase().includes("COLOR") ? (
            <Image src={color} width="30" height="30" objectFit="contain" />
          ) : label.toUpperCase().includes("STORAGE") ? (
            <Image src={storage} width="30" height="30" objectFit="contain" />
          ) : label.toUpperCase().includes("ACCESSORIES") ? (
            <Image src={box} width="30" height="30" objectFit="contain" />
          ) : label.toUpperCase().includes("WARRANTY") ? (
            <Image src={calendar2} width="30" height="30" objectFit="contain" />
          ) : label.toUpperCase().includes("CONDITION") ? (
            <Image src={calendar2} width="30" height="30" objectFit="contain" />
          ) : label.toUpperCase().includes("VERIFIED") ? (
            <Image src={calendar1} width="30" height="40" objectFit="contain" />
          ) : label.toUpperCase().includes("LISTED") ? (
            <Image src={calendar3} width="30" height="30" objectFit="contain" />
          ) : (
            ""
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          {showInfoPopup ? (
            <span className="text-xs text-black-7e capitalize flex items-center">
              {label}{" "}
              <BsInfoCircle
                className="ml-1 cursor-pointer"
                onClick={showInfoPopup}
              />
            </span>
          ) : (
            <span className="text-jx font-Light text-black-7e capitalize">{label}</span>
          )}
          {showInfoPopup ? (
            <p
              className={
                textAsLink
                  ? "text-mx font-Medium whitespace-nowrap underline cursor-pointer text-[#373737] hover:text-blue-800"
                  : "text-mx font-Medium flex items-center text-[#373737] capitalize"
              }
              onClick={showRequestVerificarionSuccessPopup}
            >
              {value}
            </p>
          ) : (
            <p className="text-mx font-Medium flex items-center  capitalize text-[#373737]">
              {value}
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
}

export default IconLabelValue;

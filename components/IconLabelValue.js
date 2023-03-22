import Image from "next/image";
import InfoCircle from "@/assets/infocircle2.svg";
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
            <Image
              src="https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/memory.svg"
              width="30"
              height="30"
              objectFit="contain"
            />
          ) : label.toUpperCase().includes("COLOR") ? (
            <Image
              src="https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/color.svg"
              width="30"
              height="30"
              objectFit="contain"
            />
          ) : label.toUpperCase().includes("STORAGE") ? (
            <Image
              src="https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/micro-sd.svg"
              width="30"
              height="30"
              objectFit="contain"
            />
          ) : label.toUpperCase().includes("ACCESSORIES") ? (
            <Image
              src="https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/charger2.svg"
              width="30"
              height="30"
              objectFit="contain"
            />
          ) : label.toUpperCase().includes("WARRANTY") ? (
            <Image
              src="https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/warranty.svg"
              width="30"
              height="30"
              objectFit="contain"
            />
          ) : label.toUpperCase().includes("CONDITION") ? (
            <Image
              src="https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/quality.svg"
              width="30"
              height="30"
              objectFit="contain"
            />
          ) : label.toUpperCase().includes("VERIFIED") ? (
            <Image
              src="https://d1tl44nezj10jx.cloudfront.net/web/assets/calendar-1.svg"
              width="30"
              height="40"
              objectFit="contain"
            />
          ) : label.toUpperCase().includes("LISTED") ? (
            <Image
              src={
                "https://d1tl44nezj10jx.cloudfront.net/assets/svgicons/calendar.svg"
              }
              width="30"
              height="30"
              objectFit="contain"
            />
          ) : label.toUpperCase().includes("LOCATION") ? (
            <Image
              src={
                "https://d1tl44nezj10jx.cloudfront.net/assets/icons/location.svg"
              }
              width="30"
              height="30"
              objectFit="contain"
              className="opacity-60"
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center">
          {showInfoPopup ? (
            <span className="text-xs text-black-7e capitalize flex items-center">
              {label}{" "}
              <div className="ml-1 pt-0.5">
                <Image
                  src={InfoCircle}
                  width={10}
                  height={10}
                  onClick={showInfoPopup}
                />
              </div>
            </span>
          ) : (
            <span className="text-jx font-Light text-black-7e capitalize">
              {label}
            </span>
          )}
          {showInfoPopup ? (
            <p
              className={
                textAsLink
                  ? "text-mx font-Medium whitespace-nowrap underline cursor-pointer text-blue-800 hover:text-blue-800"
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

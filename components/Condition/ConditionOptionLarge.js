import React from "react";

import GCheck from "@/assets/gcheck1.svg";
import Image from "next/image";

const ConditionOptionLarge = ({
  title,
  options,
  conditionResults,
  questionIndex,
}) => {
  return (
    <div
      className={`${conditionResults?.[questionIndex] == title &&
        "bg-[#EFEFEF] border-[1.5px] font-SF-Pro"
        } my-4 hover:cursor-pointer p-3 rounded-md  active:opacity-50 duration-300 ease-in-out bg-[#EFEFEF] font-SF-Pro`}
    >
      <div className="flex items-center space-x-3 pb-1">
        {/* <VscPass
          className={`${conditionResults?.[questionIndex] == title
            ? "text-black "
            : "text-gray-400"
            } text-[1dp] self-center`}
        /> */}

        <Image src={GCheck} width={20} height={20} className={`${conditionResults?.[questionIndex] == title
            ? "text-black "
            : "text-gray-400"
            } text-[1dp] self-center`}/>

        <h1 className="font-Roboto-Bold text-[#2C2F45] text-jx self-center">{title}</h1>
      </div>
      {options &&
        options.length > 0 &&
        conditionResults?.[questionIndex] == title &&
        options.map((option, index) => (
          <div className=" text-cx flex items-center font-Roboto-Light text-[#2C2F45] space-x-3 p-1 ml-5" key={index}>
            <div className="border border-black p-0.5 rounded-full">
              {/* <GoPrimitiveDot className="text-nx " /> */}
              <div className="text-[10px]"></div>
            </div>
            <p className="font-Roboto-Regular text-cx ">{option}</p>
          </div>
        ))}
    </div>
  );
};

export default ConditionOptionLarge;

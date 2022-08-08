import React from "react";
import { VscPass } from "react-icons/vsc";
import { GoPrimitiveDot } from "react-icons/go";

const ConditionOptionLarge = ({
  title,
  options,
  conditionResults,
  questionIndex,
}) => {
  return (
    <div
      className={`${
        conditionResults?.[questionIndex] == title &&
        "bg-gray-300 border-[1.5px] border-black"
      } my-4 hover:cursor-pointer p-3 rounded-md border-2 border-gray-200 active:opacity-50 duration-300 hover:bg-gray-200`}
    >
      <div className="flex items-center space-x-3">
        <VscPass
          className={`${
            conditionResults?.[questionIndex] == title
              ? "text-black"
              : "text-gray-400"
          } text-xl`}
        />
        <h1 className="font-semibold">{title}</h1>
      </div>
      {options &&
        options.length > 0 &&
        conditionResults?.[questionIndex] == title &&
        options.map((option, index) => (
          <div className="flex items-center space-x-3 p-1 ml-5" key={index}>
            <GoPrimitiveDot className="text-[10px]" />
            <h1>{option}</h1>
          </div>
        ))}
    </div>
  );
};

export default ConditionOptionLarge;

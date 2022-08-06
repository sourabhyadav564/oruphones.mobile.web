import React, { useEffect } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { deviceConditionResult } from "../../utils/constant";

const DeviceConditionCard = ({ condition, answer }) => {
  // console.log("results", answer);
  const [subtitle, setSubtitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [head, setHead] = React.useState("");
  const [point, setPoint] = React.useState([]);
  const [note, setNote] = React.useState("");

  useEffect(() => {
    deviceConditionResult.filter((item, index) => {
      if (item.title === condition) {
        console.log("item", item.subtitle);
        setSubtitle(item.subtitle);
        setDescription(item.description);
        setHead(item.head);
        setPoint(item.par);
        setNote(item.note);
      }
    });
  }, [condition]);
  console.log("note", note);

  return (
    <div className="grid grid-cols-5 hover:cursor-pointer p-3 rounded-md border-2 border-gray-200 active:opacity-50 duration-300 hover:bg-gray-300 space-x-3 bg-gray-200">
      <div className="col-span-5">
        <p className="text-xl font-semibold">Your device is in</p>
        <p className="text-3xl font-bold">
          {condition?.toUpperCase()} <span>CONDITION</span>
        </p>
        <div className="space-y-2">
          <p className="text-sm">{subtitle}</p>
          <p className="text-lg font-semibold">{head}</p>
          <div className="mt-3">
            {point.map((item, index) => (
              <CheckPoints points={item} />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="col-span-1">
        <p className="text-sm">{description}</p>
      </div> */}
    </div>
  );
};

export default DeviceConditionCard;

const CheckPoints = ({ points }) => {
  return (
    <div className="flex items-center space-x-3 space-y-1">
      <BsInfoCircle className="text-[10px]"/>
      <p className="text-sm">{points}</p>
    </div>
  );
};

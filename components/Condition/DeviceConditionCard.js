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
    <div className="flex flex-col bg-white p-2  rounded-md space-x-1 shadow-lg">
      <div className="flex p-2 space-x-1">
        <span className="font-Medium self-center text-[10px]">Your Device is in</span>
        <p className="font-bold self-center text-[12px]">
          {condition}
          <span> Condition</span>

        </p>
      </div>

      <div class="rounded flex  relative justify-between">
        <div className="rounded-full flex absolute h-0.5 w-full my-3 bg-gray"></div>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Needs Repair" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Fair" ? "text-primary" : "text-gray"}`}>Needs<br /> Rapair</div></span>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Fair" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Fair" ? "text-primary" : "text-gray"}`}>Fair</div></span>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Good" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Fair" ? "text-primary" : "text-gray"}`}>Good</div></span>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Excellent" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Fair" ? "text-primary" : "text-gray"}`}>Excellent</div></span>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Like New" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Fair" ? "text-primary" : "text-gray"}`}>Like <br /> New</div>
        </span>
      </div>
    </div>
  );
};

export default DeviceConditionCard;

const CheckPoints = ({ points }) => {
  return (
    <div className="flex items-center space-x-3 space-y-1">
      <BsInfoCircle className="text-[10px]" />
      <p className="text-sm">{points}</p>
    </div>
  );
};

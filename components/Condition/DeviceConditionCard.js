import React, { useEffect } from "react";
import InfoCircle from "@/assets/infocircle2.svg";
import { deviceConditionResult } from "../../utils/constant";


const DeviceConditionCard = ({ condition, answer }) => {
  const [subtitle, setSubtitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [head, setHead] = React.useState("");
  const [point, setPoint] = React.useState([]);
  const [note, setNote] = React.useState("");

  useEffect(() => {
    deviceConditionResult.filter((item, index) => {
      if (item.title === condition) {
        setSubtitle(item.subtitle);
        setDescription(item.description);
        setHead(item.head);
        setPoint(item.par);
        setNote(item.note);
      }
    });
  }, [condition]);

  return (
    <div className="flex flex-col bg-white p-2 font-Roboto-Regular rounded-md space-x-1 shadow-lg">
      <div className="flex p-2 space-x-1">
        <span className="font-Medium self-center text-bx">Your Device is in</span>
        <p className="font-Roboto-Bold self-center text-jx">
          {condition}
          <span> Condition</span>
        </p>
      </div>

      <div class="rounded flex font-Roboto-Semibold relative justify-between">
        <div className="rounded-full flex absolute h-0.5 w-full my-3 bg-gray"></div>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Needs Repair" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Needs Repair" ? "text-primary" : "text-gray"}`}>Needs<br /> Repair</div></span>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Fair" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Fair" ? "text-primary" : "text-gray"}`}>Fair</div></span>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Good" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Good" ? "text-primary" : "text-gray"}`}>Good</div></span>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Excellent" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Excellent" ? "text-primary" : "text-gray"}`}>Excellent</div></span>

        <span><span class={`flex h-7 w-7  rounded-full border relative ${condition == "Like New" ? "bg-primary" : "bg-gray"}`}></span>
          <div className={`text-xs  ${condition == "Like New" ? "text-primary" : "text-gray"}`}>Like <br /> New</div>
        </span>
      </div>
    </div>
  );
};

export default DeviceConditionCard;

const CheckPoints = ({ points }) => {
  return (
    <div className="flex items-center space-x-3 space-y-1">
      <Image src={InfoCircle} width={14} height={14}  onClick={showInfoPopup}/>
      <p className="text-sm">{points}</p>
    </div>
  );
};

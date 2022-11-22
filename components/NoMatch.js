import React from "react";
import nomatching from "@/assets/noMatchingFound.png";

function NoMatch({ text = "No match found" }) {
  return (
    <div
      className="flex flex-col w-full justify-center items-center"
      style={{ minHeight: "300px", height: "60vh" }}
    >
      <img src={nomatching.src} />
      <p className="font-semibold text-black mt-5">{text}</p>
    </div>
  );
}

export default NoMatch;

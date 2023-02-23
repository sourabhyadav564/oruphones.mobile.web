import React from "react";
// import nomatching from "https://d1tl44nezj10jx.cloudfront.net/assets/noMatchingFound.png";

function NoMatch({ text = "No match found" }) {
  return (
    <div
      className="flex flex-col w-full justify-center items-center"
      style={{ minHeight: "300px", height: "60vh" }}
    >
      <img src="https://d1tl44nezj10jx.cloudfront.net/assets/noMatchingFound.png" alt={text}/>
      <p className="font-semibold text-black mt-5">{text}</p>
    </div>
  );
}

export default NoMatch;

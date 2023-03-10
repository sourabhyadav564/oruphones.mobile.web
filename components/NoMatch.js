import React from "react";

function NoMatch({ text = "No match found" }) {
  return (
    <div
      className="flex flex-col w-full justify-center items-center"
      style={{ minHeight: "300px", height: "60vh" }}
    >
      <img src="https://d1tl44nezj10jx.cloudfront.net/web/assets/noMatchingFound.webp" alt={text}/>
      <p className="font-semibold text-black mt-5">{text}</p>
    </div>
  );
}

export default NoMatch;

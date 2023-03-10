import React from "react";

export default function Loader() {
  return (
    <div>
      <span className="flex justify-center items-center h-52">
        <img src={"https://d1tl44nezj10jx.cloudfront.net/assets/loading.gif"} width={25} height={25} alt="loading.." />
      </span>
    </div>
  );
}

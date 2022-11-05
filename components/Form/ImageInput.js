import React, { Fragment } from "react";
// import Image from "next/image";
import { GrClose } from "react-icons/gr";
import Loader from "../Loader/Loader";

function ImageInput({
  clickIndex,
  index,
  loading,
  name,
  preview,
  clearImage,
  ...rest
}) {
  return (
    <Fragment>
      {preview ? (
        <label
          className=" w-full bg-[#E8E8E8] h-28  rounded appearance-none flex items-center justify-center relative"
          style={{
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="h-24 mx-auto">
            <img src={preview} style={{ width: "auto", height: "100%" }} />
          </div>
          <GrClose
            className="absolute -top-2 right-2 text-sm cursor-pointer"
            onClick={clearImage}
          />
        </label>
      ) : (
        <label
          htmlFor={name}
          className=" w-full h-24 appearance-none flex my-4  items-center justify-center"
          style={{
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {clickIndex === index && image ? <Loader /> : <span className=" text-sx opacity-50 m-auto font-Light"> + </span>}
          <input name={name} className={`hidden`} id={name} {...rest} />
        </label>
      )}
    </Fragment>
  );
}

export default ImageInput;

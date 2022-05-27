import React, { Fragment } from "react";
// import Image from "next/image";
import { GrClose } from "react-icons/gr";

function ImageInput({ name, preview, clearImage, ...rest }) {
  return (
    <Fragment>
      {preview ? (
        <label
          className="p-4 w-full h-28 rounded appearance-none flex items-center justify-center relative"
          style={{ border: "1px solid rgba(0, 0, 0, 0.12)", color: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="h-24 mx-auto">
            <img src={preview} style={{ width: "auto", height: "100%" }} />
          </div>
          <GrClose className="absolute top-2 right-2 text-sm cursor-pointer" onClick={clearImage} />
        </label>
      ) : (
        <label
          htmlFor={name}
          className="p-4 w-full  h-28 rounded appearance-none flex items-center justify-center"
          style={{ border: "1px solid rgba(0, 0, 0, 0.12)", color: "rgba(0, 0, 0, 0.6)" }}
        >
          <span> + </span>
          <input name={name} className={`hidden`} id={name} {...rest} />
        </label>
      )}
    </Fragment>
  );
}

export default ImageInput;

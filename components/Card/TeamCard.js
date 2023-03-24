import Image from "next/image";
import React, { useState } from "react";
import linkedin from "@/assets/linkedIn1.svg";

function TeamCard({
  imgsrc,
  name,
  position,
  description,
    qualification,
  twittersrc,
  linkedInsrc,
}) {
  return (
    // <Tilt scale="1.09" glareEnable="true" data-tilt-scale="1.1" transitionSpeed="800" glareColor="white" className="bg-gray-100 grayscale saturate-50 hover:bg-m-green  hover:text-white hover:grayscale-0  h-[44vh] overflow-y-scroll no-scrollbar pt-16 my-8 mx-4 border rounded-md p-2 drop-shadow">
    <div className="bg-gray-100 mt-2 mx-1 h-auto py-4 px-2">
      <Image
        src={imgsrc}
        width={100}
        height={100}
        className="rounded-full drop-shadow-md object-cover"
      />
      <p className="font-Roboto-Bold opacity-80 mt-4">{name}</p>
      <p className="text-[14px] opacity-60 font-Roboto-Medium">{position}</p>
        <p className="text-[10px] opacity-60 font-Roboto-Medium px-24">{qualification}</p>
      <p className="font-Roboto-Regular text-[14px] px-4">{description}</p>
    </div>
  );
}

export default TeamCard;

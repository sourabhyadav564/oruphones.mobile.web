import React from 'react'
import { FaRupeeSign } from "react-icons/fa";

function Heading({title}) {
  return (
    <div>
      <h1 className='text-[13px] text-[#707070] font-Roboto-Regular pl-2 pt-2 '>{title}</h1>
    </div>
  )
}

function Heading3({title}) {
  return (
    <div>
      <h1 className='font-Roboto-Bold text-[15px] text-[#FFFFFF] capitalize py-3.5'> {title} </h1>
    </div>
  )
}


function ProductPriceHeading({title}){
  return(
    <div>
     <div className='font-Roboto-Bold flex text-[29px] text-[#000944] ' >
                  <FaRupeeSign className="text-[25px] font-normal mr-0.5 self-center" />{" "}
                  {title} 
      </div>
    </div>
  )
}



function Header4Heading({title}){
  return(
    <div>
     <div className='font-Roboto-Regular text-[15px] text-[#FFFFFF]'>{title} </div>
  </div>
  )
}


function SellPhoneHeading1({title}){
  return(
    <div >
      <h1 className='font-Roboto-Bold text-[20px] text-[#2C2F45]'>{title}</h1>
    </div>
  )
} 

function ProductNameHeading({title}){
  return(
    <div>
      <h1 className='font-Roboto-Regular text-[22px] text-[#000000]' >{title}</h1>
    </div>

)}



function linkHeading({title}){
  return(
    <div>
    <h1 className='font-Roboto-Regularitalic text-[13px] text-[#2C2F45]'> {title}</h1>
  </div>
  );
  
}


function AgeHeading({title}){
  return(
    <div>
    <h1 className='font-Roboto-Light text-[12px] text-[#2C2F45]'> {title}</h1>
  </div>
  ); 
}


function BannerSellHeading({title}){
  return(
    <div>
      <h1 className='font-Roboto-Semibold text-[14px] '> {title}</h1>
    </div>
  )
}


function BannerBuyHeading({title}){
  return(
    <div>
      <h1 className='font-Roboto-Regular text-[14px]'> {title}</h1>
    </div>
  )
}


function ShopCategoryHeading({title}){
  return(
    <div>
      <h1 className='font-Roboto-Regular text-[12px] text-[#707070]'> {title}</h1>
    </div>
  )
}





export {Heading,Heading3,ProductPriceHeading,ProductNameHeading,Header4Heading,SellPhoneHeading1,linkHeading,
  AgeHeading,BannerSellHeading,BannerBuyHeading,ShopCategoryHeading};

  

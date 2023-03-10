import React from 'react'

function Heading({ title }) {
  return (
    <div>
      <p className='text-mx text-[#707070] font-Roboto-Regular pl-2 pt-2 '>{title}</p>
    </div>
  )
}

function Heading3({ title }) {
  return (
    <div>
      <p className='font-Roboto-Bold text-dx text-[#FFFFFF] capitalize py-3.5'> {title} </p>
    </div>
  )
}


function ProductPriceHeading({ title }) {
  return (
    <div>
      <div className='font-Roboto-Bold flex text-ox text-[#000944] ' >
        <span className="text-rx font-normal mr-0.5 self-center">₹</span>{" "}
        {title}
      </div>
    </div>
  )
}



function Header4Heading({ title }) {
  return (
    <div>
      <div className='font-Roboto-Regular text-dx text-[#FFFFFF]'>{title} </div>
    </div>
  )
}


function SellPhoneHeading1({ title }) {
  return (
    <div >
      <p className='font-Roboto-Bold text-px text-[#2C2F45]'>{title}</p>
    </div>
  )
}

function ProductNameHeading({ title }) {
  return (
    <div>
      <p className='font-Roboto-Regular text-qx text-[#000000]' >{title}</p>
    </div>

  )
}



function linkHeading({ title }) {
  return (
    <div>
      <p className='font-Roboto-Regularitalic text-mx text-[#2C2F45]'> {title}</p>
    </div>
  );

}


function AgeHeading({ title }) {
  return (
    <div>
      <p className='font-Roboto-Light text-jx text-[#2C2F45]'> {title}</p>
    </div>
  );
}


function BannerSellHeading({ title }) {
  return (
    <div>
      <p className='font-Roboto-Semibold text-ex '> {title}</p>
    </div>
  )
}


function BannerBuyHeading({ title }) {
  return (
    <div>
      <p className='font-Roboto-Regular text-ex'> {title}</p>
    </div>
  )
}


function ShopCategoryHeading({ title }) {
  return (
    <div>
      <p className='font-Roboto-Regular font-bold text-jx text-[#707070]'> {title}</p>
    </div>
  )
}





export {
  Heading, Heading3, ProductPriceHeading, ProductNameHeading, Header4Heading, SellPhoneHeading1, linkHeading,
  AgeHeading, BannerSellHeading, BannerBuyHeading, ShopCategoryHeading
};



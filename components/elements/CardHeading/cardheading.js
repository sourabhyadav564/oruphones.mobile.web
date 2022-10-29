import React from 'react'

function CardHeading({ title }) {
  return (
    <div>
      <h1 className='font-Roboto-Light text-[8px] text-[#000000]'> {title} </h1>
    </div>
  )
}


function CardHeading1({ title }) {
  return (
    <div>
      <h1 className='font-Roboto-Light text-[10px] text-[#878787]'>{title}</h1>
    </div>
  )
}


function CardHeading2({ title }) {
  return (
    <div>
      <h1 className='font-Roboto-Medium text-[11px] text-[#373737]'>{title}</h1>
    </div>
  )
}


function CardHeading3({ title }) {
  return (
    <div>
      <h1 className='font-Roboto-Bold text-[15px] text-[#000944]'>{title} </h1>
    </div>
  )
}



function CardHeading4({ title }) {
  return (
    <div>
      <h1 className='font-Roboto-Regular text-[12px] text-[#2C2F45]'>{title}</h1>
    </div>
  )
}


function CardHeading5({ title }) {
  return (
    <div>
      <h1 className='font-Roboto-Light text-[8px] text-[#2C2F45]'>{title}</h1>
    </div>
  )
}


function PanelHeading({ title }) {
  return (
    <div>
      <div className="absolute bottom-4 left-14 font-Roboto-Light text-[11px] opacity-50">{title}</div>
    </div>
  )
}






export { CardHeading, CardHeading1, CardHeading2, CardHeading3, CardHeading4, CardHeading5, PanelHeading };

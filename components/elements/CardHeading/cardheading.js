import React from 'react'

function CardHeading({ title }) {
  return (
    <div>
      <p className='font-Roboto-Light text-lx text-[#000000]'> {title} </p>
    </div>
  )
}


function CardHeading1({ title }) {
  return (
    <div>
      <p className='font-Roboto-Light text-bx text-[#878787]'>{title}</p>
    </div>
  )
}


function CardHeading2({ title }) {
  return (
    <div>
      <p className='font-Roboto-Medium text-cx text-[#373737]'>{title}</p>
    </div>
  )
}


function CardHeading3({ title }) {
  return (
    <div>
      <p className='font-Roboto-Bold text-tx text-[#000944]'>{title} </p>
    </div>
  )
}



function CardHeading4({ title }) {
  return (
    <div>
      <p className='font-Roboto-Medium text-ex text-[#000000] truncate'>{title}</p>
    </div>
  )
}


function CardHeading5({ title }) {
  return (
    <div>
      <p className='font-Roboto-Light text-kx text-[#2C2F45]'>{title}</p>
    </div>
  )
}


function PanelHeading({ title }) {
  return (
    <div>
      <div className="absolute bottom-4 left-16 font-Roboto-Light text-cx opacity-50">{title}</div>
    </div>
  )
}






export { CardHeading, CardHeading1, CardHeading2, CardHeading3, CardHeading4, CardHeading5, PanelHeading };

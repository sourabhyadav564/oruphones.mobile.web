import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";

function header3({ title1, title2 }) {
  const [show, setshow] = useState(false);

  const router = useRouter();

  const isActive = (path) => {
    return router && router.pathname === path;
  };



  return (
    <div className='bg-primary text-white relative w-full z-50'>
      <div className='text-sm grid grid-cols-2 text-center py-4'>
        <div className='' show={setshow}> <a className={`${isActive("/user/listings") ? "border-b-2 pb-2 transition delay-100 duration-1000 linear " : ""}`}> <Link href="/user/listings" >{title1}</Link> </a> </div>
        <div className=''> <a className={`${isActive("/user/favourites") ? " border-b-2 pb-2 transition delay-100 duration-1000 linear" : ""}`}>  <Link href="/user/favourites" >{title2}</Link> </a> </div>
      </div>
    </div>
  )
}

export default header3

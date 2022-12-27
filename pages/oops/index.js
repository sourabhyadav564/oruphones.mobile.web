import React from 'react';
import { useRouter } from "next/router";
import {ImSad} from "react-icons/im";

function index() {
    const router = useRouter();

  return (
    <div className='mt-40'>
        <div className='flex items-center justify-center opacity-60'><ImSad className='w-28 h-28 '/></div>
        <h1 className='text-[50px] text-center font-Roboto-Semibold opacity-60 '>404</h1>
        <h2 className='text-[20px] text-center font-Roboto-Regular opacity-60'>Page not found</h2>
        <div className='text-center px-4 font-Roboto-Light opacity-70'>The page you are looking for doesn't exist or an other error occured.<br/></div> <a href='/' className='text-primary font-Roboto-Medium opacity-100 flex justify-center'>Go to home</a>
    </div>
  )
}

export default index

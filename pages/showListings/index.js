import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getSessionId, getUserDetailsViaUUID } from "api-call";
import { useAuthState } from "providers/AuthProvider";
import Cookies from 'js-cookie';


function index() {
  const router = useRouter()
  const { authenticated, loading } = useAuthState();
  const [userdata, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [username,setusername] = useState("user");
  const [userMobileNumber,setUserMobileNumber] = useState("");
  const [userUniqueId, setUserUniqueId] = useState(router.query?.routerto);
  const hello = router.query;
  console.log("1", router.query);

  let userUniqueId2 = (router.asPath);
  userUniqueId2 = userUniqueId2.replace("/showListings?routerto=", "");
  console.log('mobile number  : ', router.asPath);
  // console.log('router to ' ,router.query)
  // const countryCode = '91';

  console.log('userUniqueId : ',userUniqueId2)
  useEffect(() => {
    const interval = setInterval(() => {
      setUserUniqueId(userUniqueId2);
      // console.log('2',mobileNumber);
      // Cookies.removeItem('mobileNumber');
      // Cookies.removeItem('countryCode');
      
      // Cookies.set('mobileNumber', mobileNumber2);
      // Cookies.set('countryCode', countryCode);
      // setMobileNumber(mobileNumber2.replace("/showListings?routerto=",""));
      // Cookies.set('userUniqueId', userUniqueId2);
      getUserDetailsViaUUID(userUniqueId2).then((response) => {
        window.localStorage.clear();
        // if(userdata?.dataObject == undefined || userdata?.dataObject == null){  
        // }
        sessionStorage.removeItem("getUserDetails");
        
        console.log("detailsuser name : ", response?.dataObject)
        
        setUserData(response?.dataObject?.userdetails);
        setusername(response?.dataObject?.userdetails?.userName);
        sessionStorage.setItem("getUserDetails", JSON.stringify(response?.dataObject?.userdetails));

        console.log("details2 : ",response?.dataObject?.userdetails)
        Cookies.set('userUniqueId', response?.dataObject?.userdetails?.userUniqueId);
        Cookies.set('mobileNumber', response?.dataObject?.userdetails?.mobileNumber);
        Cookies.set('countryCode', response?.dataObject?.userdetails?.countryCode);
        setUserMobileNumber(response?.dataObject?.userdetails?.mobileNumber);
      // Cookies.set('countryCode', countryCode);
    
        // Cookies.set()
      },
        (err) => {
          Cookies.remove('userUniqueId');
          // sessionStorage.setItem("getUserDetails", JSON.stringify(err));
        }
      );
      clearInterval(interval);
    }, 1000);
    // console.log('user-data : ',userdata);

    if (Cookies.get("userUniqueId") != undefined && Cookies.get("userUniqueId") != null && Cookies.get("userUniqueId") != "") {
      const interval2 = setInterval(() => {
        router.push("/user/listings");
        clearInterval(interval2);
      }, 3000)
    }
    else{
      const interval3 = setInterval(() => {
        router.push("/oops");
        clearInterval(interval3);
      }, 1000)
    }
  }, [])

  // useEffect(()=>{
  //   let mobileNumber = router.query?.routerto;
  //   console.log(data) 
  //   // console.log(String(mobileNumber));
  //   const countryCode = '91';
  //   getUserDetails(countryCode,mobileNumber).then((res)=>{
  //     setData(res?.routerto);
  //   })   
  // },[2000]);
 console.log('useruniqueId',userUniqueId);
  return (
    <div className='flex justify-center'>
      {/* {hello?.routerto} */}
      {/* <div>{data}</div> */}
      <div className=''>
        <div className='mt-52 flex items-center justify-center text-px font-Roboto-Semibold text-primary'> Loading...</div>
        <div className=' text-px font-Roboto-Light '>
          <p className='pt-24 text-center' > Hey {`${username}`}
            <br />Welcome to <span className='font-Roboto-Semibold text-primary'>ORUphones </span></p>
        </div>
      </div>
    </div>
  )
}
export default index

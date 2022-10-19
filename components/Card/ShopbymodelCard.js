import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs";
import verifiedIcon from "@/assets/verified.svg";
// import Logo from "@/assets/mobiru_logo.svg";
import Logo from "@/assets/oru_phones_logo.png";
import AddFav from "../AddFav";
import {CardHeading,CardHeading1,CardHeading2,CardHeading3,CardHeading4} from "@/components/elements/CardHeading/cardheading";
import VerifiedIcon from "@/components/VerifiedIcon";
import { numberWithCommas } from "@/utils/util";
import { BiChevronRight } from "react-icons/bi";
import LoadingStatePopup from "../Popup/LoadingStatePopup";
import { useRouter } from "next/router";
import sold_out from "@/assets/soldout.png";
import VerificationIcon from "../verificationIcon";

function ShopbymodelCard({data}) {

  const router = useRouter();

  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);
  
  return(
    <>
      <div className="relative mb-6 inline-block ">
        
          <div className="m-auto ml-6">
            <Image
             alt={data?.marketingName}
              src={data?.imagePath || "/"}
              width="40"
              height="40"
            />
          </div>
          
          <div className="m-auto">
             <CardHeading4 title={data?.marketingName}/>
          </div>
       
      </div>
    </>
 
 )};


export default ShopbymodelCard;

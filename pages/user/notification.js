import Header2 from "@/components/Header/header2";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import mob from "@/assets/mobiru_logo.svg";
import { getAllNotificationByUserd, markAsRead } from "api-call";
import Cookies from "js-cookie";
import router from "next/router";
import VerifyFlowPopup from "@/components/Popup/VerifyFlowPopup";

function Notification({notificationsListObject}) {
  console.log(notificationsListObject);
  const [notifications, setNotifications] = useState(notificationsListObject?.notifications);
  const [openVerifyFlow, setOpenVerifyFlow] = useState(false);

  function redirectTo(data){
    if(data.webEventAction === "APP_DOWNLOAD"){
      setOpenVerifyFlow(true);
    }else if(data.webEventAction === "MY_FAVORITES"){
      router.push("/user/favourites")
    } else {
      router.push("/user/listings")
    }
    makeNotificationAsRead(data);
  }

  function makeNotificationAsRead(data){
    console.log("makeNotificationAsRead data.isUnRead -> ",data.isUnRead)
    if(data.isUnRead === 0){
      markAsRead(data.notificationId, Cookies.get("info")).then((response)=>
      console.log("makeNotificationAsRead -> ", response)
    )
    }
   
  }

  return (
    <Fragment>
      <Header2 title="Notification" />
      <main className="overflow-hidden overflow-y-auto">
        {notifications && notifications?.length > 0 && notifications?.map((items,index)=>
          <NotificationsItem key={index} text={items.messageContent}
          timestamp={items.createdDate}
          isUnRead={items.isUnRead === 0}
          onClick={()=>
            redirectTo(items)
          } />
        )}
      </main>
      <VerifyFlowPopup open={openVerifyFlow} setOpen={setOpenVerifyFlow} />
    </Fragment>
  );
}

export default Notification;

const NotificationsItem = ({ text, timestamp,onClick, isUnRead }) => (
  <div className={`flex border-b-2 border-white py-3 px-4 ${
    isUnRead == 0 ? "bg-gray-100" : ""}`} onClick={onClick}>
    <div className="w-12 h-12 rounded-2xl flex-shrink-0 mr-4 flex justify-center items-center" style={{ background: "#EFEFEF" }}>
      <Image src={mob} width={30} height={30} alt="ORUPhones" />
    </div>
    <div>
      <p className={`text-sm text-m-grey-1 ${isUnRead == 0 ? "font-bold" : ""}`}> {text} </p>
      <span className="text-xs" style={{ color: "#C7C7C7" }}>
        {timestamp}
      </span>
    </div>
  </div>
);


export const getServerSideProps = async ({ req }) => {
  const { info } = req.cookies;
  const notificationsList = await getAllNotificationByUserd(info);
  return {
    props: {
      notificationsListObject: notificationsList?.dataObject || [],
    },
  };
};

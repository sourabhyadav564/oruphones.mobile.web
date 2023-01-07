import Header5 from "@/components/Header/header5";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
// import mob from "@/assets/mobiru_logo.svg";
import mob from "@/assets/logo_square.svg";
import { deleteNotification, getAllNotificationByUserd, markAsRead } from "api-call";
import Cookies from "js-cookie";
import router from "next/router";
import VerifyFlowPopup from "@/components/Popup/VerifyFlowPopup";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

function Notification({ notificationsListObject }) {
  const [notifications, setNotifications] = useState(
    notificationsListObject?.notifications
  );
  const [openVerifyFlow, setOpenVerifyFlow] = useState(false);

  const leadingActions = (id) => (
    <LeadingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          deleteNotification(id, Cookies.get("userUniqueId")).then(
            (response) => {
              console.log("deleteNotification -> ", response);
            }
            , (error) => {
              console.log("deleteNotification -> ", error);
            })}
      >
        <div className="flex font-Roboto-Semibold text-ex justify-center w-full px-40 text-white bg-red text-center items-center">
          Delete
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          deleteNotification(id, Cookies.get("userUniqueId")).then(
            (response) => {
              console.log("deleteNotification -> ", response);
            }
            , (error) => {
              console.log("deleteNotification -> ", error);
            }
          )}>
        <div className="flex font-Roboto-Semibold text-ex justify-center w-full px-40 text-white bg-red text-center items-center">
          Delete
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  function redirectTo(data) {
    if (data.webEventAction === "APP_DOWNLOAD") {
      setOpenVerifyFlow(true);
    } else if (data.webEventAction === "MY_FAVORITES") {
      router.push("/user/favourites");
    } else {
      router.push("/user/listings");
    }
    makeNotificationAsRead(data);
  }

  function makeNotificationAsRead(data) {
    if (data.isUnRead === 0) {
      markAsRead(data.notificationId, Cookies.get("userUniqueId")).then(
        (response) => console.log("makeNotificationAsRead -> ", response)
      );
    }
  }

  return (
    <Fragment>
      <Header5 title="Notification" />
      <main className="overflow-hidden overflow-y-auto">
        {notifications && notifications?.length > 0 ? (
          notifications?.map((items, index) => (
            <SwipeableList>
              <SwipeableListItem key={index}
                leadingActions={leadingActions(items.notificationId)}
                trailingActions={trailingActions(items.notificationId)}
              >
                <NotificationsItem
                  key={index}
                  text={items.messageContent}
                  timestamp={items.createdDate}
                  isUnRead={items.isUnRead === 0}
                  onClick={() => redirectTo(items)}
                />
              </SwipeableListItem>
            </SwipeableList>
          ))
        ) : (
          <div className="flex justify-center items-center h-52">
            No Notification
          </div>
        )}
      </main>
      <VerifyFlowPopup open={openVerifyFlow} setOpen={setOpenVerifyFlow} />
    </Fragment>
  );
}

export default Notification;

const NotificationsItem = ({ text, timestamp, onClick, isUnRead }) => (
  <div
    className={`flex border-b-2 border-white py-3 px-4 ${isUnRead == 0 ? "bg-gray-100" : ""
      }`}
    onClick={onClick}
  >
    <div
      className="w-12 h-12 rounded-2xl flex-shrink-0 mr-4 flex justify-center items-center"
      style={{ background: "#EFEFEF" }}
    >
      <Image src={mob} width={30} height={30} alt="ORUPhones" />
    </div>
    <div>
      <p
        className={`text-sm text-m-grey-1 font-Roboto-Semibold ${isUnRead == 0 ? "font-bold" : ""}`}
      >
        {" "}
        {text}{" "}
      </p>
      <span className="text-xs font-Roboto-Regular" style={{ color: "#C7C7C7" }}>
        {timestamp}
      </span>
    </div>
  </div>
);

export const getServerSideProps = async ({ req }) => {
  const { userUniqueId, sessionId } = req.cookies;
  const notificationsList = await getAllNotificationByUserd(
    userUniqueId,
    sessionId
  );
  return {
    props: {
      notificationsListObject: notificationsList?.dataObject || [],
    },
  };
};

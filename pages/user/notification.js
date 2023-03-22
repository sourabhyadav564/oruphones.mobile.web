import Header5 from "@/components/Header/header5";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import {
  deleteNotification,
  getAllNotificationByUserd,
  markAsRead,
} from "api-call";
import Cookies from "js-cookie";
import router from "next/router";
import VerifyFlowPopup from "@/components/Popup/VerifyFlowPopup";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import Loader from "@/components/Loader/Loader";

function Notification() {
  const [notificationsListObject, setNotificationsListObject] = useState(null);
  const [openVerifyFlow, setOpenVerifyFlow] = useState(false);
  let notificationCalled = false;

  useEffect(async () => {
    if (notificationsListObject === null && !notificationCalled) {
      notificationCalled = true;
      await getAllNotificationByUserd(
        Cookies.get("userUniqueId") || 0,
        Cookies.get("sessionId")
      ).then((response) => {
        if (response?.dataObject?.length != 0) {
          setNotificationsListObject(response?.dataObject);
        } else {
          notificationCalled = false;
        }
      });
    }
  }, []);

  const leadingActions = (id) => (
    <LeadingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          deleteNotification(
            id,
            Cookies.get("userUniqueId"),
            Cookies.get("sessionId")
          ).then(
            (response) => {},
            (error) => {}
          )
        }
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
          deleteNotification(
            id,
            Cookies.get("userUniqueId"),
            Cookies.get("sessionId")
          ).then(
            (response) => {},
            (error) => {}
          )
        }
      >
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

  async function makeNotificationAsRead(data) {
    if (data.isUnRead === 0) {
      await markAsRead(
        data.notificationId,
        Cookies.get("userUniqueId"),
        Cookies.get("sessionId")
      );
    }
  }

  return (
    <Fragment>
      <Header5 title="Notification" />
      <main className="overflow-hidden overflow-y-auto">
        {notificationsListObject == null ? (
          <div className="flex justify-center items-center h-52 flex-col">
            <Loader />
            <div className="text-center font-Roboto-Regular">
              Please wait, while we are fetching data for you...{" "}
            </div>
          </div>
        ) : notificationsListObject?.notifications &&
          notificationsListObject?.notifications?.length > 0 ? (
          notificationsListObject?.notifications?.map((items, index) => (
            <SwipeableList>
              <SwipeableListItem
                key={index}
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
    className={`flex border-b-2 border-white py-3 px-4 ${
      isUnRead == 0 ? "bg-gray-100" : ""
    }`}
    onClick={onClick}
  >
    <div
      className="w-12 h-12 rounded-2xl flex-shrink-0 mr-4 flex justify-center items-center"
      style={{ background: "#EFEFEF" }}
    >
      <Image
        src={"https://d1tl44nezj10jx.cloudfront.net/web/assets/logo_square.svg"}
        width={30}
        height={30}
        alt="ORUPhones"
      />
    </div>
    <div>
      <p
        className={`text-sm text-m-grey-1 font-Roboto-Semibold ${
          isUnRead == 0 ? "font-bold" : ""
        }`}
      >
        {" "}
        {text}{" "}
      </p>
      <span
        className="text-xs font-Roboto-Regular"
        style={{ color: "#C7C7C7" }}
      >
        {timestamp}
      </span>
    </div>
  </div>
);

// export const getServerSideProps = async ({ req }) => {
//   const { userUniqueId, sessionId } = req.cookies;
//   const notificationsList = await getAllNotificationByUserd(
//     userUniqueId,
//     sessionId
//   );
//   return {
//     props: {
//       notificationsListObject: notificationsList?.dataObject || [],
//     },
//   };
// };

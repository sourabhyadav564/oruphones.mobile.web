import styles from "../../styles/page.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { getSessionId } from "api-call";

let sessionId = Cookies.get("sessionId");
getSessionId("").then((res) => {
  Cookies.set("sessionId", res?.dataObject?.sessionId);
  sessionId = res?.dataObject?.sessionId;
});

let headers = {
  "Content-Type": "application/json",
  srcFrom: "Mobile Web",
  eventName: "NA",
  userUniqueId: 0,
  sessionId: sessionId,
  devicePlatform: "Mobile Web",
  location: "",
};

const MULTIPART_HEADER = { headers: { "Content-Type": "multipart/form-data" } };

Axios.interceptors.request.use(
  async (request) => {
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export const getLink = async (id) => {
  if (id == "blog") {
    window.open("https://www.oruphones.com/blog/", "_self").focus();
  } else if (id !== undefined) {
    const API_ENDPOINT =
      process.env.NEXT_PUBLIC_SERVER_URL +
      "/api/v1/global/getLink?keyId=" +
      `${id}`;
    const result = await Axios.get(API_ENDPOINT, {
      headers: { ...headers, sessionId: Cookies.get("sessionId") },
    });
    if (result.data.status === "SUCCESS") {
      window.open(result.data.dataObject.link, "_self").focus();
    } else {
      window.open("https://www.oruphones.com", "_self").focus();
    }
  }
};

export default function handler() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      const routerId = router.query.id;
      getLink(router.query?.id);
    }, 3000);
  });

  return (
    <main className={styles.main}>
      <div className={styles.center}>Please wait...</div>
    </main>
  );
}

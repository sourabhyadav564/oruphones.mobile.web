import styles from "../../styles/page.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Axios from "axios";


let headers = {
    "Content-Type": "application/json",
    srcFrom: "Mobile Web",
    eventName: "NA",
    userUniqueId: 0,
    sessionId: "",
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
    if (id !== undefined) {
        console.log("id", id);
        const API_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URL + "/api/v1/global/getLink?keyId=" + `${id}`;
        const result = await Axios.get(API_ENDPOINT, { headers: { ...headers } });
        console.log("response from getLink", result);

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
            console.log("router query : ", routerId);
            getLink(router.query?.id);
        }, 3000);
    });

    return (
        <main className={styles.main}>
            <div className={styles.center}>Please wait...</div>
        </main>
    );
}
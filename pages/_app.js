import { AuthProvider } from "providers/AuthProvider";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalHeader from "@/components/Header/global";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }
  , []);
  return (
    <AuthProvider>
      {router.pathname !== "/login" && <GlobalHeader />}
      <RecoilRoot>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </RecoilRoot>
    </AuthProvider>
  );
}

export default MyApp;

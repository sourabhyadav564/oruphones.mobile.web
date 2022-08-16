import { Fragment, useEffect, useState } from "react";
import router from "next/router";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Form/Input";
import Header2 from "@/components/Header/header2";
import BottomNav from "@/components/Navigation/BottomNav";
import { useAuthDispatch, useAuthState } from "providers/AuthProvider";
import Footer from "@/components/Footer";
import {
  updateUserProfileDetails,
  getUserDetails,
  uploadUserProfilePic,
  deleteUserAccount,
} from "api-call";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { VscPass } from "react-icons/vsc";

function Profile() {
  const { authenticated, loading, user } = useAuthState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const dispatch = useAuthDispatch();
  const [imgPath, setImagePath] = useState(user?.userdetails?.profilePicPath);

  const changeImage = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("image", e.target.files[0]);
    uploadUserProfilePic(data, Cookies.get("userUniqueId")).then((response) => {
      if (response?.status === "SUCCESS") {
        let payload = {
          profilePicPath: response?.dataObject?.imagePath,
          profileThumbnailPath: response?.dataObject?.thumbnailImagePath,
          mobileNumber: Cookies.get("mobileNumber"),
          userUniqueId: Cookies.get("userUniqueId"),
        };

        updateUserProfileDetails(payload).then((res) => {
          if (res?.status === "SUCCESS") {
            user.userdetails = {
              ...user.userdetails,
              profilePicPath: res?.dataObject?.userdetails.profilePicPath,
            };
            setImagePath(res?.dataObject?.userdetails.profilePicPath);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [authenticated, loading]);

  const saveUserInfo = () => {
    let payload = {
      // city: proFileLoc,
      email: email || user?.userdetails.email,
      mobileNumber: user?.userdetails?.mobileNumber,
      userName: userName || user.userdetails.userName,
      userUniqueId: Cookies.get("userUniqueId"),
    };

    updateUserProfileDetails(payload).then((res) => {
      const mobileNumber = Cookies.get("mobileNumber");
      const countryCode = Cookies.get("countryCode");
      getUserDetails(countryCode, mobileNumber).then((resp) => {
        dispatch("LOGIN", resp.dataObject);
        toast.info("Profile information saved successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    });
  };

  const deleteUserAccountInfo = () => {
    let payload = {
      userUniqueId: Cookies.get("userUniqueId"),
    };
    deleteUserAccount(payload).then((res) => {
      dispatch("LOGOUT");
      toast.success("User Account Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  if (loading || !authenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Header2 className="bg-primary text-white" title="My Profile">
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="19.6" height="21" viewBox="0 0 19.6 21" onClick={saveUserInfo}>
          <g id="save" transform="translate(-2.25 -1.125)">
            <path
              d="M21.542,5.777,17.2,1.432a1.043,1.043,0,0,0-.742-.307H3.3a1.051,1.051,0,0,0-1.05,1.05v18.9a1.051,1.051,0,0,0,1.05,1.05H20.8a1.051,1.051,0,0,0,1.05-1.05V6.52a1.043,1.043,0,0,0-.307-.742ZM14.85,2.525v4.2H8.55v-4.2Zm5.6,18.2H3.65V2.525h3.5v5.6h9.1v-5.6h.06l4.14,4.14Z"
              transform="translate(0 0)"
              fill="#fff"
            />
            <path
              d="M15.275,15.75A4.025,4.025,0,1,0,19.3,19.775,4.025,4.025,0,0,0,15.275,15.75Zm0,6.65A2.625,2.625,0,1,1,17.9,19.775,2.625,2.625,0,0,1,15.275,22.4Z"
              transform="translate(-3.4 -5.525)"
              fill="#fff"
            />
          </g>
        </svg> */}
        <VscPass className="text-2xl" onClick={saveUserInfo} />
      </Header2>
      <main>
        <section className="bg-primary pt-4 pb-8 flex justify-center rounded-b-2xl">
          <UserIcon img={imgPath} onChange={changeImage} />
        </section>
        <section className="px-4 flex flex-col my-8 space-y-6">
          <Input
            type="text"
            inputClass="text-black-21"
            maxLength="30"
            name="username"
            defaultValue={user?.userdetails?.userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          >
            Name
          </Input>

          <Input
            disabled
            inputClass="text-black-21"
            defaultValue={`+91 ${user?.userdetails?.mobileNumber}`}
          >
            Mobile No
          </Input>
          <Input
            type="text"
            name="email"
            inputClass="text-black-21"
            defaultValue={user?.userdetails?.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          >
            Email ID
          </Input>
          <Link href="/user/favourites">
            <a className="border border-primary py-3 text-sm text-primary uppercase rounded text-center">
              MY FAVORITES
            </a>
          </Link>
          <a href="/login">
            <p
              className="border border-primary py-3 text-sm text-primary uppercase rounded text-center"
              onClick={() => {
                dispatch("LOGOUT");
              }}
            >
              LOGOUT
            </p>
          </a>
          <p className="border border-red-500 py-3 text-sm text-red-500 uppercase rounded text-center">
            DELETE ACCOUNT
          </p>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </Fragment>
  );
}

export default Profile;

const UserIcon = ({ onChange, img }) => (
  <div className={`p-1  relative ${img ? "bg-white rounded-full" : ""} `}>
    <input
      type="file"
      className="hidden"
      accept="image/*"
      id="photo"
      onChange={onChange}
    />
    {img ? (
      <div
        className="relative rounded-full flex justify-center items-center"
        style={{ width: 122, height: 122 }}
      >
        <Image
          src={img}
          layout="fill"
          className="rounded-full"
          objectFit="contain"
        />
      </div>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="122"
        height="122"
        viewBox="0 0 122 122"
      >
        <g transform="translate(-135 -143)">
          <circle
            cx="61"
            cy="61"
            r="61"
            transform="translate(135 143)"
            fill="#fff"
          />
          <path
            d="M60.018,2.25a57.768,57.768,0,1,0,57.768,57.768A57.768,57.768,0,0,0,60.018,2.25Zm0,20.631a18.526,18.526,0,1,1-13.144,5.426A18.57,18.57,0,0,1,60.018,22.881Zm33.01,73.943a49.226,49.226,0,0,1-66.021,0V94.433A21.457,21.457,0,0,1,47.639,72.4H72.4A21.5,21.5,0,0,1,93.028,94.308Z"
            transform="translate(136.027 144.027)"
            fill="#4e4e4e"
          />
        </g>
      </svg>
    )}
    <label htmlFor="photo" className="absolute right-0 top-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 34 34"
      >
        <circle cx="17" cy="17" r="17" fill="#efefef" />
        <path
          id="photo"
          d="M5.254,3.678A1.57,1.57,0,0,1,3.678,5.254,1.57,1.57,0,0,1,2.1,3.678,1.57,1.57,0,0,1,3.678,2.1,1.57,1.57,0,0,1,5.254,3.678Zm8.407,3.153v3.678H2.1V8.932L4.729,6.305,6.042,7.619l4.2-4.2Zm.788-5.78H1.314a.266.266,0,0,0-.263.263V11.3a.266.266,0,0,0,.263.263H14.449a.266.266,0,0,0,.263-.263V1.314a.266.266,0,0,0-.263-.263Zm1.314.263V11.3a1.317,1.317,0,0,1-1.314,1.314H1.314a1.265,1.265,0,0,1-.928-.386A1.265,1.265,0,0,1,0,11.3V1.314A1.265,1.265,0,0,1,.386.386,1.265,1.265,0,0,1,1.314,0H14.449a1.265,1.265,0,0,1,.928.386,1.265,1.265,0,0,1,.386.928Z"
          transform="translate(9 11)"
          fill="#00a483"
        />
      </svg>
    </label>
  </div>
);

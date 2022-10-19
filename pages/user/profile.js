import { Fragment, useEffect, useState } from "react";
import router from "next/router";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Form/Input";
import Header2 from "@/components/Header/header2";
import BottomNav from "@/components/Navigation/BottomNav";
import { useAuthDispatch, useAuthState } from "providers/AuthProvider";
import Footer from "@/components/Footer";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import editImage from "@/assets/icons/edit-image.png";

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
      <div className="pb-20">


        <main className="relative ">
          <section className=" bg-primary pb-8 mb-20 flex justify-center rounded-b-xl">
            <UserIcon img={imgPath} onChange={changeImage} />
            <div className="ml-12 md:ml-0">
              <div className="absolute  right-20 top-32  text-[20px] font-bold">
                <div className="text-white">
                  {userName || user.userdetails.userName}
                </div>
              </div>
            </div>
          </section>


          <section className="px-4 flex flex-col my-8 space-y-4">
            <Link href="/user/favourites">
              <a className="border-lg py-3 text-sm text-primary uppercase rounded text-center" style={{ backgroundColor: "#F9C414" }}>
                MY FAVORITES
              </a>
            </Link>
          </section>
          <section className="px-4 flex flex-col my-8 space-y-4">
            <h1 className="font-Light text-[14px] border-b-2 pb-2">Basic Info</h1>
            <div className="space-y-1 text-[12px] font-Regular">
              <p className="bg-white px-0.5">Name <span className="text-red-500">*</span></p>
              <Input
                type="text"
                inputClass="text-black-ef font-Regular"
                maxLength="30"
                name="username"
                required
                defaultValue={user?.userdetails?.userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div className="space-y-1 text-[12px] font-Regular">
              <p className="bg-white px-0.5">Mobile No.<span className="text-red-500">*</span></p>
              <Input
                disabled
                inputClass="font-Regular text-black-ef"
                defaultValue={`+91 | ${user?.userdetails?.mobileNumber}`}
              />
            </div>
            <div className="space-y-1 text-[12px] font-Regular">
              <p className="bg-white px-0.5">Email ID <span className="text-red-500">*</span></p>
              <Input
                type="text"
                name="email"
                inputClass="font-Regular text-black-ef"
                defaultValue={user?.userdetails?.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

            </div>


            <div className="w-full py-3 text-white font-medium text-[15px] rounded-md text-center m-auto justify-center" style={{ backgroundColor: "#2C2F45" }} onClick={saveUserInfo}>
              <p>Save Changes</p>
            </div>



            <div className="flex text-[9px]">
              <p className="text-sm text-red-500 rounded text-center font-Regular underline flex flex-1 hover:cursor-pointer"
                onClick={deleteUserAccountInfo}>
                <RiDeleteBinLine className="self-center" />
                Delete account
              </p>
              <a href="/login">
                <p
                  className="text-sm text-primary rounded text-center font-Regular underline flex gap-1"
                  onClick={() => {
                    dispatch("LOGOUT");
                  }}
                >

                  Log Out
                  <AiOutlineLogout className="self-center" />
                </p>
              </a>


            </div>


          </section>
        </main>
        {/* <Footer /> */}
        <BottomNav />
      </div>
    </Fragment>
  );
}

export default Profile;

const UserIcon = ({ onChange, img }) => (
  <div className={`relative top-20 -left-16  p-1 py-1  ${img ? " bg-white rounded-full" : ""} `}>
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
        style={{ width: 132, height: 132 }}
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
        width="132"
        height="132"
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
    <label htmlFor="photo" className="absolute right-1 top-4 bg-white rounded-full">
      {/* <svg
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
      </svg> */}

      {/* <img src={editImage} alt="profile-edit"/> */}
      <svg id="Layer_3" height="30" viewBox="0 0 48 48" width="30" xmlns="http://www.w3.org/2000/svg" data-name="Layer 3">
        <path d="m13 34.75h7.05a.75.75 0 1 0 0-1.5h-7.05a1.2511 1.2511 0 0 1 -1.25-1.25v-3.4991l4.35-4.3409 3.87 3.87a.75.75 0 0 0 1.0606 0l7.2-7.2 1.4594 1.46a.75.75 0 0 0 1.0606-1.06l-1.99-1.99a.75.75 0 0 0 -1.0606 0l-7.2 7.2-3.87-3.87a.75.75 0 0 0 -1.06-.0005l-3.82 3.8125v-12.382a1.2511 1.2511 0 0 1 1.25-1.25h18a1.2511 1.2511 0 0 1 1.25 1.25v5.49a.75.75 0 0 0 1.5 0v-5.49a2.7528 2.7528 0 0 0 -2.75-2.75h-18a2.7528 2.7528 0 0 0 -2.75 2.75v18a2.7528 2.7528 0 0 0 2.75 2.75z" /><path d="m32.9888 22.1748-10.4468 10.3945a.7506.7506 0 0 0 -.2212.5137l-.0708 2.8984a.76.76 0 0 0 .7681.7686l2.9135-.0708a.7512.7512 0 0 0 .5108-.2183l10.4476-10.394a2.757 2.757 0 1 0 -3.9008-3.8921zm3.2465 1.8452a1.4035 1.4035 0 0 1 -.4038.983l-10.2348 10.1835-1.8277.0445.044-1.8106 10.2334-10.1821a1.3935 1.3935 0 0 1 1.0042-.42 1.204 1.204 0 0 1 1.1847 1.2017z" /><path d="m16.25 18a2.75 2.75 0 1 0 2.75-2.75 2.7528 2.7528 0 0 0 -2.75 2.75zm4 0a1.25 1.25 0 1 1 -1.25-1.25 1.2511 1.2511 0 0 1 1.25 1.25z" />
      </svg>
    </label>

  </div>
);

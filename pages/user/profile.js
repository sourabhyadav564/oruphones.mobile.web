import { Fragment, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Form/Input";
import BottomNav from "@/components/Navigation/BottomNav";
import { useAuthDispatch, useAuthState } from "providers/AuthProvider";
import LoadingStatePopup from "../../components/Popup/LoadingStatePopup";
import imageCompression from "browser-image-compression";
import {
  updateUserProfileDetails,
  getUserDetails,
  uploadUserProfilePic,
  deleteUserAccount,
} from "api-call";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import DeleteAccPopup from "@/components/Popup/DeleteAccPopup";

function Profile() {
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(false);
  const { authenticated, loading, user } = useAuthState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [deleteAcc, setDeleteAcc] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const dispatch = useAuthDispatch();
  const [imgPath, setImagePath] = useState(user?.userdetails?.profilePicPath);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  const changeImage = async (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(e.target.files[0], options);

    let formData = new FormData();
    formData.append("image", compressedFile);
    uploadUserProfilePic(
      formData,
      Cookies.get("userUniqueId"),
      Cookies.get("sessionId")
    ).then((response) => {
      if (response?.status === "SUCCESS") {
        let payload = {
          profilePicPath: response?.dataObject?.imagePath,
          profileThumbnailPath: response?.dataObject?.thumbnailImagePath,
          mobileNumber: Cookies.get("mobileNumber"),
          userUniqueId: Cookies.get("userUniqueId"),
        };

        updateUserProfileDetails(payload, Cookies.get("sessionId")).then(
          (res) => {
            if (res?.status === "SUCCESS") {
              user.userdetails = {
                ...user.userdetails,
                profilePicPath: res?.dataObject?.userdetails.profilePicPath,
              };
              setImagePath(res?.dataObject?.userdetails.profilePicPath);
            }
          }
        );
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
      email: email || user?.userdetails.email,
      mobileNumber: user?.userdetails?.mobileNumber,
      userName: userName || user.userdetails.userName,
      userUniqueId: Cookies.get("userUniqueId"),
    };

    updateUserProfileDetails(payload, Cookies.get("sessionId")).then((res) => {
      const mobileNumber = Cookies.get("mobileNumber");
      const countryCode = Cookies.get("countryCode");
      getUserDetails(countryCode, mobileNumber, Cookies.get("sessionId")).then(
        (resp) => {
          dispatch("LOGIN", resp.dataObject);
          toast.info("Profile information saved successfully", {
            position: toast.POSITION.TOP_CENTER,
            toastId: "014",
          });
        }
      );
    });
  };

  const deleteUserAccountInfo = () => {
    let payload = {
      userUniqueId: Cookies.get("userUniqueId"),
    };
    deleteUserAccount(payload, Cookies.get("sessionId")).then((res) => {
      dispatch("LOGOUT");
      toast.success("User Account Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: "015",
      });
    });
  };

  useEffect(() => {
    if (user && deleteAcc === true) {
      deleteUserAccountInfo();
    }
  }, [openDeletePopup]);

  if (loading || !authenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <div>
        <main className="relative mb-20">
          <section className=" bg-primary pb-8 mb-20 flex pl-20 rounded-b-xl">
            <UserIcon img={imgPath} onChange={changeImage} />
            <div className="ml-12 md:ml-0">
              <div className="absolute left-44 top-32  text-px font-Roboto-Bold">
                <div className="text-white">
                  {userName || user.userdetails.userName}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 flex flex-col my-8 space-y-4">
            <Link href="/user/favourites">
              <a
                className="border-lg font-Roboto-Regular py-2 text-sm text-primary uppercase rounded text-center"
                style={{ backgroundColor: "#F9C414" }}
                onClick={() => setLoadingState(true)}
              >
                <h1>MY FAVORITES</h1>
              </a>
            </Link>
          </section>
          <section className="px-4 flex flex-col my-8 space-y-4">
            <p className="font-Roboto-Light text-ex border-b-2 pb-1">
              Basic Information
            </p>
            <div className="space-y-1 text-jx font-Roboto-Regular">
              <p className="bg-white px-0.5">
                Name <span className="text-red-500">*</span>
              </p>
              <Input
                type="text"
                inputClass="text-black-ef font-Regular"
                maxLength="25"
                name="username"
                required
                defaultValue={user?.userdetails?.userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div className="space-y-1 text-jx font-Roboto-Regular">
              <p className="bg-white px-0.5">
                Mobile No.<span className="text-red-500">*</span>
              </p>
              <Input
                disabled
                prefix="+91"
                inputClass="font-Regular text-black-ef"
                defaultValue={` |  ${user?.userdetails?.mobileNumber}`}
              />
            </div>
            <div className="space-y-1 text-jx font-Roboto-Regular">
              <p className="bg-white px-0.5">
                Email ID <span className="text-red-500">*</span>
              </p>
              <Input
                type="text"
                name="email"
                inputClass="font-Roboto-Regular text-black-ef"
                defaultValue={user?.userdetails?.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div
              className="w-full py-2 text-white font-Roboto-Medium text-dx rounded-md text-center m-auto justify-center"
              style={{ backgroundColor: "#2C2F45" }}
              onClick={saveUserInfo}
            >
              <p>Save Changes</p>
            </div>

            <div className=" pt-4 text-lx space-y-8">
              <div className="border border-primary rounded-[5px] py-2">
                <a href="/login">
                  <p
                    className="text-sm text-primary rounded text-center font-Roboto-Regular uppercase "
                    onClick={() => {
                      dispatch("LOGOUT");
                    }}
                  >
                    Log Out
                  </p>
                </a>
              </div>

              <div className="border border-red-500 rounded-[5px] py-2">
                <p
                  className="text-sm text-red-500 rounded text-center font-Roboto-Regular  "
                  onClick={() => {
                    setOpenDeletePopup(true);
                  }}
                >
                  Delete Account
                </p>
              </div>
            </div>
            <LoadingStatePopup open={loadingState} setOpen={setLoadingState} />
          </section>
        </main>
        <BottomNav />
      </div>
      <DeleteAccPopup
        open={openDeletePopup}
        setOpen={setOpenDeletePopup}
        setDelete={setDeleteAcc}
      />
    </Fragment>
  );
}

export default Profile;

const UserIcon = ({ onChange, img }) => (
  <div
    className={`relative top-20 -left-16  p-1 py-1  ${
      img ? " bg-white rounded-full" : ""
    } `}
  >
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
          alt="Oruphones user"
          src={img}
          layout="fill"
          className="rounded-full"
          objectFit="cover"
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
    <label
      htmlFor="photo"
      className="absolute right-1 top-4 bg-white rounded-full"
    >
      <svg
        id="Layer_3"
        height="30"
        viewBox="0 0 48 48"
        width="30"
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 3"
      >
        <path d="m13 34.75h7.05a.75.75 0 1 0 0-1.5h-7.05a1.2511 1.2511 0 0 1 -1.25-1.25v-3.4991l4.35-4.3409 3.87 3.87a.75.75 0 0 0 1.0606 0l7.2-7.2 1.4594 1.46a.75.75 0 0 0 1.0606-1.06l-1.99-1.99a.75.75 0 0 0 -1.0606 0l-7.2 7.2-3.87-3.87a.75.75 0 0 0 -1.06-.0005l-3.82 3.8125v-12.382a1.2511 1.2511 0 0 1 1.25-1.25h18a1.2511 1.2511 0 0 1 1.25 1.25v5.49a.75.75 0 0 0 1.5 0v-5.49a2.7528 2.7528 0 0 0 -2.75-2.75h-18a2.7528 2.7528 0 0 0 -2.75 2.75v18a2.7528 2.7528 0 0 0 2.75 2.75z" />
        <path d="m32.9888 22.1748-10.4468 10.3945a.7506.7506 0 0 0 -.2212.5137l-.0708 2.8984a.76.76 0 0 0 .7681.7686l2.9135-.0708a.7512.7512 0 0 0 .5108-.2183l10.4476-10.394a2.757 2.757 0 1 0 -3.9008-3.8921zm3.2465 1.8452a1.4035 1.4035 0 0 1 -.4038.983l-10.2348 10.1835-1.8277.0445.044-1.8106 10.2334-10.1821a1.3935 1.3935 0 0 1 1.0042-.42 1.204 1.204 0 0 1 1.1847 1.2017z" />
        <path d="m16.25 18a2.75 2.75 0 1 0 2.75-2.75 2.7528 2.7528 0 0 0 -2.75 2.75zm4 0a1.25 1.25 0 1 1 -1.25-1.25 1.2511 1.2511 0 0 1 1.25 1.25z" />
      </svg>
    </label>
  </div>
);

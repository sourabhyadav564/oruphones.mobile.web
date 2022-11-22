import ListingTile from "@/components/Card/ListingTile";
import Footer from "@/components/Footer";
import Header2 from "@/components/Header/header2";
import Header3 from "@/components/Header/header3";
import BottomNav from "@/components/Navigation/BottomNav";
import { getUserListings } from "api-call";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useAuthDispatch, useAuthState } from "providers/AuthProvider";
import { Fragment, useEffect, useState } from "react";

function Index({ userInfo }) {
  const { authenticated, loading, user } = useAuthState();
  const [listings, setListings] = useState();
  const [listingsLoading, setListingsLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(-1);
  const router = useRouter();
  const dispatch = useAuthDispatch();
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setLoadingState(false);
  }, [router.pathname]);

  useEffect(() => {
    if (userInfo === null) return;
    try {
      let tempUserInfo = JSON.parse(userInfo);
      const {
        userdetails: { mobileNumber, countryCode = "91" },
      } = tempUserInfo;
      Cookies.set("mobileNumber", mobileNumber);
      Cookies.set("countryCode", countryCode);
      dispatch("LOGIN", tempUserInfo);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
    if (!loading && user && user?.userdetails?.userUniqueId) {
      getUserListings(user?.userdetails?.userUniqueId).then(
        (res) => {
          setListings(res.dataObject);
          setListingsLoading(false);
        },
        (err) => console.error(err)
      );
    }
  }, [authenticated, loading]);

  if (loading || !authenticated) {
    return (
      <div className="min-h-screen flex justify-center ">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Header3 title1={"MyListing"} title2={"My Favorites"} />
      <main className="md:mb-28 px-5 pt-4 pb-24 flex flex-col min-h-screen absolute bg-white w-full">
        {listingsLoading ? (
          <div className="flex justify-center items-center h-52">
            Loading...
          </div>
        ) : listings && listings.length > 0 ? (
          listings.map((list) => (
            <ListingTile
              key={list.listingId}
              data={list}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              setListings={setListings}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-52">
            &quot;No listing found&quot;
          </div>
        )}
      </main>
      {/* <Footer /> */}
      <BottomNav />
    </Fragment>
  );
}

export default Index;

export const getServerSideProps = async ({ query }) => {
  try {
    return {
      props: {
        userInfo: query?.userInfo || null,
      },
    };
  } catch (e) {
    return {
      props: {
        userInfo: null,
      },
    };
  }
};

import ListingTile from "@/components/Card/ListingTile";
import Footer from "@/components/Footer";
import Header2 from "@/components/Header/header2";
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
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Header2 title="My Listings" />
      <main className="px-4 py-4 flex flex-col space-y-6 min-h-screen">
        {listingsLoading ? (
          <div className="flex justify-center items-center h-52">Loading...</div>
        ) : (
          (listings &&
            listings.map((list) => (
              <ListingTile key={list.listingId} data={list} openMenu={openMenu} setOpenMenu={setOpenMenu} setListings={setListings} />
            ))) || <div className="flex justify-center items-center h-52">&quot;No listing found&quot;</div>
        )}
      </main>
      <Footer />
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

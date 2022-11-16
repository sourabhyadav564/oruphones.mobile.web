import { Fragment, useState, useEffect } from "react";
import Header2 from "@/components/Header/header2";
import Header3 from "@/components/Header/header3";
import Footer from "@/components/Footer";
import BottomNav from "@/components/Navigation/BottomNav";
import FavListingTile from "@/components/Card/FavListingTile";
import Cookies from "js-cookie";
import { fetchMyFavorites } from "api-call";
import { useAuthState } from "providers/AuthProvider";
import { useRouter } from "next/router";
import Spinner from "@/components/Loader/Spinner";

function Favorites() {
  const [myFavList, setMyFavList] = useState();
  const { authenticated, loading, user } = useAuthState();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  console.log("loading", loading);

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [authenticated, loading]);

  useEffect(() => {
    if (authenticated && user && user?.userdetails?.userUniqueId) {
      fetchMyFavorites(Cookies.get("userUniqueId")).then((response) => {
        setMyFavList(response?.dataObject);
        setIsLoading(false);
      });
    }
  }, [authenticated]);

  if (loading || !authenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="space-y-3">
          <Spinner />
          <div className="text-center">
            Please wait, while we are fetching data for you...{" "}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <Header3 title1={"MyListing"} title2={"My Favorites"} />
      <main className="px-4 py-4 mt-12 pb-16 flex flex-col space-y-6 min-h-screen relative bg-white">
        {myFavList && myFavList.length > 0 && (
          myFavList?.map((item, index) => (
            <FavListingTile
              data={{ ...item, favourite: true }}
              key={index}
              setProducts={setMyFavList}
            />
          ))
        )}

        {(!myFavList || myFavList.length == 0) && !isLoading && (
          <div className="text-center h-60 flex items-center justify-center">
            Not Found Favourites
          </div>
        )}

        {isLoading && !myFavList?.length > 0 && (
          <div className="space-y-3">
            <Spinner />
            <div className="text-center">
              Please wait, while we are fetching data for you...{" "}
            </div>
          </div>
        )}
      </main>
      {/* <Footer /> */}
      <BottomNav />
    </Fragment>
  );
}

export default Favorites;


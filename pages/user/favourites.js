import { Fragment, useState, useEffect } from "react";
import Header2 from "@/components/Header/header2";
import Footer from "@/components/Footer";
import FavListingTile from "@/components/Card/FavListingTile";
import Cookies from "js-cookie";
import { fetchMyFavorites } from "api-call";
import { useAuthState } from "providers/AuthProvider";
import { useRouter } from "next/router";
import Spinner from "@/components/Loader/Spinner";

function Favorites() {
  const [myFavList, setMyFavList] = useState();
  const { authenticated, loading } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [authenticated, loading]);

  useEffect(() => {
    if (authenticated) {
      fetchMyFavorites(Cookies.get("userUniqueId")).then((response) => {
        setMyFavList(response?.dataObject);
      });
    }
  }, [authenticated]);

  if (loading || !authenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Header2 title="My Favorites" />
      <main className="px-4 py-4 flex flex-col space-y-6">
        {myFavList && myFavList.length > 0 ? (
          myFavList?.map((item, index) => <FavListingTile data={{ ...item, favourite: true }} key={index} setProducts={setMyFavList} />)
        ) : (
          // <div className="text-center h-60 flex items-center justify-center">Not Found Favourites</div>
          <div className="space-y-3">
            <Spinner />
            <div className="text-center">
              Please wait, while we are fetching data for you...{" "}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </Fragment>
  );
}

export default Favorites;

import { Fragment, useState } from "react";
import { useAuthState, useAuthDispatch } from "providers/AuthProvider";
import { useEffect } from "react";
import SearchBar from "./SearchBar";

function Header1() {
  const { selectedSearchCity, user } = useAuthState();
  const dispatch = useAuthDispatch();

  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    if (user != null) {
      const searchLoc = user?.address?.filter((items) => {
        return items.addressType === "SearchLocation";
      });
      setUserName(user.userdetails.userName === null ? "User" : user?.userdetails?.userName);
      if (searchLoc && searchLoc.length > 0) {
        dispatch("ADDCITY", searchLoc[0]?.city);
      }
    } else {
      setUserName("Guest");
    }
  }, [user]);

  return (
    <div className="flex justify-between items-center pt-0 py-2 px-2 text-sm font-medium bg-primary text-white sticky top-12 z-50">
      <SearchBar />
    </div>
  );
}

export default Header1;

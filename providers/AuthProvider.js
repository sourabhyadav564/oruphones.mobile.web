import { getUserDetails } from "api-call";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useReducer } from "react";

const StateContext = createContext({
  authenticated: false,
  user: null,
  loading: true,
  refresh: false,
  prevRefresh: false,
});

const DispatchContext = createContext(null);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "ADDCITY":
      return {
        ...state,
        selectedSearchCity: payload,
      };
    case "REFRESH":
      return {
        ...state,
        prevRefresh: state.refresh,
        refresh: !state.refresh,
      };
    case "LOGIN":
      const searchLoc =
        payload?.address &&
        payload?.address?.filter((items) => {
          return items.addressType === "SearchLocation";
        });
      let data = {
        ...state,
        authenticated: true,
        user: payload,
        prevRefresh: state.refresh,
      };
      if (searchLoc && searchLoc.length > 0 && searchLoc[0]?.city) {
        data["selectedSearchCity"] = searchLoc[0]?.city;
      }
      if (data?.user?.userdetails?.userUniqueId) {
        Cookies.set("info", data?.user?.userdetails?.userUniqueId);
      }
      console.log("payload -----------> ", payload);
      sessionStorage.setItem("getUserDetails", JSON.stringify(payload));
      return data;
    case "LOGOUT":
      // localStorage.removeItem("token");
      Cookies.remove("mobileNumber");
      Cookies.remove("countryCode");
      Cookies.remove("info");
      sessionStorage.removeItem("getUserDetails");
      return {
        user: null,
        authenticated: false,
        selectedSearchCity: "India",
        refresh: false,
        prevRefresh: false,
      };
    case "POPULATE":
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
    selectedSearchCity: "India",
    refresh: false,
    prevRefresh: false,
  });

  const dispatch = (type, payload) => defaultDispatch({ type, payload });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userRes = JSON.parse(sessionStorage.getItem("getUserDetails"));
        if (
          userRes === null ||
          userRes === undefined ||
          !userRes?.userdetails ||
          state.prevRefresh !== state.refresh
        ) {
          const mobileNumber = Cookies.get("mobileNumber");
          const countryCode = Cookies.get("countryCode");
          if (mobileNumber === null || mobileNumber === undefined) {
            return;
          }
          console.log("AUTH PROVIDER -> ", countryCode, mobileNumber);
          const res = await getUserDetails(countryCode, mobileNumber);
          dispatch("LOGIN", res.dataObject);
        } else {
          dispatch("LOGIN", userRes);
        }
      } catch (err) {
        console.log(err);
        // localStorage.removeItem("token");
        dispatch("LOGOUT");
      } finally {
        dispatch("STOP_LOADING");
      }
    };

    loadUser();
    // eslint-disable-next-line
  }, [state.refresh]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);

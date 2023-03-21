import Axios from "axios";
import getServerURL from "@/utils/getServerURL";
import Cookies from "js-cookie";

const URI = getServerURL();

let headers = {
  "Content-Type": "application/json",
  srcFrom: "Mobile Web",
  eventName: "NA",
  userUniqueId: 0,
  sessionId: Cookies.get("sessionId"),
  devicePlatform: "Mobile Web",
  location:
    typeof window !== "undefined" ? localStorage.getItem("usedLocation") : "",
};

const MULTIPART_HEADER = { headers: { "Content-Type": "multipart/form-data" } };

Axios.interceptors.request.use(
  async (request) => {
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  async (response) => {
    if (response?.data?.status === "SESSION_INVALID") {
      headers = {
        ...headers,
        eventName: "NA",
        sessionId: Cookies.get("sessionId"),
        userUniqueId: 0,
      };
      const API_ENDPOINT = URI + "/api/v1/api/auth/sessionid";
      const result = await Axios.get(API_ENDPOINT, { headers: { ...headers } });
      console.log("result", result?.data?.reason);
      if (result?.data?.reason != "Session already exist") {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "sessionId",
            result?.data?.dataObject?.sessionId
          );
        }
        Cookies.set("sessionId", result?.data?.dataObject?.sessionId);
        const interval = setInterval(() => {
          window.location.reload();
          clearInterval(interval);
        }, 1000);
        // window.location.reload();
      } else {
        // const interval = setInterval(() => {
        // window.location.reload();
        // clearInterval(interval);
        // }, 1000);
      }
    }
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export const getAboutUsContent = async () => {
  const url = `${URI}/api/v1/web/aboutus.html`;
  return await Axios.get(url).then(
    (res) => {
      return res.data;
    },
    (err) => {}
  );
};

export function getSessionId(sessionID) {
  headers = {
    ...headers,
    eventName: "SESSION_CREATED",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = URI + "/api/v1/api/auth/sessionid";
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function getSearchResults(q, sessionID) {
  headers = {
    ...headers,
    eventName: "SEARCH_TEXT_SUGGESTIONS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = URI + "/api/v1/cscglobal/search";
  return Axios.post(API_ENDPOINT, { userInputText: q }, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}
export async function generateOTP(countryCode, mobileNumber, sessionID) {
  headers = {
    ...headers,
    eventName: "SIGNIN_REQUEST",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/otp/generate?countryCode=${countryCode}&mobileNumber=${mobileNumber}`;

  return await Axios.post(url, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}
export async function resendOTP(countryCode, mobileNumber, sessionID) {
  headers = {
    ...headers,
    eventName: "RESEND_OTP",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/otp/resend?countryCode=${countryCode}&mobileNumber=${mobileNumber}`;

  return await Axios.post(url, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}
export async function validateUser(countryCode, mobileNumber, OTP, sessionID) {
  headers = {
    ...headers,
    eventName: "VERIFY_OTP",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/otp/validate?countryCode=${countryCode}&mobileNumber=${mobileNumber}&otp=${OTP}`;
  return await Axios.post(url, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}
export async function createUser(countryCode, mobileNumber, sessionID) {
  headers = {
    ...headers,
    eventName: "SIGNUP_REQUEST",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/create`;
  const payload = {
    countryCode: countryCode,
    mobileNumber: mobileNumber,
  };
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}
export async function getUserDetails(countryCode, mobileNumber, sessionID) {
  headers = {
    ...headers,
    eventName: "FETCH_USER_DETAILS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/details?countryCode=${countryCode}&mobileNumber=${mobileNumber}`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}
export async function getUserDetailsViaUUID(uuid, sessionID) {
  headers = {
    ...headers,
    eventName: "FETCH_USER_DETAILS_VIA_UUID",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/details?userUniqueId=${uuid}`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}
export async function getMakeModelLists(
  userUniqueId,
  sessionId,
  make,
  isPrimary
) {
  headers = {
    ...headers,
    eventName: "GET_MAKE_MODEL_LIST",
    userUniqueId: 0,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/master/makemodellist`;

  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function getModelLists(
  userUniqueId,
  sessionId,
  make,
  searchModel
) {
  headers = {
    ...headers,
    eventName: "GET_MODEL_LIST",
    userUniqueId: 0,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/master/modellist?make=${make}&searchModel=${searchModel}`;

  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function uploadImage(data, params, sessionID) {
  const url = `${URI}/api/v1/device/uploadimage?deviceFace=${params.deviceFace}&deviceStorage=${params.deviceStorage}&make=${params.make}&model=${params.model}&userUniqueId=${params.userUniqueId}`;
  var header = {
    ...headers,
    eventName: "ADDLISTING_UPLOAD_PHOTOS_SUCCESS",
    "Content-Type": "multipart/form-data",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const MULTIPART_HEADER = { headers: { ...header } };

  return await Axios.post(url, data, MULTIPART_HEADER).then((response) => {
    return response.data;
  });
}
export async function getRecommandedPrice(data, sessionID) {
  headers = {
    ...headers,
    eventName: "FETCH_RECOMMENDED_PRICE",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/global/recomanded/price`;

  return await Axios.post(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}
export async function saveLisiting(payload, sessionID) {
  headers = {
    ...headers,
    eventName: "ADDLISTING_ADD_SUCCESS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/save`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function updateLisiting(payload, sessionID) {
  headers = {
    ...headers,
    eventName: "EDITLISTING_EDIT_SUCCESS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/update`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function deleteListing(params, sessionID) {
  headers = {
    ...headers,
    eventName: "MYLISTINGS_DELETE_SELECTED",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/delete`;
  return await Axios.post(url, params, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function activateListing(params, sessionID) {
  headers = {
    ...headers,
    eventName: "MYLISTINGS_ACTIVATENOW_SELECTED",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/activate`;
  return await Axios.post(url, JSON.stringify(params), DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function pauseListing(params, sessionID) {
  headers = {
    ...headers,
    eventName: "MYLISTINGS_PAUSE_SELECTED",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/pause`;
  return await Axios.post(url, params, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function getUserListings(userUniqueId, sessionID) {
  headers = {
    ...headers,
    eventName: "MYLISTINGS_VIEW_LISTING",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listings?userUniqueId=${userUniqueId}`;

  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    if (response?.data?.status != "SESSION_INVALID") {
      localStorage.setItem(
        "listings",
        response.data.dataObject.map((item) => item.listingId)
      );
    }
    return response.data;
  });
}

export async function getListingDetails(listingid, userUniqueId, sessionId) {
  headers = {
    ...headers,
    eventName: "FETCH_LISTING_DETAILS",
    userUniqueId: 0,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/detail?listingid=${listingid}&userUniqueId=${userUniqueId}`;

  return await Axios.get(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function fetchBrands(sessionID) {
  headers = {
    ...headers,
    eventName: `GET_ALL_BRANDS`,
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/master/brands`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchTopsellingmodels(sessionID) {
  headers = {
    ...headers,
    eventName: `GET_TOP_SELLING_MODELS`,
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/home/topselling/models`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchByMakeList(
  location,
  makeName,
  userUniqueId,
  sessionId,
  pageNumber,
  sortBy
) {
  headers = {
    ...headers,
    eventName: `BRAND_SELECTED ${makeName}`,
    userUniqueId: 0,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/home/listingsbymake?listingLocation=` +
    location +
    `&make=` +
    makeName +
    `&userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber +
    `&sortBy=` +
    sortBy;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchByMarketingName(
  location,
  marketingName,
  userUniqueId,
  pageNumber,
  sortBy,
  sessionID
) {
  headers = {
    ...headers,
    eventName: `HOME_TOP_SELLING_MODEL_SELECTED ${marketingName}`,
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/home/listbymarketingname?location=` +
    location +
    `&marketingName=` +
    marketingName +
    `&userUniqueId=` +
    userUniqueId +
    "&pageNumber=" +
    pageNumber +
    `&sortBy=` +
    sortBy;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function detailWithUserInfo(
  isOtherVendor,
  listingid,
  userUniqueId,
  sessionId
) {
  const url =
    `${URI}/api/v1/device/listing/detailwithuserinfo?isOtherVendor=` +
    isOtherVendor +
    "&listingid=" +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  headers = {
    ...headers,
    eventName: "PRODUCT_DETAIL_WITH_SELLER_DETAIL",
    userUniqueId: 0,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return await Axios.post(url, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchSellerMobileNumber(
  listingid,
  userUniqueId,
  sessionID
) {
  headers = {
    ...headers,
    eventName: "GET_SELLER_CONTACT",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/device/listing/user/mobilenumber?listingId=` +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.get(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function getGlobalCities(searchText, sessionID) {
  headers = {
    ...headers,
    eventName: "FETCH_CITIES",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/global/cities?limited=true&searchText=` + searchText;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function shopByPrice(sessionID) {
  headers = {
    ...headers,
    eventName: "GET_SHOP_BY_PRICE",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/global/shopbyprice`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function shopByPriceRange(
  maxPrice,
  location,
  minPrice,
  listingid,
  pageNumber,
  sortBy,
  sessionID
) {
  const url =
    `${URI}/api/v1/home/shopbyprice/listmodel?end=` +
    maxPrice +
    `&listingLocation=` +
    location +
    `&start=` +
    minPrice +
    `&userUniqueId=` +
    listingid +
    `&pageNumber=` +
    pageNumber +
    `&sortBy=` +
    sortBy;
  headers = {
    ...headers,
    eventName: "GET_BEST_DEALS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function bestDealNearByYou(
  location,
  userUniqueId,
  pageNumber,
  sortBy,
  sessionID
) {
  const url =
    `${URI}/api/v1/home/listings/best/nearme?location=` +
    location +
    `&userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber +
    `&sortBy=` +
    sortBy;
  headers = {
    ...headers,
    eventName: "GET_BEST_DEALS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return await Axios.get(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function addUserSearchLocation(payload, sessionID) {
  headers = {
    ...headers,
    eventName: "LOCATION_CHANGED_SUCCESS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/address/addSearchLocation`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function addUserProfileLocation(payload, sessionID) {
  headers = {
    ...headers,
    eventName: "PROFILE_LOCATION_ADDED",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/address/addProfileLocation`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function updateAddress(payload, sessionID) {
  headers = {
    ...headers,
    eventName: "UPDATE_ADDRESS_SUCCESS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/address/update`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function addFavotie(payload, sessionID) {
  headers = {
    ...headers,
    eventName: "FAVORITE_ADD_SUCCESS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/favorite/add`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function removeFavotie(listingId, userUniqueId, sessionID) {
  headers = {
    ...headers,
    eventName: "FAVORITE_REMOVE_SUCCESS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/favorite/deactivate?listingId=` +
    listingId +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.post(url, {}, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function bestDealNearYouAll(
  location,
  userUniqueId,
  pageNumber,
  sortBy,
  sessionID
) {
  headers = {
    ...headers,
    eventName: "HOME_BESTDEAL_VIEW_ALL",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  console.log("url", sessionID);
  const url =
    `${URI}/api/v1/device/listings/best/nearall?userLocation=` +
    location +
    `&userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber +
    `&sortBy=` +
    sortBy;
  return await Axios.get(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function updateUserProfileDetails(payload, sessionID) {
  headers = {
    ...headers,
    eventName: "UPDATE_USER_DETAILS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/update`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function fetchMyFavorites(userUniqueId, sessionID) {
  headers = {
    ...headers,
    eventName: "FETCH_FAVORITE_LIST",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/favorite/fetch?userUniqueId=` + userUniqueId;
  return await Axios.post(url, {}, DEFAULT_HEADER).then(
    (response) => {
      localStorage.setItem(
        "favoriteList",
        response.data.dataObject.map((item) => item.listingId)
      );
      return response.data;
    },
    (err) => {}
  );
}

export async function fetchSimilarProducts(
  payLoad,
  userUniqueId,
  pageNumber,
  sessionID
) {
  headers = {
    ...headers,
    eventName: "FETCH_SIMILAR_PRODUCTS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/home/listings/search?userUniqueId=` +
    `&pageNumber=` +
    pageNumber;
  return await Axios.post(url, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function sendverification(listingid, userUniqueId, sessionID) {
  headers = {
    ...headers,
    eventName: "REQUEST_VERIFICATION",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/device/listing/sendverification?listingId=` +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.get(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function getShowSerchFilters(sessionID) {
  headers = {
    ...headers,
    eventName: "FETCH_SEARCH_FILTERS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/master/showserchFilters`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function searchFilter(
  payLoad,
  userUniqueId,
  sessionId,
  pageNumber,
  sortBy
) {
  headers = {
    ...headers,
    eventName: "FETCH_SEARCH_LISTINGS",
    sessionId: sessionId,
    userUniqueId: 0,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    `${URI}/api/v1/home/listings/search?userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber +
    `&sortBy=` +
    sortBy;
  return await Axios.post(API_ENDPOINT, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function getTinyUrl(sessionID) {
  headers = {
    ...headers,
    eventName: "GET_TINY_URL",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/global/tinyurl`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function getExternalSellSourceData(payLoad, sessionID) {
  headers = {
    ...headers,
    eventName: "GET_EXTERNAL_SELL_SOURCE",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/device/price/externalsellsource`;
  return await Axios.post(API_ENDPOINT, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function fetchWebLinkByShareId(shareId, sessionID) {
  const API_ENDPOINT = `${URI}/api/v1/global/share/weblink?shareId=` + shareId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function infoTemplates(sessionID) {
  headers = {
    ...headers,
    eventName: "FETCH_INFO_LINKS",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/global/getinfotemplates`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function uploadUserProfilePic(
  userProfilePicData,
  userUniqueId,
  sessionID
) {
  const API_ENDPOINT =
    `${URI}/api/v1/device/uploadimage?deviceFace=profilePic&userUniqueId=` +
    userUniqueId;
  var header = {
    ...headers,
    eventName: "UPLOAD_PROFILE_PIC",
    "Content-Type": "multipart/form-data",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const MULTIPART_HEADER = { headers: { ...header } };
  return await Axios.post(
    API_ENDPOINT,
    userProfilePicData,
    MULTIPART_HEADER
  ).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function prepareShareLink(listingId, userUniqueId, sessionID) {
  headers = {
    ...headers,
    eventName: "PRODUCTINFO_SHARE_SELECTED",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    `${URI}/api/v1/global/share/link?listingId=` +
    listingId +
    `&userUniqueId=` +
    userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function getAllNotificationByUserd(userUniqueId, sessionId) {
  headers = {
    ...headers,
    eventName: "FETCH_NOTIFICATIONS",
    userUniqueId: userUniqueId,
    sessionId: sessionId,
    userUniqueId: 0,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/notification/byUserId/` + userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function markAsRead(notificationId, userUniqueId, sessionID) {
  headers = {
    ...headers,
    eventName: "NOTIFICATION_SELECTED",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    `${URI}/api/v1/notification/read/` + notificationId + userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function deleteNotification(notificationId, userUniqueId, sessionID) {
  headers = {
    ...headers,
    eventName: "NOTIFICATION_REMOVED",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    `${URI}/api/v1/notification/remove?id=` +
    notificationId +
    "&userUniqueId=" +
    userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function contactUs(payLoad, sessionID) {
  headers = {
    ...headers,
    eventName: "CONTACT_US",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/global/contactus`;
  return Axios.post(API_ENDPOINT, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function fetchTopArticles(sessionID) {
  headers = {
    ...headers,
    eventName: "FETCH_TOP_ARTICLES",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/wordpress/blogs/info`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export function shopByCategory(
  location,
  category,
  userUniqueId,
  pageNumber,
  sortBy,
  sessionID
) {
  const API_ENDPOINT =
    URI +
    `/api/v1/home/listings/category?location=` +
    location +
    `&category=` +
    category +
    `&pageNumber=` +
    pageNumber +
    `&userUniqueId=` +
    userUniqueId +
    `&sortBy=` +
    sortBy;
  headers = {
    ...headers,
    eventName: "FETCH_TOP_ARTICLES",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function marketingNameByModel(payload, sessionID) {
  headers = {
    ...headers,
    eventName: "FETCH_UPTO_PRICE",
    userUniqueId: 0,
    sessionId: sessionID,
  };

  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/master/marketingNameByModel`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function deleteUserAccount(payload, sessionID) {
  headers = {
    ...headers,
    eventName: "DELETE_USER",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/delete`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function logEventInfo(eventName, sessionID) {
  headers = {
    ...headers,
    eventName: eventName,
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/cscglobal/logeventinfo`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {}
  );
}

export async function reportIssue(
  Name,
  Email,
  Phone,
  issue,
  make,
  description,
  storage,
  ScheduleCall,
  callTime,
  sessionID
) {
  headers = {
    ...headers,
    eventName: "REPORT_ISSUE",
    userUniqueId: 0,
    sessionId: sessionID,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/cscglobal/reportIssue?issueType=${issue}&description=${
    description + "Call scheduled time: " + callTime
  }&email=${Email}&phone=${Phone}&name=${Name}&modelName=${make}&deviceStorage=${storage}&scheduleCall=${ScheduleCall}`;
  const response = await Axios.post(API_ENDPOINT, {}, DEFAULT_HEADER);
  return response.data;
}

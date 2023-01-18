import Axios from "axios";
import getServerURL from "@/utils/getServerURL";
import Cookies from "js-cookie";

const URI = getServerURL();

// pending from 
let headers = {
  "Content-Type": "application/json",
  srcFrom: "Mobile Web",
  eventName: "NA",
  userUniqueId:
    // Cookies.get("userUniqueId")!==undefined
    // ? Cookies.get("userUniqueId")
    // :
    0,
  sessionId:
    typeof window !== "undefined"
      ? localStorage.getItem("sessionId")
      : Cookies.get("sessionId") != undefined ? Cookies.get("sessionId") : "",
  devicePlatform: "Mobile Web",
  location:
    typeof window !== "undefined" ? localStorage.getItem("usedLocation") : "",
};

const MULTIPART_HEADER = { headers: { "Content-Type": "multipart/form-data" } };

Axios.interceptors.request.use(
  async (request) => {
    // console.log("request", request);
    return request;
  },
  (err) => {
    // console.log("err", err);
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  async (response) => {
    // console.log("response", response);
    // console.log("response", response?.data?.status);
    if (response?.data?.status === "SESSION_INVALID") {
      headers = { ...headers, eventName: "NA" };
      const API_ENDPOINT = URI + "/api/v1/api/auth/sessionid";
      const result = await Axios.get(API_ENDPOINT, { headers: { ...headers } });
      // console.log("response from session id", result);
      // console.log(
      //   "response from session id",
      //   result?.data?.dataObject?.sessionId
      // );
      if (typeof window !== "undefined") {
        localStorage.setItem("sessionId", result?.data?.dataObject?.sessionId);
      }
      Cookies.set("sessionId", result?.data?.dataObject?.sessionId);
      window.location.reload();
      // console.log("response.config", response.config);
    }
    return response;
  },
  async (error) => {
    // console.log("error", error);
    return Promise.reject(error);
  }
);

//pending till




export const getAboutUsContent = async () => {
  const url = `${URI}/api/v1/web/aboutus.html`;
  return await Axios.get(url).then(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );
}



export function getSessionId() {
  headers = { ...headers, eventName: "SESSION_CREATED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = URI + "/api/v1/api/auth/sessionid";
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}



export function getSearchResults(q) {
  headers = { ...headers, eventName: "SEARCH_TEXT_SUGGESTIONS", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = URI + "/api/v1/cscglobal/search";
  return Axios.post(
    API_ENDPOINT,
    // { params: { userInputText: q } },
    { userInputText: q },
    DEFAULT_HEADER
  ).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}



export async function generateOTP(countryCode, mobileNumber) {
  headers = { ...headers, eventName: "SIGNIN_REQUEST" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/otp/generate?countryCode=${countryCode}&mobileNumber=${mobileNumber}`;

  return await Axios.post(url, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}




export async function resendOTP(countryCode, mobileNumber) {
  headers = { ...headers, eventName: "RESEND_OTP" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/otp/resend?countryCode=${countryCode}&mobileNumber=${mobileNumber}`;

  return await Axios.post(url, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}



export async function validateUser(countryCode, mobileNumber, OTP) {
  headers = { ...headers, eventName: "VERIFY_OTP" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/otp/validate?countryCode=${countryCode}&mobileNumber=${mobileNumber}&otp=${OTP}`;
  return await Axios.post(url, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}



//mobiruqa.zenro.co.jp:8080 ?countryCode=%2B91&mobileNumber=8968028089
export async function createUser(countryCode, mobileNumber) {
  headers = { ...headers, eventName: "SIGNUP_REQUEST" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/create`;
  const payload = {
    countryCode: countryCode,
    mobileNumber: mobileNumber,
  };
  return await Axios.post(
    url,
    // { countryCode, mobileNumber },
    payload,
    DEFAULT_HEADER
  ).then((response) => {
    return response.data;
  });
}





export async function getUserDetails(countryCode, mobileNumber) {
  headers = { ...headers, eventName: "FETCH_USER_DETAILS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/details?countryCode=${countryCode}&mobileNumber=${mobileNumber}`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}



export async function getUserDetailsViaUUID(uuid) {
  headers = { ...headers, eventName: "FETCH_USER_DETAILS_VIA_UUID" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/details?userUniqueId=${uuid}`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}


export async function getMakeModelLists(userUniqueId, sessionId, make, isPrimary) {
  headers = {
    ...headers,
    eventName: "GET_MAKE_MODEL_LIST",
    userUniqueId: 0,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/master/makemodellist`;

  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    localStorage.setItem("make_models", JSON.stringify(response.data.dataObject));
    return response.data;
  });
}





export async function uploadImage(data, params) {
  const url = `${URI}/api/v1/device/uploadimage?deviceFace=${params.deviceFace}&deviceStorage=${params.deviceStorage}&make=${params.make}&model=${params.model}&userUniqueId=${params.userUniqueId}`;
  var header = {
    ...headers,
    eventName: "ADDLISTING_UPLOAD_PHOTOS_SUCCESS",
    "Content-Type": "multipart/form-data",
    userUniqueId: 0
  };
  const MULTIPART_HEADER = { headers: { ...header } };

  return await Axios.post(url, data, MULTIPART_HEADER).then((response) => {
    return response.data;
  });

}



export async function getRecommandedPrice(data) {
  headers = { ...headers, eventName: "FETCH_RECOMMENDED_PRICE", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/global/recomanded/price`;

  return await Axios.post(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}




export async function saveLisiting(payload) {
  headers = { ...headers, eventName: "ADDLISTING_ADD_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/save`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}


export async function updateLisiting(payload) {
  headers = { ...headers, eventName: "EDITLISTING_EDIT_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/update`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function deleteListing(params) {
  headers = { ...headers, eventName: "MYLISTINGS_DELETE_SELECTED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/delete`;
  return await Axios.post(url, params, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function activateListing(params) {
  headers = { ...headers, eventName: "MYLISTINGS_ACTIVATENOW_SELECTED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/activate`;
  return await Axios.post(url, JSON.stringify(params), DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function pauseListing(params) {
  headers = { ...headers, eventName: "MYLISTINGS_PAUSE_SELECTED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/pause`;
  return await Axios.post(url, params, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function getUserListings(userUniqueId) {
  headers = { ...headers, eventName: "MYLISTINGS_VIEW_LISTING", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listings?userUniqueId=${userUniqueId}`;

  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    localStorage.setItem("listings", response.data.dataObject.map((item) => item.listingId));
    return response.data;
  });
}

export async function getListingDetails(listingid, userUniqueId, sessionId) {
  headers = {
    ...headers,
    eventName: "FETCH_LISTING_DETAILS",
    userUniqueId: userUniqueId,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/device/listing/detail?listingid=${listingid}&userUniqueId=${userUniqueId}`;

  return await Axios.get(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function fetchBrands() {
  headers = { ...headers, eventName: `GET_ALL_BRANDS` };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/master/brands`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchTopsellingmodels() {
  headers = { ...headers, eventName: `GET_TOP_SELLING_MODELS` };
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
  sortBy,
) {
  headers = { ...headers, eventName: `BRAND_SELECTED ${makeName}`, userUniqueId: 0, sessionId: sessionId };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/home/listingsbymake?listingLocation=` +
    location +
    `&make=` +
    makeName +
    `&userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber + `&sortBy=` + sortBy;
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
) {
  headers = {
    ...headers,
    eventName: `HOME_TOP_SELLING_MODEL_SELECTED ${marketingName}`,
    userUniqueId: 0
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
    pageNumber + `&sortBy=` + sortBy;
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
    userUniqueId: userUniqueId,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return await Axios.post(url, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchSellerMobileNumber(listingid, userUniqueId) {
  headers = { ...headers, eventName: "GET_SELLER_CONTACT", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/device/listing/user/mobilenumber?listingId=` +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  },
    (err) => {
      console.log(err);
    }
  );
}

export async function getGlobalCities() {
  headers = { ...headers, eventName: "FETCH_CITIES" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/global/cities`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function shopByPrice() {
  headers = { ...headers, eventName: "GET_SHOP_BY_PRICE" };
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
    pageNumber + `&sortBy=` + sortBy;
  headers = { ...headers, eventName: "GET_BEST_DEALS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function bestDealNearByYou(location, userUniqueId, pageNumber, sortBy) {
  const url =
    `${URI}/api/v1/home/listings/best/nearme?location=` +
    location +
    `&userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber + `&sortBy=` + sortBy;
  headers = { ...headers, eventName: "GET_BEST_DEALS", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return await Axios.get(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function addUserSearchLocation(payload) {
  headers = { ...headers, eventName: "LOCATION_CHANGED_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/address/addSearchLocation`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function addUserProfileLocation(payload) {
  headers = { ...headers, eventName: "PROFILE_LOCATION_ADDED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/address/addProfileLocation`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function updateAddress(payload) {
  headers = { ...headers, eventName: "UPDATE_ADDRESS_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/address/update`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function addFavotie(payload) {
  headers = { ...headers, eventName: "FAVORITE_ADD_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/favorite/add`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      // localStorage.setItem("favoriteList", JSON.stringify(response.data.updateList.fav_listings));
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function removeFavotie(listingId, userUniqueId) {
  headers = { ...headers, eventName: "FAVORITE_REMOVE_SUCCESS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/favorite/deactivate?listingId=` +
    listingId +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.post(url, {}, DEFAULT_HEADER).then(
    (response) => {
      // localStorage.setItem("favoriteList", JSON.stringify(response.data.updateList.fav_listings));
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function bestDealNearYouAll(location, userUniqueId, pageNumber, sortBy) {
  headers = { ...headers, eventName: "HOME_BESTDEAL_VIEW_ALL", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/device/listings/best/nearall?userLocation=` +
    location +
    `&userUniqueId=` +
    userUniqueId +
    `&pageNumber=` +
    pageNumber + `&sortBy=` + sortBy;
  return await Axios.get(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function updateUserProfileDetails(payload) {
  headers = { ...headers, eventName: "UPDATE_USER_DETAILS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/update`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function fetchMyFavorites(userUniqueId) {
  headers = { ...headers, eventName: "FETCH_FAVORITE_LIST" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/favorite/fetch?userUniqueId=` + userUniqueId;
  return await Axios.post(url, {}, DEFAULT_HEADER).then(
    (response) => {
      localStorage.setItem("favoriteList", response.data.dataObject.map((item) => item.listingId));
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function fetchSimilarProducts(payLoad, userUniqueId, pageNumber) {
  headers = { ...headers, eventName: "FETCH_SIMILAR_PRODUCTS", userUniqueId: userUniqueId };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url =
    `${URI}/api/v1/home/listings/search?userUniqueId=` +
    `&pageNumber=` +
    pageNumber;
  return await Axios.post(url, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function sendverification(listingid, userUniqueId) {
  headers = { ...headers, eventName: "REQUEST_VERIFICATION" };
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
    (err) => {
      console.log(err);
    }
  );
}

export function getShowSerchFilters() {
  headers = { ...headers, eventName: "FETCH_SEARCH_FILTERS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/master/showserchFilters`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function searchFilter(payLoad, userUniqueId, sessionId, pageNumber, sortBy) {
  headers = { ...headers, eventName: "FETCH_SEARCH_LISTINGS", sessionId: sessionId, userUniqueId: 0 };
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
    (err) => {
      console.log(err);
    }
  );
}

export function getTinyUrl() {
  headers = { ...headers, eventName: "GET_TINY_URL" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/global/tinyurl`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function getExternalSellSourceData(payLoad) {
  headers = { ...headers, eventName: "GET_EXTERNAL_SELL_SOURCE" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/device/price/externalsellsource`;
  return await Axios.post(API_ENDPOINT, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchWebLinkByShareId(shareId) {
  const API_ENDPOINT = `${URI}/api/v1/global/share/weblink?shareId=` + shareId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function infoTemplates() {
  headers = { ...headers, eventName: "FETCH_INFO_LINKS" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/global/getinfotemplates`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function uploadUserProfilePic(userProfilePicData, userUniqueId) {
  const API_ENDPOINT =
    `${URI}/api/v1/device/uploadimage?deviceFace=profilePic&userUniqueId=` +
    userUniqueId;
  var header = {
    ...headers,
    eventName: "UPLOAD_PROFILE_PIC",
    "Content-Type": "multipart/form-data",
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
    (err) => {
      console.log(err);
    }
  );
}

export function prepareShareLink(listingId, userUniqueId) {
  headers = { ...headers, eventName: "PRODUCTINFO_SHARE_SELECTED" };
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
    (err) => {
      console.log(err);
    }
  );
}

export function getAllNotificationByUserd(userUniqueId, sessionId) {
  headers = {
    ...headers,
    eventName: "FETCH_NOTIFICATIONS",
    userUniqueId: userUniqueId,
    sessionId: sessionId,
  };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/notification/byUserId/` + userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function markAsRead(notificationId, userUniqueId) {
  headers = { ...headers, eventName: "NOTIFICATION_SELECTED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    `${URI}/api/v1/notification/read/` + notificationId + userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function deleteNotification(notificationId, userUniqueId) {
  headers = { ...headers, eventName: "NOTIFICATION_REMOVED" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT =
    `${URI}/api/v1/notification/remove?id=` + notificationId + "&userUniqueId=" + userUniqueId;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function contactUs(payLoad) {
  headers = { ...headers, eventName: "CONTACT_US" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/global/contactus`;
  return Axios.post(API_ENDPOINT, payLoad, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function fetchTopArticles() {
  headers = { ...headers, eventName: "FETCH_TOP_ARTICLES" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/wordpress/blogs/info`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export function shopByCategory(location, category, userUniqueId, pageNumber, sortBy) {
  const API_ENDPOINT =
    URI +
    `/api/v1/home/listings/category?location=` +
    location +
    `&category=` +
    category +
    `&pageNumber=` +
    pageNumber +
    `&userUniqueId=` +
    userUniqueId + `&sortBy=` + sortBy;
  headers = { ...headers, eventName: "FETCH_TOP_ARTICLES", userUniqueId: 0 };
  const DEFAULT_HEADER = { headers: { ...headers } };
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function marketingNameByModel(payload) {
  headers = { ...headers, eventName: "FETCH_UPTO_PRICE" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/master/marketingNameByModel`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function deleteUserAccount(payload) {
  headers = { ...headers, eventName: "DELETE_USER" };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const url = `${URI}/api/v1/login/user/delete`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function logEventInfo(eventName) {
  headers = { ...headers, eventName: eventName };
  const DEFAULT_HEADER = { headers: { ...headers } };
  const API_ENDPOINT = `${URI}/api/v1/cscglobal/logeventinfo`;
  return Axios.get(API_ENDPOINT, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

/********End**************/

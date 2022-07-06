import Axios from "axios";
import getServerURL from "@/utils/getServerURL";

const URI = getServerURL();
const DEFAULT_HEADER = { headers: { "Content-Type": "application/json" } };

export async function getAboutUsConent() {
  const url = `${URI}/api/v1/web/aboutus.html`;
  return await Axios.get(url);
}

export function getSearchResults(q) {
  const API_ENDPOINT = URI + "/api/v1/cscglobal/search";
  return Axios.post(
    API_ENDPOINT,
    // { params: { userInputText: q } },
    {userInputText: q},
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
  const url = `${URI}/api/v1/login/otp/generate?countryCode=${countryCode}&mobileNumber=${mobileNumber}`;

  return await Axios.post(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function resendOTP(countryCode, mobileNumber) {
  const url = `${URI}/api/v1/login/otp/resend?countryCode=${countryCode}&mobileNumber=${mobileNumber}`;

  return await Axios.post(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function validateUser(countryCode, mobileNumber, OTP) {
  const url = `${URI}/api/v1/login/otp/validate?countryCode=${countryCode}&mobileNumber=${mobileNumber}&otp=${OTP}`;

  return await Axios.post(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

//mobiruqa.zenro.co.jp:8080 ?countryCode=%2B91&mobileNumber=8968028089
export async function createUser(countryCode, mobileNumber) {
  console.log("countryCode, mobileNumber ", countryCode, mobileNumber);
  const url = `${URI}/api/v1/login/user/create`;

  return await Axios.post(
    url,
    { countryCode, mobileNumber },
    DEFAULT_HEADER
  ).then((response) => {
    return response.data;
  });
}

export async function getUserDetails(countryCode, mobileNumber) {
  const url = `${URI}/api/v1/login/user/details?countryCode=${countryCode}&mobileNumber=${mobileNumber}`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function getMakeModelLists() {
  const url = `${URI}/api/v1/master/makemodellist`;

  return await Axios.get(url, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function uploadImage(data, params) {
  const url = `${URI}/api/v1/device/uploadimage`;

  return await Axios.post(url, data, { params }, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    }
  );
}

export async function getRecommandedPrice(data) {
  const url = `${URI}/api/v1/global/recomanded/price`;

  return await Axios.post(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function saveLisiting(payload) {
  const url = `${URI}/api/v1/device/listing/save`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function updateLisiting(payload) {
  const url = `${URI}/api/v1/device/listing/update`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function deleteListing(params) {
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
  const url = `${URI}/api/v1/device/listings?userUniqueId=${userUniqueId}`;

  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function getListingDetails(listingid, userUniqueId) {
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
  const url = `${URI}/api/v1/master/brands`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchTopsellingmodels() {
  const url = `${URI}/api/v1/home/topselling/models`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchByMakeList(location, makeName, userUniqueId) {
  const url =
    `${URI}/api/v1/home/listingsbymake?listingLocation=` +
    location +
    `&make=` +
    makeName +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchByMarketingName(
  location,
  marketingName,
  userUniqueId
) {
  const url =
    `${URI}/api/v1/home/listbymarketingname?location=` +
    location +
    `&marketingName=` +
    marketingName +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function detailWithUserInfo(
  isOtherVendor,
  listingid,
  userUniqueId
) {
  const url =
    `${URI}/api/v1/device/listing/detailwithuserinfo?isOtherVendor=` +
    isOtherVendor +
    "&listingid=" +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.post(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function fetchSellerMobileNumber(listingid, userUniqueId) {
  const url =
    `${URI}/api/v1/device/listing/user/mobilenumber?listingId=` +
    listingid +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function getGlobalCities() {
  const url = `${URI}/api/v1/global/cities`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function shopByPrice() {
  const url = `${URI}/api/v1/global/shopbyprice`;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function shopByPriceRange(
  maxPrice,
  location,
  minPrice,
  listingid
) {
  const url =
    `${URI}/api/v1/home/shopbyprice/listmodel?end=` +
    maxPrice +
    `&listingLocation=` +
    location +
    `&start=` +
    minPrice +
    `&userUniqueId=` +
    listingid;
  return await Axios.get(url, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export async function bestDealNearByYou(location, userUniqueId) {
  const url =
    `${URI}/api/v1/home/listings/best/nearme?location=` +
    location +
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

export async function addUserSearchLocation(payload) {
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
  const url = `${URI}/api/v1/favorite/add`;
  return await Axios.post(url, payload, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function removeFavotie(listingId, userUniqueId) {
  const url =
    `${URI}/api/v1/favorite/deactivate?listingId=` +
    listingId +
    `&userUniqueId=` +
    userUniqueId;
  return await Axios.post(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function bestDealNearYouAll(location, userUniqueId) {
  const url =
    `${URI}/api/v1/device/listings/best/nearall?userLocation=` +
    location +
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

export async function updateUserProfileDetails(payload) {
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
  const url = `${URI}/api/v1/favorite/fetch?userUniqueId=` + userUniqueId;
  return await Axios.post(url, DEFAULT_HEADER).then(
    (response) => {
      return response.data;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function fetchSimilarProducts(payLoad, userUniqueId) {
  const url =
    `${URI}/api/v1/home/listings/search?userUniqueId=` + userUniqueId;
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

export async function searchFilter(payLoad, userUniqueId) {
  const API_ENDPOINT =
    `${URI}/api/v1/home/listings/search?userUniqueId=` + userUniqueId;
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
  const API_ENDPOINT =
    `${URI}/api/v1/global/share/weblink?shareId=` + shareId;
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
  return await Axios.post(
    API_ENDPOINT,
    userProfilePicData,
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

export function prepareShareLink(listingId, userUniqueId) {
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

export function getAllNotificationByUserd(userUniqueId) {
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
  const API_ENDPOINT = `${URI}/api/v1/notification/read/` + notificationId + userUniqueId;
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

/********End**************/

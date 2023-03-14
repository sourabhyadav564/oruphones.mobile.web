import moment from "moment";
import { defaultDeviceImage } from "@/utils/constant";
export function numberWithCommas(s) {
  s = s?.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  return s;
}

export function getDefaultImage(data) {
  data = data?.toString().toLowerCase().replace("+", "plus");
  return defaultDeviceImage[data];
}

export function getAccessoriesText(data) {
  let temp = [];
  if (data?.charger === "Y" || data?.charger === "Yes") {
    temp.push("Charger");
  }
  if (data?.earphone === "Y" || data?.earphone === "Yes") {
    temp.push("Earphone");
  }
  if (data?.originalbox === "Y" || data?.originalbox === "Yes") {
    temp.push("Original Box");
  }
  return temp.join(", ");
}

export function numberFromString(x) {
  return x?.replace(/[^0-9]/g, "");
}

export const ENV = {
  PRODUCTION: {
    KEY: 'production',
    URL: 'https://api.oruphones.com',
  },
  DEVELOPMENT: {
    KEY: 'development',
    URL: 'https://api.oruphones.com',
  },
  LOCAL: {
    KEY: 'local',
    URL: 'https://new-test-application-001.herokuapp.com',
  },
  MENULISTSECRETKEY: 'DSJDGJLGFJLGADUEJMBNBDSHULFBFNBHJGXY',
};

export const stringToDate = (dateString) => {
  let new_data_string = moment(dateString).format('L');
  const [day, month, year] = new_data_string.split("/");
  return new Date([month, day, year].join("/"));
};

export const getCityFromResponse = (resString) => {
  try {
    let address = resString.substring(resString.indexOf(" ") + 1);
    address = address.split(",");
    address = address[0];
    if (address.length > 0) {
      return address;
    }
  } catch (e) {
    return "India";
  }
};

import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const otherVendorDataState = atom({
  key: "otherVendorDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const otherVandorDataSelector = selector({
  key: "otherVandorDataSelector",
  get: ({ get }) => {
    const data = get(otherVendorDataState);
    return data;
  },
});

export const otherVandorListingIdState = atom({
  key: "otherVandorListingId",
  default: "",
});

export const otherVandorListingIdSelector = selector({
  key: "otherVandorListingIdSelector",
  get: ({ get }) => {
    const data = get(otherVandorListingIdState);
    return data;
  },
});

export const addListingBrandState = atom({
  key: "addListingBrandState",
  default: "",
});

export const makeState = atom({
  key: "makeState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const addListingBrandSelector = selector({
  key: "addListingBrandSelector",
  get: ({ get }) => {
    const data = get(addListingBrandState);
    return data;
  },
});

export const addListingModelState = atom({
    key: "addListingModelState",
    default: "",
  });
  
  export const addListingModelSelector = selector({
    key: "addListingModelSelector",
    get: ({ get }) => {
      const data = get(addListingModelState);
      return data;
    },
  });

  export const addListingStorageState = atom({
    key: "addListingStorageState",
    default: "",
  });

  export const addListingStorageSelector = selector({
    key: "addListingStorageSelector",
    get: ({ get }) => {
      const data = get(addListingStorageState);
      return data;
    }
  });

import { Axios } from "axios";
import { createContext, useContext } from "react";

const AxiosContext = createContext(undefined);

export function AxiosProvider({ children }) {
  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });

    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return axios;
  }, []);

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>;
}

export const useAxios = () => useContext(AxiosContext);
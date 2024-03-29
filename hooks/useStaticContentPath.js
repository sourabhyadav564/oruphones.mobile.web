import { infoTemplates } from "api-call";
import Cookies from "js-cookie";
import { useState } from "react";


const fetchApi = () => {
  let data;
  infoTemplates(Cookies.get("sessionId")).then(
    (res) => {
      sessionStorage.setItem("staticContentPath", JSON.stringify(res));
      data = res;
    }
  );
  return data;
};

function useStaticContentPath() {
  const [dataObject, setDataObject] = useState();

  useEffect(() => {
    let data = sessionStorage.getItem("staticContentPath");
    if (data && JSON.parse(data)) {
      setDataObject(JSON.parse(data));
    } else {
      data = fetchApi();
      setDataObject(data);
    }
  }, []);

  return { loading, filterOptions };
}
export default useStaticContentPath;

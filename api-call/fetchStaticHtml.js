import Axios from "axios";

function fetchStaticHTML(url) {
  return Axios.get(url).then(
    (response) => {
      return response;
    }
  );
}

export default fetchStaticHTML;

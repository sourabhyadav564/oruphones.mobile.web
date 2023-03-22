import { Fragment, useEffect, useState } from "react";
import { getMakeModelLists, getModelLists } from "api-call";
import Loader from "@/components/Loader/Loader";
import NewAddListingForm from "@/components/Form/NewAddListingForm";
import Cookies from "js-cookie";

const index = ({ data }) => {
  const [makeAndModels, setMakeAndModels] = useState([]);

  useEffect(async () => {
    const models2 = await getModelLists(
      Cookies.get("userUniqueId") || 0,
      Cookies.get("sessionId"),
      ""
    );
    setMakeAndModels(models2?.dataObject);
  }, []);

  return (
    <Fragment>
      <main className="font-SF-Pro">
        {makeAndModels?.length ? (
          <NewAddListingForm data={makeAndModels} />
        ) : (
          <div className="flex justify-center p-6">
            <Loader />
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default index;

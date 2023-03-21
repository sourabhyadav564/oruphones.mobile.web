import { Fragment, useEffect, useState } from "react";
import { getMakeModelLists, getModelLists } from "api-call";
import Loader from "@/components/Loader/Loader";
import NewAddListingForm from "@/components/Form/NewAddListingForm";

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
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )}
      </main>
    </Fragment>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const { userUniqueId, sessionId, make_models } = req.cookies;

  return {
    props: {},
  };
};

export default index;

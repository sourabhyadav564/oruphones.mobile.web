import SellingMobileCard from "@/components/Card/SellingMobileCard";
import Filter from "@/components/FilterAndSort/Filter";
import Loader from "@/components/Loader/Loader";
import BottomNav from "@/components/Navigation/BottomNav";
import { fetchTopsellingmodels } from "api-call";
import { useState, useEffect, Fragment } from "react";

function AllModel() {
  const [topsellingmodels, setTopsellingmodels] = useState([]);
  const [applyFilter, setApplyFilter] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTopsellingmodels();
      setTopsellingmodels(data.dataObject);
      setLoading(false);
    };
    fetchData();
  }, []);

  function getFilteredValues() {
    const tempProducts = topsellingmodels;
    if (applyFilter && applyFilter.brand && applyFilter.brand.length > 0) {
      tempProducts = tempProducts.filter((items) => applyFilter.brand.includes(items.make) || applyFilter.brand.includes("all"));
    }
    return tempProducts;
  }

  return (
    <>
      <Filter searchText={`"All Models"`}>
        {(loading || topsellingmodels?.length > 0) && <h1 className="text-lg font-semibold text-black-4e py-2"> All models </h1>}
        {loading ? (
          <Loader />
        ) : (
          <section className="grid grid-cols-2 mb-4 -mx-1.5">
            {getFilteredValues() &&
              getFilteredValues().map((item) => (
                <div className="m-1.5" key={item.marketingName}>
                  <SellingMobileCard data={item} />
                </div>
              ))}
          </section>
        )}
      </Filter>
      <BottomNav />
    </>
  );
}

export default AllModel;

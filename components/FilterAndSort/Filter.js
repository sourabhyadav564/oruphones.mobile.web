import useFilterOptions from "hooks/useFilterOptions";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Footer from "../Footer";
import FilterPopup from "../Popup/FilterPopup";
import SortPopup from "../Popup/SortPopup";
import SearchBar from "../Header/SearchBar";

export default function Filter({ children, searchText, setApplyFilter, applyFilter, setSortApplyFilter, setIsFilterApplied }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  var { filterOptions } = useFilterOptions();
  const router = useRouter();
  const { makeName } = router.query;

  let tempFilters = filterOptions;
  if (filterOptions && makeName !== null && makeName !== undefined) {
    filterOptions = filterOptions.map((i) =>
      i.id === "brand"
        ? {
          ...i,
          options: [
            {
              value: makeName,
              label: makeName,
              active: true,
              disabled: true,
            },
          ],
        }
        : i
    );
  } else if (filterOptions && router.pathname === "/product/models") {
    filterOptions = filterOptions.filter((i) => i.id === "brand");
  }
  else if (filterOptions && (router.query.categoryType == "brandWarranty" || router.query.categoryType == "sellerWarranty")) {
    filterOptions = filterOptions.map((i) =>
      i.id === "warranty" && router.query.categoryType.toString() == "brandWarranty"
        ? {
          ...i,
          options: [
            {
              value: "Brand Warranty",
              label: "Brand Warranty",
              active: true,
              disabled: true,
            },
          ],
        }
        : i.id === "warranty" && router.query.categoryType.toString() == "sellerWarranty" ? {
          ...i,
          options: [
            {
              value: "Seller Warranty",
              label: "Seller Warranty",
              active: true,
              disabled: true,
            },
          ],
        } : i
    );
  }
  else if (filterOptions && router.query.categoryType == "like new") {
    filterOptions = filterOptions.map((i) =>
      i.id === "condition"
        ? {
          ...i,
          options: [
            {
              value: "Like New",
              label: "Like New",
              active: true,
              disabled: true,
            },
          ],
        }
        : i
    );
  }
  else if (filterOptions && router.query.categoryType == "verified") {
    filterOptions = filterOptions.map((i) =>
      i.id === "verification"
        ? {
          ...i,
          options: [
            {
              value: "verified",
              label: "Verified",
              active: true,
              disabled: true,
            },
          ],
        }
        : i
    );
  }

  if (filterOptions && (router.query["makeName"] == "apple" || router.query["makeName"] == "Apple")) {
    filterOptions = filterOptions.map((i) =>
      i.id == "Ram"
        ? {
          ...i,

          options: [
            {
              value: "All",
              label: "All",
              disabled: true,
              checked: true,
              active: true,
            }
          ],
        }
        : i
    );
  }

  return (
    <Fragment>
      <div className="flex p-0 pb-2 justify-between items-center bg-primary text-white sticky top-12 z-50">
        <div className="w-full pl-2 pr-5">
          <SearchBar />
        </div>
        {setApplyFilter && (
          <div className="absolute right-4 flex items-center justify-center w-10 h-8" onClick={() => setOpenFilter(true)}>
            <img src={applyFilter && Object.keys(applyFilter).some((i) => applyFilter[i]) ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/filter_apply.svg" : "https://d1tl44nezj10jx.cloudfront.net/web/assets/filter.svg"} alt="" ></img>
          </div>
        )}
      </div>
      <main className="text-sm ">
        <div className="px-4">{children}</div>
      </main>
      <Footer />
      <FilterPopup openFilter={openFilter} setOpenFilter={setOpenFilter} filterOptions={filterOptions} setApplyFilter={setApplyFilter} setIsFilterApplied={setIsFilterApplied} key={makeName} />
      <SortPopup setSortApplyFilter={setSortApplyFilter} openSort={openSort} setOpenSort={setOpenSort} />
    </Fragment>
  );
}

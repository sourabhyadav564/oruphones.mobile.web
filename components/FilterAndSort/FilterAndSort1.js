import useFilterOptions from "hooks/useFilterOptions";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { BiSortAlt2, BiFilterAlt } from "react-icons/bi";
import Footer from "../Footer";
import Header2 from "../Header/header2";
import FilterPopup from "../Popup/FilterPopup";
import SortPopup from "../Popup/SortPopup";
// import Image from "next/image";
import filterIcon from "@/assets/filter.png";
import filterApplyIcon from "@/assets/filter_apply.png";
import SearchBar from "../Header/SearchBar";
import { searchFilter } from "api-call";
import {Heading} from "../elements/Heading/heading";

export default function Filter({ children, searchText, setApplyFilter, applyFilter, setSortApplyFilter }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  var { filterOptions } = useFilterOptions();
  const router = useRouter();
  const { makeName } = router.query;

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

  return (
    <Fragment>
      <div className="flex p-0 pb-2 justify-between items-center rounded-b-xl  text-white sticky top-12 z-50 font-SF-Pro">
        {/* <div className="w-full pl-2 pr-5"> */}
          {/* <Link href="/search">
            <a>
              <input
                className="w-full self-center rounded-xl p-4 text-black text-sm"
                placeholder="Search with make and model…"
              />
            </a>
          </Link> */}
          {/* <SearchBar className="w-full rounded-xl self-center p-4 text-black text-sm"/> */}
          {/* <SearchBar />
        </div> */}
        {setApplyFilter && (
          <div className="absolute right-4 flex items-center justify-center w-10 h-8" onClick={() => setOpenFilter(true)}>
            <img src={applyFilter && Object.keys(applyFilter).some((i) => applyFilter[i]) ? filterApplyIcon.src : filterIcon.src}></img>
          </div>
        )}
      </div>
      <main className=" font-SF-Pro">
        <div className="flex  items-center rounded-b-xl p-1 ">
          {setSortApplyFilter && (
            <p className="cursor-pointer flex items-center " onClick={() => setOpenSort(true)}>
              <Heading title="Sort"/> <BiSortAlt2 className="font-Roboto-Regular self-center mt-2" size={15} />
            </p>
          )}
        </div>
        <div className="px-4">{children}</div>
      </main>
      {/* <Footer /> */}
      <FilterPopup openFilter={openFilter} setOpenFilter={setOpenFilter} filterOptions={filterOptions} setApplyFilter={setApplyFilter} />
      <SortPopup setSortApplyFilter={setSortApplyFilter} openSort={openSort} setOpenSort={setOpenSort} />
    </Fragment>
  );
}

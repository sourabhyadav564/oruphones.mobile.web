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
      <div className="flex p-2 pb-4 justify-between items-center bg-primary text-white relative">
        <div className="w-full pl-2 pr-6 ">
          {/* <Link href="/search">
            <a>
              <input
                className="w-full self-center rounded-xl p-4 text-black text-sm"
                placeholder="Search with make and model…"
              />
            </a>
          </Link> */}
          {/* <SearchBar className="w-full rounded-xl self-center p-4 text-black text-sm"/> */}
          <SearchBar />
        </div>
        {setApplyFilter && (
          <div className="absolute right-4 flex items-center justify-center w-10 h-8" onClick={() => setOpenFilter(true)}>
            <img src={applyFilter && Object.keys(applyFilter).some((i) => applyFilter[i]) ? filterApplyIcon.src : filterIcon.src}></img>
          </div>
        )}
      </div>
      <main className="text-sm ">
        <div className="flex justify-between items-center text-gray-20 p-1 border-b text-sm px-4">
          <p className="font-bold">{searchText}</p>
          {setSortApplyFilter && (
            <p className="cursor-pointer flex items-center " onClick={() => setOpenSort(true)}>
              Sort <BiSortAlt2 className="ml-1" />
            </p>
          )}
        </div>
        <div className="px-4">{children}</div>
      </main>
      <Footer />
      <FilterPopup openFilter={openFilter} setOpenFilter={setOpenFilter} filterOptions={filterOptions} setApplyFilter={setApplyFilter} />
      <SortPopup setSortApplyFilter={setSortApplyFilter} openSort={openSort} setOpenSort={setOpenSort} />
    </Fragment>
  );
}

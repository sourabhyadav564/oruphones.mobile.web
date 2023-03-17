import useFilterOptions from "hooks/useFilterOptions";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import SortIcon from "@/assets/sort.svg";
import FilterPopup from "../Popup/FilterPopup";
import SortPopup from "../Popup/SortPopup";
import { Heading } from "../elements/Heading/heading";
import Image from "next/image";

export default function Filter({
  children,
  searchText,
  setApplyFilter,
  applyFilter,
  setSortApplyFilter,
}) {
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
        {setApplyFilter && (
          <div
            className="absolute right-4 flex items-center justify-center w-10 h-8"
            onClick={() => setOpenFilter(true)}
          >
            <img
              src={
                applyFilter &&
                Object.keys(applyFilter).some((i) => applyFilter[i])
                  ? "https://d1tl44nezj10jx.cloudfront.net/web/assets/filter_apply.svg"
                  : "https://d1tl44nezj10jx.cloudfront.net/web/assets/filter.svg"
              }
              alt="ORU filter and sort icon"
            ></img>
          </div>
        )}
      </div>
      <main className="">
        <div className="flex  items-center rounded-b-xl">
          {setSortApplyFilter && (
            <p
              className="cursor-pointer flex items-center"
              onClick={() => setOpenSort(true)}
            >
              <Heading title="Sort" />{" "}
              <div className="pt-3">
                <Image src={SortIcon} width={15} height={15} />
              </div>
            </p>
          )}
        </div>
        <div className="px-4">{children}</div>
      </main>
      <FilterPopup
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        filterOptions={filterOptions}
        setApplyFilter={setApplyFilter}
      />
      <SortPopup
        setSortApplyFilter={setSortApplyFilter}
        openSort={openSort}
        setOpenSort={setOpenSort}
      />
    </Fragment>
  );
}

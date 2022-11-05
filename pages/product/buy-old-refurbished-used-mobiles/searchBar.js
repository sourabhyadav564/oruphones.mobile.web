import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SearchBar from "@/components/Header/SearchBar";


function searchBar() {
  return (
    <div className="bg-primary p-2  rounded-b-[5px]">
      <SearchBar />
    </div>
  )
}

export default searchBar

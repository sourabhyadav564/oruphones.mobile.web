import { getSearchResults } from "api-call";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import Search from "@/assets/search.svg";
import Spinner from "../Loader/Spinner";
import Image from "next/image";
import Cookies from "js-cookie";

function SearchBar({ className }) {
  const [searchResults, setSearchResults] = useState();
  const [input, setInput] = useState("");
  const ref = useRef();
  const [recentSearch, setRecentSearch] = useState([]);
  let showRecentSearch = true;
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        localStorage.getItem("pastSearches") &&
        recentSearch !== JSON.parse(localStorage.getItem("pastSearches"))
      ) {
        setRecentSearch(JSON.parse(localStorage.getItem("pastSearches")));
        clearInterval(interval);
      }
    }, 1000);
  }, [input]);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (input.trim().length > 2) {
        showRecentSearch = false;
        getSearchResults(input, Cookies.get("sessionId")).then((res) => {
          if (res && res.status === "SUCCESS") {
            setSearchResults(res.dataObject);
          }
        });
      }
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [input]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setSearchResults();
        setInput("");
        showRecentSearch = true;
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
    if (
      e.target.value.trim().length < 3 &&
      searchResults &&
      searchResults.results
    ) {
      setSearchResults();
    }

    if (input.trim().length < 2) {
      setSearchResults("loading");
    }
  };

  return (
    <Fragment>
      <div className="flex-1 relative font-Roboto-Semibold " ref={ref}>
        <input
          placeholder="Search with make and models..."
          onChange={handleChange}
          value={input}
          className={`w-full bg-white text-gray-800 focus:outline-none rounded-md ${
            className || "py-2 pl-2 pr-4 text-xs"
          } ${searchResults && "rounded-b-none"}`}
          style={{ boxShadow: "0px 2px 3px #0000000A" }}
        />
        {searchResults && (
          <div
            className="absolute z-20 left-0 right-0 rounded-b-lg  bg-white overflow-y-auto text-black"
            style={{
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.16)",
              maxHeight: 400,
            }}
          >
            {searchResults.brandList && searchResults.brandList.length > 0 && (
              <p className="px-4 py-3 block border-b text-primary text-xs">
                Brand
              </p>
            )}
            {searchResults.brandList &&
              searchResults.brandList.length > 0 &&
              searchResults.brandList.map((item) => (
                <ListItem
                  clicked={() => {
                    setInput("");
                    setSearchResults();
                    showRecentSearch = true;
                  }}
                  key={item}
                  make={item}
                  makeLink
                />
              ))}
            {searchResults.results && searchResults.results.length > 0 && (
              <p className="px-4 py-3 block border-b text-primary text-xs">
                Mobile Model
              </p>
            )}

            {searchResults.results &&
              searchResults.results.length > 0 &&
              searchResults.results.map((item) => (
                <ListItem
                  clicked={() => {
                    setInput("");
                    setSearchResults();
                    showRecentSearch = true;
                  }}
                  key={item}
                  make={
                    searchResults &&
                    searchResults.marketingNameAndMakeMap &&
                    searchResults.marketingNameAndMakeMap[item]
                  }
                  marketingName={item}
                />
              ))}
            {searchResults === "loading" && (
              <ListItem
                clicked={() => {
                  setInput("");
                  setSearchResults();
                  showRecentSearch = true;
                }}
              >
                <div className="flex items-center justify-center flex-col">
                  <Spinner />
                  <p className="text-center my-4 text-xs text-gray-500">
                    {input.trim().length > 2
                      ? "Please wait, while we are fetching data for you..."
                      : "enter minimum 3 characters"}
                  </p>
                </div>
              </ListItem>
            )}
            <div>
              {recentSearch && showRecentSearch && recentSearch.length > 0 && (
                <>
                  <p className="px-4 py-3 block border-b text-primary text-xs">
                    Recent Searches
                  </p>
                  <div>
                    {recentSearch.map((item) => (
                      <ListItem
                        clicked={() => {
                          setInput("");
                          setSearchResults();
                          showRecentSearch = true;
                        }}
                        marketingName={item}
                        make={item && item.split(" ")[0]}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {searchResults &&
              (!searchResults.results ||
                (searchResults.results && searchResults.results.length < 1)) &&
              (!searchResults.brandList ||
                (searchResults.brandList &&
                  searchResults.brandList.length < 1)) && (
                <ListItem
                  clicked={() => {
                    setInput("");
                    setSearchResults();
                    showRecentSearch = true;
                  }}
                >
                  <div className="text-jx">Not found</div>
                </ListItem>
              )}
          </div>
        )}
        {!className && (
          <div className="absolute right-2 top-0 bottom-0 flex items-center">
            <Image src={Search} width={20} height={20} />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default SearchBar;

const ListItem = ({ make, makeLink, marketingName, children, clicked }) => {
  if (children) {
    return (
      <p
        className="px-6 py-3 block border-b last:border-0 capitalize"
        onClick={clicked}
      >
        {children}
      </p>
    );
  }
  const pastSearches = () => {
    let pastSearch = [];
    if (localStorage.getItem("pastSearches")) {
      pastSearch = localStorage.getItem("pastSearches");
      pastSearch = JSON.parse(pastSearch);
      pastSearch = pastSearch.filter(
        (item) => item !== (marketingName || make)
      );
    }
    if (pastSearch.length >= 5) {
      pastSearch.shift();
    }
    pastSearch.push(marketingName || make);
    localStorage.setItem("pastSearches", JSON.stringify(pastSearch));
  };
  const handleClick = () => {
    clicked();
    pastSearches();
    window.open(
      makeLink
        ? `/product/buy-old-refurbished-used-mobiles/${make}/`
        : `/product/buy-old-refurbished-used-mobiles/${make}/${marketingName}`,
      "_blank"
    );
  };

  return (
    <div onClick={() => handleClick()}>
      <a
        className="px-6 py-3 block border-b last:border-0 text-jx font-Roboto-Regular"
        onClick={clicked}
      >
        {marketingName || make}
      </a>
    </div>
  );
};

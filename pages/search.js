import Header2 from "@/components/Header/header2";
import { getSearchResults } from "api-call";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Fragment } from "react";

function Search() {
  const [searchResults, setSearchResults] = useState();
  const [input, setInput] = useState("");
  const inputElement = useRef(null);
  var pastSearches = [];

  useEffect(() => {
    Window.localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
  }, []);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (input.trim().length > 2) {
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

  const handleChange = (e) => {
    setInput(e.target.value);
    if (
      e.target.value.trim().length < 3 &&
      searchResults &&
      searchResults.results
    ) {
      setSearchResults();
    }
  };
  return (
    <Fragment>
      <Header2 className="bg-primary text-white px-2 sticky top-0">
        <div className="w-full px-2">
          <input
            className="w-full self-center rounded-xl p-4 text-black text-sm"
            placeholder="Search with make and model…"
            onChange={handleChange}
            value={input}
            ref={inputElement}
          />
        </div>
      </Header2>
      <main>
        {searchResults && (
          <div
            className="bg-white overflow-y-auto "
            style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.16)" }}
          >
            {searchResults &&
            searchResults.results &&
            searchResults.results.length > 0 ? (
              searchResults.results.map((item) => (
                <ListItem
                  key={item}
                  make={
                    searchResults &&
                    searchResults.marketingNameAndMakeMap &&
                    searchResults.marketingNameAndMakeMap[item]
                  }
                  marketingName={item}
                  pastSearches={pastSearches}
                />
              ))
            ) : (
              <ListItem>Not found</ListItem>
            )}
          </div>
        )}
      </main>
    </Fragment>
  );
}

export default Search;

const ListItem = ({ make, marketingName, children, pastSearches }) => {
  if (children) {
    return <p className="px-6 py-3 block border-b last:border-0">{children}</p>;
  }

  const handleClick = () => {
    pastSearches.push(marketingName);
  };
  return (
    <div
      href={`/product/buy-old-refurbished-used-mobiles/${make}/${marketingName}`}
      onClick={handleClick()}
    >
      <a className="px-6 py-3 block border-b last:border-0">{marketingName}</a>
    </div>
  );
};

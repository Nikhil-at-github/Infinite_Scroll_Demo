import React, { useEffect, useState } from "react";
import './Home.css';

function Searchbar({ getSearchKeyword }) {
    const [searchInput, setSearchInput] = useState("");
  
    useEffect(() => {
    const timeOut = setTimeout(() => {
      getSearchKeyword(searchInput);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [searchInput, getSearchKeyword]);



    return (
        <div id="searchBox">
        <input
          id="searchBar"
          placeholder="Search..."
          onChange={e => setSearchInput(e.target.value)}
          autocomplete="on"
        />
        
      </div>
    )
}

export default Searchbar;

import React, { useState } from "react";
import _debounce from "lodash/debounce";
import "./SearchBar.css";
import CrossIcon from "./cross-icon.svg";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = _debounce((value) => {
    handleSearch(value);
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    handleSearch("");
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button className="clear-button" onClick={handleClear}>
          <img src={CrossIcon} alt="Clear" className="cross-icon" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

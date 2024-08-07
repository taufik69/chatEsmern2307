import React from "react";

const Search = ({ className = "w-[427px] " }) => {
  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className={className}
      />
    </div>
  );
};

export default Search;

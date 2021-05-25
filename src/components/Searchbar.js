import React from "react";

const Searchbar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="searchbar"
      placeholder="Search image"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default Searchbar;

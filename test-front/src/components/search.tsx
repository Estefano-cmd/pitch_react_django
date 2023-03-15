import React from "react";

export type SearchProps = {
  searchValue: any;
  setSearchValue: any;
};

const Search: React.FC<SearchProps> = ({ searchValue, setSearchValue }) => {
  const onSearchValueChange = (event: any) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="Search"
      placeholder="Search profile"
      value={searchValue}
      onChange={onSearchValueChange}
      style={{ width: "100%", borderRadius: 5, padding: 10 }}
    />
  );
};

export { Search };

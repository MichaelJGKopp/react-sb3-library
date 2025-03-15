import React, { useState } from "react";

type SearchCtrlProps = {
  setSearchUrl: (searchUrl: string) => void;
  setPage: (page: number) => void;
};

export const SearchCtrl = ({
  setSearchUrl,
  setPage,
}: SearchCtrlProps) => {
  const [search, setSearch] = useState("");

  // Function to handle search button click
  const handleSearch = () => {
    if (search.trim()) {
      setSearchUrl(`/search/findByTitleContaining?title=${search.trim()}`);
      setPage(1); // Reset to first page when searching
    } else {
      setSearchUrl(""); // Clear search URL if input is empty
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-labelledby="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="btn btn-outline-success" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

import React, { useState } from "react";
import { useBookFetch } from "../../hooks/useBookFetch";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setPageItems] = useState(5); // Number of items per page to be set by user
  const [totalPages, setTotalPages] = useState(1);
  const [searchUrl, setSearchUrl] = useState("");
  const [search, setSearch] = useState("");

  const { books, isLoading, httpError, totalElements } = useBookFetch(
    itemsPerPage,
    page - 1,
    searchUrl
  );

  // State update for the total pages
  React.useEffect(() => {
    setTotalPages(Math.ceil(totalElements / itemsPerPage));
  }, [books, itemsPerPage, totalElements]);

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

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
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
                <button
                  className="btn btn-outline-success"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Front End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Back End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Data
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h5>Number of results: ({totalElements})</h5>
          </div>
          <p>
            {1 + (page - 1) * itemsPerPage} to{" "}
            {books.length + (page - 1) * itemsPerPage} of {totalElements} items:
          </p>
          {books.map((book) => (
            <SearchBook book={book} key={book._id} />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            paginate={setPage}
            showItemsPerPage={true}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setPageItems}
          />
        )}
      </div>
    </div>
  );
};

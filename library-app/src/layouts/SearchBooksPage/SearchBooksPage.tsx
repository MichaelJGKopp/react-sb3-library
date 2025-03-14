import React, { useState } from "react";
import { useBookFetch } from "../../hooks/useBookFetch";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setPageItems] = useState<number>(5); // Number of items per page to be set by user
  const [totalPages, setPageMax] = useState<number>(1);

  const { books, isLoading, httpError, totalElements } = useBookFetch(
    itemsPerPage,
    page - 1
  );

  // State updates should be in useEffect or event handlers, not directly in the component body
  React.useEffect(() => {
    setPageMax(Math.ceil(totalElements / itemsPerPage));
  }, [books, itemsPerPage, totalElements]);

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
                />
                <button className="btn btn-outline-success">Search</button>
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

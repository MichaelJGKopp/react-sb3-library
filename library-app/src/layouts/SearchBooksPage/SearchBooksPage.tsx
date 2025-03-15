import React, { useState } from "react";
import { useBookFetch } from "../../hooks/useBookFetch";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";
import { Dropdown } from "./components/Dropdown";
import { SearchCtrl } from "./components/SearchCtrl";

export const SearchBooksPage = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setPageItems] = useState(5); // Number of items per page to be set by user
  const [totalPages, setTotalPages] = useState(1);
  const [searchUrl, setSearchUrl] = useState("");

  const { books, isLoading, httpError, totalElements } = useBookFetch(
    itemsPerPage,
    page - 1,
    searchUrl
  );

  // State update for the total pages
  React.useEffect(() => {
    setTotalPages(Math.ceil(totalElements / itemsPerPage));
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

  // Calculate pagination display information here
  const indexFirstItem = 1 + (page - 1) * itemsPerPage;
  const indexLastItem = Math.min(books.length + (page - 1) * itemsPerPage, totalElements);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <SearchCtrl setSearchUrl={setSearchUrl} setPage={setPage} />
            </div>
            <div className="col-4">
              <Dropdown />
            </div>
          </div>
          <div className="mt-5">
            <h5>Number of results: ({totalElements})</h5>
          </div>
          <p>
            {totalElements ? (
              <span>
                {indexFirstItem} to{" "}
                {indexLastItem} of {totalElements}{" "}
                items
              </span>
            ) : (
              "No results found"
            )}
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

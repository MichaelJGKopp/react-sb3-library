import React, { useState } from "react";
import { useBookFetch } from "../../hooks/useBookFetch";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";
import { CategorySelection } from "./components/CategorySelection";
import { SearchCtrl } from "./components/SearchCtrl";

export const SearchBooksPage = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setPageItems] = useState(5); // Number of items per page to be set by user
  const [totalPages, setTotalPages] = useState(1);
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Book Category");

  // Fetching books using custom hook
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
  const indexLastItem = Math.min(
    books.length + (page - 1) * itemsPerPage,
    totalElements
  );

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <SearchCtrl
                setSearchUrl={setSearchUrl}
                setPage={setPage}
                setCategorySelection={setCategorySelection}
              />
            </div>
            <div className="col-4">
              <CategorySelection
                categorySelection={categorySelection}
                setCategorySelection={setCategorySelection}
                setSearchUrl={setSearchUrl}
                setPage={setPage}
              />
            </div>
          </div>
          <div className="mt-5">
            <h5>Number of results: ({totalElements})</h5>
          </div>
          {totalElements ? (
            <>
              <p>
                {indexFirstItem} to {indexLastItem} of {totalElements} items
              </p>
              {books.map((book) => (
                <SearchBook book={book} key={book._id} />
              ))}
            </>
          ) : (
            <div className="my-4">
              <h3>Can't find what you are looking for?</h3>
              <a
                type="button"
                className="btn main-color btn-md mt-2 px-4 ms-md-5 fw-bold text-white"
                href="#"
              >
                Library Services
              </a>
            </div>
          )}
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

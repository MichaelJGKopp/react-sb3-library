import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useBookFetch } from "../../hooks/useBookFetch";
import { SearchBook } from "./components/SearchBook";

export const SearchBooksPage = () => {
  const { books, isLoading, httpError } = useBookFetch(5, 0);

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
            <h5>Number of results: (22)</h5>
          </div>
          <p>1 to 5 of 22 items:</p>
          {books.map((book) => (
            <SearchBook book={book} key={book._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

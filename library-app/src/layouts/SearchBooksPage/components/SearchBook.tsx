import React from "react";
import { BookModel } from "../../../models/BookModel";
import { Link } from "react-router-dom";

export const SearchBook: React.FC<{ book: BookModel }> = ({ book }) => {
  return (
    <div className="card bg-body rounded shadow p-3 my-3">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {book._img ? (
              <img
                src={book._img}
                width="123"
                height="196"
                className="img-fluid rounded-start"
                alt="Book"
              />
            ) : (
              <img
                src="../../../Images/BooksImages/book-luv2code-1000.png"
                width="123"
                height="196"
                className="img-fluid rounded-start"
                alt="Book"
              />
            )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {book._img ? (
              <img
                src={book._img}
                width="123"
                height="196"
                className="img-fluid rounded-start"
                alt="Book"
              />
            ) : (
              <img
                src="../../../Images/BooksImages/book-luv2code-1000.png"
                width="123"
                height="196"
                className="img-fluid rounded-start"
                alt="Book"
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{book._author}</h5>
            <h4>{book._title}</h4>
            <p className="card-text">{book._description}</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link className="btn btn-md main-color text-white" to={'/checkout/' + book._id}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

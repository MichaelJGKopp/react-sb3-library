import React from "react";
import { BookModel } from "../../../models/BookModel";
import bookImage from "./../../../Images/BooksImages/book-luv2code-1000.png";

export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {props.book._img ? (
          <img src={props.book._img} width="151" height="233" alt="book" />
        ) : (
          <img src={bookImage} width="151" height="233" alt="book" />
        )}
        <h6 className="mt-2">{props.book._title}</h6>
        <p>{props.book._author}</p>
        <a className="btn main-color text-white" href="#">
          Reserve
        </a>
      </div>
    </div>
  );
};

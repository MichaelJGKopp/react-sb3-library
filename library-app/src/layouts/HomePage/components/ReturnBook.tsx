import React from "react";
import BookModel from "../../../models/BookModel";

export const ReturnBook: React.FC<{book: BookModel}> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img src={props.book.image} width="151" height="233" alt="book" />
        <h6 className="mt-2">Book</h6>
        <p>{props.book.author}</p>
        <a className="btn main-color text-white" href="#">
          Reserve
        </a>
      </div>
    </div>
  );
};

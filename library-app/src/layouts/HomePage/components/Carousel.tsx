import BookModel from "../../../models/BookModel";
import bookImage from "./../../../Images/BooksImages/book-luv2code-1000.png";
import { ReturnBook } from "./ReturnBook";

export const Carousel = () => {
  const book1: BookModel = new BookModel("", "Luv2Code", bookImage);
  
  const books: BookModel[] = [];
  for (let i = 0; i < 9; i++) {
    books.push(book1);
  }

  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next "I stayed up too late reading" book.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
             d-lg-block d-none"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">

              <ReturnBook book={book1} />
              <ReturnBook book={book1} />
              <ReturnBook book={book1} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <ReturnBook book={book1} />
              <ReturnBook book={book1} />
              <ReturnBook book={book1} />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <ReturnBook book={book1} />
              <ReturnBook book={book1} />
              <ReturnBook book={book1} />
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <ReturnBook book={book1} />
        </div>
      </div>
      <div className="homepage-carousel-title mt-3">
        <a className="btn btn-outline-secondary btn-lg" href="#">
          View More
        </a>
      </div>
    </div>
  );
};

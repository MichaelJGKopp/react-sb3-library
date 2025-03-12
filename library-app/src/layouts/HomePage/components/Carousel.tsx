import { BookModel } from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from "react"; // react hooks

export const Carousel = () => {
  const [books, setBooks] = useState<BookModel[]>([]); // state to hold the books
  const [isLoading, setIsLoading] = useState(true); // state to hold the loading status
  const [httpError, setHttpError] = useState(null); // state to hold the error status

  useEffect(() => {
    const fetchBooks = async () => {
      // triggers each time the array e.g. [] here changes and once once when carousel is created
      const baseUrl: string = "http://localhost:8080/api/books";

      const url: string = `${baseUrl}?size=9&page=0`;

      const response = await fetch(url); // fetch the data from the url

      if (!response.ok) {
        throw new Error("Something went wrong fetching the books!");
      }

      const responseJson = await response.json(); // convert to json, await because stil async

      const responseData = responseJson._embedded.books;

      const loadedBooks: BookModel[] = [];

      for (const key in responseData) {
        loadedBooks.push({
          _id: responseData[key].id,
          _title: responseData[key].title,
          _author: responseData[key].author,
          _description: responseData[key].description,
          _copies: responseData[key].copies,
          _copiesAvailable: responseData[key].copiesAvailable,
          _category: responseData[key].category,
          _img: responseData[key].img,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <SpinnerLoading />
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    )
  }

  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your next book by browsing our selection of favorites.</h3>
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
              {books.slice(0, 3).map(book => (
                <ReturnBook book={book} key={book._id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
            {books.slice(3, 6).map(book => (
                <ReturnBook book={book} key={book._id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
            {books.slice(6, 9).map(book => (
                <ReturnBook book={book} key={book._id} />
              ))}
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
          <ReturnBook book={books[0]} key={books[0]._id}/>
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

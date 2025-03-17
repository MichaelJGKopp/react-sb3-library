import { useState } from "react";
import { useBookFetch } from "../../hooks/useBookFetch";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReview } from "./CheckoutAndReview";
import { LatestReviews } from "./LatestReviews";
import { ReviewModel } from "../../models/ReviewModel";
import { useReviewsFetch } from "../../hooks/useReviewsFetch";

export const BookCheckoutPage = () => {
  const bookId = window.location.pathname.split("/")[2];

  const [book, setBook] = useState<BookModel>();
  const [isLoadingBook, setIsLoadingBook] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  useBookFetch(setBook, setIsLoadingBook, setHttpError, bookId);
  
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  useReviewsFetch(setReviews, setRatingAverage, setIsLoadingReview, setHttpError, bookId);

  if (isLoadingBook || isLoadingReview) {
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
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2">
            {book?._img ? (
              <img
                src={book._img}
                width="226"
                height="349"
                className="img-fluid rounded-start"
                alt="Book"
              />
            ) : (
              <img
                src="../../../Images/BooksImages/book-luv2code-1000.png"
                width="226"
                height="349"
                className="img-fluid rounded-start"
                alt="Book"
              />
            )}
          </div>
          <div className="col-md-4 container">
            <div className="ms-2">
              <h2>{book?._title}</h2>
              <h5 className="text-primary">{book?._author}</h5>
              <p className="lead">{book?._description}</p>
              <StarsReview rating={ratingAverage} size={32} />
            </div>
          </div>
          <CheckoutAndReview book={book} mobile={false} />
          <LatestReviews reviews={reviews} bookId={bookId} mobile={false} />
        </div>
        <hr />
      </div>
      {/* mobile */}
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?._img ? (
            <img
              src={book._img}
              width="226"
              height="349"
              className="img-fluid rounded-start"
              alt="Book"
            />
          ) : (
            <img
              src="../../../Images/BooksImages/book-luv2code-1000.png"
              width="226"
              height="349"
              className="img-fluid rounded-start"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ms-2">
            <h2>{book?._title}</h2>
            <h5 className="text-primary">{book?._author}</h5>
            <p className="lead">{book?._description}</p>
            <StarsReview rating={ratingAverage} size={32} />
          </div>
        </div>
        <CheckoutAndReview book={book} mobile={true} />
        <LatestReviews reviews={reviews} bookId={bookId} mobile={true} />
        <hr />
      </div>
    </div>
  );
};

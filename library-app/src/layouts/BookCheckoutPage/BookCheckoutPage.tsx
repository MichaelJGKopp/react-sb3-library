import { useEffect, useState } from "react";
import { useBookFetch } from "../../hooks/useBookFetch";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReview } from "./CheckoutAndReview";
import { LatestReviews } from "./LatestReviews";
import { ReviewModel } from "../../models/ReviewModel";
import { useReviewsFetch } from "../../hooks/useReviewsFetch";
import { useParams } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { ENDPOINTS } from "../../lib/apiConfig";

export const BookCheckoutPage = () => {
  // authentication state
  const { authState } = useOktaAuth();

  // get bookId from URL
  const { bookId } = useParams<{ bookId: string }>();
  if (!bookId) {
    throw new Error("Book ID is required");
  }

  // book data, fetch from API
  const [book, setBook] = useState<BookModel>();
  const [isLoadingBook, setIsLoadingBook] = useState(true);
  const [bookError, setBookError] = useState<string | null>(null);
  useBookFetch(setBook, setIsLoadingBook, setBookError, bookId);

  // review data, fetch from API
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [reviewError, setReviewError] = useState<string | null>(null);
  useReviewsFetch(
    setReviews,
    setRatingAverage,
    setIsLoadingReview,
    setReviewError,
    bookId
  );

  // loans count, user can only checkout if they have less than 5 loans
  const [loansCount, setLoansCount] = useState(0);
  const [isLoadingLoansCount, setIsLoadingLoansCount] = useState(true);
  const [loansCountError, setLoansCountError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      if (!authState?.isAuthenticated) {
        setLoansCount(0);
        setIsLoadingLoansCount(false);
        return;
      }

      const url = `${ENDPOINTS.BOOKS}/secure/loans/count`;
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json"
        },
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to fetch loans count");
      }

      const responseJson = await response.json(); // has only the count
      setLoansCount(responseJson);
      setIsLoadingLoansCount(false);
    };

    fetchUserCurrentLoansCount().catch((error: Error) => {
      setIsLoadingLoansCount(false);
      setLoansCountError(error.message);
    });
  }, [
    authState,
    loansCount,
    setLoansCount,
    setIsLoadingLoansCount,
    setLoansCountError,
  ]);

  // loading placeholder
  if (isLoadingBook || isLoadingReview || isLoadingLoansCount) {
    return <SpinnerLoading />;
  }

  const httpError = bookError || reviewError || loansCountError;

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
          <CheckoutAndReview book={book} mobile={false} loansCount={loansCount} />
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
        <CheckoutAndReview book={book} mobile={true} loansCount={loansCount} />
        <LatestReviews reviews={reviews} bookId={bookId} mobile={true} />
        <hr />
      </div>
    </div>
  );
};

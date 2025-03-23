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

  // review data, fetch from API
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // loans count, user can only checkout if they have less than 5 loans
  const [loansCount, setLoansCount] = useState(0);
  const [isLoadingLoansCount, setIsLoadingLoansCount] = useState(true);
  const [loansCountError, setLoansCountError] = useState<string | null>(null);

  // check if book is loaned already
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingIsCheckedOut, setIsLoadingIsCheckedOut] = useState(true);
  const [isCheckedOutError, setIsCheckedOutError] = useState<string | null>(null);

  // fetch book from API
  useBookFetch(setBook, setIsLoadingBook, setBookError, bookId, "", [isCheckedOut]);

  // fetch reviews from API
  useReviewsFetch(
    setReviews,
    setRatingAverage,
    setIsLoadingReview,
    setReviewError,
    bookId
  );

  // fetch loans count from API
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
          "Content-Type": "application/json",
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
  }, [authState, isCheckedOut]);

  // fetch from API if user checked out book by bookId
  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (!authState?.isAuthenticated) {
        setIsCheckedOut(false);
        setIsLoadingIsCheckedOut(false);
        return;
      }

      const url = `${ENDPOINTS.BOOKS}/secure/ischeckedout?bookId=${bookId}`;
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to fetch if book is already loaned.");
      }

      const responseJson = await response.json(); // boolean isLoaned or not
      setIsCheckedOut(responseJson);
      setIsLoadingIsCheckedOut(false);
    };

    fetchUserCheckedOutBook().catch((error: Error) => {
      setIsLoadingIsCheckedOut(false);
      setIsCheckedOutError(error.message);
    });
  }, [authState, bookId, isCheckedOut]);

  // loading placeholder
  if (isLoadingBook || isLoadingReview || isLoadingLoansCount || isLoadingIsCheckedOut) {
    return <SpinnerLoading />;
  }

  // if any error occurs during fetching data from API, show error message
  const httpError = bookError || reviewError || loansCountError || isCheckedOutError;
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function checkoutBook() {
    const url = `${ENDPOINTS.BOOKS}/secure/checkout?bookId=${bookId}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Failed to check out book.");
    }
    setIsCheckedOut(true);
  };

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
          <CheckoutAndReview
            book={book}
            mobile={false}
            isAuthenticated={authState?.isAuthenticated ? true : false}
            loansCount={loansCount}
            isCheckedOut={isCheckedOut}
            checkoutBook={checkoutBook}
          />
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
        <CheckoutAndReview
          book={book}
          mobile={true}
          isAuthenticated={authState?.isAuthenticated ? true : false}
          loansCount={loansCount}
          isCheckedOut={isCheckedOut}
          checkoutBook={checkoutBook}
        />
        <LatestReviews reviews={reviews} bookId={bookId} mobile={true} />
        <hr />
      </div>
    </div>
  );
};

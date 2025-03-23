import { Link } from "react-router-dom";
import { BookModel } from "../../models/BookModel";
import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { DEBUG } from "../Utils/fetchData";
import { API_CONFIG, ENDPOINTS } from "../../lib/apiConfig";

export const CheckoutAndReview: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
}> = ({ book, mobile }) => {
  const { authState } = useOktaAuth();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const userEmail = authState?.accessToken?.claims.sub;
  const bookId = book?._id;

  // log data for debugging
  if (DEBUG){
  console.log("authState", authState);
  console.log("userEmail", userEmail);
  console.log("bookId", bookId);
  console.log("book", book);
}
  async function handleCheckout(event: React.FormEvent) {
    event.preventDefault();
    if (!bookId || !userEmail) return;
    
    setIsCheckingOut(true);
    setCheckoutError(null);
    
    try {
      const response = await fetch(
        `${ENDPOINTS.BOOKS}/secure/checkout?userEmail=${userEmail}&bookId=${bookId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.ok) {
        setIsCheckedOut(true);
      } else {
        const error = await response.text();
        setCheckoutError(error);
      }
    } catch (error: any) {
      setCheckoutError(error.message);
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <div
      className={"card " + (mobile ? "d-flex mt-5" : "col-3 container mb-5")}
    >
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>
              {(book?._copies ?? 0) -
                (book?._copiesAvailable ?? 0) +
                "/" +
                "5 "}
            </b>
            books checked out
          </p>
          <hr />
          {book && book._copiesAvailable && book._copiesAvailable > 0 ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="col-6 lead">
              <b>{book?._copies} </b>
              copies
            </p>
            <p className="col-6 lead">
              <b>{book?._copiesAvailable} </b>
              available
            </p>
          </div>
        </div>
        {authState?.isAuthenticated ? (
          isCheckedOut ? (
            <p className="text-success">Book checked out successfully!</p>
          ) : (
            <form onSubmit={handleCheckout}>
              {checkoutError && <p className="text-danger">{checkoutError}</p> && console.log(checkoutError)}
              <button 
                type="submit" 
                className="btn btn-success btn-lg" 
                disabled={!bookId || !userEmail || isCheckingOut}
              >
                {isCheckingOut ? 'Checking out...' : 'Check out'}
              </button>
            </form>
          )
        ) : (
          <Link to="/login" className="btn btn-success btn-lg">
            Sign in
          </Link>
        )}
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        <p>Sign in to be able to leave a review.</p>
      </div>
    </div>
  );
};

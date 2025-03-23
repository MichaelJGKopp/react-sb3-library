import { Link } from "react-router-dom";
import { BookModel } from "../../models/BookModel";

export const CheckoutAndReview: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  isAuthenticated: boolean;
  loansCount: number;
  isCheckedOut: boolean;
  checkoutBook: () => void;
}> = ({ book, mobile, isAuthenticated, loansCount, isCheckedOut: isLoaned, checkoutBook }) => {

  function buttonRender() {
    if (isAuthenticated) {
      if (!isLoaned && loansCount < 5) {
        return (
          <button type="button" className="btn btn-success btn-lg" onClick={checkoutBook}>Checkout</button>
        );
      } else if (isLoaned) {
        return (
          <p className="alert alert-success d-inline p-2">Book checked out. Enjoy!</p>
        );
      } else if (loansCount >= 5) {
        return (
          <p className="alert alert-danger d-inline p-2">Too many books checked out.</p>
        );
      }
    }
    // If not authenticated, show sign in button
    return (
      <Link to={"/login"} className="btn main-color text-white btn-lg">
        Sign in
      </Link>
    );
  }

  return (
    <div
      className={"card " + (mobile ? "d-flex mt-5" : "col-3 container mb-5")}
    >
      <div className="card-body container">
        <div className="mt-3">
          <p className="fw-bold">{loansCount} / 5 books checked out</p>
          <hr />
          {book && book._copiesAvailable && (book._copiesAvailable > 0) ? (
            <h4 className="text-success">Available</h4>
          ) : (
            <h4 className="text-danger">Wait List</h4>
          )}
          <div className="row">
            <p className="col lead">
              <b>{book?._copiesAvailable} / {book?._copies} </b>
              copies available
            </p>
          </div>
        </div>
        {buttonRender()}
        <hr />
        <p className="mt-3">
          This number can change until placing order has been complete.
        </p>
        <p>Sign in to be able to leave a review.</p>
      </div>
    </div>
  );
};

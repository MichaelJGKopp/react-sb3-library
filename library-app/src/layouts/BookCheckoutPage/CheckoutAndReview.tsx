import { Link } from "react-router-dom";
import { BookModel } from "../../models/BookModel";

export const CheckoutAndReview: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
}> = ({ book, mobile }) => {
  return (
    <div className={"card " + (mobile ? "d-flex mt-5" : "col-3 container mb-5")}>
      <div className="card-body container">
        <div className="mt-3">
          <p>
            <b>{(book?._copies ?? 0) - (book?._copiesAvailable ?? 0) + "/" + (book?._copies ?? 0)} </b>
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
        <Link to="/#" className="btn btn-success btn-lg">Sign in</Link>
        <hr />
        <p className="mt-3">
            This number can change until placing order has been complete.
        </p>
        <p>
            Sign in to be able to leave a review.
        </p>
      </div>
    </div>
  );
};

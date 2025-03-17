import { ReviewModel } from "../../models/ReviewModel";
import { StarsReview } from "../Utils/StarsReview";

type ReviewProps = {
  review: ReviewModel;
};

export const Review = ({ review }: ReviewProps) => {
  return (
    <div className="mb-4">
      <h5>{review.userEmail}</h5>
      <div className="row">
        <div className="col-4">{review.getFormattedDate()}</div>
        <div className="col-4 d-flex justify-content-start align-items-center">
          <StarsReview rating={review.rating} size={18} />
        </div>
        <div className="mt-2">
          <p>{review.reviewDescription}</p>
          <hr />
        </div>
      </div>
    </div>
  );
};

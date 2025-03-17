import { useState, useEffect } from "react";
import { ReviewModel } from "../models/ReviewModel";

export const useReviewsFetch = (
  setReviews: (reviews: ReviewModel[]) => void,
  setRatingAverage: (ratingAverage: number) => void,
  setIsLoading: (isLoading: boolean) => void,
  setHttpError: (httpError: string | null) => void,
  bookId?: string,
  searchUrl?: string
) => {
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const baseUrl: string = "http://localhost:8080/api/reviews";
        const url: string = searchUrl
          ? baseUrl + searchUrl
          : baseUrl + "/search/findByBookId?bookId=" + bookId;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error fetching reviews");
        }

        const jsonResponse = await response.json();
        const jsonResponseData = jsonResponse._embedded.reviews;

        // initialize loadedReviews and ratingAverage before loop
        const loadedReviews: ReviewModel[] = [];
        let ratingAverage = 0;  // calculate average rating in loop

        for (const key in jsonResponseData) {
          loadedReviews.push( //convert API data to ReviewModel
            new ReviewModel(
              jsonResponseData[key].id,
              jsonResponseData[key].userEmail,
              jsonResponseData[key].date,
              jsonResponseData[key].rating,
              jsonResponseData[key].bookId,
              jsonResponseData[key].reviewDescription
            )
          );
          ratingAverage += jsonResponseData[key].rating;
        }
        setReviews(loadedReviews);
        setRatingAverage(ratingAverage / loadedReviews.length);

        setTotalElements(jsonResponse.page.totalElements);
        setTotalPages(jsonResponse.page.totalPages);
      } catch (error) {
        setHttpError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [bookId, searchUrl]); // Only re-run when bookId or searchUrl changes

  return { totalElements, totalPages };
};

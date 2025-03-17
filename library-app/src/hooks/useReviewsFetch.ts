import { useState, useEffect } from "react";
import { ReviewModel } from "../models/ReviewModel";
import { fetchData } from "../layouts/Utils/fetchData";

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

        const responseJson = await fetchData(url, 'useBooksFetch');
        const responseJsonData = responseJson._embedded.reviews;

        // initialize loadedReviews and ratingAverage before loop
        const loadedReviews: ReviewModel[] = [];
        let ratingAverage = 0;  // calculate average rating in loop

        for (const key in responseJsonData) {
          loadedReviews.push( //convert API data to ReviewModel
            new ReviewModel(
              responseJsonData[key].id,
              responseJsonData[key].userEmail,
              responseJsonData[key].date,
              responseJsonData[key].rating,
              responseJsonData[key].bookId,
              responseJsonData[key].reviewDescription
            )
          );
          ratingAverage += responseJsonData[key].rating;
        }
        setReviews(loadedReviews);
        setRatingAverage(ratingAverage / loadedReviews.length);

        setTotalElements(responseJson.page.totalElements);
        setTotalPages(responseJson.page.totalPages);
      } catch (error) {
        setHttpError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [bookId, searchUrl, setHttpError, setIsLoading, setRatingAverage, setReviews]); // Include all dependencies

  return { totalElements, totalPages };
};

import { useEffect } from "react";
import { BookModel } from "../models/BookModel";
import { fetchData } from "../layouts/Utils/fetchData";
import { ENDPOINTS } from "../lib/apiConfig";

export const useBookFetch = (
  setBook: (book: BookModel) => void,
  setIsLoading: (isLoading: boolean) => void,
  setHttpError: (httpError: string | null) => void,
  bookId: string = "1",
  searchUrl?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[] = []) => {

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const baseUrl: string = ENDPOINTS.BOOKS;

        // Use searchUrl if provided, otherwise create standard URL
        const url: string = searchUrl
          ? `${baseUrl}${searchUrl}`
          : `${baseUrl}/${bookId}`;

        const responseJson = await fetchData(url, 'useBookFetch');

        const loadedBook: BookModel = {
          _id: responseJson.id,
          _title: responseJson.title,
          _author: responseJson.author,
          _description: responseJson.description,
          _copies: responseJson.copies,
          _copiesAvailable: responseJson.copiesAvailable,
          _category: responseJson.category,
          _img: responseJson.img,
        };

        setBook(loadedBook);
        setIsLoading(false);
      } catch (error: unknown) {
        setIsLoading(false);
        setHttpError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      }
    };

    fetchBook();
    window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, searchUrl, setBook, setHttpError, setIsLoading, ...dependencies]); // Include all dependencies
};

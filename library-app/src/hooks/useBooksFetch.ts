import { useState, useEffect } from "react";
import { BookModel } from "../models/BookModel";
import { fetchData } from "../layouts/Utils/fetchData";
import { ENDPOINTS } from "../lib/apiConfig";

export const useBooksFetch = (
  itemsPerPage: number = 9,
  currentPage: number = 0,
  searchUrl?: string
) => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const baseUrl: string = ENDPOINTS.BOOKS;

        // Use searchUrl if provided, otherwise create standard URL
        const url: string = searchUrl
          ? `${baseUrl}${searchUrl}&size=${itemsPerPage}&page=${currentPage}`
          : `${baseUrl}?size=${itemsPerPage}&page=${currentPage}`;

        const responseJson = await fetchData(url, 'useBooksFetch');

        // Set total elements if available in response
        if (responseJson.page) {
          setTotalElements(responseJson.page.totalElements);
        }

        const responseData = responseJson._embedded.books;

        const loadedBooks: BookModel[] = [];

        for (const key in responseData) {
          loadedBooks.push({
            _id: responseData[key].id,
            _title: responseData[key].title,
            _author: responseData[key].author,
            _description: responseData[key].description,
            _copies: responseData[key].copies,
            _copiesAvailable: responseData[key].copiesAvailable,
            _category: responseData[key].category,
            _img: responseData[key].img,
          });
        }

        setBooks(loadedBooks);
        setIsLoading(false);
      } catch (error: unknown) {
        setIsLoading(false);
        setHttpError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      }
    };

    fetchBooks();
    window.scrollTo(0, 0);
  }, [itemsPerPage, currentPage, searchUrl]);

  return { books, isLoading, httpError, totalElements };
};

import { useState, useEffect } from "react";
import { BookModel } from "../models/BookModel";

export const useBookFetch = (bookId: string = "1", searchUrl?: string) => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const baseUrl: string = "http://localhost:8080/api/books";

        // Use searchUrl if provided, otherwise create standard URL
        const url: string = searchUrl
          ? `${baseUrl}${searchUrl}`
          : `${baseUrl}/${bookId}`;

          console.log("url: ", url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Something went wrong fetching the book!");
        }

        const responseJson = await response.json();

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
  }, [bookId, searchUrl]);

  return { book, isLoading, httpError };
};

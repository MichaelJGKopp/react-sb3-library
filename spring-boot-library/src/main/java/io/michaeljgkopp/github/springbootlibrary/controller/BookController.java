package io.michaeljgkopp.github.springbootlibrary.controller;

import io.michaeljgkopp.github.springbootlibrary.entity.Book;
import io.michaeljgkopp.github.springbootlibrary.service.BookService;
import io.michaeljgkopp.github.springbootlibrary.utils.ExtractJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * BookController handles requests related to book operations.
 * It provides endpoints for checking out books and checking if a book is checked out by a user.
 */
@RestController
@RequestMapping("${spring.data.rest.base-path}/books")
@CrossOrigin(origins = "${api.allowed-origins}")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    /**
     * Checks if a book is checked out by a specific user.
     *
     * @param bookId the ID of the book
     * @param token  the JWT token containing user information
     * @return true if the book is checked out by the user, false otherwise
     */
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean isBookCheckedout(@RequestParam Long bookId,
                                    @RequestHeader(value="Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "sub");
        return bookService.isBookCheckedout(userEmail, bookId);
    }

    /**
     * Counts the number of books checked out by a specific user.
     *
     * @param token the JWT token containing user information
     * @return the count of checked-out books
     */
    @GetMapping("/secure/checkoutcount/byuser")
    Integer countCheckedOutBooksByUserEmail(@RequestHeader(value="Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "sub");
        return bookService.countCheckedOutBooksByUserEmail(userEmail);
    }

    /**
     * Checks out a book for a specific user.
     *
     * @param bookId the ID of the book to be checked out
     * @param token  the JWT token containing user information
     * @return the checked-out book
     * @throws Exception if an error occurs during checkout
     */
    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId,
                             @RequestHeader(value="Authorization") String token) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "sub");
        return bookService.checkoutBook(userEmail, bookId);
    }
}

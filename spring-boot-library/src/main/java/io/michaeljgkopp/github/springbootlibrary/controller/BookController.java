package io.michaeljgkopp.github.springbootlibrary.controller;

import io.michaeljgkopp.github.springbootlibrary.entity.Book;
import io.michaeljgkopp.github.springbootlibrary.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * BookController handles requests related to book operations.
 * It provides endpoints for checking out books and checking if a book is checked out by a user.
 */
@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "${api.allowed-origins}")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    /**
     * Checks if a book is checked out by a specific user.
     *
     * @param userEmail the email of the user
     * @param bookId    the ID of the book
     * @return true if the book is checked out by the user, false otherwise
     */
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean isBookCheckedout(@RequestParam String userEmail, @RequestParam Long bookId) {
        return bookService.isBookCheckedout(userEmail, bookId);
    }

    /**
     * Counts the number of books checked out by a specific user.
     *
     * @param userEmail the email of the user
     * @return the count of checked-out books
     */
    @GetMapping("/secure/count/byuser")
    Integer countCheckedOutBooksByUserEmail(@RequestParam String userEmail) {
        return bookService.countCheckedOutBooksByUserEmail(userEmail);
    }

    /**
     * Checks out a book for a specific user.
     *
     * @param userEmail the email of the user
     * @param bookId    the ID of the book
     * @return the checked-out book
     * @throws Exception if an error occurs during checkout
     */
    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam String userEmail, @RequestParam Long bookId) throws Exception {
        return bookService.checkoutBook(userEmail, bookId);
    }
}

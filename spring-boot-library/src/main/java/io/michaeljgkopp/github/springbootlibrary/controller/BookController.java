package io.michaeljgkopp.github.springbootlibrary.controller;

import io.michaeljgkopp.github.springbootlibrary.entity.Book;
import io.michaeljgkopp.github.springbootlibrary.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
@RequestMapping("${spring.data.rest.base-path}/books")
@CrossOrigin(origins = "${api.allowed-origins}")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    /**
     * Checks if a book is checked out by a specific user.
     *
     * @param bookId the ID of the book to check
     * @param jwt  the JWT token containing user information
     * @return true if the book is checked out by the user, false otherwise
     */
    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean isBookCheckedout(@RequestParam Long bookId,
                                    @AuthenticationPrincipal Jwt jwt) {
        String userEmail = jwt.getClaimAsString("sub");
        return bookService.isBookCheckedout(userEmail, bookId);
    }

    /**
     * Counts the number of books checked out by a specific user.
     *
     * @param jwt the JWT token containing user information
     * @return the count of checked-out books
     */
    @GetMapping("/secure/checkoutcount/byuser")
    Integer countCheckedOutBooksByUserEmail(@AuthenticationPrincipal Jwt jwt) {
        String userEmail = jwt.getClaimAsString("sub");
        return bookService.countCheckedOutBooksByUserEmail(userEmail);
    }

    /**
     * Checks out a book for a specific user.
     *
     * @param bookId the ID of the book to check out
     * @param jwt    the JWT token containing user information
     * @return the checked-out book
     * @throws Exception if an error occurs during checkout
     */
    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId,
                             @AuthenticationPrincipal Jwt jwt) throws Exception {
        String userEmail = jwt.getClaimAsString("sub");
        return bookService.checkoutBook(userEmail, bookId);
    }
}

package io.michaeljgkopp.github.springbootlibrary.controller;

import io.michaeljgkopp.github.springbootlibrary.entity.Book;
import io.michaeljgkopp.github.springbootlibrary.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "${api.allowed-origins}")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId) throws Exception {
        String userEmail = "testuser@email.com"; // ToDo: Replace with actual user email retrieval logic

        return bookService.checkoutBook(userEmail, bookId);
    }
}

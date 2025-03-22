package io.michaeljgkopp.github.springbootlibrary.service;

import io.michaeljgkopp.github.springbootlibrary.dao.BookRepository;
import io.michaeljgkopp.github.springbootlibrary.dao.CheckoutRepository;
import io.michaeljgkopp.github.springbootlibrary.entity.Book;
import io.michaeljgkopp.github.springbootlibrary.entity.Checkout;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

/**
 * Service class for handling book checkout operations.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class CheckoutService {
    private final BookRepository bookRepository;
    private final CheckoutRepository checkoutRepository;

    /**
     * Checks out a book for a user.
     *
     * @param userEmail the email of the user checking out the book
     * @param bookId    the ID of the book to be checked out
     * @return the checked-out book
     * @throws Exception if the book is not found or already checked out by the user
     */
    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> bookOptional = bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        // validation checks, are book copies available
        if (bookOptional.isEmpty() || validateCheckout != null || bookOptional.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book not found or already checked out by user");
        }

        // decrease available copies of book by 1 and save entity
        Book book = bookOptional.get();
        book.setCopiesAvailable(book.getCopiesAvailable() - 1);
        bookRepository.save(book);

        // create a new checkout record and save entity
        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(), // book needs to be returned in 7 days
                book.getId());
        checkoutRepository.save(checkout);


        return book;
    }
}

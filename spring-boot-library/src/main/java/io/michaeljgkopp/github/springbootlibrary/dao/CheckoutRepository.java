package io.michaeljgkopp.github.springbootlibrary.dao;

import io.michaeljgkopp.github.springbootlibrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);
}

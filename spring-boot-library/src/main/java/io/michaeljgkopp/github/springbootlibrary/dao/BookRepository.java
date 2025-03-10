package io.michaeljgkopp.github.springbootlibrary.dao;

import io.michaeljgkopp.github.springbootlibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}

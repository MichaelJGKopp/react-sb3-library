package io.michaeljgkopp.github.springbootlibrary.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="book")
@Data // Lombok issues solved for now, specify version, annotation processor, intellij (getters don't compile)
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="author")
    private String author;

    @Column(name="description")
    private String description;

    @Column(name="copies")
    private int copies;

    @Column(name="copies_available")
    private int copiesAvailable;

    @Column(name="category")
    private String category;

    @Column(name="img")
    private String img;
}

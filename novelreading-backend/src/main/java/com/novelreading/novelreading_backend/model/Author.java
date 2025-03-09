package com.novelreading.novelreading_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long author_id;
    private String author_anou;

    public Author() {
    }

    public String getAuthor_anou() {
        return author_anou;
    }

    public void setAuthor_anou(String author_anou) {
        this.author_anou = author_anou;
    }

    public long getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(long author_id) {
        this.author_id = author_id;
    }
}

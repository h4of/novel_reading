package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.model.Author;

import java.util.List;

public interface AuthorService {
    public Author saveAuthor(Author author);

    public List<Author> getAllAuthor();
}

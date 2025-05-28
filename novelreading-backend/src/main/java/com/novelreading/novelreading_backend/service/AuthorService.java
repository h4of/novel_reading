package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.dto.AuthorDTO;
import com.novelreading.novelreading_backend.entity.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AuthorService {
    public AuthorDTO saveAuthor(AuthorDTO authorDTO);

    public Author getAuthorByRoute(String route);

    public AuthorDTO getAuthorByID(Long id);

    public Page<AuthorDTO> getAllAuthor(Pageable pageable);

    public void deleteAuthor(Long id);

    public AuthorDTO updateAuthor(Long id,AuthorDTO updatedAuthor);
}

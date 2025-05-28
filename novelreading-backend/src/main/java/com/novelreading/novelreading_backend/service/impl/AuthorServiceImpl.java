package com.novelreading.novelreading_backend.service.impl;

import com.novelreading.novelreading_backend.dto.AuthorDTO;
import com.novelreading.novelreading_backend.entity.Author;
import com.novelreading.novelreading_backend.exception.ResourceNotFound;
import com.novelreading.novelreading_backend.mapper.AuthorMapper;
import com.novelreading.novelreading_backend.repository.AuthorRepository;
import com.novelreading.novelreading_backend.service.AuthorService;
import com.novelreading.novelreading_backend.service.ImageStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AuthorServiceImpl implements AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private ImageStorageService imageStorageService;

    @Autowired
    private AuthorMapper authorMapper;

    @Override
    public AuthorDTO saveAuthor(AuthorDTO authorDTO){
        Author author = authorMapper.maptoAuthor(authorDTO);
        Author saved = authorRepository.save(author);
        return authorMapper.maptoAuthorDto(saved);
    }

    @Override
    public Page<AuthorDTO> getAllAuthor(Pageable pageable) {
        Page<Author> authors = authorRepository.findAll(pageable);
        return authors.map(author -> authorMapper.maptoAuthorDto(author));
    }

    @Override
    public Author getAuthorByRoute(String route) {
        Author author = authorRepository.findByRoute(route);
        return author;
    }

    @Override
    public void deleteAuthor(Long id){
        Author author = authorRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Author is not exitsted"));
        imageStorageService.deleteImage(author.getRoute());
        authorRepository.delete(author);
    }

    @Override
    public AuthorDTO updateAuthor(Long id, AuthorDTO updatedAuthor) {
        Author author = authorRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Author is not exitsted"));

        if (updatedAuthor.getAnou() != null) {
            author.setAnou(updatedAuthor.getAnou());
        }
        if (updatedAuthor.getName() != null) {
            author.setName(updatedAuthor.getName());
        }
        if (updatedAuthor.getDate() != null) {
            author.setDate(updatedAuthor.getDate());
        }
        if (updatedAuthor.getRoute() != null) {
            author.setRoute(updatedAuthor.getRoute());
        }

        authorRepository.save(author);

        return authorMapper.maptoAuthorDto(author);

    }

    @Override
    public AuthorDTO getAuthorByID(Long id) {
        Author author = authorRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Author is not existed"));
        return authorMapper.maptoAuthorDto(author);
    }
}

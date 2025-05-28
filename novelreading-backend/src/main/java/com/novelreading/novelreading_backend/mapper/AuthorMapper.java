package com.novelreading.novelreading_backend.mapper;

import com.novelreading.novelreading_backend.dto.AuthorDTO;
import com.novelreading.novelreading_backend.entity.Author;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthorMapper {

    @Autowired
    private ModelMapper modelMapper;

    public AuthorDTO maptoAuthorDto(Author author){
        AuthorDTO authorDTO = modelMapper.map(author,AuthorDTO.class);
        return authorDTO;
    }

    public Author maptoAuthor(AuthorDTO authorDTO){
        Author author = modelMapper.map(authorDTO,Author.class);
        return author;
    }
}

package com.novelreading.novelreading_backend.controller;

import com.novelreading.novelreading_backend.model.Author;
import com.novelreading.novelreading_backend.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/author")
public class AuthorController {
    @Autowired
    private AuthorService authorService;
    @PostMapping("/add")
    public Author saveAuthor(Author author){
        return authorService.saveAuthor(author);
    }
    @GetMapping("getAll")
    public List<Author> getAllAuthor(){
        return authorService.getAllAuthor();
    }
}

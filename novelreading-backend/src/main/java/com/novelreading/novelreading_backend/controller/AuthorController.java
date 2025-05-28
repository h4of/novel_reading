package com.novelreading.novelreading_backend.controller;

import com.novelreading.novelreading_backend.dto.AuthorDTO;
import com.novelreading.novelreading_backend.mapper.AuthorMapper;
import com.novelreading.novelreading_backend.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping()
public class AuthorController {
    @Autowired
    private AuthorService authorService;
    @Autowired
    private AuthorMapper authorMapper;
    @PostMapping("/admin/author/add")
    public AuthorDTO saveAuthor(@RequestBody AuthorDTO authorDTO){
        return authorService.saveAuthor(authorDTO);
    }
    @GetMapping("author/getAll")
    public Page<AuthorDTO> getAllAuthor(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "12") int size){
        Pageable pageable = PageRequest.of(page,size);
        return authorService.getAllAuthor(pageable);
    }

    @GetMapping("/author/get/{route}")
    public AuthorDTO getAuthorByRoute(@PathVariable("route")String route){
        return authorMapper.maptoAuthorDto(authorService.getAuthorByRoute(route));
    }

    @GetMapping("/admin/author/find/{id}")
    public AuthorDTO getAuthorByID(@PathVariable("id")Long id){
        return authorService.getAuthorByID(id);
    }

    @DeleteMapping("admin/author/delete/{id}")
    public void deleteAuthor(@PathVariable("id") Long id){
        authorService.deleteAuthor(id);
    }
    @PutMapping("/admin/author/update/{id}")
    public AuthorDTO updateAuthor(@PathVariable("id")Long id,@RequestBody AuthorDTO authorDTO){
        return authorService.updateAuthor(id,authorDTO);
    }
}

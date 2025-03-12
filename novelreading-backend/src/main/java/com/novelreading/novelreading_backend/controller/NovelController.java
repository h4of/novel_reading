package com.novelreading.novelreading_backend.controller;

import com.novelreading.novelreading_backend.model.Novel;
import com.novelreading.novelreading_backend.service.NovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController   //nhan phan hoi va dieu khien cung 1 thoi diem
@RequestMapping("/novel")   //anh xa
public class NovelController {
    @Autowired
    private NovelService novelService;

    @PostMapping("/add")
    public void add(@RequestBody Novel novel){
        novelService.saveNovel(novel);
    }
    @DeleteMapping("/delete")
    public void delete(@PathVariable Novel novel){
        novelService.deleteNovel(novel);
    }
    @GetMapping("/getAll")
    public List<Novel> getAllNovel(){
        return novelService.getAllNovel();
    }

}

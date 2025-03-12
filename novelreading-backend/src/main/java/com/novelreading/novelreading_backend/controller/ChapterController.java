package com.novelreading.novelreading_backend.controller;


import com.novelreading.novelreading_backend.model.Chapter;
import com.novelreading.novelreading_backend.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/chapter")
public class ChapterController {
    @Autowired
    private ChapterService chapterService;
    @PostMapping("/add")
    public Chapter saveChapter(Chapter chapter){
        return chapterService.saveChapter(chapter);
    }
    @GetMapping("/getAll")
    public List<Chapter> getAllChapter(){
        return chapterService.getAllChapter();
    }
}

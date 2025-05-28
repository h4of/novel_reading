package com.novelreading.novelreading_backend.controller;


import com.novelreading.novelreading_backend.dto.ChapterDTO;
import com.novelreading.novelreading_backend.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping()
public class ChapterController {
    @Autowired
    private ChapterService chapterService;
    @PostMapping("/admin/chapter/add")
    public ResponseEntity<String> saveChapter(@RequestParam Long novelID, @RequestParam int chapterNumber,@RequestParam String title, @RequestPart MultipartFile file) throws IOException {
        chapterService.saveChapter(novelID,chapterNumber,title,file);
        return ResponseEntity.ok("Thêm chương thành công");
    }
    @DeleteMapping("/admin/chapter/delete/{id}")
    public void deleteChapter(@PathVariable("id")String id){
        chapterService.deleteChapter(id);
    }

    @GetMapping("/chapter/getAll")
    public Page<ChapterDTO> getAllChapter(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "12") int size){
        Pageable pageable = PageRequest.of(page,size);
        return chapterService.getAllChapter(pageable);
    }


    @GetMapping("/chapter/find/{id}")
    public ChapterDTO getChapterByID(@PathVariable("id")String id){
        return chapterService.getChapterByID(id);
    }
}

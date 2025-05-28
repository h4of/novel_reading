package com.novelreading.novelreading_backend.controller;

import com.novelreading.novelreading_backend.dto.ReadDTO;
import com.novelreading.novelreading_backend.entity.Read;
import com.novelreading.novelreading_backend.service.ReadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class ReadController {
    @Autowired
    private ReadService readService;

    @GetMapping("/user/{user-id}/novel/reading")
    public Page<ReadDTO> getAllByReadAt(@PathVariable("user-id") Long userID,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "12") int size){
        Pageable pageable = PageRequest.of(page,size);
        return readService.getAllByUserIDOrderByReadAtDesc(userID,pageable);
    }

    @PostMapping("/user/read")
    public ResponseEntity<ReadDTO> userReadNovel(@RequestBody ReadDTO readDTO){
        return ResponseEntity.ok(readService.saveReading(readDTO));
    }

    @GetMapping("/user/novel/get-reading")
    public int getReadingByUserIDAndNovelID(@RequestParam Long userID,@RequestParam Long novelID){
        return readService.getByUserIDAndNovelID(userID,novelID);
    }
}

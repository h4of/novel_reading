package com.novelreading.novelreading_backend.controller;


import com.novelreading.novelreading_backend.service.ImageStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping()
public class ImageStorageController {

    @Autowired
    private ImageStorageService imageStorageService;

    @PostMapping("/admin/image/save")
    public ResponseEntity<String> saveImage(@RequestPart MultipartFile image,@RequestParam String name) throws IOException {
        imageStorageService.saveImage(image,name);
        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/admin/image/delete/{name}")
    public ResponseEntity<String> deleteImage(@PathVariable("name") String name){
        imageStorageService.deleteImage(name);
        return ResponseEntity.ok("Delete successful");
    }
}

package com.novelreading.novelreading_backend.service.impl;

import com.novelreading.novelreading_backend.service.ImageStorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ImageStorageServiceImpl implements ImageStorageService {
    String folderPath = "D:/jav-code/novelreading/novelreading-backend/data/image";

    @Override
    public ResponseEntity<String> saveImage(MultipartFile image,String name) throws IOException {
        String filePath = folderPath+"/"+name+".png";
        File img = new File(folderPath);
        if(!img.exists()){
            img.mkdirs();
        }
        if(image.isEmpty()) throw new IllegalArgumentException("image is empty");

        try {
            Files.copy(image.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
        }catch (IOException e){
            throw new IOException("Fail to save image!");
        }

        return ResponseEntity.ok("ok");
    }

    @Override
    public ResponseEntity<String> deleteImage(String name) {
        String filePath = folderPath+"/"+name+".png";
        try {
            boolean deleted = Files.deleteIfExists(Path.of(filePath));
            if (deleted) {
                return ResponseEntity.ok("File deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("File not found.");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting file: " + e.getMessage());
        }
    }
}

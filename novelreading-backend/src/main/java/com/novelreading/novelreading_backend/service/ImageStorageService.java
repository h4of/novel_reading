package com.novelreading.novelreading_backend.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface ImageStorageService {
    public ResponseEntity<String> saveImage(MultipartFile image,String name) throws IOException;

    public ResponseEntity<String> deleteImage(String name);
}

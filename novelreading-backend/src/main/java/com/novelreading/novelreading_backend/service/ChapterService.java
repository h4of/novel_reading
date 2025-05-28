package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.dto.ChapterDTO;
import com.novelreading.novelreading_backend.entity.Chapter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ChapterService {
    public ResponseEntity<String> saveChapter(Long novelID, int chapterNumber, String title , MultipartFile file) throws IOException;

    public Page<ChapterDTO> getAllChapter(Pageable pageable);

    public ResponseEntity<String> deleteChapter(String id);

    public ChapterDTO getChapterByID(String id);
}

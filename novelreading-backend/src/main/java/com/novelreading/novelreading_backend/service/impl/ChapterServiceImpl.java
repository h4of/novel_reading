package com.novelreading.novelreading_backend.service.impl;

import com.novelreading.novelreading_backend.dto.ChapterDTO;
import com.novelreading.novelreading_backend.entity.Chapter;
import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.exception.ResourceNotFound;
import com.novelreading.novelreading_backend.mapper.ChapterMapper;
import com.novelreading.novelreading_backend.repository.ChapterRepository;
import com.novelreading.novelreading_backend.repository.NovelRepository;
import com.novelreading.novelreading_backend.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChapterServiceImpl implements ChapterService {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private NovelRepository novelRepository;


    @Autowired
    private ChapterMapper chapterMapper;

    @Override
    public ResponseEntity<String> saveChapter(Long novelID, int chapterNumber, String title, MultipartFile file) throws IOException {
        String folderPath = "D:/jav-code/novelreading/novelreading-backend/data/";
        Novel novel = novelRepository.findById(novelID).orElseThrow(()-> new ResourceNotFound("Not found novel"));
        novel.setDate(LocalDateTime.now());
        novel.setTotalChapter(novel.getTotalChapter()+1);
        novelRepository.save(novel);

        File txt = new File(folderPath);
        if(!txt.exists()){
            txt.mkdirs();
        }

        String fePath = "http://localhost:8080/data/chapters";
        String dirPath = folderPath + "chapters/"+ novel.getNovelID();
        String filePath = dirPath +"/"+ chapterNumber+".txt";

        Chapter chapter = new Chapter();
        chapter.setChapterID("N"+novelID+"C"+chapterNumber);
        chapter.setChapterNumber(chapterNumber);
        chapter.setTitle(title);
        chapter.setNovel(novel);
        chapter.setContent(fePath+"/"+novel.getNovelID()+"/"+ chapterNumber + ".txt");
        chapterRepository.save(chapter);

        File dir = new File(dirPath);
        if(!dir.exists()){
            dir.mkdirs();
        }

        if(file.isEmpty()) throw new IllegalArgumentException("Chapter is empty");
        try {
            Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
        }catch (IOException e){
            throw new IOException("Fail to save chapter!");
        }

        return ResponseEntity.ok("success!");
    }

    @Override
    public ResponseEntity<String> deleteChapter(String id) {
        String folderPath = "D:/jav-code/novelreading/novelreading-backend/data/chapters";
        Chapter chapter = chapterRepository.findById(id).orElseThrow(()->new ResourceNotFound("Chapter is not existed"));
        Novel novel = novelRepository.findById(chapter.getNovel().getNovelID()).orElseThrow(()-> new ResourceNotFound("Novel is not existed"));
        String filePath = folderPath+"/"+chapter.getNovel().getNovelID()+"/"+chapter.getChapterNumber()+".txt";
        chapterRepository.delete(chapter);
        novel.setTotalChapter(novel.getTotalChapter()-1);
        novelRepository.save(novel);
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

    @Override
    public ChapterDTO getChapterByID(String id) {
        Chapter chapter = chapterRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Chapter is not existed"));
        return chapterMapper.maptoChapterDto(chapter);
    }

    @Override
    public Page<ChapterDTO> getAllChapter(Pageable pageable) {
        Page<Chapter> chapters =  chapterRepository.findAll(pageable);
        return chapters.map(chapter -> chapterMapper.maptoChapterDto(chapter));
    }
}

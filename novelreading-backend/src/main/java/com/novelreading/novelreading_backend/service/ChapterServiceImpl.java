package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.model.Chapter;
import com.novelreading.novelreading_backend.repository.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChapterServiceImpl implements ChapterService{

    @Autowired
    private ChapterRepository chapterRepository;

    @Override
    public Chapter saveChapter(Chapter chapter) {
        return chapterRepository.save(chapter);
    }

    @Override
    public List<Chapter> getAllChapter() {
        return chapterRepository.findAll();
    }
}

package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.model.Chapter;

import java.util.List;

public interface ChapterService {
    public Chapter saveChapter(Chapter chapter);

    public List<Chapter> getAllChapter();
}

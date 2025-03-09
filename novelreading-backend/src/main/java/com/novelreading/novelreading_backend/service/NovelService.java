package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.model.Novel;

import java.util.List;

public interface NovelService {
    public Novel saveNovel(Novel novel);

    public Novel deleteNovel(Novel novel);

    public List<Novel> getAllNameNovel();
}

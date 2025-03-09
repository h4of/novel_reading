package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.model.Novel;
import com.novelreading.novelreading_backend.repository.NovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NovelServiceImpl implements NovelService{

    //tu dong ket noi kho luu tru
    @Autowired
    private NovelRepository novelRepository;

    @Override
    public Novel saveNovel(Novel novel) {
        return novelRepository.save(novel);
    }

    @Override
    public Novel deleteNovel(Novel novel) {
        novelRepository.delete(novel);
        return novel;
    }

    @Override
    public List<Novel> getAllNameNovel() {
        return novelRepository.findAll();
    }
}

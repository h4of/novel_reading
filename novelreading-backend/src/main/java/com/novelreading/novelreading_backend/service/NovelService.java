package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.dto.NovelDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface NovelService {
    public NovelDTO saveNovel(NovelDTO novelDTO);

    public void deleteNovel(Long id);

    public Page<NovelDTO> getAllByOrderByDateDesc(Pageable pageable);

    public Page<NovelDTO> getAllByOrderByViewDesc(Pageable pageable);

    public NovelDTO getNovelByID(Long id);

    public Page<NovelDTO> getAllNovel(Pageable pageable);

    public NovelDTO updateNovel(Long id,NovelDTO updateNovel);

    public NovelDTO getNovelByRoute(String route);

    public Page<NovelDTO> filerNovel(String genre,String country,String status,Pageable pageable);

    public List<NovelDTO> searchNovel(String search);

    public Page<NovelDTO> getAllByOrderByAvgRatingDesc(Pageable pageable);

    public ResponseEntity<String> incView(Long id);
}

package com.novelreading.novelreading_backend.service.impl;

import com.novelreading.novelreading_backend.dto.NovelDTO;
import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.exception.ResourceNotFound;
import com.novelreading.novelreading_backend.mapper.NovelMapper;
import com.novelreading.novelreading_backend.repository.AuthorRepository;
import com.novelreading.novelreading_backend.repository.NovelRepository;
import com.novelreading.novelreading_backend.service.ImageStorageService;
import com.novelreading.novelreading_backend.service.NovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NovelServiceImpl implements NovelService {

    //tu dong ket noi kho luu tru
    @Autowired
    private NovelRepository novelRepository;

    @Autowired
    private ImageStorageService imageStorageService;

    @Autowired
    private NovelMapper novelMapper;

    @Autowired
    private AuthorRepository authorRepository;

    @Override
    public NovelDTO saveNovel(NovelDTO novelDTO){
        Novel novel = novelMapper.maptoNovel(novelDTO);
        Novel saved = novelRepository.save(novel);

        return novelMapper.maptoNovelDto(saved);
    }

    @Override
    public NovelDTO getNovelByID(Long id) {
        Novel novel = novelRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Novel is not exists"));
        return novelMapper.maptoNovelDto(novel);
    }

    @Override
    public NovelDTO getNovelByRoute(String route) {
        Novel novel = novelRepository.findByRoute(route).orElseThrow(()-> new ResourceNotFound("Novel is not existed"));
        return novelMapper.maptoNovelDto(novel);
    }

    @Override
    public void deleteNovel(Long id) {
        Novel novel = novelRepository.findById(id).orElseThrow(()->new ResourceNotFound("Novel is not exists"));

        imageStorageService.deleteImage(novel.getRoute());
        novelRepository.delete(novel);
    }

    @Override
    public NovelDTO updateNovel(Long id,NovelDTO updateNovel) {
        Novel novel = novelRepository.findById(id).orElseThrow(()-> new ResourceNotFound("novel is not exitsted"));

        if (updateNovel.getAnou() != null) {
            novel.setAnou(updateNovel.getAnou());
        }
        if (updateNovel.getGenre() != null) {
            novel.setGenre(updateNovel.getGenre());
        }
        if (updateNovel.getName() != null) {
            novel.setName(updateNovel.getName());
        }
        if (updateNovel.getStatus() != null) {
            novel.setStatus(updateNovel.getStatus());
        }
        if(updateNovel.getAuthor() != null){
            novel.setAuthorOf(authorRepository.findByRoute(updateNovel.getAuthor()));
        }
        novelRepository.save(novel);

        return novelMapper.maptoNovelDto(novel);
    }

    @Override
    public Page<NovelDTO> getAllByOrderByDateDesc(Pageable pageable) {
        Page<Novel> novels = novelRepository.findAllByOrderByDateDesc(pageable);
        return novels.map((novel -> novelMapper.maptoNovelDto(novel)));
    }

    @Override
    public Page<NovelDTO> getAllByOrderByViewDesc(Pageable pageable) {
        Page<Novel> novels = novelRepository.findAllByOrderByViewDesc(pageable);
        return novels.map((novel -> novelMapper.maptoNovelDto(novel)));
    }

    @Override
    public Page<NovelDTO> filerNovel(String genre,String country,String status,Pageable pageable) {
        Page<Novel> filterlist = novelRepository.filterNovel(genre,country,status,pageable);
        return filterlist.map(novel -> novelMapper.maptoNovelDto(novel));
    }

    @Override
    public Page<NovelDTO> getAllNovel(Pageable pageable) {
        Page<Novel> novels = novelRepository.findAll(pageable);
        return novels.map((novel -> novelMapper.maptoNovelDto(novel)));
    }

    @Override
    public List<NovelDTO> searchNovel(String search) {
        List<Novel> novels = novelRepository.searchNovel(search);
        return novels.stream().map((novel)-> novelMapper.maptoNovelDto(novel)).toList();
    }

    @Override
    public Page<NovelDTO> getAllByOrderByAvgRatingDesc(Pageable pageable) {
        Page<Novel> novels = novelRepository.findAllByAvgRating(pageable);
        return novels.map((novel)-> novelMapper.maptoNovelDto(novel));
    }

    @Override
    public ResponseEntity<String> incView(Long id) {
        Novel novel = novelRepository.findById(id).orElseThrow(()-> new ResourceNotFound("Novel is not existed"));
        novel.setView(novel.getView()+1);
        novelRepository.save(novel);
        return ResponseEntity.ok("success");
    }
}

package com.novelreading.novelreading_backend.mapper;

import com.novelreading.novelreading_backend.dto.ChapterDTO;
import com.novelreading.novelreading_backend.entity.Chapter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChapterMapper {

    @Autowired
    private ModelMapper modelMapper;

    public ChapterDTO maptoChapterDto(Chapter chapter){
        ChapterDTO chapterDTO = modelMapper.map(chapter,ChapterDTO.class);
        if(chapter.getNovel() != null) chapterDTO.setNovelID(chapter.getNovel().getNovelID());
        return chapterDTO;
    }

    public Chapter maptoChapter(ChapterDTO chapterDTO){
        Chapter chapter = modelMapper.map(chapterDTO,Chapter.class);
        return chapter;
    }
}

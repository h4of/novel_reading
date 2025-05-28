package com.novelreading.novelreading_backend.mapper;

import com.novelreading.novelreading_backend.dto.NovelDTO;
import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.service.AuthorService;
import com.novelreading.novelreading_backend.service.NovelService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NovelMapper {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthorService authorService;

    public NovelDTO maptoNovelDto(Novel novel){
        NovelDTO novelDTO = modelMapper.map(novel, NovelDTO.class);
        if(novel.getAuthorOf() != null) novelDTO.setAuthor(novel.getAuthorOf().getRoute());
        return novelDTO;
    }

    public Novel maptoNovel(NovelDTO novelDTO){
        Novel novel = modelMapper.map(novelDTO,Novel.class);
        novel.setAuthorOf(authorService.getAuthorByRoute(novelDTO.getAuthor()));
        return novel;
    }
}

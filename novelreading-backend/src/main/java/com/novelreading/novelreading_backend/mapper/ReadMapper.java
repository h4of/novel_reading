package com.novelreading.novelreading_backend.mapper;

import com.novelreading.novelreading_backend.dto.RatingDTO;
import com.novelreading.novelreading_backend.dto.ReadDTO;
import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.entity.Rating;
import com.novelreading.novelreading_backend.entity.Read;
import com.novelreading.novelreading_backend.exception.ResourceNotFound;
import com.novelreading.novelreading_backend.repository.NovelRepository;
import com.novelreading.novelreading_backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReadMapper {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private NovelRepository novelRepository;

    @Autowired
    private UserRepository userRepository;

    public ReadDTO maptoReadDto(Read read){
        ReadDTO readDTO = modelMapper.map(read,ReadDTO.class);
        readDTO.setNovelID(read.getNovelRead().getNovelID());
        readDTO.setUserID(read.getUserRead().getUserID());
        readDTO.setNovelName(read.getNovelRead().getName());
        readDTO.setNovelRoute(read.getNovelRead().getRoute());
        return readDTO;
    }

    public Read maptoRead(ReadDTO readDTO){
        Read read = modelMapper.map(readDTO,Read.class);
        read.setNovelRead(novelRepository.findById(readDTO.getNovelID()).orElseThrow(()-> new ResourceNotFound("Novel is not existed")));
        read.setUserRead(userRepository.findById(readDTO.getUserID()).orElseThrow(()-> new ResourceNotFound("User is not existed")));
        return read;
    }
}

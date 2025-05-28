package com.novelreading.novelreading_backend.service.impl;

import com.novelreading.novelreading_backend.dto.ReadDTO;
import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.entity.Rating;
import com.novelreading.novelreading_backend.entity.Read;
import com.novelreading.novelreading_backend.entity.User;
import com.novelreading.novelreading_backend.exception.ResourceNotFound;
import com.novelreading.novelreading_backend.mapper.ReadMapper;
import com.novelreading.novelreading_backend.repository.NovelRepository;
import com.novelreading.novelreading_backend.repository.ReadRespository;
import com.novelreading.novelreading_backend.repository.UserRepository;
import com.novelreading.novelreading_backend.service.ReadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReadServiceImpl implements ReadService {

    @Autowired
    private ReadRespository readRespository;

    @Autowired
    private NovelRepository novelRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReadMapper readMapper;

    @Override
    public ReadDTO saveReading(ReadDTO readDTO) {
        return readRespository.findByUserRead_UserIDAndNovelRead_NovelID(readDTO.getUserID(), readDTO.getNovelID())
                .map(read -> {
                    read.setReadAt(LocalDateTime.now());
                    read.setChapterReading(readDTO.getChapterReading());
                    readRespository.save(read);
                    return readMapper.maptoReadDto(read);
                })
                .orElseGet(() -> {
                    Read read = new Read();
                    read.setUserRead(userRepository.getReferenceById(readDTO.getUserID()));
                    read.setNovelRead(novelRepository.getReferenceById(readDTO.getNovelID()));
                    read.setChapterReading(readDTO.getChapterReading());
                    read.setReadAt(LocalDateTime.now());
                    readRespository.save(read);
                    return readMapper.maptoReadDto(read);
                });
    }

    @Override
    public Page<ReadDTO> getAllByUserIDOrderByReadAtDesc(Long userID,Pageable pageable) {
        Page<Read> listRead = readRespository.findAllByUserRead_UserIDOrderByReadAtDesc(userID,pageable);
        return listRead.map((read -> readMapper.maptoReadDto(read)));
    }

    @Override
    public int getByUserIDAndNovelID(Long userID, Long novelID) {
        Read read = readRespository.findByUserRead_UserIDAndNovelRead_NovelID(userID,novelID).orElseThrow(()-> new ResourceNotFound("Read not found"));
        return read.getChapterReading();
    }
}

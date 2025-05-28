package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.dto.ReadDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReadService {
    public ReadDTO saveReading(ReadDTO readDTO);

    Page<ReadDTO> getAllByUserIDOrderByReadAtDesc(Long userID,Pageable pageable);

    public int getByUserIDAndNovelID(Long userID,Long novelID);
}

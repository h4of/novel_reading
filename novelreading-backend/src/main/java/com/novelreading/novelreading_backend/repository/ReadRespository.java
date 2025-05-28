package com.novelreading.novelreading_backend.repository;

import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.entity.Read;
import com.novelreading.novelreading_backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReadRespository extends JpaRepository<Read,Long> {
    public Page<Read> findAllByUserRead_UserIDOrderByReadAtDesc(Long userID,Pageable pageable);

    public Optional<Read> findByUserRead_UserIDAndNovelRead_NovelID(Long UserID, Long NovelID);
}

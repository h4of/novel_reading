package com.novelreading.novelreading_backend.repository;

import com.novelreading.novelreading_backend.entity.Chapter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter,String> {
    public Page<Chapter> findAll(Pageable pageable);

    Optional<Chapter> findById(String id);
}

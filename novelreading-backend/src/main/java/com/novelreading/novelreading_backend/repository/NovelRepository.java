package com.novelreading.novelreading_backend.repository;

import com.novelreading.novelreading_backend.model.Novel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NovelRepository extends JpaRepository<Novel,String> {
}

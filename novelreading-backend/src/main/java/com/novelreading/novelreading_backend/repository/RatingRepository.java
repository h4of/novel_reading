package com.novelreading.novelreading_backend.repository;

import com.novelreading.novelreading_backend.dto.RatingDTO;
import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.entity.Rating;
import com.novelreading.novelreading_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating,Long> {

    public List<Rating> findALLByNovelRate(Novel novel);

    public Optional<Rating> findByUserRate_UserIDAndNovelRate_NovelID(Long userID, Long novelID);
}

package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.dto.RatingDTO;
import com.novelreading.novelreading_backend.entity.Rating;

import java.util.List;

public interface RatingService {

    public RatingDTO saveRating(RatingDTO ratingDTO);

    public int getRatingByNovelIDAndUserID(long novelID,long userID);

    public double getAllRatingByNovelID(Long novelID);
}

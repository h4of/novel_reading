package com.novelreading.novelreading_backend.service.impl;

import com.novelreading.novelreading_backend.dto.RatingDTO;
import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.entity.Rating;
import com.novelreading.novelreading_backend.entity.User;
import com.novelreading.novelreading_backend.exception.ResourceNotFound;
import com.novelreading.novelreading_backend.mapper.RatingMapper;
import com.novelreading.novelreading_backend.repository.NovelRepository;
import com.novelreading.novelreading_backend.repository.RatingRepository;
import com.novelreading.novelreading_backend.repository.UserRepository;
import com.novelreading.novelreading_backend.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private NovelRepository novelRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RatingMapper ratingMapper;

    @Override
    public RatingDTO saveRating(RatingDTO ratingDTO) {
        return ratingRepository.findByUserRate_UserIDAndNovelRate_NovelID(ratingDTO.getUserID(), ratingDTO.getNovelID())
                .map(rating -> {
                    rating.setRate(ratingDTO.getRate());
                    ratingRepository.save(rating);
                    return ratingMapper.maptoRatingDto(rating);
                })
                .orElseGet(() -> {
                    Rating newRating = new Rating();
                    newRating.setRate(ratingDTO.getRate());
                    newRating.setUserRate(userRepository.getReferenceById(ratingDTO.getUserID()));
                    newRating.setNovelRate(novelRepository.getReferenceById(ratingDTO.getNovelID()));
                    ratingRepository.save(newRating);
                    return ratingMapper.maptoRatingDto(newRating);
                });
    }

    @Override
    public double getAllRatingByNovelID(Long novelID) {
        Novel novel = novelRepository.findById(novelID).orElseThrow(()-> new ResourceNotFound("Novel is not existed"));
        List<Rating> ratings = ratingRepository.findALLByNovelRate(novel);
        if(ratings.isEmpty()) return 5L;
        else{
            double ratingFinal = 0;
            for(long rating : ratings.stream().map(Rating::getRate).toList()){
                ratingFinal+=rating;
            }
            return Double.parseDouble(String.format("%.2f",ratingFinal/ratings.size()).replace(",","."));
        }
    }

    @Override
    public int getRatingByNovelIDAndUserID(long novelID, long userID) {
        Rating rating = ratingRepository.findByUserRate_UserIDAndNovelRate_NovelID(userID,novelID).orElseThrow(()-> new ResourceNotFound("Rating is not existed"));
        return rating.getRate();
    }
}

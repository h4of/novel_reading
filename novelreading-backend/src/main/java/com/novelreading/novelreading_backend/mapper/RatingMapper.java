package com.novelreading.novelreading_backend.mapper;

import com.novelreading.novelreading_backend.dto.RatingDTO;
import com.novelreading.novelreading_backend.dto.UserDTO;
import com.novelreading.novelreading_backend.entity.Novel;
import com.novelreading.novelreading_backend.entity.Rating;
import com.novelreading.novelreading_backend.entity.User;
import com.novelreading.novelreading_backend.exception.ResourceNotFound;
import com.novelreading.novelreading_backend.repository.NovelRepository;
import com.novelreading.novelreading_backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RatingMapper {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private NovelRepository novelRepository;

    @Autowired
    private UserRepository userRepository;

    public RatingDTO maptoRatingDto(Rating rating){
        RatingDTO ratingDTO = modelMapper.map(rating,RatingDTO.class);
        ratingDTO.setUserID(rating.getUserRate().getUserID());
        ratingDTO.setNovelID(rating.getNovelRate().getNovelID());
        return ratingDTO;
    }

    public Rating maptoRating(RatingDTO ratingDTO){
        Rating rating = modelMapper.map(ratingDTO, Rating.class);
        Novel novel = novelRepository.findById(ratingDTO.getNovelID()).orElseThrow(()->new ResourceNotFound("Novel is not existed"));
        rating.setNovelRate(novel);
        rating.setUserRate(userRepository.findById(ratingDTO.getUserID()).orElseThrow(()-> new ResourceNotFound("User is not existed")));
        return rating;
    }
}

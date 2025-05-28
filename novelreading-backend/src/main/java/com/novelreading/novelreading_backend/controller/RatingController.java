package com.novelreading.novelreading_backend.controller;


import com.novelreading.novelreading_backend.dto.RatingDTO;
import com.novelreading.novelreading_backend.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping()
public class RatingController {
    @Autowired
    private RatingService ratingService;

    @PostMapping("/user/rating")
    public ResponseEntity<RatingDTO> addRating(@RequestBody RatingDTO ratingDTO){
        ratingService.saveRating(ratingDTO);
        return ResponseEntity.ok(ratingDTO);
    }

    @GetMapping("/novel/final-rating/{id}")
    public double getFinalRating(@PathVariable("id") Long novelID){
        return ratingService.getAllRatingByNovelID(novelID);
    }

    @GetMapping("/user/novel/get-rating")
    public int getRatingByUserID(@RequestParam Long novelID,@RequestParam Long userID){
        return ratingService.getRatingByNovelIDAndUserID(novelID,userID);
    }
}

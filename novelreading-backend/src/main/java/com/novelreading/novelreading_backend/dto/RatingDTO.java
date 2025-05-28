package com.novelreading.novelreading_backend.dto;



public class RatingDTO {
    private int rate;
    private Long novelID;
    private Long userID;

    public RatingDTO() {
    }

    public Long getNovelID() {
        return novelID;
    }

    public void setNovelID(Long novelID) {
        this.novelID = novelID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }
}

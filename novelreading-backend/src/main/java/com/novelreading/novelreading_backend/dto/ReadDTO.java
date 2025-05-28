package com.novelreading.novelreading_backend.dto;

import com.novelreading.novelreading_backend.entity.User;

import java.time.LocalDateTime;

public class ReadDTO {
    private LocalDateTime readAt;
    private int chapterReading;
    private long userID;
    private long novelID;
    private String novelRoute;
    private String novelName;

    public ReadDTO() {
    }

    public String getNovelRoute() {
        return novelRoute;
    }

    public void setNovelRoute(String novelRoute) {
        this.novelRoute = novelRoute;
    }

    public String getNovelName() {
        return novelName;
    }

    public void setNovelName(String novelName) {
        this.novelName = novelName;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

    public int getChapterReading() {
        return chapterReading;
    }

    public void setChapterReading(int chapterReading) {
        this.chapterReading = chapterReading;
    }

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
    }

    public long getNovelID() {
        return novelID;
    }

    public void setNovelID(long novelID) {
        this.novelID = novelID;
    }
}

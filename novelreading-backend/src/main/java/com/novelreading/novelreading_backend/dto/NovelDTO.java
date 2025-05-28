package com.novelreading.novelreading_backend.dto;

import com.novelreading.novelreading_backend.entity.Chapter;
import com.novelreading.novelreading_backend.entity.Rating;
import com.novelreading.novelreading_backend.entity.Read;

import java.time.LocalDateTime;
import java.util.List;

public class NovelDTO {
    private Long id;
    private String name;
    private int totalChapter;
    private String route;
    private String genre;
    private String status;
    private String anou;
    private long view;
    private String author;
    private LocalDateTime date;
    private List<ChapterDTO> chapters;
    private List<RatingDTO> ratings;
    private List<ReadDTO> listRead;

    public NovelDTO() {
    }

    public long getView() {
        return view;
    }

    public void setView(long view) {
        this.view = view;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public List<ChapterDTO> getChapters() {
        return chapters;
    }

    public void setChapters(List<ChapterDTO> chapters) {
        this.chapters = chapters;
    }

    public List<RatingDTO> getRatings() {
        return ratings;
    }

    public void setRatings(List<RatingDTO> ratings) {
        this.ratings = ratings;
    }

    public List<ReadDTO> getListRead() {
        return listRead;
    }

    public void setListRead(List<ReadDTO> listRead) {
        this.listRead = listRead;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTotalChapter() {
        return totalChapter;
    }

    public void setTotalChapter(int totalChapter) {
        this.totalChapter = totalChapter;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAnou() {
        return anou;
    }

    public void setAnou(String anou) {
        this.anou = anou;
    }
}

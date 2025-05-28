package com.novelreading.novelreading_backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "novel")
public class Novel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "novel_id")
    private long novelID;
    @Column(name = "name")
    private String name;
    @Column(name = "total_chapter")
    private int totalChapter=0;
    @Column(name = "genre")
    private String genre;
    @Column(name = "view")
    private long view = 0;
    @Column(name = "status")
    private String status;
    @Column(name = "anou",columnDefinition = "TEXT")
    private String anou;
    @Column(name = "route")
    private String route;
    @Column(name = "date_updated")
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author authorOf;

    @OneToMany(mappedBy = "novel",fetch = FetchType.LAZY,cascade = {CascadeType.REMOVE})
    private List<Chapter> chapters = new ArrayList<>();

    @OneToMany(mappedBy = "novelRate",fetch = FetchType.LAZY,cascade = {CascadeType.REMOVE})
    private List<Rating> ratings =new ArrayList<>();

    @OneToMany(mappedBy = "novelRead",fetch = FetchType.LAZY,cascade = {CascadeType.REMOVE})
    private List<Read> listRead = new ArrayList<>();

    public Novel() {
    }

    public long getView() {
        return view;
    }

    public void setView(long view) {
        this.view = view;
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

    public List<Read> getListRead() {
        return listRead;
    }

    public void setListRead(List<Read> listRead) {
        this.listRead = listRead;
    }

    public Author getAuthorOf() {
        return authorOf;
    }

    public void setAuthorOf(Author author) {
        this.authorOf = author;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public long getNovelID() {
        return novelID;
    }

    public void setNovelID(long novelID) {
        this.novelID = novelID;
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

    public String getAnou() {
        return anou;
    }

    public void setAnou(String anou) {
        this.anou = anou;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

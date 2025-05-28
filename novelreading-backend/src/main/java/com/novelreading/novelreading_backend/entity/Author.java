package com.novelreading.novelreading_backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "author")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "author_id")
    private long authorID;
    @Column(name = "name")
    private String name;
    @Column(name = "anou",columnDefinition = "TEXT")
    private String anou;
    @Column(name = "date")
    private String date;
    @Column(name = "route")
    private String route;

    @OneToMany(mappedBy = "authorOf",fetch = FetchType.LAZY)
    private List<Novel> novels = new ArrayList<>();

    public Author() {
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public List<Novel> getNovels() {
        return novels;
    }

    public void setNovels(List<Novel> novels) {
        this.novels = novels;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAnou() {
        return anou;
    }

    public void setAnou(String anou) {
        this.anou = anou;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public long getAuthorID() {
        return authorID;
    }

    public void setAuthorID(long authorID) {
        this.authorID = authorID;
    }
}

package com.novelreading.novelreading_backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "novel")
public class Novel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long novel_id;
    private String name;
    private String path_image;
    private int chapter_number;
    private String origin;
    private String anou;
    private int rating;

    @ManyToOne
    @JoinColumn(name="author_id",nullable = false)
    private Author author;

    @ManyToMany
    @JoinTable(
            name = "rate",
            joinColumns = @JoinColumn(name="novel_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> usersRate;
    @ManyToMany
    @JoinTable(
            name = "read",
            joinColumns = @JoinColumn(name="novel_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> usersRead;


    public Novel() {
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public List<User> getUsersRead() {
        return usersRead;
    }

    public void setUsersRead(List<User> usersRead) {
        this.usersRead = usersRead;
    }

    public List<User> getUsersRate() {
        return usersRate;
    }

    public void setUsersRate(List<User> usersRate) {
        this.usersRate = usersRate;
    }

    public String getAnou() {
        return anou;
    }

    public void setAnou(String anou) {
        this.anou = anou;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public int getChaper_number() {
        return chapter_number;
    }

    public void setChaper_number(int chaper_number) {
        this.chapter_number = chaper_number;
    }

    public long getId() {
        return novel_id;
    }

    public void setId(long id) {
        this.novel_id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath_image() {
        return path_image;
    }

    public void setPath_image(String path_image) {
        this.path_image = path_image;
    }
}

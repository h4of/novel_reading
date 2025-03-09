package com.novelreading.novelreading_backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Novel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long novel_id;
    private String name;
    private String path_image;
    private int chapter_number;
    private String origin;
    private String anou;

    @ManyToOne
    @JoinColumn(name="author_id",nullable = false)
    private Author author;

    @ManyToMany
    @JoinTable(
            name = "novel_user",
            joinColumns = @JoinColumn(name="novel_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

    public Novel() {
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
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

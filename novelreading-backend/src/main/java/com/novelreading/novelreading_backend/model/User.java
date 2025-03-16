package com.novelreading.novelreading_backend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;
    @Column(unique = true)
    private String email;
    private String password;
    private String user_name;
    public static int cnt=0;

    @ManyToMany(mappedBy = "usersRead")
    private List<Novel> novels;

    @ManyToMany(mappedBy = "usersRate")
    private List<Novel> novel_rating;

    public User() {
        this.user_name="user"+ String.format("user%05d",cnt++);
    }

    public List<Novel> getNovel_rating() {
        return novel_rating;
    }

    public void setNovel_rating(List<Novel> novel_rating) {
        this.novel_rating = novel_rating;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public List<Novel> getNovels() {
        return novels;
    }

    public void setNovels(List<Novel> novels) {
        this.novels = novels;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }
}

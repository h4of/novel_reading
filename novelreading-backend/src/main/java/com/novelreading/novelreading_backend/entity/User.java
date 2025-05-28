package com.novelreading.novelreading_backend.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userID;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "userRate",fetch = FetchType.LAZY,cascade = {CascadeType.REMOVE})
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "userRead",fetch = FetchType.LAZY,cascade = {CascadeType.REMOVE})
    private List<Read> listRead = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Role role;

    public User() {
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Read> getListRead() {
        return listRead;
    }

    public void setListRead(List<Read> listRead) {
        this.listRead = listRead;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public long getUserID() {
        return userID;
    }

    public void setUserID(long userID) {
        this.userID = userID;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isEnable(){
        return false;
    }
}

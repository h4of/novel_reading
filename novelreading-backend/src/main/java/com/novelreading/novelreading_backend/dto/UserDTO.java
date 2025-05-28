package com.novelreading.novelreading_backend.dto;


import com.novelreading.novelreading_backend.entity.Rating;
import com.novelreading.novelreading_backend.entity.Role;
import com.novelreading.novelreading_backend.entity.Read;

import java.util.List;

public class UserDTO {
    private Long userID;
    private String email;
    private String password;
    private String name;
    private Role role;
    private List<RatingDTO> ratings;
    private List<ReadDTO> listRead;

    public UserDTO() {
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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
}

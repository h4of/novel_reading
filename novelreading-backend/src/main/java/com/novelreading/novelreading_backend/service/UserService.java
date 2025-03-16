package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.model.User;

public interface UserService {
    public User saveUser(User user);

    public String getUserName(User user);

    public String userLogin(User user);
}

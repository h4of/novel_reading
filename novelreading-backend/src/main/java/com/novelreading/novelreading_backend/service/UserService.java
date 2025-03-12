package com.novelreading.novelreading_backend.service;

import com.novelreading.novelreading_backend.model.User;

import java.util.Optional;

public interface UserService {
    public User saveUser(User user);

    public Optional<User> findByEmailAndPassword(String email,String password);

}
